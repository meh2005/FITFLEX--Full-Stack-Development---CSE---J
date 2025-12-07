import axios from "axios";
import { getUserByEmail, updateUser } from "./users";

const API = "http://localhost:3000";

// ---------------------
// ADD STEPS
// ---------------------
export async function addSteps(steps) {
  const email = localStorage.getItem("currentUserEmail");
  let user = await getUserByEmail(email);

  user.stats.steps = (user.stats.steps ?? 0) + steps;
  user.stats.activities = user.stats.activities || [];
  user.stats.activities.push({
    icon: "walking",
    title: "Steps",
    desc: `${steps} steps`,
    time: "just now"
  });

  await updateUser(user.id, { stats: user.stats });
  return user.stats;
}

// ---------------------
// ADD WATER
// ---------------------
export async function addWater(amount) {
  const email = localStorage.getItem("currentUserEmail");
  let user = await getUserByEmail(email);

  user.stats.waterGlasses = (user.stats.waterGlasses ?? 0) + amount;
  if (user.stats.waterGlasses < 0) user.stats.waterGlasses = 0;

  user.stats.activities.push({
    icon: "water",
    title: "Water",
    desc: `${amount} glass`,
    time: "just now"
  });

  await updateUser(user.id, { stats: user.stats });
  return user.stats;
}

// ---------------------
// ADD CUSTOM WORKOUT TYPE
// ---------------------
export async function addCustomWorkout(name, MET) {
  const email = localStorage.getItem("currentUserEmail");
  let user = await getUserByEmail(email);

  if (!user.stats.workoutTypes) user.stats.workoutTypes = {};
  if (!user.stats.workoutTypes.UserWorkouts)
    user.stats.workoutTypes.UserWorkouts = {};

  user.stats.workoutTypes.UserWorkouts[name] = { MET };

  await updateUser(user.id, { stats: user.stats });
  return user.stats.workoutTypes.UserWorkouts;
}

// ---------------------
// LOG A WORKOUT SESSION
// ---------------------
export async function logWorkout(workoutName, durationMins) {
  const email = localStorage.getItem("currentUserEmail");
  let user = await getUserByEmail(email);

  let MET = 3;
  const defaultMET = {
    Running: 9.8,
    Cycling: 8.5,
    Swimming: 8.0,
    Yoga: 3,
    Strength: 6.2
  };

  if (user.stats.workoutTypes?.UserWorkouts?.[workoutName]) {
    MET = user.stats.workoutTypes.UserWorkouts[workoutName].MET;
  } else {
    MET = defaultMET[workoutName] || 3;
  }

  const calories = Math.round((MET * 3.5 * (user.weight || 70) * durationMins) / 200);

  // update stats
  user.stats.calories = (user.stats.calories ?? 0) + calories;
  user.stats.active = (user.stats.active ?? 0) + durationMins;
  user.stats.workouts = (user.stats.workouts ?? 0) + 1;

  // update weekly calories
  user.stats.weeklyCalories = user.stats.weeklyCalories || [0,0,0,0,0,0,0];
  let day = new Date().getDay();         // Sun=0
  day = day === 0 ? 6 : day - 1;         // Mon=0
  user.stats.weeklyCalories[day] =
    (user.stats.weeklyCalories[day] ?? 0) + calories;

  // add activity entry
  user.stats.activities.push({
    icon: "running",
    title: workoutName,
    desc: `${durationMins} mins • ${calories} cal`,
    time: "just now"
  });

  await updateUser(user.id, { stats: user.stats });
  return user.stats;
}
