const mongoose = require('mongoose');
const AppError = require("../utils/AppError");
const Category = require("./categoryModel");

const productSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },
        categories: {
            type: Array,
            required: [true, 'A product must have at least one valid category']
        }
    },
    {
        versionKey: false
    }
)


// TODO check if the product exist in the STOREINO DB Before INSERT IT


// DOCUMENT MIDDLEWARE
productSchema.pre('save', async function(next) {
    const categories = await Category.find({slug: this.categories }).select(['slug']);
    if(categories.length === 0) return next(new AppError("A product must have at least one valid subcategory",404));
    this.categories = categories;
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;