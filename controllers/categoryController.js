const catchAsynch = require('../utils/catchAsynch');
const Category = require('../models/categoryModel');

exports.getAllCategories = catchAsynch(async (req, res, _next) => {
    const categories = await Category.find();

    res.status(201).json({
        status: 'success',
        data: {
            categories,
        },
    });
});

exports.createCategory = catchAsynch(async (req, res, _next) => {
    const category = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            category,
        },
    });
});
