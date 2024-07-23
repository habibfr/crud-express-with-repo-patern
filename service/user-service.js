import UserRepository from "../repository/user-repository.js";

export default class UserService {
  static async createUser(user) {
    try {
      return await UserRepository.addUser(user);
    } catch (error) {
      return { error: error.message };
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
}
