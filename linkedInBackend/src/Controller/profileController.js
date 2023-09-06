// Create Profile Route
import ProfileModel from "../Models/profileModel.js";
import ConnectionModel from "../Models/connectionModel.js";
import userModel from "../Models/userModel.js";
import ProjectModel from "../Models/projectModel.js";
import { asyncHandler } from "../Utilities/asyncHandler.js";
import { responseHandler } from "../Utilities/responseHandler.js";

//creating profile
export const createProfile = asyncHandler(async (req, res, next) => {
  if (!req.body)
    return next(new ErrorHandler("given data is emplty", "empty", 422));
  const { profileImage, name, heading, skills, projects, education } = req.body;
  const user = await userModel.findById(req.params.id);
  const newProfile = new ProfileModel({
    user: user._id,
    profileImage,
    name,
    heading,
    skills,
    projects,
    education,
  });

  await newProfile.save();
  user.profile = newProfile._id;
  await user.save();
  //return res.json({ message: "Profile created successfully", profile: newProfile });
  return res.json(
    responseHandler("Profile created successfully", "success", 200)
  );
  res.status(500).json({ message: "Server error", error });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.userId);
  console.log(user);
  const profile = await ProfileModel.findById(user.profile)
    .populate("posts")
    .populate("projects")
    .populate("invitations")
    .populate("connectionRequests")
    .populate("connections");
  if (!profile)
    return next(new ErrorHandler("Could not find profile!", "failed", 404));
  return res.json(responseHandler(profile, "success", 200));
});

export const findAllProfiles = asyncHandler(async (req, res, next) => {
  const users = await ProfileModel.find().populate("connectionRequests");
  if (!users)
    return next(
      new ErrorHandler("Could not find users with that Id!", "failed", 404)
    );
  console.log(users);
  return res.json(responseHandler(users, "success", 200));
});

export const sendConnectionRequest = asyncHandler(async (req, res, next) => {
  const senderId = req.params.id;
  const connect = req.body;
  const sendRequest = await ConnectionModel.create({
    userId: senderId,
    accepted: connect.accepted,
    follows: connect.follows,
  });

  const sender = await ProfileModel.findOne({ _id: senderId });
  const receiver = await ProfileModel.findOne({ _id: connect.receiverId });
  if (!sender && !receiver)
    return next(
      new ErrorHandler(
        "sender Id and recieverId does not exists!",
        "failed",
        400
      )
    );
  //adding connection request to connectionRequest
  const updateSender = await ProfileModel.updateOne(
    { _id: senderId },
    { $push: { connectionRequests: sendRequest._id } }
  );
  //adding connection request to Invitations
  const updateReciever = await ProfileModel.updateOne(
    { _id: connect.receiverId },
    { $push: { invitations: sendRequest._id } }
  );
  if (updateReciever.modifiedCount == 1)
    return res.json(
      responseHandler("connection request sented successfully", "success", 200)
    );
  return next(
    new ErrorHandler("Could not send request to user!", "failed", 400)
  );
});

export const acceptConnection = asyncHandler(async (req, res, next) => {
  const connection = await ConnectionModel.findById(req.params.sendersId);
  const acceptersId = req.body.acceptersId;
  if(!acceptersId)  return next(new ErrorHandler("acceptersId is must!", "id not defined", 404));
  if (!connection)
    return next(new ErrorHandler("Could not find users!", "failed", 404));
  connection.accepted = true;
  const updateSender = await ProfileModel.updateOne(
    { _id: req.params.sendersId },
    { $push: { connections: acceptersId } }
  );
  const updateAccepter = await ProfileModel.updateOne(
    { _id: acceptersId },
    { $push: { connections: req.params.id } }
  );
  return res.json(responseHandler("Your Connection is Accepted", "success", 200));
});

export const findall = asyncHandler(async (req, res, next) => {
  const users = await userModel.find().populate("profile");
  if (!users)
    return next(new ErrorHandler("Could not find users!", "failed", 404));
  return res.json(responseHandler(users, "success", 200));
});

export const find = asyncHandler(async (req, res, next) => {
  const users = await ProfileModel.findById(req.params.id).populate(
    "connectionRequests"
  );
  if (!users)
    return next(
      new ErrorHandler("Could not find users with that Id!", "failed", 404)
    );
  return res.json(responseHandler(users, "success", 200));
});

export const addProject = asyncHandler(async (req, res, next) => {
  const { projectName, projectDescription } = req.body;

  // Create a new project object
  const project = new ProjectModel({
    projectName,
    projectDescription,
  });

  // Save the project to the database
  await project.save();

  const updateProject = await ProfileModel.updateOne(
    { _id: req.params.id },
    {
      $push: {
        projects: project,
      },
    }
  );

  if (updateProject.modifiedCount == 1)
    return next(
      new ErrorHandler("Could not find users with that Id!", "failed", 404)
    );
  return res.json(
    responseHandler("project added successfully!", "success", 200)
  );
  // Return the created project as JSON
});

export const project = asyncHandler(async (req, res, next) => {
  const getProjects = await ProfileModel.findById(req.params.id).populate(
    "projects"
  );
  if (!getProjects)
    return next(
      new ErrorHandler("Could not find users with that Id!", "failed", 404)
    );
  return res.json(responseHandler(getProjects, "success", 200));
});

export const addEducation = asyncHandler(async (req, res) => {
  const profileId = req.params.id;
  const educationDetails = req.body;
  if (!profileId)
    return next(new ErrorHandler("Could not find the profile!", "failed", 404));
  // Create a new project object
  // Save the project to the database
  const education = await ProfileModel.updateOne(
    { _id: profileId },
    {
      $push: {
        education: {
          school: educationDetails.school,
          degree: educationDetails.degree,
          fieldOfStudy: educationDetails.fieldOfStudy,
          graduationYear: educationDetails.graduationYear,
        },
      },
    }
  );

  if (education.modifiedCount == 0)
    return next(new ErrorHandler("Could not add education!", "failed", 404));
  return res.json(responseHandler(education, "success", 200)); // Return the created project as JSON
});
