import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config();

export const sequelize = new Sequelize(
  "trendmandu", // Database name
  "postgres",
  "niraj70055", // Database user
  {
    host: "localhost",
    dialect: 'postgres',// other example mysql,oracle,h2
    define: {
      // Disable automatic addition of NOT NULL constraints on columns
      // This prevents errors when adding NOT NULL columns to tables with existing rows
      // You can manage NOT NULL constraints manually via migrations
      allowNull: true,
    },
  }
);

export const db = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected successfully")
    
    await sequelize.sync({alter:true})
    console.log("database connected successfully")

  } catch (e) {
    console.error("fail to connect database successfully",e)
  }
}



