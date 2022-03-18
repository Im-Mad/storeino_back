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
        childrens: {
            type: Array,
            default: [],
        },
        level: {
            type: Number,
        }
    },
    {
        versionKey: false
    }
)

// DOCUMENT MIDDLEWARE
categorySchema.pre('save', async function(next) {
    if( this.parents.length > 0 ) {
        this.slug = slugify(this.parents + ":" + this.name, {lower: true});
        const filter = {slug: this.parents, 'child.slug': { $ne: this.slug }};
        const update = {$addToSet: { childrens: {slug: this.slug, name: this.name} }};
        const parent = await Category.findOneAndUpdate(filter, update);
        if (!parent) return next(new AppError('No such parent category', 404));
        this.parents = parent.parents;
        this.parents.push(
            {
                name: parent.name,
                slug: parent.slug
            }
        );
        this.level = this.parents.length;
    } else {
        this.slug = slugify(this.name, {lower: true});
        this.parents = [];
        this.childs = [];
        this.level = 0;
    }
    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;