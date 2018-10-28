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
 */
const createProjectWithTags = (
  projectTitle,
  projectBody,
  screenshotUrl,
  liveUrl,
  githubUrl,
  tagNames
) => {
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
        projectTitle,
        projectBody,
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
      return projects.getProjectByIdWithTags(persistedProject.id);
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
 */
const updateProjectWithTags = (id, updates, tagNames) => {
  const {
    projectTitle,
    projectBody,
    screenshotUrl,
    liveUrl,
    githubUrl
  } = updates;
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
    return projects.updateProject(id, updates).then(() => {
      return projects.getProjectByIdWithTags(id);
    });
  }
};

/** Get all projects
 *  @returns  {Array}   Array of project objects w/their nested tags
 */
const getProjects = () => {
  return projects.getAllProjectsWithTags();
};

/** Get one project
 *  @param    {Number}   projectId   Id of the required project.
 *  @returns  {Object}            Project object w/nested tags
 */
const getProjectById = projectId => {
  return projects.getProjectByIdWithTags(projectId);
};

/** Delete project
 *  @param    {Number}   projectId   Id of the project to delete.
 *  @returns  Success message or error.
 */
const deleteProject = projectId => {
  return projects.deleteProject(projectId);
};

/* ================================ EXPORT ================================= */

module.exports = {
  createProjectWithTags,
  updateProjectWithTags,
  getProjects,
  getProjectById,
  deleteProject
};
