import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config();

export const sequelize = new Sequelize(
  process.env.postgres,
  process.env.postgres,
  process.env.niraj70055,
  {
    host: process.env.localhost,
    dialect: 'postgres',// other example mysql,oracle,h2
  }
);

export const db = async () => {
  try {
    await sequelize.sync({alter:true})
    console.log("database connected successfully")

  } catch (e) {
    console.error("fail to connect database successfully",e)
  }
}



