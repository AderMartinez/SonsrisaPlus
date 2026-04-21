import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/db";

export class ResourceRole extends Model {
  public id!: number;
  public resource_id!: number;
  public role_id!: number;
  public is_active!: "ACTIVE" | "INACTIVE";
}

export interface ResourceRoleI {
  id?: number;
  resource_id: number;
  role_id: number;
  is_active: "ACTIVE" | "INACTIVE";
}

ResourceRole.init(
  {
    is_active: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "resource_roles",
    sequelize: sequelize,
    timestamps: false,
  }
);