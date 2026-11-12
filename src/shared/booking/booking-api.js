import { http } from "../api/http";

/**
 * @typedef {Object} CreateBookingPayload
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} service
 * @property {string} date - ISO date, e.g. 2026-11-14
 * @property {string} time - 24h time with microseconds, e.g. 10:00:00.000000
 * @property {string} schedule_at - ISO datetime combining date and time
 * @property {string} status
 * @property {string} [notes]
 */

/**
 * @param {CreateBookingPayload} payload
 */
export async function createBooking(payload) {
  const { data } = await http.post("/booking", payload);
  return data;
}
