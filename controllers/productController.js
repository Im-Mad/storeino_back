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

    const {list, paginate } = pagination.paginate(req,products);

    let productsIds = [];
    list.forEach(product => productsIds.push(product._id));

    const response = await Api.get('products','search',  { '_id-in':productsIds});

    const baseProduct = response.data.results;

    const mergedList = MergeList(baseProduct,list);

    res.status(200).json({
        result: mergedList,
        paginate
    });
});

exports.productInCategory = catchAsync(async (req, res, next) => {
    const category = req.params.slug;
    let regex;
    if(category === 'all') {
        regex = '.*';
    } else {
        regex = '^'+category;
    }


    const filterManager = new FilterManager(Product.find({ "categories.slug": { $regex: regex } } ), req.query)
        .filter()
        .sort()
        .limitFields();

    const products = await filterManager.query;

    if(products.length === 0) {
        return next(new AppError("No product found",404));
    }

    const {list, paginate } = pagination.paginate(req,products);

    let productsIds = [];
    list.forEach(product => productsIds.push(product._id));

    const response = await Api.get('products', 'search', { '_id-in': productsIds});

    const baseProduct = response.data.results;

    const mergedList = MergeList(baseProduct,products);

    res.status(200).json({
        result:  mergedList,
        paginate
    });
});

exports.getOneProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const product = await Product.findOne({ "_id": id } );


    if(product == null) {
        return next(new AppError("No product found",404));
    }

    const response = await Api.get('products', 'get', { '_id': product._id});

    const baseProduct = response.data;


    const mergedProduct = { ...baseProduct, ...product._doc };

    res.status(200).json({
        result:  mergedProduct
    });
});
