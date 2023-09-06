import express from "express";
import { authenticate } from "../Utilities/authentication.js";
import {
  createPost,
  makeComment,
  getAllPost,
  likePost,
} from "../Controller/postController.js";
const postRoutes = express.Router();
postRoutes.post("/create/post/:id", authenticate, createPost);
postRoutes.post("/make/comment/:userId/:postId", authenticate, makeComment);
postRoutes.get("/get/posts", authenticate, getAllPost);
postRoutes.post("/like/post/:postId", authenticate, likePost);
export default postRoutes;
