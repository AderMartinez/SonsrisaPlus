import { Patient } from "./patient";
import { Appointment } from "./appointment";
import { Payment } from "./payment";
import { TreatmentPlan } from "./treatmentPlan";
import { Procedure } from "./procedure";


// 🧍 Patient → Appointment (1:N)
Patient.hasMany(Appointment, {
  foreignKey: "patient_id",
  as: "appointments",
});

Appointment.belongsTo(Patient, {
  foreignKey: "patient_id",
  as: "patient",
});

// 🧾 Appointment → Payment (1:N)
Appointment.hasMany(Payment, {
  foreignKey: "appointment_id",
  as: "payments",
});

Payment.belongsTo(Appointment, {
  foreignKey: "appointment_id",
  as: "appointment",
});

// 🧍 Patient → TreatmentPlan (1:N)
Patient.hasMany(TreatmentPlan, {
  foreignKey: "patient_id",
  as: "treatmentPlans",
});

TreatmentPlan.belongsTo(Patient, {
  foreignKey: "patient_id",
  as: "patient",
});

export {
  Patient,
  Appointment,
  Payment,
  TreatmentPlan,
  Procedure,
};