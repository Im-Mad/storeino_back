const mongoose = require('mongoose');
const slugify = require("slugify");
const AppError = require("../utils/AppError");
const { next } = require("lodash/seq");

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
        children: {
            type: Array,
            default: [],
        },
        level: {
            type: Number,
        },
      banner: String,
    },
    {
        versionKey: false
    }
)

// DOCUMENT MIDDLEWARE
categorySchema.pre('save', async function(next) {
    if( this.parents.length > 0 ) {
      this.slug = slugify(this.parents + ":" + this.name, {lower: true});
      const filter = {slug: this.parents, 'children.slug': { $ne: this.slug }};
      const update = {$addToSet: { children: {slug: this.slug, name: this.name} }};
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
      this.children = [];
      this.level = 0;
    }
    next();
  }
);
categorySchema.pre('updateOne', async function(next) {
    const query = this.getQuery();
    const update = this.getUpdate()[0]['$set'];
    console.log(update);
    if(update.parents) {
      update.slug = slugify(update.parents + ":" + update.name, {lower: true});
      const filter = {slug: update.parents, 'children.slug': { $ne: this.slug }};
      const updateParents = {$addToSet: { children: {slug: this.slug, name: this.name} }};
      const parent = await Category.findOneAndUpdate(filter, updateParents);
      if (!parent) return next(new AppError('No such parent category', 404));
      update.parents = parent.parents;
      update.parents.push(
        {
          name: parent.name,
          slug: parent.slug
        }
      );
      update.level = update.parents.length;
    } else {
      const category = await Category.findOne(query);
      const slug = slugify(update.name, {lower: true});
      if (!category) return next(new AppError('No such category', 404));
      if (category.slug.includes(':'))
        update.slug = [category.slug.split(':').slice(0,-1), slug].join(':');
      else
        update.slug = slug;
    }
      this.setUpdate({ $set: update})
    next();
  });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;