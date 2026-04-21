import { Router } from "express";

import patientRoutes from "./patient.routes";
import appointmentRoutes from "./appointment.routes";
import paymentRoutes from "./payment.routes";
import treatmentPlanRoutes from "./treatmentPlan.routes";
import procedureRoutes from "./procedure.routes";

const router = Router();

router.use("/patients", patientRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/payments", paymentRoutes);
router.use("/treatment-plans", treatmentPlanRoutes);
router.use("/procedures", procedureRoutes);

export default router;