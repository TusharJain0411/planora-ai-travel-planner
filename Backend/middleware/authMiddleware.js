import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN RECEIVED:", !!token);
    console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("JWT DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
}
