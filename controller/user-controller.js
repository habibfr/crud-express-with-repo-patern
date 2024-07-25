import { json } from "sequelize";
import UserService from "../service/user-service.js";

export default class userController {
  static async createUser(req, res, nextFunction) {
    try {
      const user = await UserService.createUser(req.body);
      if (user.error) {
        // console.log("User Error:", user.error); // Debugging log
        return res.status(400).json(user); // return res.status(400).json(user);
      }
      return res.status(201).json(user);
    } catch (error) {
      nextFunction(error);
    }
  }

  static async getUsers(req, res, nextFunction) {
    console.log("getUsers started");
    try {
      const users = await UserService.getAllUsers();

      if (users.length === 0) {
        return res.status(200).json({ message: "User empty" });
      } else {
        return res.status(200).json(users);
      }
    } catch (error) {
      nextFunction(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);

      if (user.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      } else if (user.error) {
        return res.status(500).json({ error: user.error });
      }

      return res.status(200).json(user);
    } catch (error) {
      nextFunction(error);
    }
  }

  static async updateUserById(req, res, next) {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const user = await UserService.updateUserById(userId, userData);

      if (user.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      } else if (user.error) {
        return res.status(500).json({ error: user.error });
      }

      return res.status(200).json(user);
    } catch (error) {
      nextFunction(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await UserService.deleteUser(userId);

      if (user.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      } else if (user.error) {
        return res.status(500).json({ error: user.error });
      }

      return res.status(200).json(user);
    } catch (error) {
      nextFunction(error);
    }
  }

  static sum(a, b) {
    return a + b;
  }
}
