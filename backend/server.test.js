const request = require('supertest');
const express = require('express');

// Create a simple express app for testing
const app = express();
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Hyper-Local Trust Network API!' });
});

// The test itself
describe('GET /', () => {
  it('should return 200 OK and a welcome message', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Welcome to the Hyper-Local Trust Network API!' });
  });
});