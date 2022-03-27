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
const query = "https://api-stores.storeino.com/api/collections/search?limit=100&sort=_id+asc";
const query2 = "https://api-stores.storeino.com/api/collections/update/?id="
const writeFile = 'collection.json';

var postData = {
    slug: "test@test.com",
};

let axiosConfig = {
    headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZSI6eyJfaWQiOiI2MjAyZmFiNjEyZjJmZDA4MDllZDJmZDAiLCJuYW1lIjoicGZhIiwic3ViZG9tYWluIjoicGZhLnN0b3JlaW5vLmNvbSJ9LCJ1c2VyIjp7Il9pZCI6IjYyMDJmYWIxMTJmMmZkMDgwOWVkMmZjNyIsImZpcnN0bmFtZSI6InJhY2hpZCIsImxhc3RuYW1lIjoiZWwgYWlzc2FvdWkiLCJlbWFpbCI6InJhLmVsYWlzc2FvdWlAZ21haWwuY29tIn0sImNvbXBhbnkiOnsic3RhdHVzIjoiVU5DT01QTEVURUQiLCJfaWQiOiI2MjAyZmFiMTEyZjJmZDA4MDllZDJmYzUiLCJuYW1lIjoicGZhIn0sImlhdCI6MTY0ODExNjE2OCwiZXhwIjoxNjc5NjUyMTY4fQ.rv95dzgk-zCFb0e0u00_zT1odjQXMRfi9AGcMcuc_vA',
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

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


const categories = JSON.parse(fs.readFileSync(`${__dirname}/collection.json`, 'utf-8'));

const importData = async () => {
    try {
        for(const category of categories) {
            const par = category.parents+"";
            if(!!category.parents) {
                category.parents = par.split("2").join(":");
            }
            await Category.create(category);
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
        return {slug:slugify(parent[0].name, {lower: true}), parent: parent[0].parent};
    }
    const categories = [];
    for (const result of response.data.results) {
        const category = {
            name:result.name
        };
        let parent = result.parent
        while (parent) {
            const foundParent = findParent(parent);
            let separator = '2';
            if (!category.parents){
                category.parents = '';
                separator = '';
            }

            category.parents = foundParent.slug + separator + category.parents;
            parent = foundParent.parent;
        }
        categories.push(category);
        const query3 = query2+result._id;
        if(!category.parents) {
            postData.slug = slugify(category.name, {lower: true} );
        } else {
            postData.slug = category.parents +"2"+slugify(category.name, {lower: true} );
        }

        console.log(query3)
        console.log(postData)
        axios.post(query3, postData, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res.data.slug);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ");
            })

    }
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
