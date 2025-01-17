const HabitTracker = require("../models/habitTracker.modal");
const Habit = require('../models/habit.modal')

const addDailyHabit = async (req, res) => {
  const { habitId, date } = req.body;

  try {
    const userId = req.user._id; 

    if (!habitId || !date) {
      return res.status(401).json({
        success: false,
        message: "habitId and date are required",
      });
    }



    const habit = await Habit.findOne({ _id: habitId, user: userId });
    if (!habit) {
      return res.status(401).json({
        success: false,
        message: "Habit not found.",
      });
    }

    const existingRecord = await HabitTracker.findOne({
      user_id: userId,
      habit_id: habitId,
      date : date
    });

    if (existingRecord) {
      return res.status(409).json({
        success: false,
        message: "Habit already being tracked for the provided date.",
      });
    }

    const habitTracker = new HabitTracker({
      user_id: userId,
      name:habit.name,
      habit_id: habitId,
      dailyGoal: habit.dailyGoal, 
      unit: habit.unit,     
      date : date       
    });

    await habitTracker.save();

    return res.status(200).json({
      success: true,
      message: "Habit added for the provided date",
    });
  } catch (error) {
    console.error("Error adding habit for the date:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the habit",
    });
  }
};


const updateHabitProgress = async (req, res) => {
  const { id, progress, status } = req.body;

  try {
    const updatedTracker = await HabitTracker.findOneAndUpdate(
      { _id: id },
      { progress, status },
      { new: true }
    );

    if (!updatedTracker) {
      return res.status(404).json({
        success: false,
        message: "No tracking record found for this habit",
      });
    }

    res.status(200).json({
      success: true,
      message: "Daily habit updated successfully",
    });
  } catch (error) {
    console.error("Error updating habit progress:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating progress",
    });
  }
};

const getHabitListByDate = async (req, res) => {
  const { date } = req.body;

  try {
    const userId = req.user._id; 

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }



    const habits = await HabitTracker.find({
      user_id: userId,
      date : date
    })
      .select("progress status dailyGoal unit name").sort({updatedAt:-1});

    if (!habits || habits.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No habits found for the provided date.",
        data: [],
      });
    }

    const formattedHabits = habits.map((tracker) => ({
      id:tracker._id,
      name: tracker.name,
      dailyGoal: tracker.dailyGoal,
      unit: tracker.unit,
      progress: tracker.progress,
      status: tracker.status,
    }));

    return res.status(200).json({
      success: true,
      message: "Habits fetched successfully",
      data: formattedHabits,
    });
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteHabitTracker = async (req, res) => {
  const { habitTrackerId } = req.query;

  try {
    const userId = req.user._id; 

    const habitTracker = await HabitTracker.findOne({ 
      _id: habitTrackerId,
      user_id: userId 
    });

    if (!habitTracker) {
      return res.status(401).json({
        success: false,
        message: "Habit tracker record not found or does not belong to this user.",
      });
    }

    await habitTracker.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Habit tracker record successfully deleted.",
    });
  } catch (error) {
    console.error("Error deleting habit tracker:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the habit tracker record.",
      error: error.message,
    });
  }
};



module.exports = { addDailyHabit, getHabitListByDate, updateHabitProgress , deleteHabitTracker};
