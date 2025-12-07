/**
 * Capitalizes first letter
 * "running" → "Running"
 */
export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
 * Returns pluralized text
 * pluralize(2, "glass") → "2 glasses"
 * pluralize(1, "km") → "1 km"
 */
export function pluralize(num, word) {
  if (num === 1) return `${num} ${word}`;
  return `${num} ${word}${word.endsWith("s") ? "es" : "s"}`;
}


/**
 * Safe JSON parse (no crash)
 */
export function safeParse(json, fallback = null) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}


/**
 * Generates a random ID
 */
export function uid() {
  return Math.random().toString(36).substring(2, 10);
}


/**
 * Deep clone JSON object
 */
export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}


/**
 * Limit text length
 */
export function trimText(str, maxLen = 20) {
  if (str.length <= maxLen) return str;
  return `${str.slice(0, maxLen - 3)}...`;
}


/**
 * Convert "running" → "RUNNING"
 */
export function upper(str) {
  return str?.toUpperCase?.() ?? "";
}


/**
 * Check if a value is numeric
 */
export function isNumeric(x) {
  return !isNaN(parseFloat(x)) && isFinite(x);
}


/**
 * Round number to given decimals
 */
export function round(num, decimals = 1) {
  return parseFloat(num.toFixed(decimals));
}
