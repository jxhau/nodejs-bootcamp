const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

/// 1 - MIDDLEWARES
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));  
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); // serve static file

app.use((req, res, next) => {
    console.log('Hello from the server side!');
    next()
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

/// 3 - ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;