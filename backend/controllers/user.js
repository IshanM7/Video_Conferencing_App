const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.getAllUsers = async (req, res, next) => {
    try{
        const [allUsers] = await User.getUsers();
        res.status(200).json(allUsers);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getName = async (req, res, next) => {
    try{
        const user = await User.getName(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.postUser = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log('error');
        return;
    }
    const email = req.body.email;
    const password = req.body.password;
    try{
        
        const user = await User.findEmail(req.body.email);

        if(user[0].length >= 1){
            const error = new Error('A user with this email exists');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];

        
        const postResponse = await User.post(
            req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        res.status(201).json(postResponse);
        
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateUserEmail = async (req, res, next) => {
    try{
        const updateResponse = await User.updateEmail(
            req.body.id, req.body.email);
        res.status(201).json(updateResponse);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteAccount = async (req, res, next) => {
    try{
        const deleteResponse = await User.deleteAccount(req.params.id);
        res.status(201).json(deleteResponse);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateUserPassword = async (req, res, next) => {
    try{
        const updateResponse = await User.updatePassword(req.body.id, req.body.password);
        res.status(201).json(updateResponse);
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await User.findEmail(req.body.email);
        if(user[0].length !== 1){
            const error = new Error('A user with this email could not be found');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];

        if((password.localeCompare(storedUser.password)) != 0){
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                email: storedUser.email,
                id: storedUser.id
            },
            'secretfortoken',
            { expiresIn: '1h' }
        );

        res.status(200).json({token: token, id: storedUser.id});

    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
