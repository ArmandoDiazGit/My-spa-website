function CardContent({ className, children, ref }) {
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default CardContent;
