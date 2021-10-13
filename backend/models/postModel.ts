import mongoose from "mongoose";
import IPost from "../controllers/posts";

// create shema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  tags: [String],
  selectedFiles: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});
// create model
const postModel = mongoose.model<mongoose.Document & IPost>("Post", postSchema);

export default postModel;