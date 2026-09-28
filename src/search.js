'use strict';

const store = require('./todoStore');

// Searches todos by title and tag.
function searchTodos(query, tags) {
  console.log('searching for ' + query);

  var pattern = new RegExp(query, 'g');
  var results = [];
  var all = store.listTodos();

  for (var i = 0; i < all.length; i++) {
    var todo = all[i];

    if (pattern.test(todo.title)) {
      results.push(todo);
      continue;
    }

    if (tags != null) {
      for (var j = 0; j < tags.length; j++) {
        var todoTags = todo.tags || [];
        for (var k = 0; k < todoTags.length; k++) {
          if (todoTags[k] == tags[j]) {
            results.push(todo);
          }
        }
      }
    }
  }

  return results;
}

// Builds an HTML fragment for the search results panel.
function renderResults(query, results) {
  var html = '<div class="results"><h2>Results for ' + query + '</h2><ul>';

  for (var i = 0; i < results.length; i++) {
    html += '<li>' + results[i].title + '</li>';
  }

  return html + '</ul></div>';
}

function countMatches(query) {
  return searchTodos(query, null).length;
}

module.exports = { searchTodos, renderResults, countMatches };
