'use strict';

// const Pool = require('pg').Pool;
const db = require("../config/database");

const getSectionsAndVariables = async () => {
    try {
        const query = `select s.id as section_id, v.id as variable_id, s."name" as section_name, s.icon as section_icon,
         v."name" as variable_name, v.icon as variable_icon from variables."section" s full join variables.variables v on
          s.id = v.section_id order by section_id asc; `
        const response = await db.query(query);
        return response.rows;
    } catch (error) {
        throw error;
    }
};

const getVariableNotes = async (varId) => {
    try {
        const query = `select notes, credits, description from variables.variable_notes where var_id = ${varId} `
        const response = await db.query(query);
        return response.rows;
    } catch (error) {
        throw error;
    }
};

const getVariableDetails = async (varId) => {
    try {
        const query = `select * from variables.variables where id = ${varId} `
        const response = await db.query(query);
        return response.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getSectionsAndVariables,
    getVariableNotes,
    getVariableDetails
};
