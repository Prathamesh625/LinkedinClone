import mongoose from "mongoose";
const profile = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "userModel" },
  profileImage: String, // URL or path to the profile image
  name: String,
  heading: String,
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }], // Array of User references
  connectionRequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ConnectionModel" },
  ], // Array of User references
  invitations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ConnectionModel" },
  ], // Array of Invitation references (if you have an Invitation schema)
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "PostModel" }], // Array of Post references (if you have a Post schema)
  skills: [String], // Array of skill names
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProjectModel" }], // Array of Project references (if you have a Project schema)
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      graduationYear: Number,
    },
  ],
});
const ProfileModel = mongoose.model("profileModel", profile);
export default ProfileModel;
