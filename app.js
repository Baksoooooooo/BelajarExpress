import express from "express";
import cors from "cors";
import logger from "./middleware/logger.js";
import bukuRoutes from "./routes/bukuRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();

app.use(
  cors({
    origin: "*", // izinkan semua origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({ pesan: "halo dari Express!" });
});

app.use("/auth", authRoutes);
app.use("/buku", bukuRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `tidak dapat menemukan endpoint ${req.url} dengan method ${req.method}`,
  });
});

app.use(errorHandler);

export default app;
