import { Router } from "express";
import { PacienteController } from "../controllers/PacienteController";

const router = Router();
const controller = new PacienteController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
router.patch("/:id/inactivar", controller.deleteLogic.bind(controller));

export default router;