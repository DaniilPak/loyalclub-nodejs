const jwt = require("jsonwebtoken");

// Set up middleware to check for JWT token in request header
export function checkBusinessOwner(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    console.log(decoded);
    next();
  });
}
