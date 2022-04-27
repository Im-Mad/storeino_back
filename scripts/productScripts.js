const axios = require("axios");
const dotenv = require("dotenv");
const Product = require("../models/productModel");
const fs = require("fs");
const mongoose = require("mongoose");

const headers = {
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI2MjAyZmFiNjEyZjJmZDA4MDllZDJmZDAifSwiaWF0IjoxNjQ3NzAxMTU2LCJleHAiOjE2NzkyMzcxNTZ9.GQGMrCDO_N57IIS2g9TUwy1DCipSRc-6oUNb1dJEx3E',
}
const query = "https://api-stores.storeino.com/api/products/search?limit=100";



dotenv.config({ path: `${__dirname}/../config.env` });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

console.log(DB);
const connectDB = async () => {
    mongoose
        .connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.log('Connected to DB successfully');
        }).catch(err => {
        console.log('Connected to DB unsuccessful');
    });

}

const downloadData = async () => {
    const response = await axios.get(query, {
        headers,
    });
    const products = [];
    response.data.results.forEach(result => {
        const product = {_id: result._id, name: result.name, categories: []};
        result.collections.map( collection => {
            const slug = collection.slug.split("2").join(":");
            product.categories.push(slug);
        });
        products.push(product);
    });
    const data = JSON.stringify(products, null, 4);
    await fs.writeFileSync(`${__dirname}/products.json`, data, 'utf-8');
};

const importData = async () => {
    await connectDB();
    const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));

    try {
        for(const product of products) {
            console.log(product.name);
            await Product.create(product);
        }
        console.log('Importation successfully');
        process.exit();
    } catch (err) {
        console.log(product);
        console.log(err);
    }
}

const deleteData = async () => {
    await connectDB();

    try {
        await Product.deleteMany();
        console.log('all file deleted');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};


if (process.argv[2] === '--download') {
    downloadData();
}

if (process.argv[2] === '--import') {
    importData();
}

if (process.argv[2] === '--delete') {
    deleteData();
}

