// Usage: requireRole("admin"), requireRole("seller", "admin")
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    res.status(403);
    return next(new Error("Not authorized for this resource"));
  }
  next();
};

module.exports = { requireRole };
