import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: String,
  projectDescription: String,
});

const ProjectModel = mongoose.model("ProjectModel", projectSchema);
export default ProjectModel;
