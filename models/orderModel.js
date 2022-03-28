const mongoose = require('mongoose');

const headers = {
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI2MjAyZmFiNjEyZjJmZDA4MDllZDJmZDAiLCJuYW1lIjoicGZhIiwic3ViZG9tYWluIjoicGZhLnN0b3JlaW5vLmNvbSJ9LCJ1c2VyIjp7Il9pZCI6IjYyMDJmYWIxMTJmMmZkMDgwOWVkMmZjNyIsImZpcnN0bmFtZSI6InJhY2hpZCIsImxhc3RuYW1lIjoiZWwgYWlzc2FvdWkiLCJlbWFpbCI6InJhLmVsYWlzc2FvdWlAZ21haWwuY29tIn0sImNvbXBhbnkiOnsic3RhdHVzIjoiVU5DT01QTEVURUQiLCJfaWQiOiI2MjAyZmFiMTEyZjJmZDA4MDllZDJmYzUiLCJuYW1lIjoicGZhIn0sImlhdCI6MTY0ODExNjE2OCwiZXhwIjoxNjc5NjUyMTY4fQ.rv95dzgk-zCFb0e0u00_zT1odjQXMRfi9AGcMcuc_vA',
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
}

const query = "https://api-stores.storeino.com/api/collections/search?limit=100&sort=_id+asc";

const orderSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'Order must have an id'],
        trim: true
    },
    customer: {
        type: String,
        required: [true, 'Customer must have an id'],
        trim: true
    },
})

module.exports = mongoose.model('Order', orderSchema);