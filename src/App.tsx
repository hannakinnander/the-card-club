import CartProvider from "./context/CartContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./components/DetailPage";

const App = () => {
  return (
    <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/" element={<div>Startsida</div>} />
        <Route path="/product/:id" element={<DetailPage />} />
      </Routes>
    </CartProvider>
    </BrowserRouter>
  );
};

export default App;
