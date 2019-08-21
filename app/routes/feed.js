const { feedAPI } = require("../api"),
  { wrapAsync } = require("../infra");

module.exports = app => {
  app.route("/feed").get(wrapAsync(feedAPI.list));
};
