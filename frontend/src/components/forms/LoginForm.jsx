import { useState } from "react";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthProvider";

export default function LoginForm({ onSuccess, onForgot, onSignup }) {
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!email || !pass) return setError("Enter email & password");

    const res = await login(email, pass);

    if (!res.success) {
      return setError(res.message);
    }

    // ✔ Save user in AuthProvider
    loginUser(res.user);

    // ✔ Redirect caller (LoginPage)
    onSuccess();
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

      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        
        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            className="border w-full p-3 rounded mt-1"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Password</label>
          <input
            type="password"
            className="border w-full p-3 rounded mt-1"
            placeholder="Enter password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
        >
          Login
        </button>
      </form>

      {/* ACTION BUTTONS */}
      <div className="mt-4 flex justify-between text-sm">
        <button onClick={onForgot} className="text-blue-600 underline">
          Forgot Password?
        </button>
        
        <button onClick={onSignup} className="text-blue-600 underline">
          Create Account
        </button>
      </div>
    </div>
  );
}
