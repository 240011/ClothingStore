const request = require('supertest');
const app = require("../../../Backend/src/index").default;

describe('User API Endpoints', () => {
  let userId;

  it('should create a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'testuser@example.com', password: 'password123' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
    userId = res.body.data.id;
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get a user by ID', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('id', userId);
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: 'Updated User' });

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Updated User');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'user deleted successfully');
  });
});
