const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(cookieParser());

async function authorize(req, res, next){
    try{
        const tokenCookie = req.headers.authorization;
        if (tokenCookie) {
                console.log(tokenCookie);
                const user = jwt.verify(tokenCookie, process.env.SECRET_KEY);
                console.log(user);
                if(user.id){
                    req.user = user;
                    next();
                }else{
                    res.status(401).json("unauthorized");
                }
                console.log(user);
        }else {
            res.status(401).json("you need to login first");
        }
    }catch(error){
        res.status(400).json(error);
    }
};

module.exports = {
    authorize
};