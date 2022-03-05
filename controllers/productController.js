const catchAsynch = require('../utils/catchAsynch');
const axios = require("axios");
const dotenv = require("dotenv");
const Product = require("../models/productModel");

dotenv.config({ path: './config.env' });


exports.getAllProducts = catchAsynch(async (req, res, _next) => {
    const headers = {
        'x-auth-token': process.env.storeino_token,
    }

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