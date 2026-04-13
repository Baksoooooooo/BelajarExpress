import express from "express";
import * as bukuController from "../controllers/bukuController.js";
import cekHarga from "../middleware/cekHarga.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", bukuController.getAll);
router.get("/:id", bukuController.getById);
router.post("/", cekHarga, bukuController.create);
router.put("/:id", cekHarga, bukuController.update);
router.delete("/:id", bukuController.remove);

export default router;
