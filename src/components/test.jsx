import React, { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Menu,
  X,
  Calendar as CalendarIcon,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { spaInfo, services, testimonials, images } from "../mockData";
import BookingModal from "./BookingModal";

const SpaLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-sage-dark)",
              }}
            >
              {spaInfo.name}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("home")}
                className="hover:text-[#8B9D83] transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-[#8B9D83] transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="hover:text-[#8B9D83] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="hover:text-[#8B9D83] transition-colors"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("location")}
                className="hover:text-[#8B9D83] transition-colors"
              >
                Location
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-[#8B9D83] transition-colors"
              >
                Contact
              </button>
              <a
                href={`tel:${spaInfo.phone}`}
                className="flex items-center gap-2 text-[#8B9D83] hover:text-[#6B7D63] transition-colors"
              >
                <Phone size={18} />
                <span className="font-semibold">{spaInfo.phone}</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("location")}
                className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors"
              >
                Location
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors"
              >
                Contact
              </button>
              <a
                href={`tel:${spaInfo.phone}`}
                className="flex items-center gap-2 py-2 text-[#8B9D83]"
              >
                <Phone size={18} />
                <span className="font-semibold">{spaInfo.phone}</span>
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-20 min-h-screen flex items-center"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={images.hero}
            alt="Spa massage therapy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl text-white">
            <h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {spaInfo.name}
            </h1>
            <p
              className="text-2xl md:text-3xl mb-6 font-light"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {spaInfo.tagline}
            </p>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              {spaInfo.about}
            </p>

            <div className="flex items-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              <span className="text-lg font-semibold">
                {spaInfo.rating} ({spaInfo.reviewCount} reviews)
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setBookingOpen(true)}
                className="bg-[#8B9D83] hover:bg-[#6B7D63] text-white text-lg px-8 py-6"
              >
                <CalendarIcon className="mr-2" size={20} />
                Book an Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white text-white hover:bg-white hover:text-[#2C2C2C] text-lg px-8 py-6"
              >
                <a href={`tel:${spaInfo.phone}`}>
                  <Phone className="mr-2" size={20} />
                  Call Now
                </a>
              </Button>
            </div>

            <p className="mt-6 text-sm">
              📍 Located in Duluth, GA • LGBTQ+ Friendly • Opens at 9 AM
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="section py-20"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={images.therapy}
                  alt="Professional massage therapy"
                  className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                />
              </div>
              <div>
                <h2
                  className="text-4xl font-bold mb-6"
                  style={{ color: "var(--color-sage-dark)" }}
                >
                  About Keila
                </h2>
                <p
                  className="text-lg mb-4 leading-relaxed"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  Keila is a dedicated and experienced massage therapist with a
                  passion for healing and wellness. With years of professional
                  training and a genuine commitment to personalized care, Keila
                  creates a safe, comfortable, and inclusive environment for
                  every client.
                </p>
                <p
                  className="text-lg mb-6 leading-relaxed"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  At Spa&Massage by Keila, we believe everyone deserves to feel
                  relaxed, rejuvenated, and respected. Our LGBTQ+ friendly space
                  welcomes all individuals seeking therapeutic massage and
                  holistic wellness. Each session is tailored to your specific
                  needs, ensuring you leave feeling refreshed and renewed.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#8B9D83]"></div>
                    <span>Professional & Certified Massage Therapist</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#8B9D83]"></div>
                    <span>Personalized Treatment Plans</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#8B9D83]"></div>
                    <span>LGBTQ+ Friendly & Inclusive</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#8B9D83]"></div>
                    <span>Conveniently Located in Satellite Shops I</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-sage-dark)" }}
            >
              Our Services
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--color-warm-gray)" }}
            >
              Discover our range of therapeutic massage services designed to
              restore balance and promote healing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card
                key={service.id}
                className="hover:shadow-xl transition-shadow duration-300 border-[#A8BAA0]"
              >
                <CardContent className="p-6">
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{
                      color: "var(--color-sage-dark)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="mb-4"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    {service.description}
                  </p>
                  <div className="mb-4 space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B9D83]"></div>
                        <span style={{ color: "var(--color-warm-gray)" }}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-[#E8E4DC]">
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-warm-gray)" }}
                    >
                      {service.duration}
                    </span>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "var(--color-sage)" }}
                    >
                      {service.price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p
              className="text-lg mb-4"
              style={{ color: "var(--color-warm-gray)" }}
            >
              Not sure which service is right for you?
            </p>
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-[#C8A882] hover:bg-[#B89872] text-white"
            >
              Contact Us for Recommendations
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section
        id="reviews"
        className="section py-20"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-sage-dark)" }}
            >
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--color-charcoal)" }}
              >
                {spaInfo.rating}
              </span>
            </div>
            <p className="text-lg" style={{ color: "var(--color-warm-gray)" }}>
              Based on {spaInfo.reviewCount} reviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-[#A8BAA0]">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                    ))}
                  </div>
                  <p
                    className="mb-4 italic"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    "{testimonial.text}"
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className="font-semibold"
                      style={{ color: "var(--color-sage-dark)" }}
                    >
                      {testimonial.name}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-warm-gray)" }}
                    >
                      {testimonial.date}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="section py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-4xl font-bold mb-12 text-center"
              style={{ color: "var(--color-sage-dark)" }}
            >
              Visit Us
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="mb-8">
                  <h3
                    className="text-2xl font-bold mb-4 flex items-center gap-2"
                    style={{ color: "var(--color-sage-dark)" }}
                  >
                    <MapPin size={24} />
                    Location
                  </h3>
                  <p className="text-lg mb-2">{spaInfo.address.street}</p>
                  <p className="text-lg mb-2">
                    {spaInfo.address.city}, {spaInfo.address.state}{" "}
                    {spaInfo.address.zip}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-warm-gray)" }}
                  >
                    {spaInfo.address.location}
                  </p>
                  <p
                    className="text-sm mt-2"
                    style={{ color: "var(--color-warm-gray)" }}
                  >
                    Plus Code: {spaInfo.plusCode}
                  </p>
                </div>

                <div>
                  <h3
                    className="text-2xl font-bold mb-4 flex items-center gap-2"
                    style={{ color: "var(--color-sage-dark)" }}
                  >
                    <Clock size={24} />
                    Hours
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(spaInfo.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-semibold capitalize">{day}:</span>
                        <span style={{ color: "var(--color-warm-gray)" }}>
                          {hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-[#E8E4DC] rounded-lg p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapPin
                      size={48}
                      className="mx-auto mb-4"
                      style={{ color: "var(--color-sage)" }}
                    />
                    <p
                      className="text-lg"
                      style={{ color: "var(--color-charcoal)" }}
                    >
                      Interactive Google Map
                    </p>
                    <p
                      className="text-sm mt-2"
                      style={{ color: "var(--color-warm-gray)" }}
                    >
                      (Map embed to be added)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Booking Section */}
      <section
        id="contact"
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
                onClick={() => setBookingOpen(true)}
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

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {spaInfo.name}
              </h3>
              <p className="mb-2">{spaInfo.address.street}</p>
              <p className="mb-2">
                {spaInfo.address.city}, {spaInfo.address.state}{" "}
                {spaInfo.address.zip}
              </p>
              <p className="mb-4">{spaInfo.address.location}</p>
              <a
                href={`tel:${spaInfo.phone}`}
                className="flex items-center gap-2 hover:text-[#A8BAA0] transition-colors"
              >
                <Phone size={18} />
                {spaInfo.phone}
              </a>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("home")}
                  className="block hover:text-[#A8BAA0] transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block hover:text-[#A8BAA0] transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="block hover:text-[#A8BAA0] transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("reviews")}
                  className="block hover:text-[#A8BAA0] transition-colors"
                >
                  Reviews
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block hover:text-[#A8BAA0] transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
              <p className="mb-4">
                Follow us on social media for updates and wellness tips!
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8B9D83] flex items-center justify-center cursor-pointer hover:bg-[#A8BAA0] transition-colors">
                  F
                </div>
                <div className="w-10 h-10 rounded-full bg-[#8B9D83] flex items-center justify-center cursor-pointer hover:bg-[#A8BAA0] transition-colors">
                  I
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="mb-2">
              LGBTQ+ Friendly • Duluth, GA • Professional Massage Therapy
            </p>
            <p className="text-sm text-gray-400">
              &copy; 2025 {spaInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};

export default SpaLanding;
