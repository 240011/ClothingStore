import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticateToken(req, res, next) {
  console.log('Authorization header:', req.header("Authorization"));
  if (req.path === "/api/auth/login") {
    return next();
  }

  const token = req.header("Authorization")?.split(" ")[1];

  // Allow demo token for admin without verification
  if (token === "demo-token") {
    req.user = { user: { id: "admin", role: "admin" } };
    return next();
  }

  if (!token) {
    console.log('No token provided');
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.secretkey, (err, decoded) => {
    if (err) {
      console.log('Token verification error:', err);
      return res.status(403).send({ message: "Invalid or expired token.", error: err });
    }
    req.user = decoded;
    next();
  });
}
