const Product = require("../models/productModel");
const catchAsync = require('../utils/catchAsynch');
const MergeList = require("../utils/MergeList");
const AppError = require("../utils/AppError");
const FilterManager = require("../utils/FilterManager");
const Api = require("../utils/StoreinoAPI");
const pagination = require("../utils/pagination")

exports.createProduct  = catchAsync(async (req, res, _next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            product,
        },
    });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {

    const filterManager = new FilterManager(Product.find(), req.query)
        .filter()
        .sort()
        .limitFields();

    const products = await filterManager.query;

    if(products.length === 0) {
        return next(new AppError("No product found",404));
    }

    const {productList, paginate } = pagination.paginate(req,products);

    let productsIds = [];
    productList.forEach(product => productsIds.push(product._id));

    const baseProduct = await Api.get('products','search',  { '_id-in':productsIds});

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

exports.productInCategory = catchAsync(async (req, res, next) => {
    const category = req.params.slug;
    const regex = '^'+category;

    const filterManager = new FilterManager(Product.find({ "categories.slug": { $regex: regex } } ), req.query)
        .filter()
        .sort()
        .limitFields();

    const products = await filterManager.query;

    if(products.length === 0) {
        return next(new AppError("No product found",404));
    }

    const {productList, paginate } = pagination.paginate(req,products);

    let productsIds = [];
    productList.forEach(product => productsIds.push(product._id));

    const baseProduct = await new Api.get('products', 'search', { '_id-in': productsIds});

    const mergedList = MergeList(baseProduct,products);

    res.status(200).json({
        status: 'success',
        data: {
            products: mergedList,
        },
        paginate
    });
});
