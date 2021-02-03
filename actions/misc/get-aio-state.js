const { Core } = require("@adobe/aio-sdk");
const stateLib = require("@adobe/aio-lib-state");
const {
  errorResponse,
  stringParameters,
  checkMissingRequestInputs,
} = require("../utils");

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
    const requiredParams = ["key"];
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

    // get
    const res = await state.get(params.key);
    const value = res.value;

    logger.debug(`state key = ${params.key} retrieved`);
    const response = {
      statusCode: 200,
      body: value,
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
