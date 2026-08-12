import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import itineraryRoutes from "./routes/itineraryRoutes.js";

const app = express();

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://planora-ai-travel-planner-alpha.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("REQUEST ORIGIN:", origin);

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        console.log("CORS ALLOWED:", origin);
        return callback(null, true);
      }

      console.log("CORS BLOCKED:", origin);
      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "5mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "5mb",
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/itinerary", itineraryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
