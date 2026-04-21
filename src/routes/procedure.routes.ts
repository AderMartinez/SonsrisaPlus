import { Router } from "express";
import { ProcedureController } from "../controllers/Procedure.controller";

const router = Router();
const controller = new ProcedureController();

router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));

export default router;