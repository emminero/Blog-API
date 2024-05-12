const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
