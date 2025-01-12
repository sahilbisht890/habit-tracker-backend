const express = require('express');
const router = express.Router();
const { createHabit, getUserHabitsList , deleteUserHabit , updateHabit } = require('../controllers/habitCtrl');
const {addDailyHabit , getHabitListByDate , updateHabitProgress , deleteHabitTracker} = require('../controllers/habitTrackerCtrl');
const verifyJWT = require('../middleware/auth.middleware')

router.post('/create' ,verifyJWT, createHabit);
router.get('/list' ,verifyJWT, getUserHabitsList);
router.delete('/delete',verifyJWT,deleteUserHabit);
router.post('/update',verifyJWT,updateHabit)

// routes for habit tracker
router.post('/tracker/listByDate' ,verifyJWT, getHabitListByDate );
router.post('/tracker/add' ,verifyJWT, addDailyHabit);
router.patch('/tracker/update' ,verifyJWT, updateHabitProgress);
router.delete('/tracker/delete', verifyJWT, deleteHabitTracker);


module.exports = router;

