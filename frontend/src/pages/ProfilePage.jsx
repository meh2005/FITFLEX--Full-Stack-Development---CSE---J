import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { useAuth } from "../context/AuthProvider";
import { getUserById, updateUser } from "../api/users";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function load() {
      if (user) {
        const data = await getUserById(user.id);
        setForm(data);
      }
    }
    load();
  }, [user]);

  if (!form) {
    return (
      <div className="flex items-center justify-center min-h-screen ml-56 text-xl">
        Loading...
      </div>
    );
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveChanges() {
    const updated = await updateUser(form.id, form);
    setUser(updated);
    alert("Profile updated!");
    setEditMode(false);
  }

  // BMI calculation
  const heightM = form.height / 100;
  const bmi = (form.weight / (heightM * heightM)).toFixed(1);

  const bmiStatus =
    bmi < 18.5
      ? "Underweight"
      : bmi < 24.9
      ? "Normal"
      : bmi < 29.9
      ? "Overweight"
      : "Obese";

  // PROFILE IMAGE
  const avatar = form.gender === "female" ? "/girl.jpg" : "/boy.jpg";

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Profile Section */}
      <div className="flex-1 p-10 ml-56">

        <h2 className="text-2xl font-bold mb-6">Profile</h2>

        {/* FLEX ROW: IMAGE LEFT, DETAILS RIGHT */}
        <div className="flex gap-10">

          {/* PROFILE PIC LEFT */}
          <div className="flex flex-col items-center">
            <img
              src={avatar}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-white"
            />
            <p className="mt-3 font-semibold text-lg">{form.name}</p>
          </div>

          {/* DETAILS RIGHT */}
          <div className="flex-1 space-y-4 max-w-lg">

            {/* NAME */}
            <div>
              <label className="font-medium">Name</label>
              {editMode ? (
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mt-1"
                />
              ) : (
                <p>{form.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="font-medium">Email</label>
              <p className="opacity-70">{form.email}</p>
            </div>

            {/* PHONE */}
            <div>
              <label className="font-medium">Phone</label>
              {editMode ? (
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mt-1"
                />
              ) : (
                <p>{form.phone}</p>
              )}
            </div>

            {/* HEIGHT */}
            <div>
              <label className="font-medium">Height (cm)</label>
              {editMode ? (
                <input
                  name="height"
                  type="number"
                  value={form.height}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mt-1"
                />
              ) : (
                <p>{form.height} cm</p>
              )}
            </div>

            {/* WEIGHT */}
            <div>
              <label className="font-medium">Weight (kg)</label>
              {editMode ? (
                <input
                  name="weight"
                  type="number"
                  value={form.weight}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mt-1"
                />
              ) : (
                <p>{form.weight} kg</p>
              )}
            </div>

            {/* BMI */}
            <div className="p-4 rounded-lg border bg-white shadow">
              <label className="font-medium">BMI</label>
              <p className="text-xl font-semibold">{bmi}</p>
              <p className="opacity-70">{bmiStatus}</p>
            </div>

            {/* GENDER */}
            <div>
              <label className="font-medium">Gender</label>
              {editMode ? (
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mt-1"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <p>{form.gender}</p>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mt-6">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={saveChanges}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
