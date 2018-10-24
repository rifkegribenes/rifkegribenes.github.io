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

  return tags
    .getTagsByTagList(tagNames)
    .then(existingTags => {
      persistedTags = existingTags;
      const unpersistedTags = tagNames.filter(tag => {
        return persistedTags.map(p => p.tag).indexOf(tag) === -1;
      });
      return Promise.all(
        unpersistedTags.map(tag => {
          return tags.createTag(tag);
        })
      );
    })
    .then(newTags => {
      if (newTags) {
        persistedTags = persistedTags.concat(newTags);
      }
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
        return projects.attachProjectTag(persistedProject.id, tag.id);
      });
      return Promise.all(pool);
    })
    .then(() => {
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
    return tags
      .getTagsByTagList(tagNames)
      .then(existingTags => {
        persistedTags = existingTags;
        const unpersistedTags = tagNames.filter(tag => {
          return persistedTags.map(p => p.tag).indexOf(tag) === -1;
        });
        return Promise.all(
          unpersistedTags.map(tag => {
            return tags.createTag(tag);
          })
        );
      })
      .then(newTags => {
        if (newTags) {
          persistedTags = persistedTags.concat(newTags);
        }
        return projects.updateProject(id, updates);
      })
      .then(([updatedProject]) => {
        const pool = persistedTags.map(tag => {
          return projects.attachProjectTag(id, tag.id);
        });
        return Promise.all(pool);
      })
      .then(() => {
        return projects.getProjectByIdWithTags(id);
      });
  } else {
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
 *  @returns  Nothing returned.
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
