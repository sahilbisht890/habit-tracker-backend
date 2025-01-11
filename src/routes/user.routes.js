const express = require('express');
const router = express.Router();
const { registerUser  , loginUser , logoutUser , refreshAccessToken} = require('../controllers/userCtrl');
const verifyJWT = require('../middleware/auth.middleware')


router.post('/signup' , registerUser);
router.post('/login',loginUser);
router.get('/logout' , logoutUser);
router.get("/refresh-token" ,refreshAccessToken);

module.exports = router ;
