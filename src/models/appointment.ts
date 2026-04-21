import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface AppointmentI {
  appointment_id?: number;
  patient_id: number;
  dentist_id: number;
  chair_id: number;
  date: Date;
  status: "PENDING" | "CONFIRMED" | "CANCELED" | "COMPLETED";
  subtotal: number;
  tax: number;
  total: number;
}

export class Appointment extends Model<AppointmentI> implements AppointmentI {
  public appointment_id!: number;
  public patient_id!: number;
  public dentist_id!: number;
  public chair_id!: number;
  public date!: Date;
  public status!: "PENDING" | "CONFIRMED" | "CANCELED" | "COMPLETED";
  public subtotal!: number;
  public tax!: number;
  public total!: number;
}

// 🔥 función para calcular totales
const calculateTotals = (appointment: Appointment) => {
  const subtotal = parseFloat(appointment.subtotal as any);
  appointment.tax = subtotal * 0.19;
  appointment.total = subtotal + appointment.tax;
};

Appointment.init(
  {
    appointment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Patient is required" },
      },
    },

    dentist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Dentist is required" },
      },
    },

    chair_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Chair is required" },
      },
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "CONFIRMED",
        "CANCELED",
        "COMPLETED"
      ),
      defaultValue: "PENDING",
    },

    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "Subtotal must be numeric" },
      },
    },

    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Appointment",
    tableName: "appointments",
    timestamps: false,

    hooks: {
      beforeCreate: calculateTotals,
      beforeUpdate: calculateTotals,
    },
  }
);