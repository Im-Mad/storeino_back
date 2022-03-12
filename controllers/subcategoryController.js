const catchAsynch = require('../utils/catchAsynch');
const Subcategory = require('../models/subcategoryModel');

exports.getAllSubcategories = catchAsynch(async (req, res, _next) => {
    const subcategories = await Subcategory.find();

    res.status(201).json({
        status: 'success',
        data: {
            subcategories,
        },
    });
});

exports.getSubcategory = catchAsynch(async (req, res, _next) => {

});

exports.createSubcategory = catchAsynch(async (req, res, _next) => {
    const subcategory = await Subcategory.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            subcategory,
        },
    });
});
