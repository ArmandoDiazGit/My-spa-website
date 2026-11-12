import { lazy, Suspense } from "react";

// Defer the calendar, Radix select, and EmailJS code until the dialog is
// actually opened. The initial page does not need any of it.
const AppointmentDialog = lazy(() => import("./AppointmentDialog"));

function BookingDialog({ open, onClose }) {
  if (!open) return null;

  return (
    <Suspense fallback={null}>
      <AppointmentDialog open={open} onClose={onClose} />
    </Suspense>
  );
}

export default BookingDialog;
