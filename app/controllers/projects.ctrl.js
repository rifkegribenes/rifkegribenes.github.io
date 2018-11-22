/*
   Route handlers for fetching and updating projects.
*/

/* ================================= SETUP ================================= */

const utils = require("../utils");

// import models
const projects = require("../../db/models/projects");
const tags = require("../../db/models/tags");

/* ============================ HELPER METHODS ============================= */

/** Check a list of tag names against existing tags in DB
 *  Create new tags if they don't already exist.
 *  @param    {Object}   res              HTTP response object
 *  @param    {Array}    tag_names        Array of tag names {String}
 *  @returns  {Array|Object}    Array of tag names
 *                              OR response object with error message
 */

const checkAndCreateTags = (res, tag_names) => {
  let persistedTags = [];
  return tags
    .getTagsByTagList(tag_names)
    .then(existingTags => {
      persistedTags = existingTags;
      // add any tags that don't yet exist to the unpersistedTags array
      const unpersistedTags = tag_names.filter(tag => {
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
      return persistedTags;
    })
    .catch(err => {
      console.log(`projects.ctrl.js > checkAndCreateTags: ${err}`);
      return utils.handleError(res, err);
    });
};

// this doesnt' return anything, just removes the project/tag relationships
const checkAndRemoveTags = (res, submittedTags, projectId) => {
  return projects
    .getProjectByIdWithTags(projectId)
    .then(([updatedProjectWithTags]) => {
      const existingTagNames = [...updatedProjectWithTags.tag_names];
      tags
        .getTagsByTagList(existingTagNames)
        .then(existingTags => {
          // check to see if any existing tags were removed
          const submittedTagsSet = new Set(submittedTags);
          const tagsToRemove = existingTags.filter(
            x => !submittedTagsSet.has(x.tag)
          );
          // remove project/tag relationships for each of the tags to be removed
          return Promise.all(
            tagsToRemove.map(tag => {
              return projects.removeProjectTag(projectId, tag.id);
            })
          );
        })
        .catch(err =>
          console.log(`projects.ctrl.js > getTagsByTagList: ${err}`)
        );
    })
    .catch(err => {
      console.log(`projects.ctrl.js > checkAndRemoveTags: ${err}`);
      return utils.handleError(res, err);
    });
};

/* ============================ ROUTE HANDLERS ============================= */

/** Create a new project with associated tags
 *  Creates tags if they don't already exist.
 *  @param    {String}   title           Title of the new project.
 *  @param    {String}   body            Body text of the new project.
 *  @param    {String}   screenshot_url  URL of screenshot image.
 *  @param    {String}   live_url        URL to live project.
 *  @param    {String}   github_url      URL of github repo.
 *  @param    {Array}    tag_names       Array of tags {String}
 *  @returns  {Object}                   New project object w/nested tags
 *                                       OR error message
 */
const createProjectWithTags = (req, res, next) => {
  const {
    title,
    body,
    screenshot_url,
    live_url,
    github_url,
    tag_names
  } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(500).json({ message: "Project title is required" });
  }
  let persistedTags;
  let persistedProject;
  // if tags are included in post body
  if (tag_names) {
    // check which of submitted tags already exist in database
    checkAndCreateTags(res, tag_names)
      .then(existingTags => {
        persistedTags = existingTags;
        // create a new project, including all tag names
        // (now we know all these tags have a matching DB entry
        // and can be attached to a project)
        return projects
          .createProject(
            title,
            body,
            screenshot_url,
            live_url,
            github_url,
            persistedTags
          )
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
                console.log(
                  `projects.ctrl.js > getProjectByIdWithTags: ${err}`
                );
                return utils.handleError(res, err);
              });
          });
      })
      .catch(err => {
        console.log(`projects.ctrl.js > checkAndCreateTags: ${err}`);
        return utils.handleError(res, err);
      });
  } else {
    projects
      .createProject(
        title,
        body,
        screenshot_url,
        live_url,
        github_url,
        persistedTags
      )
      .then(project => res.status(200).json(project))
      .catch(err => {
        console.log(`projects.ctrl.js > createProject: ${err}`);
        return utils.handleError(res, err);
      });
  }
};

