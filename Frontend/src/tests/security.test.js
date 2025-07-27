const request = require('supertest');
const app = require("../../../Backend/src/index").default;

describe('Security Tests', () => {
  it('should prevent SQL Injection', async () => {
    const res = await request(app)
      .post('/api/products/create_product')
      .send({ productName: "' OR 1=1 --", price: 99.99, description: 'Hacked' });

    expect(res.status).toBe(400);
  });

  it('should detect SQL injection patterns', () => {
    const maliciousInput = "' OR 1=1 --";
    const cleanInput = "Regular Product Name";

    const containsSQLInjection = (input) => {
      const sqlPatterns = /('|"|;|--|\/\*|\*\/|xp_|sp_|DROP|SELECT|INSERT|UPDATE|DELETE|UNION|OR\s+1=1)/i;
      return sqlPatterns.test(input);
    };

    expect(containsSQLInjection(maliciousInput)).toBe(true);
    expect(containsSQLInjection(cleanInput)).toBe(false);
  });

  it('should prevent XSS attacks', async () => {
    const res = await request(app)
      .post('/api/products/create_product')
      .send({ productName: "<script>alert('XSS')</script>", price: 99.99, description: 'XSS Test' });

    expect(res.status).toBe(400);
  });

  it('should detect XSS attack patterns', () => {
    const xssInput = "<script>alert('XSS')</script>";
    const safeInput = "Safe Product Name";

    const containsXSS = (input) => {
      const xssPatterns = /<script|javascript:|on\w+\s*=/i;
      return xssPatterns.test(input);
    };

    expect(containsXSS(xssInput)).toBe(true);
    expect(containsXSS(safeInput)).toBe(false);
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.status).toBe(404);
  });

  it('should validate input sanitization', () => {
    const userInput = '<script>alert("xss")</script>Normal Text';

    const sanitizeInput = (input) => {
      return input.replace(/<[^>]*>/g, '');
    };

    const sanitized = sanitizeInput(userInput);
    expect(sanitized).toBe('alert("xss")Normal Text');
    expect(sanitized).not.toContain('<script>');
  });
});
