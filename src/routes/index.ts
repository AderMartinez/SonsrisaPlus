import { Router } from "express";

import pacienteRoutes from "./paciente.routes";
import citaRoutes from "./cita.routes";
import pagoRoutes from "./pago.routes";
import planRoutes from "./planTratamiento.routes";
import procedimientoRoutes from "./procedimiento.routes";

const router = Router();

router.use("/pacientes", pacienteRoutes);
router.use("/citas", citaRoutes);
router.use("/pagos", pagoRoutes);
router.use("/planes", planRoutes);
router.use("/procedimientos", procedimientoRoutes);

export default router;