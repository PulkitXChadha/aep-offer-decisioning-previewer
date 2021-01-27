/*
 * <license header>
 */
const fetch = require("node-fetch");
const { Core } = require("@adobe/aio-sdk");
const {
  errorResponse,
  getBearerToken,
  stringParameters,
  checkMissingRequestInputs,
} = require("../utils");

async function main(params) {
  const logger = Core.Logger("main", { level: params.LOG_LEVEL || "info" });
  try {
    logger.info("Calling the main action");
    logger.debug(stringParameters(params));
    const requiredParams = ["containerID", "offerID", "metric", "apiKey"];
    const requiredHeaders = ["Authorization", "x-gw-ims-org-id"];
    const errorMessage = checkMissingRequestInputs(
      params,
      requiredParams,
      requiredHeaders
    );
    if (errorMessage) {
      return errorResponse(400, errorMessage, logger);
    }
    const token = getBearerToken(params);
    const apiEndpoint = `https://platform.adobe.io/data/core/ode/${params.containerID}/metrics?metric=${params.metric}&id=${params.offerID}`;
    const res = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "x-api-key": params.apiKey,
        "x-gw-ims-org-id": params.__ow_headers["x-gw-ims-org-id"],
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: " application/json, application/problem+json",
      },
    });
    if (!res.ok) {
      throw new Error(
        "request to " + apiEndpoint + " failed with status code " + res.status
      );
    }
    const content = await res.json();
    logger.debug("fetch content = " + JSON.stringify(content, null, 2));
    const response = {
      statusCode: 200,
      body: content,
    };
    logger.info(`${response.statusCode}: successful request`);
    return response;
  } catch (error) {
    logger.error(error);
    return errorResponse(500, "server error", logger);
  }
}

exports.main = main;
