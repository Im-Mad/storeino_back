const mongoose = require('mongoose');
const slugify = require("slugify");
const AppError = require("../utils/AppError");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A category must have a name'],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        parents: {
            type: Array,
        },
        childs: {
            type: Array,
            default: [],
        }
    },
    {
        versionKey: false
    }
)

// DOCUMENT MIDDLEWARE
categorySchema.pre('save', async function(next) {
    if(this.parents !== null) {
        this.slug = slugify(this.parents + ":" + this.name, {lower: true});
        console.log(this.slug);
        const filter = {slug: this.parents, 'child.slug': { $ne: this.slug }};
        const update = {$addToSet: { childs: {slug: this.slug, name: this.name} }};
        const parent = await Category.findOneAndUpdate(filter, update).select(['-__v', '-subcategories']);
        if (!parent) return next(new AppError('No such parent category or subcategory already existing ', 404));
        this.parents = parent.parents;
        this.parents.push(
            {
                name: parent.name,
                slug: parent.slug
            }
        );
    } else {
        this.slug = slugify(this.name, {lower: true});
        this.parents = [];
        this.childs = [];
    }
    next();
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;