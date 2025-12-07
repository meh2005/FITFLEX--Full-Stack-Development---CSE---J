import { updateUser } from "../../api/users";

export default function WaterTracker({ user, setUser }) {
  async function add() {
    const updated = { ...user, waterGlasses: user.waterGlasses + 1 };
    await updateUser(user.id, updated);
    setUser(updated);
  }

  async function minus() {
    if (user.waterGlasses === 0) return;
    const updated = { ...user, waterGlasses: user.waterGlasses - 1 };
    await updateUser(user.id, updated);
    setUser(updated);
  }

  return (
    <div className="bg-white/80 p-4 rounded shadow text-center">
      <h3 className="font-bold mb-2">Water Intake</h3>

      <p className="text-4xl font-bold">{user.waterGlasses}</p>

      <div className="flex justify-center gap-4 mt-3">
        <button onClick={minus} className="px-4 py-2 bg-red-300 rounded">-</button>
        <button onClick={add} className="px-4 py-2 bg-blue-500 text-white rounded">+</button>
      </div>
    </div>
  );
}
