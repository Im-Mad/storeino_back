const catchAsynch = require('../utils/catchAsynch');
const Category = require('../models/categoryModel');
const AppError = require("../utils/AppError");
const FilterManager = require("../utils/FilterManager");

exports.getAllCategories = catchAsynch(async (req, res, _next) => {

    const filterManager = new FilterManager(Category.find(), req.query)
      .filter()
      .sort()
      .limitFields();

    const categories = await filterManager.query;

    res.status(200).json({
        result: categories,
    });
});

exports.createCategory = catchAsynch(async (req, res, _next) => {
    const category = await Category.create(req.body);

    res.status(201).json({
        result: category,
    });
});

exports.getCategory = catchAsynch(async (req, res, _next) => {
    const category = await Category.find({ slug: req.params.slug });

    res.status(200).json({
        result: category,
    });
});

exports.deleteCategory = catchAsynch(async (req, res, next) => {
    const category = await Category.findOne({ slug: req.params.slug });
    if(!category) return next(new AppError("No category found",404));
    console.log(category);
    if(category.children.length > 0) return next(new AppError("Category has children, cannot delete",404));
    await category.delete();

    if(category.level > 0) {
        const filter = { slug: category.parents[category.parents.length -1].slug };
        const update = { $pull: { childrens: { slug: category.slug, name: category.name } } };
        await Category.updateMany(filter, update);
    }

    res.status(202).send();
});

exports.rootCategories = catchAsynch(async (req, res, _next) => {
    const categories = await Category.find({ level: 1 });

    res.status(200).json({
        result: categories,
    });
});