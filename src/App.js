import { useState } from "react";
import "./App.css";

import Footer from "./Footer";
import Header from "./Header";
import Map from "./Map";
import Travel from "./Travel";

function App() {

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  return (
    <div className="app">
      <Header />
      <Travel distance={distance} duration={duration}/>
      <div className="container map">
        <Map
          setDistance={setDistance}
          setDuration={setDuration}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
