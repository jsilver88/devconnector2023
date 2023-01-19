import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
const app = express();

// Connect Database
connectDB();
mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
