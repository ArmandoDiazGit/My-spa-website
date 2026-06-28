import { images, spaInfo } from "../../spaData.js";
import { Phone, Star, Calendar as CalendarIcon } from "lucide-react";
import Button from "../Button/Button.jsx";
import { useState } from "react";
import AppointmentDialog from "../AppointmentDialog/AppointmentDialog";
import styles from "./Home.module.css";

function Home({ ...rest }) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <section className={styles.hero} {...rest}>
        <div className={styles.overlay}>
          <img src={images.hero} alt="Spa massage therapy" />
          <div className={styles.gradient}></div>
        </div>

        <div className={styles.content}>
          <div className={styles.textBox}>
            <h1 className={styles.title}>{spaInfo.name}</h1>
            <p className={styles.tagline}>{spaInfo.tagline}</p>
            <p className={styles.description}>{spaInfo.about}</p>

            <div className={styles.stars}>
              <div className={styles.starsInner}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              <span className={styles.ratingText}>
                {spaInfo.rating} ({spaInfo.reviewCount} reviews)
              </span>
            </div>

            <div className={styles.buttons}>
              <Button variant={"primary"} onClick={() => setOpenDialog(true)}>
                <CalendarIcon size={20} />
                Book an Appointment
              </Button>

              <a href={`tel:${spaInfo.phone}`} className={styles.callLink}>
                <Phone size={20} />
                Call Now
              </a>
            </div>

            <p className={styles.location}>
              📍 {spaInfo.address.street}, {spaInfo.address.city} • Opens at 9 AM
            </p>
          </div>
        </div>
      </section>

      {openDialog && (
        <AppointmentDialog
          open={openDialog}
          onClose={setOpenDialog}
        />
      )}
    </>
  );
}

export default Home;
