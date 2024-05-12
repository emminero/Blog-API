const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');

describe('Blog Endpoints', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });
    token = res.body.token;
  });

  it('should create a new blog', async () => {
    const res = await request(app)
      .post('/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Blog',
        description: 'This is a test blog',
        tags: ['test', 'example'],
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('blog');
  });

  it('should get published blogs', async () => {
    const res = await request(app)
      .get('/blogs')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.results.length).toBeGreaterThan(0);
  });


  afterAll(async () => {
    await mongoose.connection.close();
  });
});
