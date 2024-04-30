import express from "express";
import passport from 'passport';
const router = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
    generateToken
 } from "../controllers/userController.js";
 import {protect, admin} from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserByID).put(protect, admin, updateUser);

// Google OAuth route
console.log('Setting up /google route...');
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
console.log('Finished setting up /google route...');

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, generate token.
    generateToken(res, req.user._id);
    res.redirect('/');
  });

// Facebook OAuth route
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, generate token.
    generateToken(res, req.user._id);
    res.redirect('/');
  });

export default router;