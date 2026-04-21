import { Router } from "express";
import { TreatmentPlanController } from "../controllers/TreatmentPlan.controller";

const router = Router();
const controller = new TreatmentPlanController();

router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));

export default router;