const catchAsynch = require('../utils/catchAsynch');
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });


exports.getAllItems = catchAsynch(async (req, res, _next) => {
    const headers = {
        'x-auth-token': process.env.storeino_token,
    }

    const response = await axios.get('https://api-stores.storeino.com/api/products/search?', {
        headers,
    });

    response.data.results.forEach(item => console.log(item.name));

    res.status(200).json({
        status: 'success',
        data: {
            products: response.data,
        },
    });
});