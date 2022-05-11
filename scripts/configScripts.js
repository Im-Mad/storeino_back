const axios = require("axios");
const dotenv = require("dotenv");
const Config = require("../models/configModel");
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

const importData = async () => {
    await connectDB();
    const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`, 'utf-8'));

    try {
        for (const item of config) {
            await Config.create(item);
        }
        console.log('Importation successfully');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

await importData();
