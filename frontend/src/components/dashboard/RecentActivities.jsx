import { deleteActivity } from "../../api/users";

export default function RecentActivities({ user, setUser }) {

  async function del(time) {
    await deleteActivity(user.id, time);

    const updated = {
      ...user,
      activities: user.activities.filter((a) => a.time !== time),
    };

    setUser(updated);
  }

  return (
    <div className="bg-white/80 p-4 rounded shadow">
      <h3 className="font-bold mb-2">Recent Activities</h3>

      {user.activities.length === 0 && (
        <p className="text-gray-500">No recent activities</p>
      )}

      {user.activities.map((a) => (
        <div
          key={a.time}
          className="flex justify-between items-center p-2 border-b"
        >
          <span>
            <b>{a.type}</b> — {a.desc}
          </span>

          <button
            className="text-red-600 hover:underline"
            onClick={() => del(a.time)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
