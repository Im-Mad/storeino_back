const Product = require("../models/productModel");
const catchAsynch = require('../utils/catchAsynch');
const MergeList = require("../utils/MergeList");
const AppError = require("../utils/AppError");
const FilterManager = require("../utils/FilterManager");
const StoreinoAPI = require("../utils/StoreinoAPI");
const pagination = require("../utils/pagination")

exports.createProduct  = catchAsynch(async (req, res, _next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            product,
        },
    });
});

exports.getAllProducts = catchAsynch(async (req, res, next) => {

    const filterManager = new FilterManager(Product.find(), req.query)
        .filter()
        .sort()
        .limitFields();

    const products = await filterManager.query;

    if(products.length === 0) {
        return next(new AppError("No product found",404));
    }

    const {productList, paginate } = pagination.paginate(req,products);

    let query = "";
    productList.forEach(product =>
        query = query + "_id-in[]=" + product._id + "&");

    const baseProduct = await new StoreinoAPI(query).ApiCall();

    const mergedList = MergeList(baseProduct,productList);

    res.status(200).json({
        status: 'success',
        length: mergedList.length,
        data: {
            products: mergedList,
        },
        paginate
    });
});

exports.productInCategory = catchAsynch(async (req, res, next) => {
    const category = req.params.category;
    const regex = '^'+category+":";
    const products = await Product.find({ "categories.slug": { $regex: regex } } );

    if(products.length === 0) {
        return next(new AppError("No product found",404));
    }

    let query = "";

    products.forEach(product =>
        query = query + "_id-in[]=" + product._id + "&");

    const baseProduct = await new StoreinoAPI(query).ApiCall();

    const mergedList = MergeList(baseProduct,products);

    res.status(200).json({
        status: 'success',
        data: {
            products: mergedList,
        },
    });
});
