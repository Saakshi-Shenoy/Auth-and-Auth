const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get(
  "/analytics",
  protect,
  authorize("admin", "manager"),
  (req, res) => {
    res.json({
      message: "Manager analytics access granted"
    });
  }
);

module.exports = router;
