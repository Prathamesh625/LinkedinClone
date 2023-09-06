import mongoose from "mongoose";
const Connection = new mongoose.Schema({
  userId: String,
  accepted: Boolean,
  follow: Boolean,
});

const ConnectionModel = mongoose.model("ConnectionModel", Connection);
export default ConnectionModel;
