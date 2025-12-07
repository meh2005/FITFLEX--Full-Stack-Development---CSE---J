import { useState } from "react";
import { createUser, getUserByEmail } from "../../api/users";

export default function SignupForm({ onBackToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    height: "",
    weight: "",
    gender: "male",
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMsg("");

    // Basic validation
    if (!form.name || !form.email || !form.password)
      return setError("All fields are required.");

    // Check if email exists
    const existing = await getUserByEmail(form.email);
    if (existing) return setError("Email already exists.");

    // Create new user for json-server
    const newUser = {
      ...form,
      steps: 0,
      calories: 0,
      activeMinutes: 0,
      waterGlasses: 0,
      workouts: [],
      activities: [],
      profile: {
        goals: {
          steps: 10000,
          calories: 500,
          activeMinutes: 30,
          waterGlasses: 8,
        },
      },
      createdAt: new Date().toISOString(),
    };

    const res = await createUser(newUser);

    if (!res) {
      return setError("Something went wrong. Try again.");
    }

    setMsg("Account created successfully!");

    setTimeout(() => {
      onBackToLogin();   // go to LoginPage
    }, 1000);
  }

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl p-8 rounded-xl w-full max-w-md">

      {/* LOGO */}
      <div className="flex justify-center mb-4">
        <img
          src="/logo.png"
          className="w-20 h-20 rounded-full object-cover shadow"
          alt="logo"
        />
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            className="border w-full p-3 rounded mt-1"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="border w-full p-3 rounded mt-1"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            className="border w-full p-3 rounded mt-1"
            placeholder="Enter phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="border w-full p-3 rounded mt-1"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* Height */}
        <div>
          <label className="font-medium">Height (cm)</label>
          <input
            type="number"
            name="height"
            className="border w-full p-3 rounded mt-1"
            placeholder="Enter height"
            value={form.height}
            onChange={handleChange}
          />
        </div>

        {/* Weight */}
        <div>
          <label className="font-medium">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            className="border w-full p-3 rounded mt-1"
            placeholder="Enter weight"
            value={form.weight}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="font-medium">Gender</label>
          <select
            name="gender"
            className="border w-full p-3 rounded mt-1"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}
        {msg && (
          <p className="text-green-600 text-center">{msg}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
        >
          Create Account
        </button>
      </form>

      <div className="mt-4 text-center">
        <button onClick={onBackToLogin} className="text-blue-600 underline">
          Back to Login
        </button>
      </div>
    </div>
  );
}
