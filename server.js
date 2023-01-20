import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import userRoutes from "./routes/api/users.js";
import authRoutes from "./routes/api/auth.js";
import profileRoutes from "./routes/api/profile.js";
import postRoutes from "./routes/api/posts.js";
const app = express();

mongoose.set("strictQuery", false);
// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API Running");
});

// Define Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
