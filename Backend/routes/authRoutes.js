import express from "express";

import {  register,login,updateTheme } from "../controllers/authController.js";

import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);



router.put("/theme", verifyToken, updateTheme);

export default router;
