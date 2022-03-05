const mongoose = require('mongoose');
const Category = require('./categoryModel');
const AppError = require('../utils/AppError');

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A category must have a name'],
            unique: true,
            trim: true
        },
        category: Array
    }
)

// DOCUMENT MIDDLEWARE
subcategorySchema.pre('save', async function(next) {
    const category = await Category.findOne({ name: this.category });
    if(!category) return next(new AppError('No such category',404));
    this.category = category;
    next();
})

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;