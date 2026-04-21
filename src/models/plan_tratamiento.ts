import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface PlanTratamientoI {
  plantratamiento_id?: number;
  paciente_id: number;
  nombre: string;
  estado: "ACTIVO" | "INACTIVO" | "FINALIZADO";
}

export class PlanTratamiento extends Model<PlanTratamientoI> implements PlanTratamientoI {
  public plantratamiento_id!: number;
  public paciente_id!: number;
  public nombre!: string;
  public estado!: "ACTIVO" | "INACTIVO" | "FINALIZADO";
}

PlanTratamiento.init(
  {
    plantratamiento_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "El paciente es obligatorio" },
      },
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre del plan es obligatorio" },
      },
    },

    estado: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO", "FINALIZADO"),
      defaultValue: "ACTIVO",
    },
  },
  {
    sequelize,
    modelName: "PlanTratamiento",
    tableName: "plan_tratamiento",
    timestamps: false,
  }
);