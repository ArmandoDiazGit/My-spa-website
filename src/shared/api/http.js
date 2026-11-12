import axios from "axios";
import { env } from "./env";

// The single place that knows about the API origin, timeout, and error shape.
// Feature code calls typed functions (see shared/booking/booking-api.js), not axios.
export const http = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
});

function toApiError(error) {
  return {
    isApiError: true,
    status: error?.response?.status ?? null,
    message:
      error?.response?.data?.detail ??
      error?.message ??
      "Something went wrong. Please try again.",
    cause: error,
  };
}

// Normalize Axios errors so UI code never has to reach into error.response.
http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error)),
);
