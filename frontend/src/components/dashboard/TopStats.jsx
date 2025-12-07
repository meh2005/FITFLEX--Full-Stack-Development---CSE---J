export default function TopStats({ user }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white/80 p-4 rounded shadow">
        <h3 className="text-xl font-bold">{user.steps}</h3>
        <p>Steps</p>
      </div>

      <div className="bg-white/80 p-4 rounded shadow">
        <h3 className="text-xl font-bold">{user.calories}</h3>
        <p>Calories</p>
      </div>

      <div className="bg-white/80 p-4 rounded shadow">
        <h3 className="text-xl font-bold">{user.activeMinutes}</h3>
        <p>Active Minutes</p>
      </div>

      <div className="bg-white/80 p-4 rounded shadow">
        <h3 className="text-xl font-bold">{user.waterGlasses}</h3>
        <p>Water</p>
      </div>
    </div>
  );
}
