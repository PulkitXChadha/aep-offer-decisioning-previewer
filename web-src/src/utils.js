/*
 * <license header>
 */
import actions from "../src/config.json";

/* global fetch */
const fetch = require("node-fetch");
/**
 *
 * Invokes a web action
 *
 * @param  {string} actionName
 * @param {object} headers
 * @param  {object} params
 *
 * @returns {Promise<string|object>} the response
 *
 */
async function actionWebInvoke(actionName, headers = {}, params = {}) {
  const actionUrl = actions[actionName];
  const actionHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };
  if (window.location.hostname === "localhost") {
    actionHeaders["x-ow-extra-logging"] = "on";
  }
  const response = await fetch(actionUrl, {
    method: "post",
    headers: actionHeaders,
    body: JSON.stringify(params),
  });
  let content = await response.text();
  if (!response.ok) {
    throw new Error(
      `failed request to '${actionUrl}' with status: ${response.status} and message: ${content}`
    );
  }
  try {
    content = JSON.parse(content);
  } catch (e) {
    // response is not json
  }
  return content;
}

export default actionWebInvoke;
