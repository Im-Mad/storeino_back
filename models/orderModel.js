const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'Order must have an id'],
        trim: true
    },
    customer: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', orderSchema);