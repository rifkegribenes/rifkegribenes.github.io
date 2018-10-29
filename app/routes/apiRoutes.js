/*
   routes to handle database queries
*/

/* ================================= SETUP ================================= */

const router = require("express").Router();
const passport = require("passport");
const Auth = require("../config/auth");

/* =========================== LOAD CONTROLLERS ============================ */

const projectCtrl = require("../controllers/projects.ctrl");
const userCtrl = require("../controllers/users.ctrl");

/* =========================== ROUTE MIDDLEWARE ============================ */

const requireAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    console.log("requireAuth");
    if (err) {
      console.log(`router.js > 23: ${err}`);
      return res.status(422).send({ success: false, message: err.message });
    }
    if (!user) {
      return res
        .status(422)
        .send({
          success: false,
          message: "Sorry, you must log in to view this page."
        });
    }
    if (user) {
      console.log(`router.js > 30: user found`);
      req.login(user, loginErr => {
        if (loginErr) {
          console.log(`router.js > 32: ${loginErr}`);
          return next(loginErr);
        } else {
          console.log(`router.js > 35: returning next`);
          return next(loginErr, user);
        }
      }); // req.login
    }
  })(req, res, next);
};

/* ============================== PROJECT ROUTES =========================== */

// CREATE A PROJECT
//   Example: POST >> /api/projects
//   Secured: no
//   Expects:
//     1) request body properties : {
//          title           : String
//          body            : String
//          screenshotUrl   : String
//          liveUrl         : String
//          githubUrl       : String
//          tags            : [String]
//        }
//   Returns: JSON project object on success.
//
router.post("/projects", projectCtrl.createProjectWithTags);

// UPDATE A PROJECT
//   Example: PUT >> /api/projects/:id
//   Secured: no
//   Expects:
//     1) request body properties : {
//          updates         : Object {
//              title           : String
//              body            : String
//              screenshotUrl   : String
//              liveUrl         : String
//              githubUrl       : String
//             }
//          tags                : [String]
//        }
//      2) request params         : {
//          id              : String
//      }
//   Returns: JSON updated project object on success.
//
router.put("/projects/:id", projectCtrl.updateProjectWithTags);

// GET ALL PROJECTS
//   Example: GET >> /api/projects
//   Secured: no
//   Expects: null
//   Returns: Array of project objects on success.
//
router.get("/projects", projectCtrl.getProjects);

// GET ONE PROJECT
//   Example: GET >> /api/projects/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: JSON project object on success.
//
router.get("/projects/:id", projectCtrl.getProjectById);

// DELETE PROJECT
//   Example: DELETE >> /api/projects/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: success message on success.
//
router.delete("/projects/:id", projectCtrl.deleteProject);

/* ================================ USER ROUTES ============================ */

// CREATE A USER
//   Example: POST >> /api/users
//   Secured: no
//   Expects:
//     1) request body properties : {
//          email           : String
//          username        : String
//          github_id       : String
//          github_token    : String
//        }
//   Returns: JSON user object on success.
//
router.post("/users", userCtrl.createUser);

// UPDATE A USER
//   Example: PUT >> /api/users/:id
//   Secured: no
//   Expects:
//     1) request body properties : {
//          updates         : Object {
//              email           : String
//              username        : String
//             }
//        }
//      2) request params         : {
//          id              : String
//      }
//   Returns: JSON updated user object on success.
//
router.put("/users/:id", userCtrl.updateUser);

// GET ONE USER
//   Example: GET >> /api/users/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: JSON user object on success.
//
router.get("/users/:id", userCtrl.getUserById);

// GET ALL USERS
//   Example: GET >> /api/users/
//   Secured: no
//   Expects: null
//   Returns: Array of user objects on success.
//
router.get("/users/", userCtrl.getUsers);

// DELETE USER
//   Example: DELETE >> /api/users/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: success message on success.
//
router.delete("/users/:id", userCtrl.deleteUser);

/* ================================ EXPORT ================================= */

module.exports = router;