/** Update an existing project and associated tags
 *  Create tags if they don't already exist.
 *  Remove existing project/tag relationships if tags not submitted as updates
 *  @param    {String}   id              Id of project to update.
 *  @param    {Object}   updates         Key/value pairs for fields to update.
 ****  @param    {String}   title            Updated project title.
 ****  @param    {String}   body             Updated body text.
 ****  @param    {String}   screenshot_url   Updated screenshot URL.
 ****  @param    {String}   live_url         Updated live URL.
 ****  @param    {String}   github_url       Updated github URL.
 *  @param    {Array}    tag_names        Updated array of tags {String}
 *  @returns  {Object}                   Updated project object w/nested tags
 *                                       OR error message
 */
const updateProjectWithTags = (req, res, next) => {
  const { updates, tag_names } = req.body;
  const { id } = req.params;

  if (!updates || !Object.keys(updates).length) {
    return res.status(404).json({ message: "No updates submitted" });
  }

  if (tag_names) {
    // check all submitted tags against exiting tags in the database
    checkAndCreateTags(res, tag_names)
      .then(persistedTags => {
        // update the project's other fields in the db
        return projects
          .updateProject(id, updates)
          .then(([updatedProject]) => {
            if (updatedProject.message || !updatedProject) {
              return res.status(404).json({
                message:
                  updatedProject.message ||
                  "An error occured while trying to update this project"
              });
            }

            const pool = persistedTags.map(tag => {
              // attach all tags to the updated project
              // TODO: check first if these tags have already been attached
              return projects.attachProjectTag(id, tag.id);
            });

            // check to see if any existing tags were removed
            Promise.all(pool)
              .then(() => checkAndRemoveTags(res, tag_names, id))
              .catch(err =>
                console.log(`projects.ctrl.js > Promise.all(pool): ${err}`)
              );
          })
          .then(() => {
            // return the updated project (and tags) to the client
            projects
              .getProjectByIdWithTags(id)
              .then(updatedProjectWithTags => {
                return res.status(200).json(updatedProjectWithTags);
              })
              .catch(err => {
                console.log(
                  `projects.ctrl.js > getProjectByIdWithTags: ${err}`
                );
                return utils.handleError(res, err);
              });
          })
          .catch(err => {
            console.log(`projects.ctrl.js > updateProject: ${err}`);
            return utils.handleError(res, err);
          });
      })
      .catch(err => {
        console.log(`projects.ctrl.js > checkAndCreateTags: ${err}`);
        return utils.handleError(res, err);
      });
  } else {
    // if no tags submitted with the update request then just
    // find the requested projet and update requested fields
    projects.updateProject(id, updates).then(() => {
      projects
        .getProjectByIdWithTags(id)
        .then(project => {
          if (project.message || !project) {
            return res.status(404).json({
              message:
                project.message ||
                "An error occured while trying to update this project"
            });
          } else {
            return res.status(200).json(project);
          }
        })
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
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

/** Get one project
 *  @param    {String}   projectId   Id of the required project.
 *  @returns  {Object}            Project object w/nested tags
 *  OR error message
 */
const getProjectById = (req, res, next) => {
  return projects
    .getProjectByIdWithTags(req.params.id)
    .then(project => {
      if (project.message || !project) {
        return res.status(404).json({ message: "Project not found" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(err => res.status(404).json({ message: err.message }));
};

/** Delete project
 *  @param    {String}   projectId   Id of the project to delete.
 *  @returns  Success message or error.
 */
const deleteProject = (req, res, next) => {
  return projects
    .deleteProject(req.params.id)
    .then(result => {
      if (result.message === "Project deleted successfully") {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(404).json({
          message: "An error occurred and the project was not deleted."
        });
      }
    })
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
