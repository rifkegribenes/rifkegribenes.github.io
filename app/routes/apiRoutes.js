/*
   routes to handle database queries
*/

/* ================================= SETUP ================================= */

const router = require("express").Router();
const passport = require("passport");

/* =========================== LOAD CONTROLLERS ============================ */

const projectCtrl = require("../controllers/projects.ctrl");
const userCtrl = require("../controllers/users.ctrl");
const authCtrl = require("../controllers/auth.ctrl");

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

/* ============================== AUTH ROUTES =========================== */

// GITHUB AUTH WITH PASSPORT
//   Example: GET >> /auth/github
//   Secured: no
//   Expects: null
//   Returns: Redirect to github callback route on success.
//
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);

// GITHUB CALLBACK ROUTE
//   Example: GET >> /auth/github/callback
//   Secured: no
//   Expects: null
//   Returns: User object and token.
//
router.get(
  "/auth/github/callback",
  passport.authenticate("github"),
  authCtrl.githubCallback
);

/* ============================== PROJECT ROUTES =========================== */

// CREATE A PROJECT
//   Example: POST >> /api/project
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
router.post("/project", projectCtrl.createProjectWithTags);
// router.post("/project", requireAuth, projectCtrl.createProjectWithTags);

// UPDATE A PROJECT
//   Example: PUT >> /api/project/:id
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
router.put("/project/:id", projectCtrl.updateProjectWithTags);
// router.put("/project/:id", requireAuth, projectCtrl.updateProjectWithTags);

// GET ALL PROJECTS
//   Example: GET >> /api/project
//   Secured: no
//   Expects: null
//   Returns: Array of project objects on success.
//
router.get("/project", projectCtrl.getProjects);

// GET ONE PROJECT
//   Example: GET >> /api/project/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: JSON project object on success.
//
router.get("/project/:id", projectCtrl.getProjectById);

// DELETE PROJECT
//   Example: DELETE >> /api/project/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: yes
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: success message on success.
//
router.delete("/project/:id", projectCtrl.deleteProject);
// router.delete("/project/:id", requireAuth, projectCtrl.deleteProject);

/* ================================ USER ROUTES ============================ */

// CREATE A USER
//   Example: POST >> /api/user
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
router.post("/user", userCtrl.createUser);

// UPDATE A USER
//   Example: PUT >> /api/user/:id
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
router.put("/user/:id", userCtrl.updateUser);
// router.put("/user/:id", requireAuth, userCtrl.updateUser);

// GET ONE USER
//   Example: GET >> /api/user/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: JSON user object on success.
//
router.get("/user/:id", userCtrl.getUserById);

// GET ALL USERS
//   Example: GET >> /api/user/
//   Secured: no
//   Expects: null
//   Returns: Array of user objects on success.
//
router.get("/user/", userCtrl.getUsers);

// DELETE USER
//   Example: DELETE >> /api/user/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: yes
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: success message on success.
//
router.delete("/user/:id", userCtrl.deleteUser);
// router.delete("/user/:id", requireAuth, userCtrl.deleteUser);

/* ================================ CONTACT ROUTES ========================= */

// SEND EMAIL
//   Example: POST >> /api/contact
//   Secured: no
//   Expects:
//     1) request body properties : {
//          name            : String
//          fromEmail       : String
//          subject         : String
//          message         : String
//        }
//   Returns: success message or error.
//
router.post("/contact", userCtrl.sendEmail);

/* ================================ EXPORT ================================= */

module.exports = router;
