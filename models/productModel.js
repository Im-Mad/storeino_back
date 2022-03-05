const mongoose = require('mongoose');
const AppError = require("../utils/AppError");
const Subcategory = require("./subcategoryModel");

const productSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: [true, 'A product must have a name'],
            unique: true,
            trim: true
        },
        slug: {
            type: String,
        },
        subcategories: {
            type: Array,
            required: true,
        }
    }
)

// DOCUMENT MIDDLEWARE
productSchema.pre('save', async function(next) {
    const categoriesPromises = this.subcategories.map(async name => await Subcategory.findOne({ name }));
    const response = await Promise.all(categoriesPromises);
    const categories = response.filter(el => el !== null);
    if(categories.length === 0) return next(new AppError("A product must have at least one valid subcategory",404));
    this.subcategories = categories;
    next();
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;