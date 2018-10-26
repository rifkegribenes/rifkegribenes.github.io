const uuid = require("uuid");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tags")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tags").insert([
        {
          id: uuid.v4(),
          tag: "jQuery"
        },
        {
          id: uuid.v4(),
          tag: "JavaScript"
        },
        {
          id: uuid.v4(),
          tag: "es2015"
        },
        {
          id: uuid.v4(),
          tag: "Vue.js"
        },
        {
          id: uuid.v4(),
          tag: "Node.js"
        },
        {
          id: uuid.v4(),
          tag: "Express"
        },
        {
          id: uuid.v4(),
          tag: "Full-stack"
        },
        {
          id: uuid.v4(),
          tag: "MongoDB"
        },
        {
          id: uuid.v4(),
          tag: "Mongoose"
        },
        {
          id: uuid.v4(),
          tag: "PostgreSQL"
        },
        {
          id: uuid.v4(),
          tag: "Python"
        },
        {
          id: uuid.v4(),
          tag: "Flask"
        },
        {
          id: uuid.v4(),
          tag: "React.js"
        },
        {
          id: uuid.v4(),
          tag: "Passport.js"
        },
        {
          id: uuid.v4(),
          tag: "Redux"
        },
        {
          id: uuid.v4(),
          tag: "Sass"
        },
        {
          id: uuid.v4(),
          tag: "UI/UX"
        },
        {
          id: uuid.v4(),
          tag: "React Material UI"
        }
      ]);
    });
};
