/*
   Route handler for callback after passport authentication with github.
*/

/* ================================= SETUP ================================= */

// import model
const users = require("../../db/models/users");

const passport = require("passport");
const utils = require("../utils");
const userController = require("./users.ctrl");

const APP_HOST = process.env.APP_HOST;
const CLIENT_URL =
  process.env.NODE_ENV === "production" ? APP_HOST : "http://localhost:3000";
const SERVER_URL =
  process.env.NODE_ENV === "production" ? APP_HOST : "//localhost:3001";

/* ============================ ROUTE HANDLERS ============================= */

exports.githubCallback = (req, res) => {
  console.log("################# github callback");
  if (req.user && req.user.err) {
    res.status(401).json({
      success: false,
      message: `github auth failed: ${req.user.err}`,
      error: req.user.err
    });
  } else {
    const userObj = req.user
      ? { ...req.user }
      : req.session && req.session.user
      ? { ...req.session.user }
      : undefined;
    // only allow auth from my user account
    if (userObj && userObj.email === "rifkegribenes@gmail.com") {
      // successful authentication from provider
      console.log("successful github auth");
      // generate token
      // return user ID & github redirect flag as URL params
      const userInfo = utils.setUserInfo(userObj);
      const token = utils.generateToken(userInfo);
      return res.redirect(
        `${CLIENT_URL}/#/redirect=admin/${userObj.id}/${token}`
      );
    } else {
      console.log("github auth failed");
      return res.redirect("/login");
    }
  }
};
