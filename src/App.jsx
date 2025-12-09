import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Reviews from "./components/Reviews.jsx";
import Location from "./components/Location.jsx";
import Contact from "./components/Contact.jsx";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/My-spa-website/" element={<Home />} />
          <Route path="/My-spa-website/about" element={<About />} />
          <Route path="/My-spa-website/services" element={<Services />} />
          <Route path="/My-spa-website/reviews" element={<Reviews />} />
          <Route path="/My-spa-website/location" element={<Location />} />
          <Route path="/My-spa-website/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
