import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface PatientI {
  patient_id?: number;
  document_type: string;
  document_number: string;
  name: string;
  phone?: string;
  email?: string;
  status: "ACTIVE" | "INACTIVE";
}

export class Patient extends Model<PatientI> implements PatientI {
  public patient_id!: number;
  public document_type!: string;
  public document_number!: string;
  public name!: string;
  public phone!: string;
  public email!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Patient.init(
  {
    patient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    document_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Document type is required" },
      },
    },

    document_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Document number is required" },
      },
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name is required" },
      },
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isEmail: { msg: "Must be a valid email" },
      },
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Patient",
    tableName: "patients",
    timestamps: false,
  }
);