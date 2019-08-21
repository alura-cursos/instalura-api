const PhotoDao = require("./photo-dao"),
  CommentDao = require("./comment-dao"),
  UserDao = require("./user-dao"),
  wrapAsync = require("./async-wrap"),
  auth = require("./auth"),
  FeedDao = require("./feed-dao");

module.exports = {
  PhotoDao,
  CommentDao,
  UserDao,
  wrapAsync,
  auth,
  FeedDao
};
