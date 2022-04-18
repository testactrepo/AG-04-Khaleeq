const reportService = require('../services/sections')
const httpStatusCode = require('http-status-codes')

const getSectionsAndVariables = async (req, res) => {
    try {
        const response = await reportService.getSectionsAndVariables();
        if (response && response.length <= 0) {
            return res.status(httpStatusCode.OK).send({
                status: true,
                type: 'success',
                message: 'No data exist',
                data: [],
            });
        }
        // Parsing the queried response in a better format for frontend to handle easily.
        let parsedResponse = [];
        let prevSectionId = null;
        response.forEach((value) => {
            if(prevSectionId) {
                if(value.section_id == prevSectionId) {
                    parsedResponse[parsedResponse.length-1].children.push(
                        {title: value.variable_name, icon: value.variable_icon, type : 'basic', var_id: value.variable_id})
                }
                else {
                    parsedResponse.push({title: value.section_name, icon: value.section_icon, type: 'collapsable', children: [{title: value.variable_name, icon: value.variable_icon, type : 'basic', var_id: value.variable_id}]})
                }
            }
            else {
                parsedResponse.push({title: value.section_name, icon: value.section_icon, type: 'collapsable', children: [{title: value.variable_name, icon: value.variable_icon, type : 'basic', var_id: value.variable_id}]})
            }
            prevSectionId = value.section_id;
        })
        return res.status(httpStatusCode.OK).send({
            status: true,
            type: 'success',
            message: 'Sections data fetched successfully',
            data: parsedResponse
        });
    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
            status: false,
            type: 'error',
            message: 'Error while fetching data',
            data: error,
        });
    }
}

const getVariableNotes = async (req, res) => {
    try {
        const varId = req.query.varId || null;
        const response = await reportService.getVariableNotes(varId);
        if (response && response.length <= 0) {
            return res.status(httpStatusCode.OK).send({
                status: true,
                type: 'success',
                message: 'No data exist',
                data: [],
            });
        }
        return res.status(httpStatusCode.OK).send({
            status: true,
            type: 'success',
            message: 'Variable Notes data fetched successfully',
            data: response[0]
        });
    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
            status: false,
            type: 'error',
            message: 'Error while fetching data',
            data: error,
        });
    }
}

const getVariableDetails = async (req, res) => {
    try {
        const varId = req.query.varId || null;
        const response = await reportService.getVariableDetails(varId);
        return res.status(httpStatusCode.OK).send({
            status: true,
            type: 'success',
            message: 'Variable data fetched successfully',
            data: response
        });
    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
            status: false,
            type: 'error',
            message: 'Variable while fetching data',
            data: error,
        });
    }
}


module.exports = {
    getSectionsAndVariables,
    getVariableNotes,
    getVariableDetails
}