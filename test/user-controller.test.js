import request from "supertest";
import express from "express";
import userController from "../controller/user-controller.js";
import UserService from "../service/user-service.js";
import UserRepository from "../repository/user-repository.js";
import UserValidation from "../validation/user-validation.js";

// Mocking the UserRepository and UserValidation
jest.mock("../repository/user-repository.js");
jest.mock("../validation/user-validation.js");
jest.mock("../service/user-service.js");

// Setup Express app for testing
const app = express();
app.use(express.json());
app.post("/users", userController.createUser);
app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUserById);
app.put("/users/:id", userController.updateUserById);
app.delete("/users/:id", userController.deleteUser);

describe("userController", () => {
  describe("sum function", () => {
    test("adds 1 + 2 to equal 3", () => {
      expect(userController.sum(1, 2)).toBe(3);
    });
  });

  describe("testCreateUser", () => {
    test("should create a new user and return 201 status code", async () => {
      UserValidation.CREATE.parse.mockResolvedValue({
        name: "John Doe",
        email: "john@example.com",
      });

      UserService.createUser.mockResolvedValue({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      });

      const response = await request(app)
        .post("/users")
        .send({ name: "John Doe", email: "john@example.com" });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      });
    });

    test("should return 400 if user creation fails due to validation error", async () => {
      // Set up mock to return a validation error
      UserService.createUser.mockResolvedValue({
        error: [
          {
            code: "too_small",
            minimum: 3,
            type: "string",
            inclusive: true,
            exact: false,
            message: "String must contain at least 3 character(s)",
            path: ["name"],
          },
          {
            validation: "email",
            code: "invalid_string",
            message: "Invalid email",
            path: ["email"],
          },
        ],
      });

      // Send a POST request with invalid data
      const response = await request(app)
        .post("/users")
        .send({ name: "Jo", email: "invalidemail" });

      // Assert that the status code is 400
      expect(response.status).toBe(400);
      // Assert that the response body matches the error object
      expect(response.body).toEqual({
        error: [
          {
            code: "too_small",
            minimum: 3,
            type: "string",
            inclusive: true,
            exact: false,
            message: "String must contain at least 3 character(s)",
            path: ["name"],
          },
          {
            validation: "email",
            code: "invalid_string",
            message: "Invalid email",
            path: ["email"],
          },
        ],
      });
    });
  });

  describe("testGetUsers", () => {
    test("should return users and 200 status code", async () => {
      UserService.getAllUsers.mockResolvedValue([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          toJSON: function () {
            return this;
          },
        },
        {
          id: 2,
          name: "John Doe 1",
          email: "john1@example.com",
          toJSON: function () {
            return this;
          },
        },
      ]);

      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "John Doe 1", email: "john1@example.com" },
      ]);
    });

    test("should return 'User empty' if no users are found", async () => {
      UserService.getAllUsers.mockResolvedValue([]);

      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "User empty" });
    }, 30000);
  });

  describe("testGetUserById", () => {
    test("should return a user and 200 status code", async () => {
      UserService.getUserById.mockResolvedValue({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      });

      const response = await request(app).get("/users/1");
      console.log(response);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      });
    });

    test("should return 404 if user is not found", async () => {
      UserService.getUserById.mockResolvedValue({
        message: "User not found",
      });

      const response = await request(app).get("/users/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    test("should return 500 if there is a server error", async () => {
      UserService.getUserById.mockResolvedValue({
        error: "Server error",
      });

      const response = await request(app).get("/users/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Server error" });
    });
  });

  describe("testUpdateUserById", () => {
    test("should update a user and return 200 status code", async () => {
      UserService.updateUserById.mockResolvedValue({
        id: 1,
        name: "Jane Doe",
        email: "jane@example.com",
      });

      const response = await request(app)
        .put("/users/1")
        .send({ name: "Jane Doe", email: "jane@example.com" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: "Jane Doe",
        email: "jane@example.com",
      });
    });

    test("should return 404 if user is not found", async () => {
      UserService.updateUserById.mockResolvedValue({
        message: "User not found",
      });

      const response = await request(app)
        .put("/users/999")
        .send({ name: "Jane Doe", email: "jane@example.com" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    test("should return 500 if there is a server error", async () => {
      UserService.updateUserById.mockResolvedValue({
        error: "Server error",
      });

      const response = await request(app)
        .put("/users/1")
        .send({ name: "Jane Doe", email: "jane@example.com" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Server error" });
    });
  });

  describe("testDeleteUser", () => {
    test("should delete a user and return 200 status code", async () => {
      UserService.deleteUser.mockResolvedValue({
        id: 1,
        message: "User deleted",
      });

      const response = await request(app).delete("/users/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        message: "User deleted",
      });
    });

    test("should return 404 if user is not found", async () => {
      UserService.deleteUser.mockResolvedValue({
        message: "User not found",
      });

      const response = await request(app).delete("/users/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    test("should return 500 if there is a server error", async () => {
      UserService.deleteUser.mockResolvedValue({
        error: "Server error",
      });

      const response = await request(app).delete("/users/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Server error" });
    });
  });
});
