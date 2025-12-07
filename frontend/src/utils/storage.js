import { safeParse } from "./helper";

const KEY_USER = "fitflex_user";
const KEY_WORKOUTS = "fitflex_workouts";
const KEY_WATER = "fitflex_water";
const KEY_PROFILE = "fitflex_profile";

/**
 * ============================
 * USER STORAGE
 * ============================
 */
export function saveUser(user) {
  localStorage.setItem(KEY_USER, JSON.stringify(user));
}

export function getUser() {
  return safeParse(localStorage.getItem(KEY_USER), null);
}

export function clearUser() {
  localStorage.removeItem(KEY_USER);
}


/**
 * ============================
 * WORKOUTS STORAGE
 * ============================
 */
export function getWorkouts() {
  return safeParse(localStorage.getItem(KEY_WORKOUTS), []);
}

export function saveWorkouts(list) {
  localStorage.setItem(KEY_WORKOUTS, JSON.stringify(list));
}

export function addWorkout(workout) {
  const list = getWorkouts();
  list.push(workout);
  saveWorkouts(list);
}

export function deleteWorkout(id) {
  const list = getWorkouts().filter(w => w.id !== id);
  saveWorkouts(list);
}


/**
 * ============================
 * WATER TRACKER STORAGE
 * ============================
 */
export function getWater() {
  return parseInt(localStorage.getItem(KEY_WATER)) || 0;
}

export function saveWater(glasses) {
  localStorage.setItem(KEY_WATER, glasses);
}


/**
 * ============================
 * PROFILE SETTINGS STORAGE
 * ============================
 */
export function saveProfile(data) {
  localStorage.setItem(KEY_PROFILE, JSON.stringify(data));
}

export function getProfile() {
  return safeParse(localStorage.getItem(KEY_PROFILE), {});
}

export function clearProfile() {
  localStorage.removeItem(KEY_PROFILE);
}


/**
 * ============================
 * CLEAR ALL DATA
 * ============================
 */
export function resetAll() {
  localStorage.removeItem(KEY_USER);
  localStorage.removeItem(KEY_WORKOUTS);
  localStorage.removeItem(KEY_WATER);
  localStorage.removeItem(KEY_PROFILE);
}
