const mongoose = require('mongoose');

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
        subCategories: {
            type: Array,
            default: [],
        }
    }
)