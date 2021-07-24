exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('list').del()
    .then(function () {
      // Inserts seed entries
      return knex('list').insert([
        {task: 'To Do Item 1'},
        {task: 'To Do Item 2'},
        {task: 'To Do Item 3'}
      ]);
    });
};
