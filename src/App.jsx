import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Services from "./components/Services/Services.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";
import Location from "./components/Location/Location.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Navigator from "./components/Navigator/navigator";
import Footer from "./components/Footer/Footer";
import Toaster from "./ui/Toaster";

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
