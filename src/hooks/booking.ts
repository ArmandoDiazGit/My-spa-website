import axios from "axios";
import { CreateBookingPayload } from "../models/bookingModal";


const BASE_URL = "http://127.0.0.1:8000/api/booking"

export async function createBooking(payload: CreateBookingPayload) {
  const { data } = await axios.post(`${BASE_URL}`, payload);
  return data;
}