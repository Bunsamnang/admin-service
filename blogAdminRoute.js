import express from "express";
import blogAPI from "./utils/blogAPI.js";
import userAPI from "./utils/userAPI.js";
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
    console.error("Error fetching all blogs (admin):", err);
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
    console.error("Error fetching user blogs (admin):", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const response = await userAPI.get("/", {
      headers: {
        "x-user-role": req.headers["x-user-role"],
      },
    }); // <-- Directly calling auth
    const users = response.data.users;

    res.status(200).json({
      message: "Fetched users successfully",
      users,
    });
  } catch (err) {
    console.error("Blog-service failed to get users from auth:", err.message);
    res.status(500).json({ message: "Failed to fetch users" });
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
    console.error("Error deleting blog (admin):", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
