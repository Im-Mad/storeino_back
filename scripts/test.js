const axios = require("axios");

const downloadData = async () => {
    const res = await axios({
        url: 'https://api-stores.storeino.com/api/collections/update/?id=623b8ad3757cff0d8a85d13e',
        data: {
            slug: 'haha'
        },
        headers: {
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI2MjAyZmFiNjEyZjJmZDA4MDllZDJmZDAifSwiaWF0IjoxNjQ3NzAxMTU2LCJleHAiOjE2NzkyMzcxNTZ9.GQGMrCDO_N57IIS2g9TUwy1DCipSRc-6oUNb1dJEx3E'
        }
    });

    console.log(res);
}

downloadData().then(r => console.log(r));