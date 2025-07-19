import express from "express";
import { cartController } from "../../controller/index.js";
const router = express.Router();
router.get("/", cartController.getCart);
router.put("/", cartController.updateCart);
export { router as cartRouter };