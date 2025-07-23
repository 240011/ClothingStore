import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";
export const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  size: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  color: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  requested: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});