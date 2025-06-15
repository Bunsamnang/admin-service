import express from "express";
import blogAPI from "./utils/blogAPI.js";
const router = express.Router();

// Get all blogs (admin)
router.get("/blogs", async (req, res) => {
  try {
    const response = await blogAPI.get("/admin/blogs", {
      params: req.query,

      headers: {
        "x-user-role": req.user.role,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching all blogs (admin):", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get blogs for specific user
router.get("/blogs/user/:userId", async (req, res) => {
  try {
    const response = await blogAPI.get(`/admin/blogs/${req.params.userId}`, {
      headers: {
        "x-user-role": req.user.role,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching user blogs (admin):", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete blog (admin)
router.delete("/blogs/:id", async (req, res) => {
  try {
    const response = await blogAPI.delete(`/admin/blogs/${req.params.id}`, {
      headers: {
        "x-user-role": req.user.role,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error deleting blog (admin):", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
