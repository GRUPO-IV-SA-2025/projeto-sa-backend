const db = require('../src/db');

afterAll(async () => {
  await db.end(); // fecha pool uma única vez quando TODOS os testes acabarem
});
