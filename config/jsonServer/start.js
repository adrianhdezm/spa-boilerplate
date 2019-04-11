'use strict';

const crypto = require('crypto');
const jsonServer = require('json-server');

const { data, generateObjectId } = require('./db');

const server = jsonServer.create();
const router = jsonServer.router(data, { quiet: true });
const middlewares = jsonServer.defaults();

// Use custom objectId
router.db._.id = 'objectId';

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'mustermann' && password === 'ottto') {
    res.status(201).json({
      sessionToken: crypto.randomBytes(64).toString('hex')
    });
  } else {
    res.status(401).json({
      code: 209,
      error: 'The username/password is not correct'
    });
  }
});

server.use((req, res, next) => {
  const opDate = new Date();
  if (req.method === 'POST') {
    req.body.createdAt = opDate.toISOString();
    req.body.updatedAt = opDate.toISOString();
    req.body.objectId = generateObjectId();
  }
  if (req.method === 'PATCH') {
    req.body.updatedAt = opDate.toISOString();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
const port = 3001;
server.use(router);
return server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
