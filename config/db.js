const Sequelize = require('sequelize')

// database username password
// heroku_6bb141c2c21dca3  b28c71a2f7b3d1  fff6e301
// host us-cdbr-east-04.cleardb.com
const db = new Sequelize('uaq','root','',{
    host:'localhost',
    dialect:'mysql',
    port:3306,
    define:{
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})

module.exports = db