import express from "express";

import { register, login, googleLogin, updateTheme } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/google", googleLogin);

router.put("/theme",  updateTheme);

export default router;
