const { userController } = require("../../../Backend/src/controller/user/userController");
const { User } = require("../../../Backend/src/models/index.js");
const bcrypt = require("bcrypt");

jest.mock("../../../Backend/src/models/index.js", () => ({
  User: {
    findAll: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

describe("User Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should fetch all users successfully", async () => {
      const req = {};
      const res = mockResponse();
      const users = [{ id: 1, name: "User1" }, { id: 2, name: "User2" }];
      User.findAll.mockResolvedValue(users);

      await userController.getAll(req, res);

      expect(User.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ data: users, message: "successfully fetched data" });
    });

    it("should handle errors in getAll", async () => {
      const req = {};
      const res = mockResponse();
      User.findAll.mockRejectedValue(new Error("DB error"));

      await userController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch users" });
    });
  });

  describe("create", () => {
    it("should create a new user successfully", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "password123",
          phone: "1234567890",
          address: "123 Street",
          gender: "male",
        },
      };
      const res = mockResponse();
      bcrypt.hash.mockResolvedValue("hashedpassword");
      User.create.mockResolvedValue({ id: 1, ...req.body, password: "hashedpassword" });

      await userController.create(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(User.create).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        address: "123 Street",
        gender: "male",
        password: "hashedpassword",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ message: "successfully created user" }));
    });

    it("should return 400 if required fields are missing", async () => {
      const req = { body: { email: "test@example.com" } };
      const res = mockResponse();

      await userController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: "Name, email, and password are required" });
    });

    it("should return 400 if gender is invalid", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "password123",
          gender: "invalid",
        },
      };
      const res = mockResponse();

      await userController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: "Gender must be 'male', 'female', or 'other'" });
    });

    it("should handle errors in create", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "password123",
        },
      };
      const res = mockResponse();
      bcrypt.hash.mockResolvedValue("hashedpassword");
      User.create.mockRejectedValue(new Error("DB error"));

      await userController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to create user" });
    });
  });

  describe("update", () => {
    it("should update an existing user successfully", async () => {
      const req = {
        params: { id: 1 },
        body: {
          name: "Updated User",
          gender: "female",
          password: "newpassword",
        },
      };
      const res = mockResponse();
      const oldUser = {
        name: "Old User",
        email: "old@example.com",
        phone: "1234567890",
        address: "Old Address",
        gender: "male",
        password: "oldpassword",
        save: jest.fn(),
      };
      User.findOne.mockResolvedValue(oldUser);
      bcrypt.hash.mockResolvedValue("newhashedpassword");

      await userController.update(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(bcrypt.hash).toHaveBeenCalledWith("newpassword", 10);
      expect(oldUser.name).toBe("Updated User");
      expect(oldUser.gender).toBe("female");
      expect(oldUser.password).toBe("newhashedpassword");
      expect(oldUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ message: "user updated successfully" }));
    });

    it("should return 404 if user not found in update", async () => {
      const req = { params: { id: 1 }, body: {} };
      const res = mockResponse();
      User.findOne.mockResolvedValue(null);

      await userController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 400 if gender is invalid in update", async () => {
      const req = { params: { id: 1 }, body: { gender: "invalid" } };
      const res = mockResponse();
      const oldUser = { save: jest.fn() };
      User.findOne.mockResolvedValue(oldUser);

      await userController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: "Gender must be 'male', 'female', or 'other'" });
    });

    it("should handle errors in update", async () => {
      const req = { params: { id: 1 }, body: {} };
      const res = mockResponse();
      User.findOne.mockRejectedValue(new Error("DB error"));

      await userController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to update user" });
    });
  });

  describe("deleteById", () => {
    it("should delete a user successfully", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      const oldUser = { destroy: jest.fn() };
      User.findOne.mockResolvedValue(oldUser);

      await userController.deleteById(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(oldUser.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: "user deleted successfully" });
    });

    it("should return 404 if user not found in deleteById", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      User.findOne.mockResolvedValue(null);

      await userController.deleteById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle errors in deleteById", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      User.findOne.mockRejectedValue(new Error("DB error"));

      await userController.deleteById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to delete user" });
    });
  });

  describe("getById", () => {
    it("should fetch a user by id successfully", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      const user = { id: 1, name: "User1" };
      User.findOne.mockResolvedValue(user);

      await userController.getById(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: "user fetched successfully", data: user });
    });

    it("should return 404 if user not found in getById", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      User.findOne.mockResolvedValue(null);

      await userController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle errors in getById", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      User.findOne.mockRejectedValue(new Error("DB error"));

      await userController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch user" });
    });
  });
});
