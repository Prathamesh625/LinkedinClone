import express from "express";
import { authenticate } from "../Utilities/authentication.js";
import {
  createUser,
  signInUser,
  getUser,
  updateUser,
  updateUserPassword,
  searchUsers,
} from "../Controller/userController.js";
const userRoutes = express.Router();
userRoutes.post("/create/new/user", createUser);
userRoutes.post("/user/sigin", signInUser);
userRoutes.post("/user/get/details", authenticate, getUser);
userRoutes.put("/update/:id", authenticate, updateUser);
userRoutes.put("/update/password/:id", authenticate, updateUserPassword);
userRoutes.get("/search/users/profile", authenticate, searchUsers);
export default userRoutes;
