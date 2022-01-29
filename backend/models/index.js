const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig'); // get db config

const sequelize = new Sequelize( // create sequelize
    dbConfig.DB, // database name
    dbConfig.USER, // database user
    dbConfig.PASSWORD, // database password
    {
        host: dbConfig.HOST, // database host
        dialect: dbConfig.dialect, // database dialect
        operatorsAliases: false, // disable operators aliases

        pool: {
            max: dbConfig.pool.max, // maximum number of connection in pool
            min: dbConfig.pool.min, // minimum number of connection in pool
            acquire: dbConfig.pool.acquire, // acquire connection timeout
            idle: dbConfig.pool.idle // idle connection timeout
        }
    }
)

sequelize.authenticate()   // authenticate sequelize
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {} // create db object

db.Sequelize = Sequelize // add Sequelize to db object
db.sequelize = sequelize // add sequelize to db object

db.users = require('./UserModels')(sequelize, DataTypes) // add user model to db object

db.sequelize.sync({ force: false }) // sync database
    .then(() => {
        console.log('yes re-sync done!')
    })

module.exports = db