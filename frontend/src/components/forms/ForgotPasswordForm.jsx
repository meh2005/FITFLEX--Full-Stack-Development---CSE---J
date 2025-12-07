import { useState } from "react";
import { getUserByEmail } from "../../api/users";

export default function ForgotPasswordForm({ onBack }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRecover(e) {
    e.preventDefault();
    setMessage("");

    if (!email || !phone) {
      return setMessage("Enter both email and mobile number");
    }

    const user = await getUserByEmail(email);

    if (!user || user.phone !== phone) {
      return setMessage("No user found for provided details");
    }

    setPassword(user.password);
    setMessage("Password recovered successfully!");
  }

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl p-8 rounded-xl w-full max-w-md">

      <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

      <form onSubmit={handleRecover} className="space-y-4">

        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            className="border w-full p-3 rounded mt-1"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Mobile Number</label>
          <input
            type="text"
            className="border w-full p-3 rounded mt-1"
            placeholder="Enter registered mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {message && <p className="text-green-700">{message}</p>}

        {password && (
          <p className="bg-gray-100 p-3 rounded text-center">
            Your Password: <strong>{password}</strong>
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
        >
          Recover Password
        </button>
      </form>

      <button
        onClick={onBack}
        className="mt-4 text-blue-600 underline block text-center"
      >
        Back to Login
      </button>
    </div>
  );
}
