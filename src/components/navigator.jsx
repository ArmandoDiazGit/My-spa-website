import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
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

function Navigator() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <div
          className="text-2xl font-bold"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-sage-dark)",
          }}
        >
          My SPA Website
        </div>

        <ul className="hidden md:flex items-center space-x-6">
          <li className="hover:text-[#8B9D83] transition-colors">
            <NavLink to="/">home</NavLink>
          </li>
          <li className="hover:text-[#8B9D83] transition-colors">
            <NavLink to="/about">about</NavLink>
          </li>
          <li className="hover:text-[#8B9D83] transition-colors">
            <NavLink to="/services">services</NavLink>
          </li>
          <li className="hover:text-[#8B9D83] transition-colors">
            <NavLink to="/reviews">reviews</NavLink>
          </li>
          <li className="hover:text-[#8B9D83] transition-colors">
            <NavLink to="/location">location</NavLink>
          </li>
          <li className="hover:text-[#8B9D83] transition-colors">
            <NavLink to="/contact">contact</NavLink>
          </li>
        </ul>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-3">
          <button className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors" onClick={() => { navigate("/"); setMobileMenuOpen(false); }}>
            Home
          </button>
          <button className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors" onClick={() => { navigate("/about"); setMobileMenuOpen(false); }} >
            About
          </button>
          <button className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors" onClick={() => { navigate("/services"); setMobileMenuOpen(false); }} >
            Services
          </button>
          <button className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors" onClick={() => { navigate("/reviews  "); setMobileMenuOpen(false); }}>
            Reviews
          </button>
          <button className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors" onClick={() => { navigate("/location"); setMobileMenuOpen(false); }}>
            Location
          </button>
          <button className="block w-full text-left py-2 hover:text-[#8B9D83] transition-colors" onClick={() => { navigate("/contact"); setMobileMenuOpen(false); }}>
            Contact
          </button>
          <a
            href={`tel:111-222-3333`}
            className="flex items-center gap-2 py-2 text-[#8B9D83]"
          >
            <Phone size={18} />
            <span className="font-semibold">111-222-3333</span>
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navigator;
