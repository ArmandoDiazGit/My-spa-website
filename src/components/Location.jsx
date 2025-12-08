import Navigator from "./navigator";
import { MapPin, Clock } from "lucide-react";
import { spaInfo } from "../spaData";
import Footer from "./Footer";

function Location() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <Navigator />
      </header>

      <section className="section py-20">
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
    </>
  );
}

export default Location;
