import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface ProcedimientoI {
  procedimiento_id?: number;
  nombre: string;
  precio_base: number;
  estado: "ACTIVO" | "INACTIVO";
}

export class Procedimiento extends Model<ProcedimientoI> implements ProcedimientoI {
  public procedimiento_id!: number;
  public nombre!: string;
  public precio_base!: number;
  public estado!: "ACTIVO" | "INACTIVO";
}

Procedimiento.init(
  {
    procedimiento_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre del procedimiento es obligatorio" },
      },
    },

    precio_base: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "El precio debe ser numérico" },
      },
    },

    estado: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
      defaultValue: "ACTIVO",
    },
  },
  {
    sequelize,
    modelName: "Procedimiento",
    tableName: "procedimiento",
    timestamps: false,
  }
);