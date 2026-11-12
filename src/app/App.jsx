import Home from "../features/home/Home";
import About from "../features/about/About";
import Services from "../features/services/Services";
import Reviews from "../features/reviews/Reviews";
import Location from "../features/location/Location";
import Contact from "../features/contact/Contact";
import Navigator from "../features/navigation/Navigator";
import Footer from "../features/footer/Footer";
import Toaster from "../shared/ui/Toaster";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navigator />
      <Home id="home" />
      <About id="about" />
      <Services id="services" />
      <Reviews id="reviews" />
      <Location id="location" />
      <Contact id="contact" />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
