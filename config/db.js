const Sequelize = require('sequelize')

const db = new Sequelize('heroku_6bb141c2c21dca3','b28c71a2f7b3d1','fff6e301',{
    host:'b28c71a2f7b3d1:fff6e301@us-cdbr-east-04.cleardb.com',
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