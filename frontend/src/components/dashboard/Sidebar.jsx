import React, { useContext } from "react";
import { WorkoutModalContext } from "../../App";
import { useAuth } from "../../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ onLogActivity }) {
  const { openWorkoutModal } = useContext(WorkoutModalContext);
  const { user, logoutUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const avatar = user?.gender === "female" ? "/girl.jpg" : "/boy.jpg";
  const active = location.pathname;

  const menuClass = (path) =>
    `flex items-center gap-3 px-2 py-2 w-full rounded-lg transition 
     ${active === path ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-100"}`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-white shadow-lg p-6 flex flex-col justify-between">

      <div>
        <h1 className="text-2xl font-bold mb-8">FitFlex</h1>

        <nav className="space-y-3">
          <button className={menuClass("/dashboard")} onClick={() => navigate("/dashboard")}>
            📊 Dashboard
          </button>

          <button className={menuClass("/profile")} onClick={() => navigate("/profile")}>
            👤 Profile
          </button>

          <button className={menuClass("/add")} onClick={openWorkoutModal}>
            ➕ Add Workout
          </button>

          <button className={menuClass("/log")} onClick={onLogActivity}>
            📝 Log Activity
          </button>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <img src={avatar} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-medium">{user?.name}</span>
        </div>

        <button
          onClick={() => {
            logoutUser();
            navigate("/login");
          }}
          className="text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
