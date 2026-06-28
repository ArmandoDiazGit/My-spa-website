import { Phone } from "lucide-react";
import { spaInfo } from "../../spaData";
import facebook from "../../libs/img/facebook.svg";
import instagram from "../../libs/img/instagram.svg";
import styles from "./Footer.module.css";

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h3 className={styles.brandName}>{spaInfo.name}</h3>
            <p className={styles.address}>{spaInfo.address.street}</p>
            <p className={styles.address}>
              {spaInfo.address.city}, {spaInfo.address.state} {spaInfo.address.zip}
            </p>
            <p className={styles.address}>{spaInfo.address.location}</p>
            <a href={`tel:${spaInfo.phone}`} className={styles.phoneLink}>
              <Phone size={18} />
              {spaInfo.phone}
            </a>
          </div>

          <div>
            <h4 className={styles.linkHeading}>Quick Links</h4>
            <div className={styles.linkList}>
              <button onClick={() => scrollTo("home")} className={styles.navButton}>Home</button>
              <button onClick={() => scrollTo("about")} className={styles.navButton}>About</button>
              <button onClick={() => scrollTo("services")} className={styles.navButton}>Services</button>
              <button onClick={() => scrollTo("reviews")} className={styles.navButton}>Reviews</button>
              <button onClick={() => scrollTo("contact")} className={styles.navButton}>Contact</button>
            </div>
          </div>

          <div>
            <h4 className={styles.linkHeading}>Connect With Us</h4>
            <p className={styles.socialDesc}>Follow us on social media for updates and wellness tips!</p>
            <div className={styles.socialRow}>
              <button onClick={() => window.open("https://www.facebook.com", "_blank")} className={styles.socialIcon}>
                <img src={facebook} alt="Facebook" className={styles.socialImg} />
              </button>
              <button onClick={() => window.open("https://www.instagram.com", "_blank")} className={styles.socialIcon}>
                <img src={instagram} alt="Instagram" className={styles.socialImg} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.divider}>
          <p className={styles.copyright}>Test, Test • Professional Massage Therapy</p>
          <p className={styles.small}>&copy; 2026 Test. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
