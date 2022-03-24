const axios = require("axios");


// const headers = {
//     'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI2MjAyZmFiNjEyZjJmZDA4MDllZDJmZDAifSwiaWF0IjoxNjQ3NzAxMTU2LCJleHAiOjE2NzkyMzcxNTZ9.GQGMrCDO_N57IIS2g9TUwy1DCipSRc-6oUNb1dJEx3E',
// }
// const query = "https://api-stores.storeino.com/api/collections/search?limit=100&sort=_id+asc";
//
// const downloadData = async () => {
//     let res = await axios.get('https://api-stores.storeino.com/api/collections/search?',
//         {headers},
//     );
//     console.log(res);
// }

var postData = {
    slug: "test@test.com",
};

let axiosConfig = {
    headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI2MjAyZmFiNjEyZjJmZDA4MDllZDJmZDAiLCJuYW1lIjoicGZhIiwic3ViZG9tYWluIjoicGZhLnN0b3JlaW5vLmNvbSJ9LCJ1c2VyIjp7Il9pZCI6IjYyMDJmYWIxMTJmMmZkMDgwOWVkMmZjNyIsImZpcnN0bmFtZSI6InJhY2hpZCIsImxhc3RuYW1lIjoiZWwgYWlzc2FvdWkiLCJlbWFpbCI6InJhLmVsYWlzc2FvdWlAZ21haWwuY29tIn0sImNvbXBhbnkiOnsic3RhdHVzIjoiVU5DT01QTEVURUQiLCJfaWQiOiI2MjAyZmFiMTEyZjJmZDA4MDllZDJmYzUiLCJuYW1lIjoicGZhIn0sImlhdCI6MTY0ODExNjE2OCwiZXhwIjoxNjc5NjUyMTY4fQ.rv95dzgk-zCFb0e0u00_zT1odjQXMRfi9AGcMcuc_vA',
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

axios.post('https://api-stores.storeino.com/api/collections/update/?id=623b8998757cff0d8a85cae1', postData, axiosConfig)
    .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
        console.log("AXIOS ERROR: ", err);
    })