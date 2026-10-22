const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// GET  /api/products              (list + filter)
// POST /api/products              (create - seller)
// GET  /api/products/featured
// GET  /api/products/:id
// PUT  /api/products/:id
// DELETE /api/products/:id
// PUT  /api/products/:id/approve  (admin only)

module.exports = router;
