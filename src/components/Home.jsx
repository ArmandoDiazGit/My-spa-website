import { images, spaInfo } from "../mockData.js";
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
import Button from "./Button.jsx";
import Navigator from "./navigator";
import { useState } from "react";

function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <Navigator />
      </header>

      <section className="relative pt-20 min-h-screen flex items-center">
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
              <Button type={"schedule"} onClick={() => console.log("test")}>
                <CalendarIcon className="mr-2" size={20} />
                Book an Appointment
              </Button>

              <Button
                className="border-2 border-white text-white hover:bg-white hover:text-[#2C2C2C] text-lg"
                type={"call"}
                onClick={() => console.log("test")}
              >
                <a href={`tel:${spaInfo.phone}`}>
                  <Phone
                    className="mr-2 inline-flex items-center justify-center gap-2"
                    size={20}
                  />
                  Call Now
                </a>
              </Button>
            </div>

            <p className="mt-6 text-sm">
              📍 Located in test, test • Opens at 9 AM
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
