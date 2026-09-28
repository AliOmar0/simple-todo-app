'use strict';

const express = require('express');
const store = require('./todoStore');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/api/todos', (req, res) => {
  res.json(store.listTodos());
});

app.post('/api/todos', (req, res) => {
  const todo = store.addTodo(req.body.title);
  res.status(201).json(todo);
});

app.patch('/api/todos/:id', (req, res) => {
  const todo = store.updateTodo(Number(req.params.id), { done: req.body.done });
  if (!todo) {
    return res.status(404).json({ error: 'todo not found' });
  }
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  if (!store.removeTodo(Number(req.params.id))) {
    return res.status(404).json({ error: 'todo not found' });
  }
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`todo app listening on ${PORT}`);
  });
}

module.exports = app;
