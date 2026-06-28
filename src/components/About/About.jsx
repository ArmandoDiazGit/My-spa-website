import { images } from "../../spaData";
import styles from "./About.module.css";

function About({ ...rest }) {
  return (
    <section className={styles.section} {...rest}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.grid}>
            <div>
              <img
                src={images.therapy}
                alt="Professional massage therapy"
                className={styles.image}
              />
            </div>
            <div>
              <h2 className={styles.title}>About Us</h2>
              <p className={styles.text}>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </p>

              <p className={styles.textLast}>
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s.
              </p>

              <div className={styles.features}>
                <div className={styles.featureRow}>
                  <div className={styles.dot}></div>
                  <span>Professional & Certified Massage Therapist</span>
                </div>
                <div className={styles.featureRow}>
                  <div className={styles.dot}></div>
                  <span>Personalized Treatment Plans</span>
                </div>
                <div className={styles.featureRow}>
                  <div className={styles.dot}></div>
                  <span>Conveniently Located in Test</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
