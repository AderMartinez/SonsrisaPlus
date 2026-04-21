import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface PaymentI {
  payment_id?: number;
  appointment_id: number;
  method: "CASH" | "CARD" | "TRANSFER";
  amount: number;
  date: Date;
  reference?: string;
  status: "PENDING" | "PAID" | "REJECTED";
}

export class Payment extends Model<PaymentI> implements PaymentI {
  public payment_id!: number;
  public appointment_id!: number;
  public method!: "CASH" | "CARD" | "TRANSFER";
  public amount!: number;
  public date!: Date;
  public reference!: string;
  public status!: "PENDING" | "PAID" | "REJECTED";
}

Payment.init(
  {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Appointment is required" },
      },
    },

    method: {
      type: DataTypes.ENUM(
        "CASH",
        "CARD",
        "TRANSFER"
      ),
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "Amount must be numeric" },
        min: {
          args: [0],
          msg: "Amount cannot be negative",
        },
      },
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    reference: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "PAID",
        "REJECTED"
      ),
      defaultValue: "PENDING",
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: false,
  }
);