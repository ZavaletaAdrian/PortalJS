const Sequelize = require("sequelize");

//New conection with Azure DataBase
const db = new Sequelize("portaldb", "adminjs", "portalJS_1506", {
  host: "portal-js.mysql.database.azure.com",
  dialect: "mysql",
  port: 3306,
  define: {
    timestamps: false,
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
