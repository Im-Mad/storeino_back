const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/categoryModel');
const axios = require('axios');
const slugify = require("slugify");

dotenv.config({ path: `${__dirname}/../config.env` });


const headers = {
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI2MjAyZmFiNjEyZjJmZDA4MDllZDJmZDAifSwiaWF0IjoxNjQ3NzAxMTU2LCJleHAiOjE2NzkyMzcxNTZ9.GQGMrCDO_N57IIS2g9TUwy1DCipSRc-6oUNb1dJEx3E',
}
const query = "https://api-stores.storeino.com/api/collections/search?limit=100";
const writeFile = 'collection.json';


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

// console.log(DB);

function dbconnection() {
    mongoose
        .connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.log('Connected to DB successfully');
        });
}


const categories = JSON.parse(fs.readFileSync(`${__dirname}/${writeFile}`, 'utf-8'));

const importData = async () => {
    try {
        for(const category of categories) {
            console.log(category);
            await Category.create(categories[category]);
        }
        console.log('Importation successfully');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

const deleteData = async () => {
    try {
        await Category.deleteMany();
        console.log('all file deleted');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

const downloadData = async () => {
    const response = await axios.get(query, {
        headers,
    });
    const results = response.data.results;
    const findParent = (id) => {
        const parent = results.filter(result => result._id === id);
        // console.log(parent)
        return {slug:parent[0].slug, parent: parent[0].parent};
    }
    const categories = [];
    response.data.results.forEach(result => {
        const category = {
            name:result.name
        };
        let parent = result.parent
        while (parent) {
            const foundParent = findParent(parent);
            let separator = ':';
            if (!category.parents){
                category.parents = '';
                separator = '';
            }

            category.parents = foundParent.slug + separator + category.parents;
            parent = foundParent.parent;
        }

        categories.push(category);
        console.log(category);


    });
    const data = JSON.stringify(categories, null, 4);
    await fs.writeFileSync(`${__dirname}/${writeFile}`, data, 'utf-8');
}

if (process.argv[2] === '--import') {
    dbconnection();
    importData();
}

if(process.argv[2] === '--download'){
    downloadData();
}

if (process.argv[2] === '--delete') {
    dbconnection();
    deleteData();
}
