const stateLib = require("@adobe/aio-lib-state");
const state = await stateLib.init();
const queryPlan = state._cosmos.container.items.query(
  `SELECT c.id,c.ttl,c._ts from c where c.partitionKey='${state._cosmos.partitionKey}'`,
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
