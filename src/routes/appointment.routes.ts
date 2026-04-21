import { Router } from "express";
import { AppointmentController } from "../controllers/Appointment.controller";

const router = Router();
const controller = new AppointmentController();

router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;