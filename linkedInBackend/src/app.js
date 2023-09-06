import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import profileRoutes from "./Routes/profileRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
const app = express.Router();
app.use(express.json());
app.use("/user/routes", userRoutes)
app.use("/profile/routes", profileRoutes);
app.use("/post/routes",postRoutes)
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.json(err);
});
export default app;


