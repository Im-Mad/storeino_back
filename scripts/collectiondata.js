const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../models/categoryModel');
const axios = require('axios');

dotenv.config({ path: `${__dirname}/../config.env` });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

console.log(DB);

mongoose
    .connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('Connected eto DB successfully');
    });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/categories.json`, 'utf-8'));

const importData = async () => {
    try {
        for(const tour in tours) {
            await Tour.create(tours[tour]);
        }
        console.log('Importation successfully');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('all file deleted');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

if (process.argv[2] === '--import') {
    importData();
}
if (process.argv[2] === '--delete') {
    deleteData();
}
