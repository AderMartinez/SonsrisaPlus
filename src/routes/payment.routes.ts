import { Router } from "express";
import { PaymentController } from "../controllers/Payment.controller";

const router = Router();
const controller = new PaymentController();

router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;