import React, { useState } from "react";
import { updateUser } from "../../api/users";

export default function AddWorkoutModal({ user, setUser, onClose }) {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [met, setMet] = useState("");

  async function handleAdd() {
  if (!type || !duration || !met) return;

  const weightKg = user.weight || 60;

  const caloriesBurned = Math.round(
    (met * 3.5 * weightKg * duration) / 200
  );

  const stepsAdded = met < 5 ? duration * 100 : duration * 180;

  const newWorkout = {
    id: Date.now(),
    type,
    duration: Number(duration),
    calories: caloriesBurned,
    time: new Date().toISOString()
  };

  const newActivity = {
    type,
    desc: `${duration} mins • ${caloriesBurned} calories`,
    time: new Date().toISOString()
  };

  const updatedWorkouts = [...user.workouts, newWorkout];

  const totalCalories = updatedWorkouts.reduce(
    (sum, w) => sum + Number(w.calories), 0
  );

  const totalMinutes = updatedWorkouts.reduce(
    (sum, w) => sum + Number(w.duration), 0
  );

  const updatedUser = {
    ...user,
    workouts: updatedWorkouts,
    activities: [newActivity, ...user.activities],
    calories: totalCalories,
    activeMinutes: totalMinutes,
    steps: (user.steps || 0) + stepsAdded
  };

  const res = await updateUser(user.id, updatedUser);
  setUser(res);

  onClose();
}

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4">
        <h2 className="text-xl font-bold">Add Workout</h2>

        <input
          className="border w-full p-2 rounded"
          placeholder="Workout Name"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <input
          className="border w-full p-2 rounded"
          placeholder="Duration (mins)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          className="border w-full p-2 rounded"
          placeholder="MET value"
          type="number"
          value={met}
          onChange={(e) => setMet(e.target.value)}
        />

        <button onClick={handleAdd} className="w-full bg-blue-600 text-white py-2 rounded">
          Add Workout
        </button>

        <button onClick={onClose} className="w-full bg-gray-300 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}
