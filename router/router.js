import express from "express";
import userController from "../controller/user-controller.js";

const router = express.Router();

router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUserById);

export { router };
