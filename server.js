const express = require('express'); 
const app = express(); 
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 5000;

const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development'])

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.get('/list', function (req, res) {
  knex.select().table('list').orderBy('id', 'asc')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(404).send(err))
});

app.post('/list', function(req, res) {
  knex('list')
    .insert(req.body)
    .then(res.status(200).send("Success!"))
    .catch(err => res.status(404).send(err))  
}) 

app.patch('/list', function(req, res) {
  knex('list')
    .update({status: req.body.status})
    .where({id: req.body.id})
    .then(response => {
      console.log(response)
      res.status(200).json({message: 'Item status changed!'})
    })
    .catch(err => {
      console.log(err)
      res.status(404).send("Status change not successful")
    })
});

app.put('/list', function(req, res) {
  knex('list').insert({ id: req.body.id, task: req.body.task })
    .onConflict('id')
    .merge()
    .then(response => {
      console.log(response)
      res.status(200).send("Changed task!")
    })
    .catch(err => {
      console.log(err)
      res.status(404).send("There was an error.")
    })
});

app.delete('/list', function (req, res) {
  knex('list')
    .where({id: req.body.id})
    .del()
    .then(() => res.status(200).send("Item deleted"))
    .catch(err => res.status(404).send("Failed to delete item"))
});

app.listen(PORT, () => console.log(`To Do List app listening at http://localhost:${PORT}`))
