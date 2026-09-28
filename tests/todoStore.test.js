'use strict';

const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const store = require('../src/todoStore');

beforeEach(() => store.reset());

test('addTodo assigns sequential ids starting at 1', () => {
  assert.equal(store.addTodo('first').id, 1);
  assert.equal(store.addTodo('second').id, 2);
});

test('addTodo stores the title and defaults done to false', () => {
  const todo = store.addTodo('buy milk');
  assert.equal(todo.title, 'buy milk');
  assert.equal(todo.done, false);
});

test('listTodos returns a copy, so callers cannot mutate the store', () => {
  store.addTodo('one');
  const list = store.listTodos();
  list.push({ id: 99, title: 'injected' });
  assert.equal(store.listTodos().length, 1);
});

test('updateTodo applies changes and returns the todo', () => {
  const created = store.addTodo('walk dog');
  const updated = store.updateTodo(created.id, { done: true });
  assert.equal(updated.done, true);
});

test('updateTodo returns null for an unknown id', () => {
  assert.equal(store.updateTodo(404, { done: true }), null);
});

test('removeTodo deletes the todo and reports success', () => {
  const created = store.addTodo('temp');
  assert.equal(store.removeTodo(created.id), true);
  assert.equal(store.listTodos().length, 0);
});

test('removeTodo returns false for an unknown id', () => {
  assert.equal(store.removeTodo(404), false);
});
