const express = require('express');
const router = express.Router();
const { createHabit, getUserHabitsList } = require('../controllers/habitCtrl');
const {addDailyHabit , getHabitListByDate , updateHabitProgress} = require('../controllers/habitTrackerCtrl');
const verifyJWT = require('../middleware/auth.middleware')

router.post('/create' ,verifyJWT, createHabit);
router.get('/list' ,verifyJWT, getUserHabitsList);
router.post('/tracker/listByDate' ,verifyJWT, getHabitListByDate );
router.post('/tracker/add' ,verifyJWT, addDailyHabit);
router.patch('/tracker/update' ,verifyJWT, updateHabitProgress);

module.exports = router;

