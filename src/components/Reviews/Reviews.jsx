import { spaInfo, testimonials } from "../../spaData";
import { Star } from "lucide-react";
import styles from "./Reviews.module.css";

function Reviews({ ...rest }) {
  return (
    <section className={styles.section} {...rest}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What Our Clients Say</h2>
          <div className={styles.starsRow}>
            <div className={styles.starsInner}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill="#FFD700" color="#FFD700" />
              ))}
            </div>
            <span className={styles.rating}>{spaInfo.rating}</span>
          </div>
          <p className={styles.reviewCount}>Based on {spaInfo.reviewCount} reviews</p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.card}>
              <div className={styles.cardBody}>
                <div className={styles.starsSmall}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                  ))}
                </div>
                <p className={styles.testimonial}>"{testimonial.text}"</p>
                <div className={styles.meta}>
                  <span className={styles.name}>{testimonial.name}</span>
                  <span className={styles.date}>{testimonial.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
