import express from "express";
import { sequelize } from "./config/database.js";
import { router } from "./router/router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
});
