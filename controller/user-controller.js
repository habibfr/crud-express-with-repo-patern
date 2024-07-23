import { json } from "sequelize";
import UserService from "../service/user-service.js";

export default class userController {
  static async createUser(req, res, nextFunction) {
    try {
      const user = await UserService.createUser(req.body);
      if (user.error) {
        return res.status(400).json(user);
      }
      return res.status(201).json(user);
    } catch (error) {
      nextFunction(error);
    }
  }

  static async getUsers(req, res, nextFunction) {
    try {
      const user = await UserService.getAllUsers();
      if (user.length == 0) {
        return json("User empty");
      } else {
        return res.status(201).json(user);
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
}
