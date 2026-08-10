
import { adminAuth } from "../config/firebaseAdmin.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

 const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,

      { expiresIn: "7d" },
    );

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "Invalid Credentials",
      });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({
        message: "Invalid Credentials",
      });

    const token = jwt.sign(
      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" },
    );

    res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


 const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const decoded = await adminAuth.verifyIdToken(idToken);

    const { email, name, picture } = decoded;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        photo: picture,
        provider: "google",
      });
    }

    const token = jwt.sign(
      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" },
    );

    res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Google Authentication Failed",
    });
  }
};

export { register, login, googleLogin };