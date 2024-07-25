import UserRepository from "../repository/user-repository.js";
import UserValidation from "../validation/user-validation.js";

export default class UserService {
  static async createUser(user) {
    try {
      const userValid = UserValidation.CREATE.parse(user);
      return await UserRepository.addUser(userValid);
    } catch (error) {
      // console.log("Validation Error:", error.errors); // Debugging log
      return { error: error.errors };
    }
  }

  static async getAllUsers() {
    try {
      const users = await UserRepository.getAllUsers({
        attributes: ["id", "email", "name", "createdAt", "updatedAt"],
        order: [["createdAt", "DESC"]],
      });
      return users.map((user) => user.toJSON());
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getUserById(id) {
    try {
      const user = await UserRepository.findUser(id);

      if (!user) {
        return { message: "User not found" };
      } else {
        return user;
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  static async updateUserById(id, userData) {
    try {
      const user = await UserRepository.updateUser(id, userData);

      if (!user) {
        return { message: "User not found" };
      } else {
        return user;
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteUser(id) {
    try {
      const user = await UserRepository.deleteUser(id);

      if (!user) {
        return { message: "User not found" };
      } else {
        return { message: "successfuly delete user" };
      }
    } catch (error) {
      return { error: error.message };
    }
  }
}
