exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'testUser1', email: 'testemail1@email.com', github_id: '12345', github_token: '67890'},
        {username: 'testUser2', email: 'testemail2@email.com', github_id: '23456', github_token: '78901'},
        {username: 'testUser3', email: 'testemail3@email.com', github_id: '34567', github_token: '89012'}
      ]);
    });
};