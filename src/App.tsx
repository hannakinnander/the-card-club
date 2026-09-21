import CartProvider from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <div>App</div>
    </CartProvider>
  );
};

export default App;
