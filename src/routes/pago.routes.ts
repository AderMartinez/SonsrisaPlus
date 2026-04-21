import { Router } from "express";
import { PagoController } from "../controllers/PagoController";

const router = Router();
const controller = new PagoController();

router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;