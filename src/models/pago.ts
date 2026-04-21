import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface PagoI {
  pago_id?: number;
  cita_id: number;
  metodo: "EFECTIVO" | "TARJETA" | "TRANSFERENCIA";
  monto: number;
  fecha: Date;
  referencia?: string;
  estado: "PENDIENTE" | "PAGADO" | "RECHAZADO";
}

export class Pago extends Model<PagoI> implements PagoI {
  public pago_id!: number;
  public cita_id!: number;
  public metodo!: "EFECTIVO" | "TARJETA" | "TRANSFERENCIA";
  public monto!: number;
  public fecha!: Date;
  public referencia!: string;
  public estado!: "PENDIENTE" | "PAGADO" | "RECHAZADO";
}

Pago.init(
  {
    pago_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    cita_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "La cita es obligatoria" },
      },
    },

    metodo: {
      type: DataTypes.ENUM(
        "EFECTIVO",
        "TARJETA",
        "TRANSFERENCIA"
      ),
      allowNull: false,
    },

    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "Monto debe ser numérico" },
        min: {
          args: [0],
          msg: "El monto no puede ser negativo",
        },
      },
    },

    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    referencia: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    estado: {
      type: DataTypes.ENUM(
        "PENDIENTE",
        "PAGADO",
        "RECHAZADO"
      ),
      defaultValue: "PENDIENTE",
    },
  },
  {
    sequelize,
    modelName: "Pago",
    tableName: "pago",
    timestamps: false,
  }
);