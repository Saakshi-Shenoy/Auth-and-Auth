const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const User = require("../models/User");
const AuditLog = require("../models/AuditLog");

// Admin-only: get all users
router.get("/users", protect, authorize("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Admin Dashboard Stats
router.get(
  "/stats",
  protect,
  authorize("admin"),
  async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalManagers = await User.countDocuments({ role: "manager" });

    res.json({
      totalUsers,
      totalAdmins,
      totalManagers
    });
  }
);

// Admin-only: change user role
router.put("/users/:id/role", protect, authorize("admin"), async (req, res) => {
  const { role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).json({ message: "User not found" });

  user.role = role;
  await user.save();

  res.json({ message: "Role updated successfully" });
});

router.get(
  "/logs",
  protect,
  authorize("admin"),
  async (req, res) => {
    const logs = await AuditLog.find()
      .populate("user", "email role")
      .sort({ createdAt: -1 });

    res.json(logs);
  }
);

// Recent Login Activity
router.get(
  "/recent-logins",
  protect,
  authorize("admin"),
  async (req, res) => {
    const logs = await AuditLog.find({ action: "LOGIN" })
      .populate("user", "email role")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(logs);
  }
);


module.exports = router;
