const mongoose = require('mongoose');
const Category = require('./categoryModel');
const AppError = require('../utils/AppError');
const slugify = require("slugify");

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A category must have a name'],
            trim: true
        },
        slug: {
            type: String,
        },
        category: Object
    },
    {
        versionKey: false
    }
)

// DOCUMENT MIDDLEWARE
subcategorySchema.pre('save', async function(next) {
    this.slug = slugify(this.category+":"+this.name, { lower: true });
    const filter = { name: this.category, 'subcategories.slug' : { $ne : this.slug }};
    const update = {$addToSet: {subcategories: {slug: this.slug, name: this.name}}};
    const category = await Category.findOneAndUpdate(filter,update).select(['-__v','-subcategories']);
    if(!category) return next(new AppError('No such category or subcategory already existing ',404));
    this.category = category;
    next();
})

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;