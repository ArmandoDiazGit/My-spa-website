import { CalendarIcon, Phone, Send } from "lucide-react";
import { spaInfo } from "../../spaData";
import Button from "../Button/Button";
import { useRef, useState } from "react";
import AppointmentDialog from "../AppointmentDialog/AppointmentDialog";
import emailjs from "@emailjs/browser";
import { toast } from "../../use-hooks/use-toast";
import styles from "./Contact.module.css";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function Contact({ ...rest }) {
  const [openDialog, setOpenDialog] = useState(false);
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    time: "",
    notes: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(() => {
        toast({ title: "Message sent!", description: "We'll get back to you as soon as possible." });
        setFormData({ name: "", email: "", phone: "", time: "", notes: "" });
      })
      .catch(() => {
        toast({ title: "Failed to send message", description: "Please try again later or contact us directly." });
      });
  }

  return (
    <>
      <section className={styles.section} {...rest}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <h2 className={styles.title}>Book Your Appointment Today</h2>
            <p className={styles.subtitle}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC.
            </p>

            <div className={styles.buttons}>
              <Button variant="secondary" onClick={() => setOpenDialog(true)}>
                <CalendarIcon size={20} />
                Schedule Appointment
              </Button>

              <a href={`tel:${spaInfo.phone}`} className={styles.phoneLink}>
                <Phone size={20} />
                {spaInfo.phone}
              </a>
            </div>

            <div className={styles.card}>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>Send Us a Message</h3>
                <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      type="text"
                      placeholder="Your Name"
                      className={styles.input}
                    />
                    <input
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      type="email"
                      placeholder="Email Address"
                      className={styles.input}
                    />
                  </div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    type="tel"
                    placeholder="Phone Number"
                    className={styles.input}
                  />
                  <input
                    name="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    type="text"
                    placeholder="Preferred Date & Time"
                    className={styles.input}
                  />
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Your Message or Special Requests"
                    rows={5}
                    className={styles.textarea}
                  ></textarea>
                  <Button variant="default" type="submit">
                    <Send size={20} />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {openDialog && (
        <AppointmentDialog open={openDialog} onClose={setOpenDialog} />
      )}
    </>
  );
}

export default Contact;
