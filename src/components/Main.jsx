import About from "./About";
import Home from "./home";
import Services from "./Services";
import Reviews from "./Reviews";
import Location from "./Location";
import Contact from "./Contact";

function Main() {
  return (
    <div className="min-h-screen">
      <Home />
      <About />
      <Services />
      <Reviews />
      <Location />
      <Contact />
    </div>
  );
}

export default Main;
