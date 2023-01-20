import express from "express";
import auth from "../../middleware/auth.js";
import User from "../../models/User.js";
const router = express.Router();

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

export default router;
