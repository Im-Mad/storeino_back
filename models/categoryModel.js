const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A category must have a name'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        subcategories: {
            type: Array,
            default: [],
        }
    },
    {
        versionKey: false
    }
)

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;