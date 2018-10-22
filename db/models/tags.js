// db/models/tags.js

/* ================================= setup ================================= */

const { db, TABLES } = require('../../app/config/knex');


/* ============================ public methods ============================= */

/** create a tag
 *  Knex/Postgres inserts return arrays, even when there's just a single
 *  element. We return just the 1st element, the new tag object.
 *  @param    {String}  tag   Name of the new tag
 *  @returns  {Object}        The newly-created tag.
*/
const createTag = (tag) => {
    return db
        .insert({ tag })
        .into(TABLES.TAGS)
        .returning(['id', 'tag'])
        .then(result => result[0] );
};

/** get lists of tags
 *  `whereIn` is shorthand for `.where('tag', 'in', tagList)`
 *    Syntax: `.whereIn(column, array)`
 *  @param    {Array}  tagList   List of tags to search for
 *  @returns  {Array}              Array of tags objects.
*/
const getTagsByTagList = (tagList) => {
    return db
        .select(['id', 'tag'])
        .from(TABLES.TAGS)
        .whereIn('tag', tagList);
};


/* ================================ exports ================================ */

module.exports = { createTag, getTagsByTagList };