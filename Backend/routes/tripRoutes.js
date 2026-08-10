// routes/tripRoutes.js

import express from "express";

import {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
} from "../controllers/tripController.js";

import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createTrip);

router.get("/", verifyToken, getTrips);

router.get("/:id", verifyToken, getTrip);

router.put("/:id", verifyToken, updateTrip);

router.delete("/:id", verifyToken, deleteTrip);

export default router;
