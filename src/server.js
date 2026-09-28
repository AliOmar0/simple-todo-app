'use strict';

const express = require('express');
const store = require('./todoStore');
const { validateTitle, validateDone, validateId } = require('./validation');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/api/todos', (req, res) => {
  res.json(store.listTodos());
});

app.post('/api/todos', (req, res) => {
  const title = validateTitle(req.body.title);
  if (!title.valid) {
    return res.status(400).json({ error: title.error });
  }

  res.status(201).json(store.addTodo(title.value));
});

app.patch('/api/todos/:id', (req, res) => {
  const id = validateId(req.params.id);
  if (!id.valid) {
    return res.status(400).json({ error: id.error });
  }

  const done = validateDone(req.body.done);
  if (!done.valid) {
    return res.status(400).json({ error: done.error });
  }

  const todo = store.updateTodo(id.value, { done: done.value });
  if (!todo) {
    return res.status(404).json({ error: 'todo not found' });
  }

  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = validateId(req.params.id);
  if (!id.valid) {
    return res.status(400).json({ error: id.error });
  }

  if (!store.removeTodo(id.value)) {
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
