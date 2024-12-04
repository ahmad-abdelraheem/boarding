// Components
import Header from "./components/Header";
import Footer from "./components/Footer"

// Routing 
import { About, Checkout, Home } from "./pages/routes";
import { Route, Routes } from "react-router-dom";
// style
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/checkout" Component={Checkout}></Route>
        <Route path="/about" Component={About}></Route>
      </Routes>
      <Footer/>
    </div>
  );
} 

export default App;
