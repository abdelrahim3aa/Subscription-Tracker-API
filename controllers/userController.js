import User from '../models/User.js'; 
import { validationResult } from "express-validator";
import generateToken from '../utils/generateToken.js';

export const getAllUsers = async (req, res, next) => {
    // Fetch all users from DB
    const users = await User.find().select('-password'); 
    res.status(200).json(users);
}; 

export const getUser = async (req, res, next) => {
    const userId = req.params.id; 
    const user = await User.findById(userId).select('-password'); 
    if (!user) return res.status(404).json({ message: `sorry!, User with id ${userId} not found...` }); 
    res.status(200).json(user); 
}; 

export const createUser = async (req, res, next) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); 

    const { name,  email, password } = req.body; 
    try {
        const exists = await User.findOne({email}); 
        if (exists) return res.status(400).json({ message: 'User already exists' }); 

        const user = await User.create({
            name, email, password
        }); 
        res.status(201).json({
        user: { id: user._id, name: user.name, email: user.email },
        token: generateToken(user._id)
        });
    } catch (error) {
        next(error); 
    }
}; 

export const updateUser = async (req, res, next) => {
    const userId = req.params.id; 
    try { 
        const user = await User.findById(userId).select('-password'); 
        if (!user) return res.status(404).json({ message: `sorry!, User with id ${userId} not found...` }); 

        Object.assign(user, req.body); 
        await user.save(); 
        res.status(201).json(user); 
    } catch (error) {
        next(error); 
    }
    
};

export const deleteUser = async (req, res, next) => {
    const userId = req.params.id; 
    try {
        const user = await User.findOneAndDelete({_id: userId}).select('-password'); 
        if (!user) return res.status(404).json({ message: `sorry!, User with id ${userId} not found...` }); 
        res.json({ message: 'Deleted Successfully' }); 
    } catch (error) {
        next(error); 
    }
}; 