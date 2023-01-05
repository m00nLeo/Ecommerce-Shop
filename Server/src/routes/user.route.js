import { Router } from "express";
import User from "../model/user";

const userRouter = Router();

// Get all users
userRouter.get("/", async (req, res) => {
  const user = await User.find({});
  res.json({ user: user, total: 100, skip: 0, limit: 30 });
});

// Get user by Id
userRouter.get("/:user", async (req, res) => {
  const user = await User.findById(req.params.user);
  res.json(user);
});

// Create a user
userRouter.post("/add", async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});

// Update user
userRouter.put("/:user", async (req, res) => {
  const updateUser = await User.findOneAndUpdate(req.params.user, req.body, {
    new: true,
  });
  res.json(updateUser);
});

// Delete user
userRouter.delete("/:user", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.user);
  res.json(deletedUser);
});

//////////////////////////////////////////////////////// USERS //////////////////////////////////////////////////////////////

// // Get all users
// app.get("/user", (req, res) => {
//   res.json({ user: user, total: 100, skip: 0, limit: 30 });
// });

// // READ (Get) a user
// app.get("/user/:userId", (req, res) => {
//   const userInfo = user.find((item) => item.id === parseInt(req.params.userId));

//   if (!userInfo) return res.json({ message: "User not found" });

//   res.json(userInfo);
// });

// // CREATE (Post) new user
// app.post("/user/add", (req, res) => {
//   const newUser = { id: user.length + 1, ...req.body };

//   user.push(newUser);

//   res.json(newUser);
// });

// // UPDATE (Put) a user
// app.put("/user/:userId", (req, res) => {
//   const userId = parseInt(req.params.userId);

//   const updateUser = { id: userId, ...req.body };

//   user[user.findIndex((item) => item.id === userId)] = updateUser;

//   res.json(updateUser);
// });

// // DELETE (Delete) a user
// app.delete("/user/:userId", (req, res) => {
//   const userId = parseInt(req.params.userId);

//   const deleteUser = user.filter((item) => item.id === userId);

//   user = user.filter((item) => item.id !== userId);

//   res.json(deleteUser);
// });

export default userRouter;
