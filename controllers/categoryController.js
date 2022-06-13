const catchAsynch = require('../utils/catchAsynch');
const Category = require('../models/categoryModel');
const AppError = require("../utils/AppError");
const FilterManager = require("../utils/FilterManager");
const pagination = require("../utils/pagination");
const Config = require("../models/configModel");
const Api = require("../utils/StoreinoAPI");

exports.getAllCategories = catchAsynch(async (req, res, _next) => {

    const filterManager = new FilterManager(Category.find(), req.query)
      .filter()
      .sort()
      .limitFields();

    const categories = await filterManager.query;
    const {list, paginate } = pagination.paginate(req,categories);
    res.status(200).json({
        result: list,
        paginate
    });
});

exports.createCategory = catchAsynch(async (req, res, _next) => {
    if (req.body.banner){
        const response = await Api.adminPost('images','create',  {
            src: req.body.banner
        });
        req.body.banner = response.data.src;
    }
    const category = await Category.create(req.body);


    res.status(201).json({
        result: category,
    });
});

exports.getCategory = catchAsynch(async (req, res, _next) => {
    const category = await Category.findOne({ slug: req.params.slug });

    if (!category)
        res.status(404).send();
    else
        res.status(200).json({
            result: category,
        });
});

exports.deleteCategory = catchAsynch(async (req, res, next) => {
    const category = await Category.findOne({ slug: req.params.slug });
    if(!category) return next(new AppError("No category found",404));
    if(category.children.length > 0) return next(new AppError("Category has children, cannot delete",404));
    await category.delete();

    if(category.level > 0) {
        const filter = { slug: category.parents[category.parents.length -1].slug };
        const update = { $pull: { children: { slug: category.slug, name: category.name } } };
        await Category.updateMany(filter, update);
    }

    res.status(204).send();
});

exports.rootCategories = catchAsynch(async (req, res, _next) => {
    const categories = await Category.find({ level: 1 });

    res.status(200).json({
        result: categories,
    });
});

exports.editCategory = catchAsynch(async (req, res, _next) => {
    const update = {};
    if (req.body.parent)
        update.parents = req.body.parent;
    if (req.body.name)
        update.name = req.body.name;
    if (req.body.banner){
        const response = await Api.adminPost('images','create',  {
            src: req.body.banner
        });
        update.banner = response.data.src;
    }


    await Category.updateOne(
      {slug: req.params.slug},
      [{$set: {...update}}]
    );

    res.status(200).send();
});