import Navigator from "./navigator";
import { CalendarIcon, Phone, Send } from "lucide-react";
import { spaInfo } from "../mockData";
import Button from "./Button";
import Card from "./Card"
import CardContent from "./CardContent";
import { useState } from "react";
import Footer from "./Footer";

function Contact() {
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
              Ready to experience the ultimate in relaxation and healing? We
              welcome all clients with respect and care in our LGBTQ+ friendly
              space. Reach out with any questions or special requests.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => console.log(test)}
                className="bg-[#8B9D83] hover:bg-[#6B7D63] text-white text-lg px-8 py-6"
              >
                <CalendarIcon className="mr-2" size={20} />
                Schedule Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-[#8B9D83] text-[#8B9D83] hover:bg-[#8B9D83] hover:text-white text-lg px-8 py-6"
              >
                <a href={`tel:${spaInfo.phone}`}>
                  <Phone className="mr-2" size={20} />
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
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-md border border-[#A8BAA0] focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-md border border-[#A8BAA0] focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-md border border-[#A8BAA0] focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                  />
                  <input
                    type="text"
                    placeholder="Preferred Date & Time"
                    className="w-full px-4 py-3 rounded-md border border-[#A8BAA0] focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                  />
                  <textarea
                    placeholder="Your Message or Special Requests"
                    rows={5}
                    className="w-full px-4 py-3 rounded-md border border-[#A8BAA0] focus:outline-none focus:ring-2 focus:ring-[#8B9D83]"
                  ></textarea>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#C8A882] hover:bg-[#B89872] text-white text-lg"
                  >
                    <Send className="mr-2" size={20} />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
