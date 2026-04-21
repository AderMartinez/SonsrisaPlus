import { Router } from "express";
import { PlanTratamientoController } from "../controllers/PlanTratamientoController";

const router = Router();
const controller = new PlanTratamientoController();

router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));

export default router;