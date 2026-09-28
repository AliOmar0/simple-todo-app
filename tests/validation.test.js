'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateTitle, validateDone, validateId, MAX_TITLE_LENGTH } = require('../src/validation');

test('validateTitle accepts a normal title and trims it', () => {
  assert.deepEqual(validateTitle('  buy milk  '), { valid: true, value: 'buy milk' });
});

test('validateTitle rejects a non-string', () => {
  assert.equal(validateTitle(42).valid, false);
  assert.equal(validateTitle(null).valid, false);
  assert.equal(validateTitle(undefined).valid, false);
});

test('validateTitle rejects an empty or whitespace-only title', () => {
  assert.equal(validateTitle('').error, 'title must not be empty');
  assert.equal(validateTitle('   ').error, 'title must not be empty');
});

test('validateTitle accepts a title at the maximum length', () => {
  assert.equal(validateTitle('x'.repeat(MAX_TITLE_LENGTH)).valid, true);
});

test('validateTitle rejects a title one character over the maximum', () => {
  const result = validateTitle('x'.repeat(MAX_TITLE_LENGTH + 1));
  assert.equal(result.valid, false);
  assert.match(result.error, /at most 200 characters/);
});

test('validateDone accepts both boolean values', () => {
  assert.deepEqual(validateDone(true), { valid: true, value: true });
  assert.deepEqual(validateDone(false), { valid: true, value: false });
});

test('validateDone rejects truthy non-booleans', () => {
  assert.equal(validateDone('true').valid, false);
  assert.equal(validateDone(1).valid, false);
});

test('validateId accepts a positive integer string', () => {
  assert.deepEqual(validateId('7'), { valid: true, value: 7 });
});

test('validateId rejects zero, negatives, and non-numeric input', () => {
  assert.equal(validateId('0').valid, false);
  assert.equal(validateId('-1').valid, false);
  assert.equal(validateId('abc').valid, false);
  assert.equal(validateId('1.5').valid, false);
  assert.equal(validateId('12abc').valid, false);
});

test('validateId rejects a value beyond the safe integer range', () => {
  assert.equal(validateId('99999999999999999999').valid, false);
});
