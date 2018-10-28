/*
   routes to handle database queries
*/

/* ================================= SETUP ================================= */

const router = require("express").Router();

/* =========================== LOAD CONTROLLERS ============================ */

const projectCtrl = require("../controllers/projects.ctrl");
const userCtrl = require("../controllers/users.ctrl");

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
router.post("/projects", (req, res) => {
  const { title, body, screenshotUrl, liveUrl, githubUrl, tags } = req.body;

  projectCtrl
    .createProjectWithTags(title, body, screenshotUrl, liveUrl, githubUrl, tags)
    .then(project => res.status(200).json(project))
    .catch(err => {
      console.log(`apiRoutes.js > 36: ${err}`);
      res.status(500).json({ message: err.message });
    });
});

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
router.put("/projects/:id", (req, res) => {
  const { updates, tags } = req.body;
  const { id } = req.params;

  projectCtrl
    .updateProjectWithTags(id, updates, tags)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ message: err.message }));
});

// GET ALL PROJECTS
//   Example: GET >> /api/projects
//   Secured: no
//   Expects: null
//   Returns: Array of project objects on success.
//
router.get("/projects", (req, res) => {
  projectCtrl
    .getProjects()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ message: err.message }));
});

// GET ONE PROJECT
//   Example: GET >> /api/projects/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: JSON project object on success.
//
router.get("/projects/:id", (req, res) => {
  projectCtrl
    .getProjectById(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(404).json({ message: err.message }));
});

// DELETE PROJECT
//   Example: DELETE >> /api/projects/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: success message on success.
//
router.delete("/projects/:id", (req, res) => {
  projectCtrl
    .deleteProject(req.params.id)
    .then(() =>
      res.status(200).json({ message: "Project deleted successfully" })
    )
    .catch(err => res.status(404).json({ message: err.message }));
});

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
router.post("/users", (req, res) => {
  const { username, email, github_id, github_token } = req.body;

  userCtrl
    .createUser(username, email, github_id, github_token)
    .then(users => {
      const user = users[0];
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(`apiRoutes.js > 139: ${err}`);
      res.status(500).json({ message: err.message });
    });
});

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
router.put("/users/:id", (req, res) => {
  const { updates } = req.body;
  const { id } = req.params;

  userCtrl
    .updateUser(id, updates)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: err.message }));
});

// GET ONE USER
//   Example: GET >> /api/users/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: JSON user object on success.
//
router.get("/users/:id", (req, res) => {
  userCtrl
    .getUserById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ message: err.message }));
});

// DELETE USER
//   Example: DELETE >> /api/users/80f5ad9a-9c1f-4df0-813b-c7bdc339d7b3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : String
//        }
//   Returns: success message on success.
//
router.delete("/users/:id", (req, res) => {
  userCtrl
    .deleteUser(req.params.id)
    .then(() => res.status(200).json({ message: "User deleted successfully" }))
    .catch(err => res.status(404).json({ message: err.message }));
});

/* ================================ EXPORT ================================= */

module.exports = router;
