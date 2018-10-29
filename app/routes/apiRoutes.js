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
      console.log(`apiRoutes.js > 22: ${err}`);
      return res.status(422).send({ success: false, message: err.message });
    }
    if (!user) {
      return res.status(422).send({
        success: false,
        message: "Sorry, you must log in to view this page."
      });
    }
    if (user) {
      console.log(`apiRoutes.js > 34: user found`);
      req.login(user, loginErr => {
        if (loginErr) {
          console.log(`apiRoutes.js > 37: ${loginErr}`);
          return next(loginErr);
        } else {
          console.log(`apiRoutes.js > 40: returning next`);
          return next(loginErr, user);
        }
      }); // req.login
    }
  })(req, res, next);
};

/* ============================== PROJECT ROUTES =========================== */

// CREATE A PROJECT
//   Example: POST >> /api/projects
//   Secured: yes
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
// router.post("/projects", requireAuth, projectCtrl.createProjectWithTags);

// UPDATE A PROJECT
//   Example: PUT >> /api/projects/:id
//   Secured: yes
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
// router.put("/projects/:id", requireAuth, projectCtrl.updateProjectWithTags);

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
//   Secured: yes
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: success message on success.
//
router.delete("/projects/:id", projectCtrl.deleteProject);
// router.delete("/projects/:id", requireAuth, projectCtrl.deleteProject);

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
//   Secured: yes
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
// router.put("/users/:id", requireAuth, userCtrl.updateUser);

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
//   Secured: yes
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: success message on success.
//
router.delete("/users/:id", userCtrl.deleteUser);
// router.delete("/users/:id", requireAuth, userCtrl.deleteUser);

/* ================================ EXPORT ================================= */

module.exports = router;
