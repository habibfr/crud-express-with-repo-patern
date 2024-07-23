import express from "express";
import { sequelize } from "./config/database.js";
import { router } from "./router/router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
});


// // Create User
// app.post("/users", async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Read Users
// // app.get("/users", async (req, res) => {
// //   try {
// //     const users = await User.findAll();
// //     res.status(200).json(users);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

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
