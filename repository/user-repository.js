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

// // app.get("/users", userController.getUsers);

// // Read Users By Id
// app.get("/users/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     // Gunakan findByPk untuk mencari entri berdasarkan primary key (id)
//     const user = await User.findOne({
//       where: { id: id },
//     });

//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update User
// app.put("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (user) {
//       await user.update(req.body);
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Delete User
// app.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (user) {
//       await user.destroy();
//       res.status(200).json({ message: "User successfuly delete" });
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
