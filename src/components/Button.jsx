function Button({ children, onClick, variant }) {
  switch (variant) {
    case "primary":
      variant =
        "bg-[#8B9D83] hover:bg-[#6B7D63] text-white text-lg px-8 py-6 h-10 rounded-md px-8 cursor-pointer";
      break;
    case "call":
      variant =
        "border border-input shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-8 border-2 border-white text-white hover:bg-white hover:text-[#2C2C2C] text-lg";
      break;
    case "contact":
      variant =
        "bg-[#C8A882] hover:bg-[#B89872] text-white px-6 py-3 cursor-pointer";
      break;
    case "outline":
      variant =
        "border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8 cursor-pointer";
      break;
    case "secondary":
      variant =
        "bg-[#8B9D83] hover:bg-[#6B7D63] text-white text-lg h-10 rounded-md px-8 cursor-pointer";
      break;
    case "default":
      variant =
        "w-full bg-[#C8A882] hover:bg-[#B89872] text-white text-lg cursor-pointer";
      break;
    case "submit":
      variant =
        "flex-1 bg-[#8B9D83] hover:bg-[#6B7D63] cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed";
      break;
    case "cancel":
      variant =
        "flex-1 border-2 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md cursor-pointer";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${variant}`}
    >
      {children}
    </button>
  );
}

export default Button;
