import { spaInfo, testimonials } from "../spaData";
import Navigator from "./navigator";
import Card from "./Card";
import CardContent from "./CardContent";
import { Star } from "lucide-react";

function Reviews() {
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
    </>
  );
}

export default Reviews;
