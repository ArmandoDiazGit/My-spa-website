import Navigator from "./navigator";
import Button from "./Button";
import { services } from "../spaData";
import Card from "./Card";
import CardContent from "./CardContent";
import { useState } from "react";
import AppointmentDialog from "./AppointmentDialog";

function Services() {
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

      <section className="section py-20">
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
            <Button onClick={openDialogHandler} variant={"contact"}>
              Contact Us for Recommendations
            </Button>
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

export default Services;
