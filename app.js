const express = require('express');

const app = express();

app.use(express.json());

const db = require('./config/db')

const globalerr=require('./utils/globalerr')

const UserProfile = require('./model/userprofile')

const users = require('./model/user')

const router = require('./router/user_router')

app.use(router)

app.all('*', (req, res, next) => {
    const err = new CustomError(404, `can't find ${req.originalUrl} on the server!`);
    next(err);
})

app.use(globalerr)

const port = 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
