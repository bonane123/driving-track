import "./App.css";

import Footer from "./Footer";
import Header from "./Header";
import Map from "./Map";
import Travel from "./Travel";

function App() {
  return (
    <div className="app">
      <Header />
      <Travel/>
      <div className="container map"><Map/></div>
      <Footer />
    </div>
  );
}

export default App;
