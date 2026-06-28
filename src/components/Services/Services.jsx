import Button from "../Button/Button";
import { services } from "../../spaData";
import { useState } from "react";
import AppointmentDialog from "../AppointmentDialog/AppointmentDialog";
import styles from "./Services.module.css";

function Services({ ...rest }) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <section className={styles.section} {...rest}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Our Services</h2>
            <p className={styles.subtitle}>
              Discover our range of therapeutic massage services designed to
              restore balance and promote healing
            </p>
          </div>

          <div className={styles.grid}>
            {services.map((service) => (
              <div key={service.id} className={styles.card}>
                <div className={styles.cardBody}>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <p className={styles.description}>{service.description}</p>
                  <div className={styles.benefits}>
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className={styles.benefitRow}>
                        <div className={styles.benefitDot}></div>
                        <span className={styles.benefitText}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.footer}>
                    <span className={styles.duration}>{service.duration}</span>
                    <span className={styles.price}>{service.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <p className={styles.ctaText}>Not sure which service is right for you?</p>
            <div className={styles.ctaButton}>
              <Button onClick={() => setOpenDialog(true)} variant={"contact"}>
                Contact Us for Recommendations
              </Button>
            </div>
          </div>
        </div>
      </section>

      {openDialog && (
        <AppointmentDialog open={openDialog} onClose={setOpenDialog} />
      )}
    </>
  );
}

export default Services;
