import { Router } from "express";
import { CitaController } from "../controllers/CitaController";

const router = Router();
const controller = new CitaController();

router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;