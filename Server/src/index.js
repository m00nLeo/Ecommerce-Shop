// const express = require("express"); //ES5
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import productRoute from "./routes/product.route";
import postRoute from "./routes/post.route";
import userRouter from "./routes/user.route";
import cors from "cors";

const port = 4000;

////////////////////////////////////////////////////// MONGO URI ////////////////////////////////////////////////////////////
const uri = process.env.MONGO_URI;

///////////////////////////////////////////////////// CREATE SERVER /////////////////////////////////////////////////////////

const app = express();

app.use(express.json());

app.use(cors());

// Middleware
app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 500); //sau khi delay 500ms thì next() sẽ trả về kết quả function
});

// PRODUCTS
app.use("/products", productRoute);

// POSTS
app.use("/posts", postRoute);

// USERS
app.use("/users", userRouter);

///////////////////////////////////////////////////// Starting ///////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.json({ message: "hello" });
  // res.send("<h1>welcome page</h1>");
});

// Run db (database) with MongoDB --> đợi server connect tới database hoàn thành thì server mới truyền qua lại client
mongoose.set("strictQuery", false);
mongoose.connect(uri).then(() => {
  console.log("Connected to database");
  //RUN Server
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});
