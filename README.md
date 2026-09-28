# simple-todo-app

A deliberately small Express todo API, used as a fixture for automated code review.

## Running

```bash
npm install
npm start
```

The server listens on `PORT` (default 3000).

## API

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | /api/todos        | List all todos     |
| POST   | /api/todos        | Create a todo      |
| PATCH  | /api/todos/:id    | Toggle done state  |
| DELETE | /api/todos/:id    | Delete a todo      |

## Tests

```bash
npm test
```
