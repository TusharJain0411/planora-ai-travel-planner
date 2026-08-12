import express from "express";

import {  googleLogin, updateTheme } from "../controllers/authController.js";

import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/register", register);

// router.post("/login", login);

router.post("/google", googleLogin);

router.put("/theme", verifyToken, updateTheme);

export default router;
