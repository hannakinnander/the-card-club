import ProductComponent from "../components/ProductPage/ProductComponent";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import type { IProduct } from "../types/product";
import CartProvider from "../context/CartContext";

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

const renderProduct = () =>
    render(
        <MemoryRouter>
            <CartProvider>
                <ProductComponent product={product} />
            </CartProvider>
        </MemoryRouter>
    );

describe("Lägg i varukorg-knappen", () => {
    it("ska uppdatera knappen när man lägger kortet i varukorgen", async () => {
        const user = userEvent.setup();
        renderProduct();

        const button = screen.getByRole("button", { name: "Lägg i varukorg" });

        await user.click(button);
        expect(button.textContent).toBe("Lägg till fler (1 i varukorg)");

        await user.click(button);
        expect(button.textContent).toBe("Slut i lager");
        expect((button as HTMLButtonElement).disabled).toBe(true);
    });
});
