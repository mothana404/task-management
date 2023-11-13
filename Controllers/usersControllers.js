// const { Users } = require('../Models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Cookies = require('js-cookie');
const user = require('../Models/users');

require('dotenv').config();

const schema = Joi.object({
    user_name : Joi.string().alphanum().min(3).max(10).required(),
    user_email : Joi.string().email().required(),
    user_password : Joi.string().required(),
});

function validation(user_name, user_email, user_password){
const valid = schema.validate({user_name, user_email, user_password});
    if (valid.error == undefined){
        return true;
    }else {
        return false;
    }
};

async function createUser (req, res){
  try {
    const { user_name, user_email, user_password } = req.body;
    const valid = validation(user_name, user_email, user_password);
    console.log(valid);
    console.log(user_name, user_email, user_password);
    if (valid){
        let new_password = await bcrypt.hash(user_password, 10);
        const newuser = new user();
        newuser.user_name = user_name;
        newuser.user_email = user_email;
        newuser.user_password = new_password;
        newuser.save();
        const id = await user.findOne({
            user_email : user_email
        });
        console.log(id.id);
        const accessToken = jwt.sign({ id : id.id }, process.env.SECRET_KEY, {expiresIn: '4h'});
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.status(201).json(accessToken);
    }else {
        res.status(400).json("Invalid input");
    }
  } catch (error) {
        res.status(500).json({ error: 'Error in user model createUser' });
  }
};

async function loginUser (req, res){
    try {
      const { user_email, user_password } = req.body;
      const valid = validation("name", user_email, user_password);
      if (valid){
            const theuser = await user.findOne({
                user_email : user_email
            });
          if (theuser && theuser.user_email === user_email) {
                bcrypt.compare(user_password , theuser.user_password, (error, result) => {
                if (error) {
                    console.log(error); // test
                    res.status(400).json(error);
                } else if (result) {
                    const accessToken = jwt.sign({id : theuser.id, email : user.user_email}, process.env.SECRET_KEY, {expiresIn: '4h'});
                    res.cookie("accessToken", accessToken, { httpOnly: true });
                    console.log(accessToken); // test
                    res.status(200).json(accessToken);
                } else {
                    res.status(400).json('incorrect password');
                }
                });
          }else {
            res.status(401).json({ error: 'Email not found' });
          }
      } else {
            res.status(400).json("Invalid inputs");
      }
    }catch (error) {
        console.error(error);// test
        res.status(500).json({ error: 'Email not found' });
    }
};

module.exports = {
    createUser,
    loginUser
};