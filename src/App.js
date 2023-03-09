import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoinDetails from "./components/CoinDetails";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={ <Home />}/>
        <Route path="/coins" element={ <Coins />}/>
        <Route path="/exchanges" element={ <Exchanges />}/>
        <Route path="/coin/:coinId" element={ <CoinDetails />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
