import CartProvider from "./context/CartContext";
import Header from "./components/Header/Header";
import Hero from "./components/ProductPage/Hero";
import Productpage from "./components/ProductPage/Productpage";

const App = () => {
  return (
    <CartProvider>
      <Header />
      <Hero />
      <Productpage />
    </CartProvider>
  );
};

export default App;
