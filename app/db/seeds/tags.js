exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('tags').del()
        .then(function() {
            // Inserts seed entries
            return knex('tags').insert([
                {
                    tag: 'jQuery'
                },
                {
                    tag: 'JavaScript'
                },
                {
                    tag: 'es2015'
                },
                {
                    tag: 'Vue.js'
                },
                {
                    tag: 'Node.js'
                },
                {
                    tag: 'Express'
                },
                {
                    tag: 'Full-stack'
                },
                {
                    tag: 'MongoDB'
                },
                {
                    tag: 'Mongoose'
                },
                {
                    tag: 'PostgreSQL'
                },
                {
                    tag: 'Python'
                },
                {
                    tag: 'React.js'
                },
                {
                    tag: 'Passport.js'
                },
                {
                    tag: 'Redux'
                },
                {
                    tag: 'Sass'
                },
                {
                    tag: 'UI/UX'
                },
                {
                    tag: 'React Material UI'
                }

            ]);
        });
};