import styles from "./Button.module.css";

function Button({ children, onClick, variant, className, ...props }) {
  const variantClass = styles[variant] || "";

  return (
    <button
      onClick={onClick}
      className={`${styles.base} ${variantClass} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
