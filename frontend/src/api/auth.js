import axios from "axios";
const API = "http://localhost:3000";

// -------------------------------------
// LOGIN — JSON SERVER
// -------------------------------------
export async function login(email, password) {
  try {
    const res = await axios.get(`${API}/users?email=${email}&password=${password}`);

    if (res.data.length === 0) {
      return { success: false, message: "Invalid email or password" };
    }

    const user = res.data[0];

    // Store user ID
    localStorage.setItem("uid", user.id);

    return { success: true, user };
  } catch (err) {
    return { success: false, message: "Server error" };
  }
}

// -------------------------------------
// SIGNUP — JSON SERVER
// -------------------------------------
export async function signup(userData) {
  try {
    // Check duplicate email
    const exists = await axios.get(`${API}/users?email=${userData.email}`);

    if (exists.data.length > 0) {
      return { success: false, message: "Email already exists" };
    }

    // Create new user
    const res = await axios.post(`${API}/users`, userData);
    return { success: true, user: res.data };
  } catch (err) {
    return { success: false, message: "Signup failed" };
  }
}

// -------------------------------------
// LOGOUT
// -------------------------------------
export function logout() {
  localStorage.removeItem("uid");
}
