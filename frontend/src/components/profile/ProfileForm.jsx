import { useState } from "react";
import { updateUser } from "../../api/users";

export default function ProfileForm({ user, refresh }) {
  const [name, setName] = useState(user?.name || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSave(e) {
    e.preventDefault();
    setMsg("");

    const email = user.email;
    const updateData = {};

    // only update changed fields
    if (name !== user.name) updateData.name = name;
    if (age !== user.age) updateData.age = age;
    if (gender !== user.gender) updateData.gender = gender;
    if (pass) updateData.password = pass;

    if (Object.keys(updateData).length === 0) {
      setMsg("No changes to save.");
      return;
    }

    await updateUser(email, updateData);
    setMsg("Profile updated successfully!");
    refresh(); // reload latest user data
  }

  return (
    <div className="bg-white p-6 rounded shadow w-[420px]">
      <h2 className="text-xl font-semibold mb-5 text-center">My Profile</h2>

      <form onSubmit={handleSave}>

        {/* Name */}
        <label className="block text-sm mb-1">Full Name</label>
        <input
          type="text"
          className="border p-2 rounded mb-3 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Gender */}
        <label className="block text-sm mb-1">Gender</label>
        <select
          className="border p-2 rounded mb-3 w-full"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Age */}
        <label className="block text-sm mb-1">Age</label>
        <input
          type="number"
          className="border p-2 rounded mb-3 w-full"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {/* Email (locked) */}
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          className="border p-2 rounded mb-3 w-full bg-gray-100"
          value={user.email}
          disabled
        />

        {/* Password change optional */}
        <label className="block text-sm mb-1">Change Password</label>
        <input
          type="password"
          className="border p-2 rounded mb-3 w-full"
          placeholder="Enter new password (optional)"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {msg && (
          <p className="text-sm text-green-600 text-center mb-2">{msg}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
