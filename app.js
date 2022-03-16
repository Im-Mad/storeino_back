const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
//const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');

dotenv.config({ path: './config.env' });

const app = express();

// 1) Global middlewares
// Serving static files'
// app.use(express.static(path.join(__dirname, 'public')));

//Set security HTTP
app.use(helmet());

// Limit request from same IP
const limiter = rateLimit({
    max: 100,
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
app.use(
    hpp({
        whitelist: [
            'duration',
            'ratingQuantity',
            'ratingAverage',
            'maxGroupSize',
            'difficulty',
            'price',
        ],
    })
);


// 3) Routes
app.use('/products', productRouter);
app.use('/category', categoryRouter);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// USE THE GLOBAL ERROR HANDLER AS AN ERROR MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
