import ProductComponent from "../components/ProductPage/ProductComponent";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import type { IProduct } from "../types/product";
import CartProvider from "../context/CartContext";
import useCart from "../hooks/useCart";

const product: IProduct = {
  id: "1",
  title: "Isak",
  price: 100,
  img: "isak.webp",
  onSale: true,
  inventory: 2,
  description: "Fotbollskort",
  category: ["fotboll"],
};

const CartContents = () => {
  const { orderItems } = useCart();
  return (
    <ul data-testid="cart">
      {orderItems.map((item) => (
        <li key={item.product.id}>
          {item.product.title}: {item.quantity}
        </li>
      ))}
    </ul>
  );
};

const renderProduct = () =>
  render(
    <MemoryRouter>
      <CartProvider>
        <ProductComponent product={product} />
        <CartContents />
      </CartProvider>
    </MemoryRouter>,
  );

describe("Lägg i varukorg-knappen", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("ska uppdatera knappen när man lägger kortet i varukorgen", async () => {
    const user = userEvent.setup();
    renderProduct();

    const button = screen.getByRole("button", { name: "Lägg i varukorg" });
    const cart = screen.getByTestId("cart");
    expect(cart.children.length).toBe(0);

    await user.click(button);
    expect(button.textContent).toBe("Lägg till fler (1 i varukorg)");
    expect(cart.children.length).toBe(1);
    expect(cart.textContent).toBe("Isak: 1");

    await user.click(button);
    expect(button.textContent).toBe("Slut i lager");
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(cart.children.length).toBe(1);
    expect(cart.textContent).toBe("Isak: 2");
  });
});
