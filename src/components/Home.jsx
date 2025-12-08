import { images, spaInfo } from "../spaData.js";
import { Phone, Star, Calendar as CalendarIcon } from "lucide-react";
import Button from "./Button.jsx";
import Navigator from "./navigator";
import { useState } from "react";
import AppointmentDialog from "./AppointmentDialog";

function Home() {
  const [openDialog, setOpenDialog] = useState(false);

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

      <section className="relative pt-20 min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={images.hero}
            alt="Spa massage therapy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>
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
              <Button variant={"primary"} onClick={openDialogHandler}>
                <CalendarIcon className="mr-2" size={20} />
                Book an Appointment
              </Button>

              <Button
                className="border-2 border-white text-white hover:bg-white hover:text-[#2C2C2C] text-lg"
                variant={"call"}
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
      {openDialog && (
        <AppointmentDialog
          open={openDialog}
          onClose={handleDialogClose}
          className="fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
        />
      )}
    </>
  );
}

export default Home;
