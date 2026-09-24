import { Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import Header from "./components/Header/Header";
import Hero from "./components/ProductPage/Hero";
import Productpage from "./components/ProductPage/Productpage";
import Footer from "./components/Footer/Footer";
import DetailPage from "./components/DetailPage/DetailPage";

const App = () => {
  return (

    <CartProvider>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Productpage />
            </>
          }
        />
        <Route path="/product/:id" element={<DetailPage />} />
      </Routes>
      <Footer />
    </CartProvider>

  );
};

export default App;
