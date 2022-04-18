'use strict';

// const Pool = require('pg').Pool;
const db = require("../config/database");

const getReportsData = async (varId) => {
    try {
        const response = await db.query('SELECT * FROM "data".main where var_id =' + varId + ' ORDER BY datetime ASC;');
        return response.rows;
    } catch (error) {
        throw error;
    }
};

const getFilteredReportsData = async (varId, body) => {
    try {
        let query = `SELECT * FROM "data".main where var_id = ${varId}`
        const keys = Object.keys(body);
        keys.forEach(key => {
            if(body[key].length === 1) {
                query += ` and fields_json->> '${key}' = '${body[key][0]}'`
            }
            else if(body[key].length !== 0){
                query +=` and (`
                body[key].forEach((val, index) => {
                    query += `fields_json->> '${key}' = '${val}'`;
                    if(body[key][index+1]) {
                        query += ` or `;
                    }
                })
                query += ')';
            }

        });
        const response = await db.query(query + ' ORDER BY datetime ASC;');
        return response.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getReportsData,
    getFilteredReportsData
};
