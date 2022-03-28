const axios = require("axios");
const dotenv = require("dotenv");
const qs = require("qs");

dotenv.config({ path: './config.env' });
const headers = {
    // todo hardcoded token for testing purposes
    'x-auth-token': process.env.storeino_token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI2MjAyZmFiNjEyZjJmZDA4MDllZDJmZDAifSwiaWF0IjoxNjQ3NzAxMTU2LCJleHAiOjE2NzkyMzcxNTZ9.GQGMrCDO_N57IIS2g9TUwy1DCipSRc-6oUNb1dJEx3E',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Headers' : 'Content-type, X-Auth-Token, Authorization, Origin'
}

const baseUrl = "https://api-stores.storeino.com/api/";

/**
 * @param model {string}
 * @param action {string}
 * @param params {Object}
 */
const get = async (model, action, params = {}) => {
    const query = baseUrl + model + '/' + action;
    return await axios.get(query, {
        params,
        paramsSerializer: params => qs.stringify(params, {arrayFormat: 'brackets'}),
        headers
    });
    return response.data.results;
}

/**
 * @param model {string}
 * @param action {string}
 * @param data {Object}
 */
const post = async (model, action, data ) => {
    const query = baseUrl +  model + '/' + action;
    const response = await axios.post(query, data,{
        headers
    });
    return response;
}

module.exports.get = get;
module.exports.post = post;