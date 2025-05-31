/**************************************************************************
*   
*   Proyect: NodeJS-MySQL-Helper
*   License: See LICENSE in the top level directory
*   Author: iroaK
*   File: MySQL.js
*   
**************************************************************************/

// Libraries needed
const MySQL2 = require('mysql2/promise');

// MySQL Class
class MySQL {

    constructor(host, port, user, password, database, tryConnection = 3){
        this.tryConnection = tryConnection;
        this.Connection = MySQL2.createPool({
            host: host,
            port: port,
            user: user,
            password: password,
            database: database,
            waitForConnections: true,
            connectionLimit: 5,
            queueLimit: 0
        });
    }

    /**
    *   Retrieves a connection from the connection pool.
    *   @returns {Promise<Connection>} A promise that resolves to a MySQL connection.
    */
    async getConnection(){
        return await this.Connection.getConnection();
    }

    /**
    *   Executes a given SQL query using a connection from the pool.
    *   @param {string} stringQuery - The SQL query string to be executed.
    *   @param {Array} arrayQuery - An array of values to be used in the SQL query.
    *   @param {number} [tryQuery=0] - The current attempt number for executing the query.
    *   @returns {Promise<Object>} - A promise that resolves to an object containing the status and data or error.
    *   @throws {Error} - Throws an error if the query fails after the maximum number of retries.
    */
    async createQuery(stringQuery, arrayQuery, tryQuery = 0){
        let Connection = await this.getConnection();
        try{
            if(Connection){
                let response = await Connection.execute(stringQuery, arrayQuery);
                Connection.release();
                return {
                    status: true,
                    data: response
                }
            } else {
                return {
                    status: false,
                    error: 'Bad Creation of Connection'
                }
            }
        } catch(e) {
            Connection.release();
            if(tryQuery < this.tryConnection){
                return await this.createQuery(stringQuery, arrayQuery, tryQuery + 1);
            } else {
                return {
                    status: false,
                    error: e
                }
            }
        }
    }

}

// Export the MySQL class
exports.MySQL = MySQL;;