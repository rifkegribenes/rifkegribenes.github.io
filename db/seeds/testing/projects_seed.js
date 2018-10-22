
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
            return knex('projects').insert([
                {
                    title: 'Pollbuilder',
                    body: 'Build, answer, share, and analyze polls. Full-stack MERN app.',
                    screenshot_url: '',
                    live_url: 'https://pollbuilder.glitch.me/',
                    github_url: 'https://github.com/rifkegribenes/pollbuilder'
                },
                {
                    title: 'Anti-Fascist Heroine Addiction, The Game',
                    body: 'Retro keyboard-controlled dungeon crawler game featuring Lady superheroes vs Republican politicians. Chase Ted Cruz&#39;s disembodied head around a game board and punch it repeatedly.',
                    screenshot_url: '',
                    live_url: 'http://anti-fascist-heroine-addiction.surge.sh/',
                    github_url: 'https://github.com/rifkegribenes/anti-fascist-heroine-addiction'
                },
                {
                    title: 'Oregon Can&#29;t Wait',
                    body: 'An online advocacy platform to connect union members with their State representatives. Modified for SEIU Local 503 from a project by DataMade and the Participatory Budgeting Project. Powered by the Google Civic Information API.',
                    screenshot_url: '',
                    live_url: 'http://action.seiu503.org/',
                    github_url: 'https://github.com/seiu503/oregon-cant-wait'
                }
            ]);
    });
};
