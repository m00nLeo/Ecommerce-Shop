import { json, Router } from "express";
import Post from "../model/post";

const router = Router();

// Get all posts
router.get("/", async (req, res) => {
  const postSample = await Post.find({});

  res.json({ post: postSample, total: 150, skip: 0, limit: 30 });
});

// Get post by Id
router.get("/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  res.json(post);
});

// Create a new post
router.post("/add", async (req, res) => {
  const newPost = await Post.create(req.body);
  res.json(newPost);
});

// Update a post
router.put("/:postId", async (req, res) => {
  const updatePost = await Post.findByIdAndUpdate(req.params.postId, req.body, {
    new: true,
  });
  res.json(updatePost);
});

// Deleta a post
router.delete("/:postId", async (req, res) => {
  const deletePost = await Post.findByIdAndDelete(req.params.postId);
  res.json(deletePost);
});

export default router;
