import express from "express";

import { createItinerary,updateItinerary } from "../controllers/itineraryController.js";

const router = express.Router();

router.get("/:id", createItinerary);

router.put("/:id/update", updateItinerary);

export default router;
