import express from "express";
import { authenticate } from "../Utilities/authentication.js";
import { createProfile,sendConnectionRequest,findAllProfiles,find,getProfile,addEducation,addProject ,project, acceptConnection} from "../Controller/profileController.js";
const profileRoutes = express.Router();
profileRoutes.post("/createProfile/:id", createProfile);
profileRoutes.post("/send/:id", authenticate, sendConnectionRequest);
profileRoutes.get("/get/all/profiles", authenticate, findAllProfiles);
profileRoutes.get("/get/all/:id", authenticate, find);
profileRoutes.get("/get/profile/:userId", getProfile);
profileRoutes.post("/add/education/:id", authenticate, addEducation);
profileRoutes.post("/add/project/:id", authenticate, addProject);
profileRoutes.get("/get/project/:id", authenticate, project);
profileRoutes.post("/accept/connection/request/:sendersId", authenticate, acceptConnection);
export default profileRoutes;
