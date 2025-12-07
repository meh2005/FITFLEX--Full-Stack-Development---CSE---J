export const MET_VALUES = {
  Walking: 3.5,
  Running: 8.3,
  Cycling: 7.5,
  Swimming: 6.0,
  Strength: 6.0,
  Yoga: 3.0,
  Aerobics: 6.5,
};

export function calculateCalories(met, weightKg, durationMin) {
  // Standard MET formula
  return Math.round((met * 3.5 * weightKg / 200) * durationMin);
}
