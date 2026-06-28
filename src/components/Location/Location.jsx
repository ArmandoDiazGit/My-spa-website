import { MapPin, Clock } from "lucide-react";
import { spaInfo } from "../../spaData";
import styles from "./Location.module.css";

function Location({ ...rest }) {
  return (
    <section className={styles.section} {...rest}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <h2 className={styles.title}>Visit Us</h2>

          <div className={styles.grid}>
            <div>
              <div className={styles.infoBlock}>
                <h3 className={styles.subheading}>
                  <MapPin size={24} />
                  Location
                </h3>
                <p className={styles.addressLine}>{spaInfo.address.street}</p>
                <p className={styles.addressLine}>
                  {spaInfo.address.city}, {spaInfo.address.state} {spaInfo.address.zip}
                </p>
                <p className={styles.muted}>{spaInfo.address.location}</p>
                <p className={styles.plusCode}>Plus Code: {spaInfo.plusCode}</p>
              </div>

              <div>
                <h3 className={styles.subheading}>
                  <Clock size={24} />
                  Hours
                </h3>
                <div className={styles.hoursList}>
                  {Object.entries(spaInfo.hours).map(([day, hours]) => (
                    <div key={day} className={styles.hoursRow}>
                      <span className={styles.day}>{day}:</span>
                      <span className={styles.hours}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapContent}>
                  <MapPin size={48} className={styles.mapIcon} />
                  <p className={styles.mapTitle}>Interactive Google Map</p>
                  <p className={styles.mapSub}>(Map embed to be added)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
