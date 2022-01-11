module.exports = (app) => {
    const userRouter = require('@/app/routes/users.routes.js');
    const spotsRouter = require('@/app/routes/spots.routes.js');

    app.use('/users', userRouter);
    app.use('/spots', spotsRouter);
};
