function Card({ className, children, ref }) {
  return (
    <div
      ref={ref}
      className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
