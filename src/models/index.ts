import { Paciente } from "./Paciente";
import { Cita } from "./Cita";
import { Pago } from "./Pago";
import { PlanTratamiento } from "./PlanTratamiento";
import { Procedimiento } from "./Procedimiento";

/* =========================
   🔴 RELACIONES PRINCIPALES
   ========================= */

// 🧍 Paciente → Cita (1:N)
Paciente.hasMany(Cita, {
  foreignKey: "paciente_id",
  as: "citas",
});

Cita.belongsTo(Paciente, {
  foreignKey: "paciente_id",
  as: "paciente",
});

// 🧾 Cita → Pago (1:N)
Cita.hasMany(Pago, {
  foreignKey: "cita_id",
  as: "pagos",
});

Pago.belongsTo(Cita, {
  foreignKey: "cita_id",
  as: "cita",
});

// 🧍 Paciente → PlanTratamiento (1:N)
Paciente.hasMany(PlanTratamiento, {
  foreignKey: "paciente_id",
  as: "planes",
});

PlanTratamiento.belongsTo(Paciente, {
  foreignKey: "paciente_id",
  as: "paciente",
});

/* =========================
   🟡 NOTA IMPORTANTE
   ========================= */

// Procedimiento aún NO tiene relación directa
// Se conecta mediante DetalleTratamiento (tabla intermedia)
// (si no la tienes, está bien dejarlo así por ahora)

/* =========================
   📦 EXPORTS
   ========================= */

export {
  Paciente,
  Cita,
  Pago,
  PlanTratamiento,
  Procedimiento,
};