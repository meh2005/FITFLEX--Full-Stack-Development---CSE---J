export default function GoalsCard({ user }) {
  const goals = user?.profile?.goals || {};

  const calculatePercent = (current, goal) => {
    if (!goal || goal === 0) return 0;
    return Math.min(100, Math.round((current / goal) * 100));
  };

  const stats = [
    { label: "Steps", current: user.steps, goal: goals.steps },
    { label: "Calories", current: user.calories, goal: goals.calories },
    { label: "Active Minutes", current: user.activeMinutes, goal: goals.activeMinutes },
    { label: "Water", current: user.waterGlasses, goal: goals.waterGlasses },
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Daily Goals Progress
      </h3>

      <div className="space-y-5">
        {stats.map((item, idx) => {
          const pct = calculatePercent(item.current, item.goal);

          return (
            <div key={idx}>
              {/* Header */}
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="text-gray-600">
                  {item.current}/{item.goal}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                ></div>
              </div>

              {/* Percentage */}
              <p className="text-xs text-gray-500 mt-1">{pct}% completed</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
