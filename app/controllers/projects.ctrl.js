/*
   Route handlers for fetching and updating projects.
*/

/* ================================= SETUP ================================= */

// import models
const projects = require("../../db/models/projects");
const tags = require("../../db/models/tags");

/* ============================ ROUTE HANDLERS ============================= */

/** Create a new project with associated tags
 *  Creates tags if they don't already exist.
 *  @param    {String}   projectTitle    Title of the new project.
 *  @param    {String}   projectBody     Body text of the new project.
 *  @param    {String}   screenshotUrl   URL of screenshot image.
 *  @param    {String}   liveUrl         URL to live project.
 *  @param    {String}   githubUrl       URL of github repo.
 *  @param    {Array}    tagNames        Array of tags {String}
 *  @returns  {Object}                   New project object w/nested tags
 *  OR error message
 */
const createProjectWithTags = (req, res, next) => {
  const { title, body, screenshotUrl, liveUrl, githubUrl, tagNames } = req.body;

  let persistedTags;
  let persistedProject;
  // check which of submitted tags already exist in database
  return tags
    .getTagsByTagList(tagNames)
    .then(existingTags => {
      persistedTags = existingTags;
      // add any tags that don't yet exist to the unpersistedTags array
      const unpersistedTags = tagNames.filter(tag => {
        return persistedTags.map(p => p.tag).indexOf(tag) === -1;
      });
      // create new tags in the db for each of the unpersisted tags
      return Promise.all(
        unpersistedTags.map(tag => {
          return tags.createTag(tag);
        })
      );
    })
    .then(newTags => {
      if (newTags) {
        // if any new tags were created, add them to the persisted tags list
        persistedTags = persistedTags.concat(newTags);
      }
      // create a new project, including all tag names
      // (now we know all these tags have a matching DB entry
      // and can be attached to a project)
      return projects.createProject(
        title,
        body,
        screenshotUrl,
        liveUrl,
        githubUrl,
        tagNames
      );
    })
    .then(([newProject]) => {
      persistedProject = newProject;
      const pool = persistedTags.map(tag => {
        // attach all necessary tags to the new project
        return projects.attachProjectTag(persistedProject.id, tag.id);
      });
      return Promise.all(pool);
    })
    .then(() => {
      // then return the new project with tags to the client
      projects
        .getProjectByIdWithTags(persistedProject.id)
        .then(project => res.status(200).json(project))
        .catch(err => {
          console.log(`projects.ctrl.js > 73: ${err}`);
          res.status(500).json({ message: err.message });
        });
    });
};

/** Update an existing project and associated tags
 *  Creates tags if they don't already exist.
 *  @param    {String}   id              Id of project to update.
 *  @param    {Object}   updates         Key/value pairs for fields to update.
 ****  @param    {String}   projectTitle    Updated project title.
 ****  @param    {String}   projectBody     Updated body text.
 ****  @param    {String}   screenshotUrl   Updated screenshot URL.
 ****  @param    {String}   liveUrl         Updated live URL.
 ****  @param    {String}   githubUrl       Updated github URL.
 *  @param    {Array}    tagNames        Updated array of tags {String}
 *  @returns  {Object}                   Updated project object w/nested tags
 *  OR error message
 */
const updateProjectWithTags = (req, res, next) => {
  console.log("projects.ctrl.js > 95");
  console.log(req.body);
  const { updates, tags } = req.body;
  const { id } = req.params;
  let persistedTags;

  if (tagNames) {
    // only need to do this step if new tags names are submitted as updates
    // check all submitted tags against exiting tags in the database
    // TODO: this whole section is repeated in create and update methods,
    // this should be refactored as a standalone method
    // and called from create and update methods
    return tags
      .getTagsByTagList(tagNames)
      .then(existingTags => {
        persistedTags = existingTags;
        // add any tags that don't yet exist to the unpersistedTags array
        const unpersistedTags = tagNames.filter(tag => {
          return persistedTags.map(p => p.tag).indexOf(tag) === -1;
        });
        return Promise.all(
          // create new tags in the db for each of the unpersisted tags
          unpersistedTags.map(tag => {
            return tags.createTag(tag);
          })
        );
      })
      .then(newTags => {
        if (newTags) {
          // if any new tags were created, add them to the persisted tags list
          persistedTags = persistedTags.concat(newTags);
        }
        // update the project's other fields in the db
        return projects.updateProject(id, updates);
      })
      .then(([updatedProject]) => {
        const pool = persistedTags.map(tag => {
          // attach all tags to the updated project
          // TODO: check first to see if these tags have already been attached
          return projects.attachProjectTag(id, tag.id);
        });
        return Promise.all(pool);
      })
      .then(() => {
        // then return the updated project (and tags) to the client
        return projects.getProjectByIdWithTags(id);
      });
  } else {
    // if no tags submitted with the update request then this is way easier...
    // just find the requested projet and update requested fields
    projects.updateProject(id, updates).then(() => {
      projects
        .getProjectByIdWithTags(id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json({ message: err.message }));
    });
  }
};

/** Get all projects
 *  @returns  {Array}   Array of project objects w/their nested tags
 *  OR error messsage
 */
const getProjects = (req, res, next) => {
  return projects
    .getAllProjectsWithTags()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ message: err.message }));
};

/** Get one project
 *  @param    {Number}   projectId   Id of the required project.
 *  @returns  {Object}            Project object w/nested tags
 *  OR error message
 */
const getProjectById = (req, res, next) => {
  return projects
    .getProjectByIdWithTags(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(404).json({ message: err.message }));
};

/** Delete project
 *  @param    {Number}   projectId   Id of the project to delete.
 *  @returns  Success message or error.
 */
const deleteProject = (req, res, next) => {
  return projects
    .deleteProject(req.params.id)
    .then(() =>
      res.status(200).json({ message: "Project deleted successfully" })
    )
    .catch(err => res.status(404).json({ message: err.message }));
};

/* ================================ EXPORT ================================= */

module.exports = {
  createProjectWithTags,
  updateProjectWithTags,
  getProjects,
  getProjectById,
  deleteProject
};
