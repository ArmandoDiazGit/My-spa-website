import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import styles from "./Navigator.module.css";
import { spaInfo } from "../../spaData";

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const links = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "services", label: "services" },
  { id: "reviews", label: "reviews" },
  { id: "location", label: "location" },
  { id: "contact", label: "contact" },
];

function Navigator() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => scrollTo("home")}>My SPA Website</div>

        <ul className={styles.desktopLinks}>
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? styles.active : ""}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {links.map((link) => (
            <button
              key={link.id}
              className={`${styles.mobileLink}${activeSection === link.id ? ` ${styles.active}` : ""}`}
              onClick={() => { scrollTo(link.id); setMobileMenuOpen(false); }}
            >
              {link.label.charAt(0).toUpperCase() + link.label.slice(1)}
            </button>
          ))}
          <a href={`tel:${spaInfo.phone}`} className={styles.mobilePhone}>
            <Phone size={16} />
            <span>{spaInfo.phone}</span>
          </a>
        </div>
      )}
    </header>
  );
}

export default Navigator;
