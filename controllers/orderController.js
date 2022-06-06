const catchAsync = require('../utils/catchAsynch');
const Api = require('../utils/StoreinoAPI');
const Order = require('../models/orderModel');
const FilterManager = require("../utils/FilterManager");
const AppError = require("../utils/AppError");
const pagination = require("../utils/pagination");
const MergeList = require("../utils/MergeList");

exports.placeOrder = catchAsync(async (req, res, _next) => {
    const body = req.body;
    const customer = {
        "firstname": body.customer.firstname,
        "lastname": body.customer.lastname,
        "email": body.customer.email,
        "phone": body.customer.phone,
        "address": {
            "address1": body.shipping.address.address1,
            "country": body.shipping.address.country,
            "province": body.shipping.address.province,
            "city": body.shipping.address.city,
            "firstname": body.customer.firstname,
            "lastname": body.customer.lastname,
            "phone": body.customer.phone,
        }
    }
    const customerResponse = await Api.post('customers','create', customer);
    const id = customerResponse.data.customer._id;

    if (customerResponse.status !== 200)
        res.status(401).json({
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
                "city": body.shipping.address.city,
                "firstname": body.customer.firstname,
                "lastname": body.customer.lastname,
                "phone": body.customer.phone,
            },
            "shipper": {
                _id: body.shipping.shipper._id,
                name: body.shipping.shipper.name
            },
            zone: body.shipping.shipper.zone
        },
        "details":body.details,
        "method": {
            _id: body.method._id
        }
    };
    let response ;
    try {
    response = await Api.post('orders', 'create', data);
    }catch (e){
        console.log(e)
    }
    await Order.create({_id: response.data.result._id, customer:response.data.result.customer._id})
    res.status(200).json({
        result: response.data.result
    })
});

exports.getAllOrders = catchAsync(async (req, res, _next) => {

    const filterManager = new FilterManager(Order.find(), req.query)
      .filter();

    const orders = await filterManager.query;

    if(orders.length === 0) {
        return next(new AppError("No order found",404));
    }

    const {list, paginate } = pagination.paginate(req,orders);

    let ordersIds = [];
    list.forEach(order => ordersIds.push(order._id));

    const response = await Api.adminGet('orders','search',  { '_id-in':ordersIds});

    const baseProduct = response.data.results;

    const mergedList = MergeList(baseProduct,list);

    res.status(200).json({
        result: mergedList,
        paginate
    });
});