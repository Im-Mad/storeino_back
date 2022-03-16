const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });

const headers = {
    'x-auth-token': process.env.storeino_token,
}

class StoreinoAPI {
    constructor(query) {
        this.query = "https://api-stores.storeino.com/api/products/search?"+query;
    }

    async ApiCall() {
        const response = await axios.get(this.query, {
            headers,
        });
        return response.data.results;
    }
}

module.exports = StoreinoAPI;