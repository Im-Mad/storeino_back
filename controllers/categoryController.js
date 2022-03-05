const catchAsynch = require('../utils/catchAsynch');
const Category = require('../models/categoryModel');

exports.getAllCategories = catchAsynch(async (req, res, _next) => {
    const category = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            category,
        },
    });
});

exports.getCategorie = catchAsynch(async (req, res, _next) => {
    const category = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            category,
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
