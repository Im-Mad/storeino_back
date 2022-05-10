const axios = require("axios");
const dotenv = require("dotenv");
const qs = require("qs");

dotenv.config({ path: './config.env' });
const headers = {
    'x-auth-token': process.env.storeino_token,
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Headers' : 'Content-type, X-Auth-Token, Authorization, Origin'
};

const adminHeaders = {...headers, 'x-auth-token': process.env.STOREINO_ADMIN_TOKEN};

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

/**
 * @param model {string}
 * @param action {string}
 * @param params {Object}
 */
const adminGet = async (model, action, params = {}) => {
    const query = baseUrl + model + '/' + action;
    return await axios.get(query, {
        params,
        paramsSerializer: params => qs.stringify(params, {arrayFormat: 'brackets'}),
        adminHeaders
    });
}

/**
 * @param model {string}
 * @param action {string}
 * @param data {Object}
 */
const adminPost = async (model, action, data ) => {
    const query = baseUrl +  model + '/' + action;
    const response = await axios.post(query, data,{
        adminHeaders
    });
    return response;
}

module.exports.get = get;
module.exports.post = post;
module.exports.adminGet = adminGet;
module.exports.adminPost = adminPost;