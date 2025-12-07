import axios from "axios";

const API = "http://localhost:3000/users";

export async function getUserById(id) {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
}

export async function getUserByEmail(email) {
  const res = await axios.get(`${API}?email=${email}`);
  return res.data[0] || null;
}

export async function createUser(userData) {
  try {
    const res = await axios.post(API, userData);
    return res.data;
  } catch (err) {
    console.error("createUser ERROR", err);
    return null;
  }
}

export async function updateUser(id, updates) {
  const res = await axios.patch(`${API}/${id}`, updates);
  return res.data;
}

export async function deleteActivity(userId, time) {
  const user = await getUserById(userId);
  const updated = user.activities.filter((a) => a.time !== time);

  const res = await axios.patch(`${API}/${userId}`, {
    activities: updated,
  });
  return res.data;
}
