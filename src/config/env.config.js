
require('dotenv').config();

/****
 * 
 * @description This is best for 
 *  
 */
module.exports = {
    /***
     * 
     * @description APPLICATION DATA
     * 
     */
	app: {
		port: process.env.PORT,
		appName: process.env.APP_NAME,
		env: process.env.NODE_ENV,
	},
	/***
     * 
     * @description DATABASE
     * 
     */
     sqldb: {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_NAME: process.env.DB_NAME,
        DIALECT: process.env.DB_TYPE,

        // pool is optional, it will be used for Sequelize connection pool configuration
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
     },

     /***
     * 
     * @description DATABASE
     * 
     */
     rediscache: {
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,
     }
};
