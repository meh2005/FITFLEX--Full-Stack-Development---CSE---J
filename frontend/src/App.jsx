// src/App.jsx
import React, { createContext, useState } from "react";
import AppRouter from "./router/AppRouter";
import AddWorkoutModal from "./components/dashboard/AddWorkoutModal";
import { useAuth } from "./context/AuthProvider";

export const WorkoutModalContext = createContext();

export default function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { user, setUser } = useAuth();

  return (
    <WorkoutModalContext.Provider
      value={{
        openWorkoutModal: () => setShowAddModal(true),
        closeWorkoutModal: () => setShowAddModal(false),
      }}
    >
      <AppRouter />

      {/* GLOBAL MODAL */}
      {showAddModal && (
        <AddWorkoutModal
          user={user}
          setUser={setUser}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </WorkoutModalContext.Provider>
  );
}
