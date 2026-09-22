import CartProvider from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Productpage from "./components/Productpage";

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
