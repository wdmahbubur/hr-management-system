// database configuration
module.exports = {
    HOST: process.env.DATABASE_HOST, // database host
    USER: process.env.DATABASE_USERNAME, // database user
    PASSWORD: process.env.DATABASE_PASSWORD, // database password
    DB: process.env.DATABASE_NAME, // database name
    dialect: "mysql", // database dialect

    pool: {
        max: 5,       // maximum number of connection in pool
        min: 0,      // minimum number of connection in pool
        acquire: 30000, // time (in milliseconds) to acquire a new connection
        idle: 10000    // time (in milliseconds) a connection can be idle before being released
    }
}