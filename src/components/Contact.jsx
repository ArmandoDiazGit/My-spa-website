import Navigator from "./navigator";
import { CalendarIcon, Phone, Send } from "lucide-react";
import { spaInfo } from "../spaData";
import Button from "./Button";
import Card from "./Card";
import CardContent from "./CardContent";
import { useState } from "react";
import Footer from "./Footer";
import AppointmentDialog from "./AppointmentDialog";

function Contact() {
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    time: "",
    notes: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log("test", formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      time: "",
      notes: "",
    });
  }

  function openDialogHandler() {
    setOpenDialog(true);
  }

  function handleDialogClose(value) {
    setOpenDialog(value);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <Navigator />
      </header>

      <section
        className="section py-20"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: "var(--color-sage-dark)" }}
            >
              Book Your Appointment Today
            </h2>
            <p
              className="text-lg mb-8"
              style={{ color: "var(--color-charcoal)" }}
            >
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                variant={"secondary"}
                onClick={openDialogHandler}
                className="bg-[#8B9D83] hover:bg-[#6B7D63] text-white text-lg px-8 py-6"
              >
                <CalendarIcon className="mr-2" size={20} />
                Schedule Appointment
              </Button>
              <Button
                variant={"outline"}
                className="border-2 border-[#8B9D83] text-[#8B9D83] hover:bg-[#8B9D83] hover:text-white text-lg px-8 py-6"
              >
                <a href={`tel:${spaInfo.phone}`}>
                  <Phone
                    className="mr-2 inline-flex items-center justify-center gap-2"
                    size={20}
                  />
                  {spaInfo.phone}
                </a>
              </Button>
            </div>

            <Card className="border-[#A8BAA0]">
              <CardContent className="p-8">
                <h3
                  className="text-2xl font-bold mb-6"
                  style={{ color: "var(--color-sage-dark)" }}
                >
                  Send Us a Message
                </h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-md border border-[#A8BAA0] focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                    />
                    <input
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-md border border-[#A8BAA0] focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                    />
                  </div>
                  <input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-md border border-[#A8BAA0] focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                  />
                  <input
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    type="text"
                    placeholder="Preferred Date & Time"
                    className="w-full px-4 py-3 rounded-md border border-[#A8BAA0] focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                  />
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Your Message or Special Requests"
                    rows={5}
                    className="w-full px-4 py-3 rounded-md border border-[#A8BAA0] focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                  ></textarea>
                  <Button variant={"default"} onClick={handleSubmit}>
                    <Send className="mr-2" size={20} />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {openDialog && (
        <AppointmentDialog
          open={openDialog}
          onClose={handleDialogClose}
          className="fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
        />
      )}

      <Footer />
    </>
  );
}

export default Contact;
