import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../Utilities/ErrorHandler.js";
import { asyncHandler } from "../Utilities/asyncHandler.js";
import { responseHandler } from "../Utilities/responseHandler.js";
import { generateToken } from "../Utilities/authentication.js";

//creating auser
export const createUser = asyncHandler(async (req, res, next) => {
  const user = req.body;
  if (!user) return next(new ErrorHandler("Enter Your details!", "empty", 422));
  const userDoesExist = await userModel.findOne({ email: user.email });
  if (userDoesExist)
    return res.json(responseHandler("User Already Exists !", "success", 200));
  const hashPassword = await bcrypt.hash(user.password, 10);
  const createdUser = await userModel.create({
    name: user.name,
    email: user.email,
    password: hashPassword,
    mobile: user.mobile,
  });
  if (createdUser)
    return res.json(
      responseHandler("User Created Succesfully!", "success", 200)
    );
  return res.json(responseHandler("Invalid details !", "failed", 400));
});

//signin a user
export const signInUser = asyncHandler(async (req, res, next) => {
  const user = req.body;
  if (!user)
    return next(new ErrorHandler("Values should not be empty", "empty", 422));
  const findUser = await userModel.findOne({ email: user.email });
  if (!findUser)
    return next(new ErrorHandler("user does not exist", "not found", 404));
  const verify = await bcrypt.compare(user.password, findUser.password);
  if (verify) {
    const token = generateToken(findUser);
    return res.json({
      token: token,
      data: "SigIn Succesfull!",
      status: "success",
      statusCode: 200,
    });
  }

  return next(new ErrorHandler("Invalid details !", "not found", 400));
});

//updating a user
export const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { name, email, password, mobile } = req.body;
  const user = await userModel.findById(userId);
  if (!user) return next(new ErrorHandler("User Not Found!", "not found", 404));
  // Update user properties
  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();
  return res.json(responseHandler("user Updated Succesfully!", "success", 200));
  // return next(new ErrorHandler("Server Error!", "not found", 500));
});

// Update User Password Route
//'/users/:id/update-password'
export const updateUserPassword = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { newPassword } = req.body;
  if (!newPassword)
    return next(new ErrorHandler("Values should not be empty", "empty", 422));
  const user = await userModel.findById(userId);
  if (!user) return next(new ErrorHandler("User Not Found", "Not Found", 404));
  const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
  user.password = hashedPassword;
  console.log(newPassword);
  await user.save();
  return res.json(
    responseHandler("password Updated Succesfully!", "success", 200)
  );
});

export const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  console.log(req.USER.userId);
  // Find the user by ID
  const user = await userModel.findById(req.USER.userId).populate("profile");

  if (!user) {
    return next(new ErrorHandler("User Not Found!", "not found", 404));
  }

  return res.json(responseHandler(user, "success", 200));

  // Return the user data
});

export const searchUsers = asyncHandler(async (req, res, next) => {
  console.log(req.query.name);
  const name = String(req.query.name);

  if (typeof name !== "string") {
    return next(new ErrorHandler("Invalid search query", "bad_request", 400));
  }
  // Use a regular expression to perform a case-insensitive search on the "name" and "email" fields
  const users = await userModel
    .find({ name: { $regex: name, $options: "i" } })
    .populate("profile");
  if (users) return res.json(responseHandler(users, "success", 200));

  return next(new ErrorHandler("Server Error", "server_error", 500));
});
