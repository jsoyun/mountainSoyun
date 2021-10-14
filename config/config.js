require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "mountaindb",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "admin",
    password: process.env.AWS_DB_SECRET,
    database: "mountain",
    host: "last.c1v3bs8k5syx.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
    logging:false,
  }
}