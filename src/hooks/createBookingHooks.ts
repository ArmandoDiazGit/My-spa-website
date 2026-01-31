import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "./booking";
import { CreateBookingPayload } from "../models/bookingModal";

export function useCreateBooking() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
