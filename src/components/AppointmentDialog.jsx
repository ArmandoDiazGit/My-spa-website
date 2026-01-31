import { useState, useRef } from "react";
import Calendar from "./Calendar";
import Button from "./Button";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./Select";
import { services } from "../spaData";
import { useCreateBooking } from "../hooks/createBookingHooks";
import emailjs from "@emailjs/browser";
import { toast } from "../use-hooks/use-toast";

const AppointmentDialog = ({ open, onClose }) => {
  const formRef = useRef();
  const { mutate } = useCreateBooking();
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    time: "",
    notes: "",
  });

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
  ];

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function toISODate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function buildScheduleAt(dateObj, time12h) {
    const dateISO = toISODate(dateObj);
    const timeZ = time12hToHMSMicro(time12h);
    return `${dateISO}T${timeZ}`;
  }

  function time12hToHMSMicro(time12h, seconds = 0, milliseconds = 0) {
    const [time, meridiem] = time12h.trim().split(" ");
    let [hh, mm] = time.split(":").map(Number);

    if (meridiem === "PM" && hh !== 12) hh += 12;
    if (meridiem === "AM" && hh === 12) hh = 0;

    const ss = String(seconds).padStart(2, "0");
    const micro = String(milliseconds * 1000).padStart(6, "0");

    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(
      2,
      "0",
    )}:${ss}.${micro}`;
  }

  function sendEmail() {
    emailjs.sendForm("service_mar65gw", "template_l5vf47c", formRef.current, {
      publicKey: "fkzD0Wowyt32rnLvw",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const schedule_at = buildScheduleAt(date, formData.time);
    const timeZ = time12hToHMSMicro(formData.time);
    const formattedDate = date.toISOString().split("T")[0];

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      service: formData.service,
      notes: formData.notes?.trim() || "",
      date: formattedDate,
      time: timeZ,
      schedule_at,
      status: "pending",
    };

    mutate(payload, {
      onSuccess: () => {
        resetForm();
        setDate(null);
        toast({
          title: `Thank you ${formData.name} for booking!`,
          description: `We'll confirm your appointment for ${date?.toLocaleDateString()} at ${
            formData.time
          } shortly.`,
        });
        sendEmail();
        closeDialog();
      },
      onError: () => {
        toast({
          title: `Failed to book appointment`,
          description: `Please try again later or contact us directly. make sure all fields are filled out correctly.`,
        });
      },
    });
  }

  function isFormValid() {
    return (
      date &&
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.service &&
      formData.time
    );
  }

  function closeDialog() {
    onClose(false);
  }
  function showDate(selectedDate) {
    setDate(selectedDate);
  }
  function resetForm() {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      time: "",
      notes: "",
    });
  }
  function cancelForm(e) {
    e.preventDefault();
    setDate(null);
    resetForm();
    closeDialog();
  }

  return (
    <dialog
      open={open}
      className="fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto"
    >
      <div>
        <h2
          className="text-3xl font-bold"
          style={{
            color: "var(--color-sage-dark)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Book Your Appointment
        </h2>
        <p className="text-sm" style={{ color: "var(--color-warm-gray)" }}>
          Select your preferred date, time, and service below
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
        className="space-y-6 mt-4"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3
              className="text-lg font-semibold mb-3 flex items-center gap-2"
              style={{ color: "var(--color-sage-dark)" }}
            >
              <CalendarIcon size={20} />
              Select Date
            </h3>
            <div
              className="border rounded-lg p-4 bg-white"
              style={{ borderColor: "var(--color-sage-light)" }}
            >
              <Calendar
                mode="single"
                onSelect={setDate}
                selected={date}
                showDate={showDate}
              />
            </div>
            {date && (
              <p
                className="mt-2 text-sm font-semibold"
                style={{ color: "var(--color-sage)" }}
              >
                Selected:{" "}
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3
                htmlFor="name"
                className="flex items-center gap-2 mb-2"
                style={{ color: "var(--color-sage-dark)" }}
              >
                <User size={16} />
                Full Name *
              </h3>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                style={{ borderColor: "var(--color-sage-light)" }}
              />
            </div>

            <div>
              <h3
                htmlFor="email"
                className="flex items-center gap-2 mb-2"
                style={{ color: "var(--color-sage-dark)" }}
              >
                <Mail size={16} />
                Email Address *
              </h3>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange(e)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                style={{ borderColor: "var(--color-sage-light)" }}
              />
            </div>

            <div>
              <h3
                htmlFor="phone"
                className="flex items-center gap-2 mb-2"
                style={{ color: "var(--color-sage-dark)" }}
              >
                <Phone size={16} />
                Phone Number *
              </h3>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange(e)}
                placeholder="(770) 123-4567"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                style={{ borderColor: "var(--color-sage-light)" }}
              />
            </div>

            <div>
              <h3
                htmlFor="service"
                className="flex items-center gap-2 mb-2"
                style={{ color: "var(--color-sage-dark)" }}
              >
                Service Type *
              </h3>
              <Select
                value={formData.service}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, service: value }))
                }
              >
                <SelectTrigger
                  className={"w-full"}
                  style={{ borderColor: "var(--color-sage-light)" }}
                >
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent className={"bg-[#fafaf8]"}>
                  {services.map((service) => (
                    <SelectItem
                      key={service.id}
                      value={service.name}
                      className={"hover:bg-[#9caf88]"}
                    >
                      {service.name} - {service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3
                htmlFor="time"
                className="flex items-center gap-2 mb-2"
                style={{ color: "var(--color-sage-dark)" }}
              >
                <Clock size={16} />
                Preferred Time *
              </h3>
              <Select
                value={formData.time}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, time: value }))
                }
              >
                <SelectTrigger
                  className="w-full"
                  style={{ borderColor: "var(--color-sage-light)" }}
                >
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent className={"bg-[#fafaf8]"}>
                  {timeSlots.map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      className={"hover:bg-[#9caf88]"}
                    >
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h3
            htmlFor="notes"
            className="flex items-center gap-2 mb-2"
            style={{ color: "var(--color-sage-dark)" }}
          >
            <MessageSquare size={16} />
            Special Requests or Notes (Optional)
          </h3>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange(e)}
            placeholder="Any special requests, concerns, or areas you'd like us to focus on..."
            rows={4}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
            style={{ borderColor: "var(--color-sage-light)" }}
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant={"cancel"}
            style={{
              borderColor: "var(--color-sage)",
              color: "var(--color-sage)",
            }}
            onClick={(e) => cancelForm(e)}
          >
            Cancel
          </Button>
          <Button type="submit" variant={"submit"} disabled={!isFormValid}>
            Confirm Booking
          </Button>
        </div>

        <p
          className="text-xs text-center"
          style={{ color: "var(--color-warm-gray)" }}
        >
          * Required fields. We'll contact you shortly to confirm your
          appointment.
        </p>
      </form>
    </dialog>
  );
};

export default AppointmentDialog;
