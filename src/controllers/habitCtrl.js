const Habit = require("../models/habit.modal");
const User = require("../models/user.model");

const createHabit = async (req, res) => {
  const { name, dailyGoal, unit } = req.body; 

  try {
    const userId = req.user._id; 

    const existingHabit = await Habit.findOne({ user: userId, name });
    if (existingHabit) {
      return res.status(409).json({
        success: false,
        message: "A habit with the same name already exists for this user.",
      });
    }

    const habit = new Habit({ name, dailyGoal, unit, user: userId });
    await habit.save();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { habits: habit._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Habit successfully created.",
      habit,
    });
  } catch (error) {
    console.error("Error creating habit:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the habit.",
      error: error.message,
    });
  }
};


const getUserHabitsList = async (req, res) => {
  try {

    const userId = req.user._id;

    const habits = await Habit.find({ user: userId }).select("name");

    if (!habits || habits.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No habits found for the user.",
        data: [],
      });
    }

    const formattedHabits = habits.map((habit) => ({
      id: habit._id,
      name: habit.name,
    }));

    return res.status(200).json({
      success: true,
      message: "User habit list fetched successfully.",
      data: formattedHabits,
    });
  } catch (error) {
    console.error("Error fetching habits:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { createHabit, getUserHabitsList };