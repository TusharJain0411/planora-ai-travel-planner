import express from "express";

import { createItinerary,updateItinerary } from "../controllers/itineraryController.js";

import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id",verifyToken, createItinerary);

router.put("/:id/update",verifyToken, updateItinerary);

export default router;
