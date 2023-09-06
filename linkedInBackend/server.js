import express from "express";
const server = express();
import cors from "cors";
import dotenv from "dotenv";
import app from "./src/app.js";
import mongoose from "mongoose";
dotenv.config(); // Load environment variables from .env file
const port = process.env.PORT || 5000;
server.use(
  cors({
    origin: "*",
  })
);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("connected succesfully"))
  .catch((error) => console.log(error));
server.use(app);

// process.on("uncaughtException", () => [
//   console.log("Uncaught Exception Occured!"),
// ]);
server.listen(port, () => console.log(`server is running at port ${port}`));
