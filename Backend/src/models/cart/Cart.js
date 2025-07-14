import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";
import { User } from "../user/User.js";
export const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  }
});
// Establish relationship with User
Cart.belongsTo(User);
User.hasOne(Cart);