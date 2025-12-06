import { Phone } from "lucide-react";
import { spaInfo } from "../mockData";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
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
                onClick={() => navigate("/")}
                className="block hover:text-[#A8BAA0] transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/about")}
                className="block hover:text-[#A8BAA0] transition-colors"
              >
                About
              </button>
              <button
                onClick={() => navigate("/services")}
                className="block hover:text-[#A8BAA0] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => navigate("/reviews")}
                className="block hover:text-[#A8BAA0] transition-colors"
              >
                Reviews
              </button>
              <button
                onClick={() => navigate("/contact")}
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
            Test, Test • Professional Massage Therapy
          </p>
          <p className="text-sm text-gray-400">
            &copy; 2025 Test. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
