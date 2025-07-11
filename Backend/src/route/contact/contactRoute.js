import express from "express";
import { contactController } from "../../controller/index.js";

const router = express.Router();
router.post("/", contactController.create);

export { router as contactRouter };