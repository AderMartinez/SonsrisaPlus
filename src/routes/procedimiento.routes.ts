import { Router } from "express";
import { ProcedimientoController } from "../controllers/ProcedimientoController";

const router = Router();
const controller = new ProcedimientoController();

router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));

export default router;