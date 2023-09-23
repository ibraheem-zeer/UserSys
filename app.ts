import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import usersRouter from './routes/uesr.js'

import dotenv from "dotenv"
import dataSource from './db/dataSource.js'
import { auth } from './middleware/auth/auth.js'

const app = express();
dotenv.config()
const PORT = 5000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', usersRouter);

app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () => {
    logger(`App is listening on port ${PORT}`);
    console.log(`App is listening on port ${PORT}`);
});

export default app;
