const catchAsynch = require('../utils/catchAsynch');
const axios = require("axios");
const dotenv = require("dotenv");
const Product = require("../models/productModel");

const MergeList = require("../utils/MergeList");

dotenv.config({ path: './config.env' });

const headers = {
    'x-auth-token': process.env.storeino_token,
}

exports.getAllProducts = catchAsynch(async (req, res, _next) => {

    const response = await axios.get('https://api-stores.storeino.com/api/products/search?', {
        headers,
    });

    let items = [];

    response.data.results.forEach(item => items.push({
        itemId: item._id,
        name: item.name,
        type: item.type,
        price: item.price,
        outStock: item.outStock,
        description: item.html,
        seo: item.seo,
        options: item.options,
        variants: item.variants,
        images: item.images,
        storeId: item.storeId,
    }
    ));

    res.status(200).json({
        status: 'success',
        data: {
            products: items,
        },
    });
});

exports.getOneProduct = catchAsynch(async (req, res, _next) => {
    const headers = {
        'x-auth-token': process.env.storeino_token,
    }

    console.log(req.params.id);

    const response = await axios.get('https://api-stores.storeino.com/api/products/search?', {
        headers,
    });

    let items = [];

    response.data.results.forEach(item => items.push({
            itemId: item._id,
            name: item.name,
            type: item.type,
            price: item.price,
            outStock: item.outStock,
            description: item.html,
            seo: item.seo,
            options: item.options,
            variants: item.variants,
            images: item.images,
            storeId: item.storeId,
        }
    ));

    res.status(200).json({
        status: 'success',
        data: {
            products: items,
        },
    });
});

exports.createProduct  = catchAsynch(async (req, res, _next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            product,
        },
    });
});

exports.productInCategory = catchAsynch(async (req, res, _next) => {
    const category = req.params.category;
    const regex = '^'+category+":";
    const products = await Product.find({ "subcategories.slug": { $regex: regex } });

    let request = "https://api-stores.storeino.com/api/products/search?";

    products.forEach(product =>
        request = request + "_id-in[]=" + product._id + "&");

    // console.log(products);

    const response = await axios.get(request, {
        headers,
    });

    // console.log(response.data.results);

    const baseProduct = response.data.results;

    const mergedList = MergeList(baseProduct,products);

    res.status(200).json({
        status: 'success',
        data: {
            products: mergedList,
        },
    });
});