import express from "express";
import { cartController } from "../../controller/index.js";
import { authenticateToken } from "../../middleware/token-middleware.js";

const router = express.Router();

router.get("/", authenticateToken, cartController.getCart);
router.put("/", authenticateToken, cartController.updateCart);
router.post("/", authenticateToken, cartController.addToCart);
router.delete("/:itemId", authenticateToken, cartController.removeFromCart);

export { router as cartRouter };
