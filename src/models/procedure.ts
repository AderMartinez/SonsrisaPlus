import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface ProcedureI {
  procedure_id?: number;
  name: string;
  base_price: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Procedure extends Model<ProcedureI> implements ProcedureI {
  public procedure_id!: number;
  public name!: string;
  public base_price!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Procedure.init(
  {
    procedure_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Procedure name is required" },
      },
    },

    base_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "Price must be numeric" },
      },
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Procedure",
    tableName: "procedures",
    timestamps: false,
  }
);