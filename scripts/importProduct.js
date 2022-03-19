const axios = require("axios");
const dotenv = require("dotenv");

const headers = {
    'x-auth-token': 'xx',
}
const query = "https://api-stores.storeino.com/api/products/search?";
const response = await axios.get(query, {
        headers,
});


