const express = require('express');
const router = express.Router();
const { registerUser  , loginUser , logoutUser , refreshAccessToken} = require('../controllers/userCtrl');
const verifyJWT = require('../middleware/auth.middleware')


router.post('/signup' , registerUser);
router.post('/login',loginUser);
router.get('/logout' , verifyJWT , logoutUser);
router.post("/refresh-token" ,refreshAccessToken);

module.exports = router ;