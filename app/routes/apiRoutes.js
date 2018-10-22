/*
   routes to handle database queries
*/

/* ================================= SETUP ================================= */

const router = require('express').Router();


/* =========================== LOAD CONTROLLERS ============================ */

const projectCtrl = require('../controllers/projects.ctrl');


/* ================================ ROUTES ================================= */

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
//   Returns: JSON 'project' object on success.
//
router.post('/projects', (req, res) => {
    const { title, body, screenshotUrl, liveUrl, githubUrl, tags } = req.body;

    projectCtrl.createPostWithTopics(title, body, screenshotUrl, liveUrl, githubUrl, tags)
        .then((project) => res.status(200).json(project))
        .catch((err) => res.status(500).json({ message: err.message }) );
});


// GET ALL PROJECTS
//   Example: GET >> /api/projects
//   Secured: no
//   Expects: null
//   Returns: Array of project objects on success.
//
router.get('/projects', (req, res) => {
    projectCtrl.getProjects()
        .then((projects) => res.status(200).json(projects))
        .catch((err) => res.status(500).json({ message: err.message }) );
});


// GET ONE PROJECT
//   Example: GET >> /api/projects/3
//   Secured: no
//   Expects:
//     1) request params : {
//          id : Number
//        }
//   Returns: project object on success.
//
router.get('/projects/:id', (req, res) => {
    projectCtrl.getProjectById(req.params.id)
        .then(project => res.status(200).json(project) )
        .catch((err) => res.status(404).json({ message: err.message }) );
});


/* ================================ EXPORT ================================= */

module.exports = router;