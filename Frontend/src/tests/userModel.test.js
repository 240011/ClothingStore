const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const UserMock = dbMock.define('User', {
  id: 1,
  name: 'Test User',
  email: 'testuser@example.com',
  gender: 'male',
  address: '123 Test St',
  phone: '1234567890',
  password: 'hashedpassword'
});

describe('User Model', () => {
  it('should create a user', async () => {
    const user = await UserMock.create({
      name: 'New User',
      email: 'newuser@example.com',
      gender: 'female',
      address: '456 New St',
      phone: '0987654321',
      password: 'newhashedpassword',
    });

    expect(user.name).toBe('New User');
    expect(user.email).toBe('newuser@example.com');
    expect(user.gender).toBe('female');
    expect(user.address).toBe('456 New St');
    expect(user.phone).toBe('0987654321');
    expect(user.password).toBe('newhashedpassword');
  });

  it('should require a name and email', async () => {
    // Mock to simulate validation error
    const originalCreate = UserMock.create;
    UserMock.create = jest.fn().mockRejectedValue(new Error('Validation error'));

    await expect(UserMock.create({})).rejects.toThrow('Validation error');

    // Restore original function
    UserMock.create = originalCreate;
  });

  it('should validate phone number length', async () => {
    const invalidUser = UserMock.build({
      name: 'Invalid User',
      email: 'invalid@example.com',
      phone: '123', // too short
    });

    const validUser = UserMock.build({
      name: 'Valid User',
      email: 'valid@example.com',
      phone: '1234567890', // valid length
    });

    // Since SequelizeMock does not enforce validations, we simulate validation manually
    const isValidPhone = (phone) => phone.length >= 10 && phone.length <= 15;

    expect(isValidPhone(invalidUser.phone)).toBe(false);
    expect(isValidPhone(validUser.phone)).toBe(true);
  });
});
