import express from "express";
import { userController } from "../../controller/index.js";
const router = express.Router();
router.get("/", userController.getAll);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.get("/:id", userController.getById);
router.delete("/:id", userController.deleteById);

export { router as userRouter };
