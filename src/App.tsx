import { Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import Header from "./components/Header/Header";
import Hero from "./components/ProductPage/Hero";
import Productpage from "./components/ProductPage/Productpage";
import Footer from "./components/Footer/Footer";
import DetailPage from "./components/DetailPage/DetailPage";
import CartPage from "./components/CartPage/CartPage";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import ConfirmationPage from "./components/ConfirmationPage/ConfirmationPage";

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
        <Route path="/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
      <Footer />
    </CartProvider>

  );
};

export default App;
