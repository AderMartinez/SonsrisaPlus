import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface PacienteI {
  paciente_id?: number;
  tipo_doc: string;
  num_doc: string;
  nombre: string;
  telefono?: string;
  email?: string;
  estado: "ACTIVO" | "INACTIVO";
}

export class Paciente extends Model<PacienteI> implements PacienteI {
  public paciente_id!: number;
  public tipo_doc!: string;
  public num_doc!: string;
  public nombre!: string;
  public telefono!: string;
  public email!: string;
  public estado!: "ACTIVO" | "INACTIVO";
}

Paciente.init(
  {
    paciente_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    tipo_doc: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Tipo de documento requerido" },
      },
    },

    num_doc: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Número de documento requerido" },
      },
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Nombre requerido" },
      },
    },

    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isEmail: { msg: "Debe ser un email válido" },
      },
    },

    estado: {
      type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
      defaultValue: "ACTIVO",
    },
  },
  {
    sequelize,
    modelName: "Paciente",
    tableName: "paciente",
    timestamps: false,
  }
);