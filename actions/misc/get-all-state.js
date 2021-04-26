const { Core } = require("@adobe/aio-sdk");
const stateLib = require("@adobe/aio-lib-state");
const {
  errorResponse,
  stringParameters,
  checkMissingRequestInputs,
} = require("../utils");

function getExpiration(ttl, ts) {
  if (ttl < 0) {
    return null;
  }
  return new Date(ts * 1000 + ttl * 1000).toISOString();
}

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  // create a Logger
  const logger = Core.Logger("main", { level: params.LOG_LEVEL || "info" });

  try {
    // 'info' is the default level if not set
    logger.info("Calling the main action");

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params));
    const state = await stateLib.init();

    // check for missing request input parameters and headers
    const requiredParams = [];
    const requiredHeaders = [];
    const errorMessage = checkMissingRequestInputs(
      params,
      requiredParams,
      requiredHeaders
    );
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger);
    }

    const queryPlan = state._cosmos.container.items.query(
      `SELECT * from c where c.partitionKey='${state._cosmos.partitionKey}'`,
      {
        initialHeaders: {
          "x-ms-documentdb-partitionkey": `["${state._cosmos.partitionKey}"]`,
        },
        continuationToken: params.continuationToken,
      }
    );
    const queryRes = await queryPlan.fetchNext();
    const res = queryRes.resources.map((x) => ({
      key: x.id,
      value: x.value,
      expiration: getExpiration(x.ttl, x._ts),
    }));
    const response = {
      statusCode: 200,
      // todo check the continuation token
      body: {
        message: "success",
        keys: res,
        hasMoreResults: queryRes.hasMoreResults,
        continuationToken: queryPlan.continuationToken,
      }, // default is 24hours
    };

    // log the response status code
    logger.info(`${response.statusCode}: successful request`);
    return response;
  } catch (error) {
    // log any server errors
    logger.error(error);
    // return with 500
    return errorResponse(500, "server error", logger);
  }
}

exports.main = main;
