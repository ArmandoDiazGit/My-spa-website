import { useState, useRef } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import Calendar from "./Calendar";
import Button from "../ui/Button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/Select";
import { services } from "../data/services";
import { useCreateBooking } from "./use-create-booking";
import { buildScheduleAt, time12hToHMSMicro, toISODate } from "./datetime";
import { sendEmailForm } from "../api/email";
import { toast } from "../ui/use-toast";
import styles from "./AppointmentDialog.module.css";

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
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
  ];

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!date || !formData.time) return;

    const schedule_at = buildScheduleAt(date, formData.time);
    const timeZ = time12hToHMSMicro(formData.time);
    const formattedDate = toISODate(date);

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
        // Fire before resetting the form so EmailJS reads the submitted values.
        sendEmailForm(formRef.current).catch(() => {});
        resetForm();
        setDate(null);
        toast({
          title: `Thank you ${formData.name} for booking!`,
          description: `We'll confirm your appointment for ${date.toLocaleDateString()} at ${formData.time} shortly.`,
        });
        closeDialog();
      },
      onError: () => {
        toast({
          title: "Failed to book appointment",
          description: "Please try again later or contact us directly.",
        });
      },
    });
  }

  function isFormValid() {
    return date && formData.name && formData.email && formData.phone && formData.service && formData.time;
  }

  function closeDialog() {
    onClose(false);
  }

  function resetForm() {
    setFormData({ name: "", email: "", phone: "", service: "", time: "", notes: "" });
  }

  function cancelForm(e) {
    e.preventDefault();
    setDate(null);
    resetForm();
    closeDialog();
  }

  return (
    <dialog open={open} className={styles.dialog} data-testid="booking-dialog">
      <div>
        <h2 className={styles.headerTitle}>Book Your Appointment</h2>
        <p className={styles.headerSub}>Select your preferred date, time, and service below</p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={styles.form}
        data-testid="booking-form"
      >
        <div className={styles.grid}>
          <div className={styles.calendarSection}>
            <h3 className={styles.sectionTitle}>
              <CalendarIcon size={20} />
              Select Date
            </h3>
            <div className={styles.calendarBox} data-testid="booking-date">
              <Calendar selected={date} onSelect={setDate} />
            </div>
            {date && (
              <p className={styles.selectedDate} data-testid="booking-selected-date">
                Selected: {date.toLocaleDateString("en-US", {
                  weekday: "long", year: "numeric", month: "long", day: "numeric",
                })}
              </p>
            )}
          </div>

          <div className={styles.formFields}>
            <div className={styles.fieldGroup}>
              <h3 className={styles.fieldLabel}>
                <User size={16} />
                Full Name *
              </h3>
              <input
                id="name" name="name" type="text" required
                value={formData.name} onChange={handleInputChange}
                placeholder="Enter your full name"
                className={styles.fieldInput}
                data-testid="booking-name"
              />
            </div>

            <div className={styles.fieldGroup}>
              <h3 className={styles.fieldLabel}>
                <Mail size={16} />
                Email Address *
              </h3>
              <input
                id="email" name="email" type="email" required
                value={formData.email} onChange={handleInputChange}
                placeholder="your.email@example.com"
                className={styles.fieldInput}
                data-testid="booking-email"
              />
            </div>

            <div className={styles.fieldGroup}>
              <h3 className={styles.fieldLabel}>
                <Phone size={16} />
                Phone Number *
              </h3>
              <input
                id="phone" name="phone" type="tel" required
                value={formData.phone} onChange={handleInputChange}
                placeholder="(770) 123-4567"
                className={styles.fieldInput}
                data-testid="booking-phone"
              />
            </div>

            <div className={styles.fieldGroup}>
              <h3 className={styles.fieldLabel}>Service Type *</h3>
              <Select
                value={formData.service}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
              >
                <SelectTrigger
                  className={styles.selectTrigger}
                  data-testid="booking-service-trigger"
                >
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent className={styles.selectContent}>
                  {services.map((service) => (
                    <SelectItem
                      key={service.id}
                      value={service.name}
                      className={styles.selectItem}
                      data-testid={`service-option-${service.id}`}
                    >
                      {service.name} - {service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.fieldGroup}>
              <h3 className={styles.fieldLabel}>
                <Clock size={16} />
                Preferred Time *
              </h3>
              <Select
                value={formData.time}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
              >
                <SelectTrigger
                  className={styles.selectTrigger}
                  data-testid="booking-time-trigger"
                >
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent
                  className={`${styles.selectContent} ${styles.timeSelectContent}`}
                  position="popper"
                >
                  {timeSlots.map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      className={styles.selectItem}
                      data-testid={`time-option-${time.replace(/\W/g, "")}`}
                    >
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className={styles.notesSection}>
          <h3 className={styles.notesLabel}>
            <MessageSquare size={16} />
            Special Requests or Notes (Optional)
          </h3>
          <textarea
            id="notes" name="notes"
            value={formData.notes} onChange={handleInputChange}
            placeholder="Any special requests, concerns, or areas you'd like us to focus on..."
            rows={4}
            className={styles.notesInput}
            data-testid="booking-notes"
          />
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="cancel" onClick={cancelForm} data-testid="booking-cancel">Cancel</Button>
          <Button type="submit" variant="submit" disabled={!isFormValid()} data-testid="booking-submit">Confirm Booking</Button>
        </div>

        <p className={styles.disclaimer}>* Required fields. We'll contact you shortly to confirm your appointment.</p>
      </form>
    </dialog>
  );
};

export default AppointmentDialog;
