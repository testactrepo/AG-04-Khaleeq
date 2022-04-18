const httpStatusCode = require('http-status-codes');
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "6a7a1847d1da74366491aa2442849cee-us14",
    server: "us14",
});

const addMemberToList = async (req, res) => {
    try {
        const response = await mailchimp.lists.addListMember("bb26ce1830", req.body);
        return res.status(httpStatusCode.OK).send('Added email to mailchimp.');
    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
            status: false,
            type: 'error',
            message: 'Error while adding email to mailchimp.',
            data: error,
        });
    }
}


module.exports = {
    addMemberToList
}