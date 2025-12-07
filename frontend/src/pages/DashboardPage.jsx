import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import TopStats from "../components/dashboard/TopStats";
import DailyActivityChart from "../components/dashboard/DailyActivityChart";
import GoalsCard from "../components/dashboard/GoalsCard";
import RecentActivities from "../components/dashboard/RecentActivities";
import WaterTracker from "../components/dashboard/WaterTracker";
import AddWorkoutModal from "../components/dashboard/AddWorkoutModal";
import LogWorkoutModal from "../components/dashboard/LogActivityModal";
import { useAuth } from "../context/AuthProvider";

export default function DashboardPage() {
  const { user, setUser } = useAuth();

  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading...
      </div>
    );

  return (
    <div className="relative min-h-screen">

      {/* BACKGROUND FIXED (use proper <div></div>) */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url("/bgmain.png")` }}
      ></div>

      {/* SIDEBAR */}
      <Sidebar
        onAddWorkout={() => setShowAddWorkout(true)}
        onLogActivity={() => setShowLogModal(true)}
      />

      {/* MAIN AREA */}
      <div className="ml-56 relative z-10">

        {/* HEADER */}
        <header className="fixed top-0 left-56 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-20">
          <h2 className="text-2xl font-semibold">
            Dashboard — Welcome {user.name}
          </h2>

          <img
            src="/logo.jpg"
            alt="logo"
            className="w-10 h-10 rounded-full object-cover"
          />
        </header>

        {/* CONTENT */}
        <main className="pt-20 px-8 pb-10">

          {/* TOP STATS */}
          <TopStats user={user} />

          {/* GRAPH + GOALS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <DailyActivityChart user={user} />
            </div>
            <GoalsCard user={user} />
          </div>

          {/* RECENT + WATER */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <RecentActivities user={user} setUser={setUser} />
            </div>
            <WaterTracker user={user} setUser={setUser} />
          </div>
          
        </main>
      </div>

      {/* MODALS */}
      {showAddWorkout && (
        <AddWorkoutModal
          user={user}
          setUser={setUser}
          onClose={() => setShowAddWorkout(false)}
        />
      )}

      {showLogModal && (
        <LogWorkoutModal
          user={user}
          setUser={setUser}
          onClose={() => setShowLogModal(false)}
        />
      )}
    </div>
  );
}
