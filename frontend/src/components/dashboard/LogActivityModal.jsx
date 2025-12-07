import { useState } from "react";
import { updateUser } from "../../api/users";

export default function LogActivityModal({ user, setUser, onClose }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [met, setMet] = useState("");
  const [type, setType] = useState("Normal");

  async function handleSubmit(e) {
  e.preventDefault();

  const weight = user.weight || 60;

  const calories = Math.round((duration * met * 3.5 * weight) / 200);
  const stepsAdded = met < 5 ? duration * 100 : duration * 180;

  const newActivity = {
    type: name,
    desc: `${duration} mins • ${calories} calories`,
    time: new Date().toISOString(),
  };

  const newWorkout = {
    id: Date.now(),
    type: name,
    duration: Number(duration),
    calories,
    time: new Date().toISOString(),
    activityType: type
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

  await updateUser(user.id, updatedUser);
  setUser(updatedUser);
  onClose();
}

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px]">
        <h2 className="text-xl font-bold mb-4">Log Activity</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label>Activity Name</label>
            <input
              className="border p-2 w-full rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Running, Yoga, Cycling..."
            />
          </div>

          <div>
            <label>Duration (minutes)</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div>
            <label>MET Value</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={met}
              onChange={(e) => setMet(e.target.value)}
              placeholder="e.g. 8 for Running"
            />
          </div>

          <div>
            <label>Type</label>
            <select
              className="border p-2 w-full rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Normal</option>
              <option>Strength Training</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
