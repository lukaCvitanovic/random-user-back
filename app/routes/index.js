module.exports = (app) => {
    const userRouter = require('@/app/routes/users.routes.js');
    const spotsRouter = require('@/app/routes/spots.routes.js');
    const categoriesRouter = require('@/app/routes/categories.routes.js');
    const commentsRouter = require('@/app/routes/comments.routes.js');
    const authRouter = require('@/app/routes/auth.routes.js');

    app.use('/users', userRouter);
    app.use('/spots', spotsRouter);
    app.use('/categories', categoriesRouter);
    app.use('/comments', commentsRouter);
    app.use('/auth', authRouter);
};
