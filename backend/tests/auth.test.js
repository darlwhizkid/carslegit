require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('Password Reset Request', async () => {
    // Create a test user first
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();

    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

describe('POST /api/auth/register', () => {
    test('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: 'TestPassword123',
                fullName: 'Test User',
                phone: '1234567890',
                state: 'Lagos',
                referral: 'FRIEND'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Registration successful! Please check your email for verification.');
    });
});
