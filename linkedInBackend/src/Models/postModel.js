import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  heading: String,
  content: String,
  image: String, // URL or path to the image
  video: String, // URL or path to the video
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProfileModel" }], // Array of User references
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "ProfileModel" }, // User reference
      text: String,
      response: String,
      createdAt: { type: Date, default: Date.now },
    },
  ], // Array of comment objects
});

const PostModel = mongoose.model("PostModel", postSchema);
export default PostModel;
