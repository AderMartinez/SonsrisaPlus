import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface CitaI {
  cita_id?: number;
  paciente_id: number;
  odontologo_id: number;
  sillon_id: number;
  fecha: Date;
  estado: "PENDIENTE" | "CONFIRMADA" | "CANCELADA" | "COMPLETADA";
  subtotal: number;
  impuesto: number;
  total: number;
}

export class Cita extends Model<CitaI> implements CitaI {
  public cita_id!: number;
  public paciente_id!: number;
  public odontologo_id!: number;
  public sillon_id!: number;
  public fecha!: Date;
  public estado!: "PENDIENTE" | "CONFIRMADA" | "CANCELADA" | "COMPLETADA";
  public subtotal!: number;
  public impuesto!: number;
  public total!: number;
}

Cita.init(
  {
    cita_id: {
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

    odontologo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "El odontólogo es obligatorio" },
      },
    },

    sillon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "El sillón es obligatorio" },
      },
    },

    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: "Debe ser una fecha válida" },
      },
    },

    estado: {
      type: DataTypes.ENUM(
        "PENDIENTE",
        "CONFIRMADA",
        "CANCELADA",
        "COMPLETADA"
      ),
      defaultValue: "PENDIENTE",
    },

    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "Subtotal debe ser numérico" },
      },
    },

    impuesto: {
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
    modelName: "Cita",
    tableName: "cita",
    timestamps: false,

    hooks: {
      beforeCreate: (cita: Cita) => {
        cita.impuesto = Number(cita.subtotal) * 0.19;
        cita.total = Number(cita.subtotal) + Number(cita.impuesto);
      },
      beforeUpdate: (cita: Cita) => {
        cita.impuesto = Number(cita.subtotal) * 0.19;
        cita.total = Number(cita.subtotal) + Number(cita.impuesto);
      },
    },
  }
);