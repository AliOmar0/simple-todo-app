'use strict';

/**
 * Input validation for todo payloads.
 *
 * Every function is pure and returns a result object rather than throwing, so
 * route handlers stay free of try/catch noise.
 */

const MAX_TITLE_LENGTH = 200;

/**
 * Validate a todo title.
 *
 * @param {unknown} title - Raw value from the request body
 * @returns {{ valid: true, value: string } | { valid: false, error: string }}
 */
function validateTitle(title) {
  if (typeof title !== 'string') {
    return { valid: false, error: 'title must be a string' };
  }

  const trimmed = title.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'title must not be empty' };
  }

  if (trimmed.length > MAX_TITLE_LENGTH) {
    return { valid: false, error: `title must be at most ${MAX_TITLE_LENGTH} characters` };
  }

  return { valid: true, value: trimmed };
}

/**
 * Validate the done flag on an update payload.
 *
 * @param {unknown} done - Raw value from the request body
 * @returns {{ valid: true, value: boolean } | { valid: false, error: string }}
 */
function validateDone(done) {
  if (typeof done !== 'boolean') {
    return { valid: false, error: 'done must be a boolean' };
  }
  return { valid: true, value: done };
}

/**
 * Validate a todo id taken from a route parameter.
 *
 * @param {unknown} raw - Raw route parameter
 * @returns {{ valid: true, value: number } | { valid: false, error: string }}
 */
function validateId(raw) {
  if (typeof raw !== 'string' || !/^\d+$/.test(raw)) {
    return { valid: false, error: 'id must be a positive integer' };
  }

  const value = Number.parseInt(raw, 10);

  if (!Number.isSafeInteger(value) || value < 1) {
    return { valid: false, error: 'id must be a positive integer' };
  }

  return { valid: true, value };
}

module.exports = { validateTitle, validateDone, validateId, MAX_TITLE_LENGTH };
