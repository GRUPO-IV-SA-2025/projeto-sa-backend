import request from 'supertest';
import { app, startServer } from '../index.js';

let server;

beforeAll(async () => {
    server = await startServer()
})

afterAll(async () => { 
  await new Promise(resolve => server.close(resolve));
});

describe('Testes de endpoints da API', () => {
    test('GET /usuarios', async () => {
        const res = await request(app).get('/usuarios');
        expect(res.statusCode).toBe(200);
         expect(Array.isArray(response.body)).toBe(true);
    })
})