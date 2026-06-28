export type CreateBookingPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  schedule_at: string;
  status: string;
  notes?: string;
};