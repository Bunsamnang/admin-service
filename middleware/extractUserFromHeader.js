export const extractUserFromHeader = (req, res, next) => {
  const userRole = req.headers["x-user-role"];
  if (!userRole) {
    return res.status(401).json({ message: "No user role header" });
  }
  req.user = { role: userRole };
  next();
};
