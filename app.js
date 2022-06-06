const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require("morgan");
//const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const orderRouter = require('./routes/orderRoutes');
const authRouter = require('./routes/authRoutes')
const configRouter = require('./routes/configRoutes')
const locationRouter = require('./routes/LocationRoutes')


dotenv.config({ path: './config.env' });

const app = express();

// 1) Global middlewares
// Serving static files'
// app.use(express.static(path.join(__dirname, 'public')));

//Set security HTTP
app.use(helmet());

// dev mode
app.use(morgan('dev'));

// Allow access control allow origin
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// Limit request from same IP
const limiter = rateLimit({
    max: 10000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour !',
});

app.use('/', limiter); // affect route that start in api only

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // to get access to data from form in req.body
app.use(cookieParser());

// Data sanitization against NoSQL query injection
//app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//     hpp({
//         whitelist: [
//             'duration',
//             'ratingQuantity',
//             'ratingAverage',
//             'maxGroupSize',
//             'difficulty',
//             'price',
//         ],
//     })
// );


// 3) Routes
app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/orders', orderRouter);
app.use('/auth', authRouter);
app.use('/config', configRouter);
app.use('', locationRouter);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// USE THE GLOBAL ERROR HANDLER AS AN ERROR MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
