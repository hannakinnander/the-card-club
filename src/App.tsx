import CartProvider from "./context/CartContext";
import Header from "./components/Header/Header";
import Hero from "./components/ProductPage/Hero";
import Productpage from "./components/ProductPage/Productpage";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <CartProvider>
      <Header />
      <Hero />
      <Productpage />
      <Footer />
    </CartProvider>
  );
};

export default App;
