import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: Number,
  tags: [],
  reations: Number,
});

const Post = mongoose.model("Post", postSchema);

export default Post;
