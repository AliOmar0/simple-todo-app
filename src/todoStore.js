'use strict';

/**
 * In-memory todo storage. Process-local, so it resets on restart.
 */

let nextId = 1;
const todos = [];

function listTodos() {
  return todos.slice();
}

function addTodo(title) {
  const todo = {
    id: nextId++,
    title,
    done: false,
    createdAt: new Date().toISOString()
  };
  todos.push(todo);
  return todo;
}

function findTodo(id) {
  return todos.find((todo) => todo.id === id);
}

function updateTodo(id, changes) {
  const todo = findTodo(id);
  if (!todo) {
    return null;
  }
  Object.assign(todo, changes);
  return todo;
}

function removeTodo(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return false;
  }
  todos.splice(index, 1);
  return true;
}

function reset() {
  todos.length = 0;
  nextId = 1;
}

module.exports = { listTodos, addTodo, findTodo, updateTodo, removeTodo, reset };
