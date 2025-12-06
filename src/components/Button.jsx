function Button({ children, onClick, type }) {
  switch (type) {
    case "schedule":
      type =
        "bg-[#8B9D83] hover:bg-[#6B7D63] text-white text-lg px-8 py-6 h-10 rounded-md px-8 cursor-pointer";
      break;
    case "call":
      type =
        "border border-input shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-8 border-2 border-white text-white hover:bg-white hover:text-[#2C2C2C] text-lg";
      break;
    case "contact":
      type = "bg-[#C8A882] hover:bg-[#B89872] text-white px-6 py-3 cursor-pointer";
      break;

    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${type}`}
    >
      {children}
    </button>
  );
}

export default Button;
