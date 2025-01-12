const express = require('express');
const router = express.Router();
const { createHabit, getUserHabitsList , deleteUserHabit} = require('../controllers/habitCtrl');
const {addDailyHabit , getHabitListByDate , updateHabitProgress , deleteHabitTracker} = require('../controllers/habitTrackerCtrl');
const verifyJWT = require('../middleware/auth.middleware')

router.post('/create' ,verifyJWT, createHabit);
router.get('/list' ,verifyJWT, getUserHabitsList);
router.delete('/delete/:habitId',verifyJWT,deleteUserHabit);

router.post('/tracker/listByDate' ,verifyJWT, getHabitListByDate );
router.post('/tracker/add' ,verifyJWT, addDailyHabit);
router.patch('/tracker/update' ,verifyJWT, updateHabitProgress);
router.delete('/tracker/delete/:habitTrackerId', verifyJWT, deleteHabitTracker);


module.exports = router;

