import { User } from "../models/user-model.js";

export default class UserRepository {
  static async addUser(user) {
    return await User.create(user);
  }

  static async getAllUsers() {
    return await User.findAll();
  }

  static async findUser(id) {
    return await User.findOne({
      where: {
        id: id,
      },
    });
  }

  static async updateUser(id, userData) {
    const update = await User.update(userData, {
      where: {
        id: id,
      },
    });

    if (update) {
      const updatedUser = User.findOne({ where: { id: id } });
      return updatedUser;
    }
  }

  static async deleteUser(id) {
    return await User.destroy({
      where: {
        id: id,
      },
    });
  }
}
