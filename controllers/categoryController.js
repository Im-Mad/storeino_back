const catchAsynch = require('../utils/catchAsynch');
const Category = require('../models/categoryModel');
const AppError = require("../utils/AppError");

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

exports.deleteCategory = catchAsynch(async (req, res, next) => {
    const category = await Category.findOne({ slug: req.params.category });
    if(!category) return next(new AppError("No category found",404));
    if(category.childrens.length > 0) return next(new AppError("Category has children, cannot delete",404));

    if(category.level > 0) {
        const filter = { slug: category.parents[category.parents.length -1].slug };
        const update = { $pull: { childrens: { slug: category.slug, name: category.name } } };
        await Category.updateMany(filter, update);
    }

    await category.delete();

    res.status(202).json({
        status: 'success'
    });
});
