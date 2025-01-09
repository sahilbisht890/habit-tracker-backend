const HabitTracker = require("../models/habitTracker.modal");

const addDailyHabit = async (req, res) => {
  const { habitId, date } = req.body;

  try {
    const userId = req.user._id; 

    if (!habitId || !date) {
      return res.status(400).json({
        success: false,
        message: "habitId and date are required",
      });
    }

    const [day, month, year] = date.split("-");
    const parsedDate = new Date(`${year}-${month}-${day}`);
    const nextDate = new Date(parsedDate);
    nextDate.setDate(parsedDate.getDate() + 1);

    const existingRecord = await HabitTracker.findOne({
      user_id: userId,
      habit_id: habitId,
      createdAt: {
        $gte: parsedDate,
        $lt: nextDate,
      },
    });

    if (existingRecord) {
      return res.status(409).json({
        success: false,
        message: "Habit already being tracked for the provided date.",
      });
    }

    const habitTracker = new HabitTracker({
      user_id: userId,
      habit_id: habitId,
    });

    await habitTracker.save();

    return res.status(201).json({
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
    const userId = req.user._id; // Retrieved from verifyJWT middleware

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const [day, month, year] = date.split("-");
    const parsedDate = new Date(`${year}-${month}-${day}`);
    const nextDate = new Date(parsedDate);
    nextDate.setDate(parsedDate.getDate() + 1);

    const habits = await HabitTracker.find({
      user_id: userId,
      createdAt: {
        $gte: parsedDate,
        $lt: nextDate,
      },
    })
      .populate("habit_id", "name dailyGoal unit")
      .select("progress status");

    if (!habits || habits.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No habits found for the provided date.",
        data: [],
      });
    }

    const formattedHabits = habits.map((tracker) => ({
      name: tracker.habit_id.name,
      dailyGoal: tracker.habit_id.dailyGoal,
      unit: tracker.habit_id.unit,
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

module.exports = { addDailyHabit, getHabitListByDate, updateHabitProgress };
