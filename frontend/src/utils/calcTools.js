// MET values reference for activities
export const MET_VALUES = {
  Running: 7,
  Walking: 3,
  Cycling: 5,
  Swimming: 6,
  Yoga: 3.5,
};

// Default MET if unknown workout
const DEFAULT_MET = 4;

// Average calories burned per step
const CAL_PER_STEP = 0.04;

// Default person weight assumption
const DEFAULT_WEIGHT = 68; // kg

/**
 * Calculate calories burned from workout duration
 * formula: calories = MET × weight(kg) × time(h)
 */
export function calcCaloriesFromWorkout(type, minutes, weight = DEFAULT_WEIGHT) {
  const MET = MET_VALUES[type] || DEFAULT_MET;
  const hours = minutes / 60;
  return Math.round(MET * weight * hours);
}

/**
 * Calculate calories from steps
 */
export function calcCaloriesFromSteps(steps) {
  return Math.round(steps * CAL_PER_STEP);
}

/**
 * Convert steps to active minutes (rough estimate)
 */
export function stepsToActiveMinutes(steps) {
  return Math.round(steps / 120);
}

/**
 * Convert calories to grams of fat burned
 */
export function caloriesToFat(cal) {
  return (cal / 9).toFixed(2);
}

/**
 * Format minutes into HH:MM
 */
export function formatMinutes(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

/**
 * Format big numbers
 * 1400 => "1.4K"
 */
export function prettyNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}
