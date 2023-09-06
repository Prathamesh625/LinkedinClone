import mongoose from "mongoose";
const user = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: true },
  profile: { type: mongoose.SchemaTypes.ObjectId, ref: "profileModel" },
});
const userModel = mongoose.model("userModel", user);
export default userModel;
