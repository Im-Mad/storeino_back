const catchAsynch = require('../utils/catchAsynch');
const AppError = require("../utils/AppError");
const Api = require('../utils/StoreinoAPI');
const Order = require('../models/orderModel');

exports.placeOrder = catchAsynch(async (req, res, _next) => {
    const body = req.body;
    const customer = {
        "firstname": body.customer.firstname,
        "lastname": body.customer.lastname,
        "email": body.customer.email,
        "phone": body.shipping.address.phone,
        "ipAddress": body.ipAddress,
        "address": {
            "address1": body.shipping.address.address1,
            "country": body.shipping.address.country,
            "province": body.shipping.address.province,
            "city": body.shipping.address.city,
            "firstname": body.customer.firstname,
            "lastname": body.customer.lastname,
            "phone": body.shipping.address.phone,
        }
    }


    const customerResponse = await Api.post('customers','create', customer);
    const id = customerResponse.data.customer._id;

    if (customerResponse.status != 200)
        res.status(4001).json({
            customerResponse
        });

    const data = {
        "customer": {
            "_id": id,
            "firstname": body.customer.firstname,
            "lastname": body.customer.lastname,
            "email": body.customer.email,
        },
        "shipping": {
            "price": body.shipping.price,
            "address": {
                "address1": body.shipping.address.address1,
                "country":body.shipping.address.country,
                "province": body.shipping.address.province,
                "city": body.shipping.address.city.name,
                "firstname": body.customer.firstname,
                "lastname": body.customer.lastname,
                "phone": body.shipping.address.phone,
            }
        },
        "details":body.details,
        "method": body.method
    };

    console.log(data);
    console.log('now im here')
    const response = await Api.post('orders', 'create', {...data});
    console.log(response.data);
    await Order.create({_id: response.data.result._id, customer:response.data.result.customer._id})
    res.status(200).json({
        _id: response.data.result._id,
        customer:response.data.result.customer._id
    })
});