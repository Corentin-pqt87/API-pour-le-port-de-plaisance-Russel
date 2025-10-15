const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.authenticate = async (req , res , next) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email: email}, '-__v -createdAt -updateAt');

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign({
                        user: user
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });

                    res.header('Authorization', 'Bearer ' + token);

                    return res.status(200).json('authenticate_succed');
                }

                return res.status(403).json('authenticate_credentials');
            });

        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        return res.status(501).json(error)
    }
};
exports.getById = (req, res) => res.status(200).json({msg: 'getById not implemented'});
exports.add = async (req, res, next) => {
    const temp = ({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password:req.body.password
    });

    try {
        let user = await User.create(temp);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(501).json(error);
    }
};
exports.update = (req, res) => res.status(200).json({msg: 'update not implemented'});
exports.delete = (req, res) => res.status(200).json({msg: 'delete not implemented'});
