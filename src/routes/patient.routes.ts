import { Router } from "express";
import { PatientController } from "../controllers/Patient.controller";

const router = Router();
const controller = new PatientController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
router.patch("/:id/deactivate", controller.softDelete.bind(controller));

export default router;