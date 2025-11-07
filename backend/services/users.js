const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { name } = require('ejs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.authenticate = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }, '-__v -createdAt -updateAt');

    if (!user) {
      return res.status(404).json({ status: "user_not_found" });
    }

    // bcrypt.compare avec await
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(403).json({ status: "authenticate_credentials" });
    }

    // Supprimer le mot de passe avant de renvoyer l'utilisateur
    delete user._doc.password;

    // Génération du token JWT
    const token = jwt.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: 24 * 60 * 60,
    });

    // Ajouter le token dans les headers
    res.header('Authorization', 'Bearer ' + token);

    return res.status(200).json({ status: "authenticate_succed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message);
  }
};
exports.getById = async (req, res, next) => {
    const id = req.params.id

    try {
        let user = await User.findById(id);

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json({ status: "user_not_found" });
    }
    catch (error){
        return res.status(501).json(error);
    }
};

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
exports.update = async (req, res, next) => {
    const id = req.params.id
    const temp = ({
        name    : req.body.name,
        firstname: req.body.firstname,
        email   : req.body.email,
        password: req.body.password
    });

    try {
        let user = await User.findOne({_id : id});

        if (user) {
            Object.keys(temp).forEach((keys) => {
                if (!!temp[keys]) {
                    user[keys] = temp[keys];
                }
            });
            
            await user.save();
            return res.status(201).json(user);
        }
    }
    catch (error) {
        return res.status(501).json(error);
        
    }
};
exports.delete =   async (req, res, next) => {
    const id = req.params.id

    try {
        await User.deleteOne({_id : id});

        return res.status(204).json('delete_ok');
    }
    catch (error) {
        return res.status(501).json(error);
    }
};
