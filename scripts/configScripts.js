const dotenv = require("dotenv");
const Config = require("../models/configModel");
const fs = require("fs");
const mongoose = require("mongoose");

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

importData();
