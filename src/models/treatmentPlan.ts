import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface TreatmentPlanI {
  treatment_plan_id?: number;
  patient_id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "COMPLETED";
}

export class TreatmentPlan extends Model<TreatmentPlanI> implements TreatmentPlanI {
  public treatment_plan_id!: number;
  public patient_id!: number;
  public name!: string;
  public status!: "ACTIVE" | "INACTIVE" | "COMPLETED";
}

TreatmentPlan.init(
  {
    treatment_plan_id: {
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

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Treatment plan name is required" },
      },
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE", "COMPLETED"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "TreatmentPlan",
    tableName: "treatment_plans",
    timestamps: false,
  }
);