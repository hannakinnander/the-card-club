import ProductComponent from "../components/ProductPage/ProductComponent";
import { render, screen } from "@testing-library/react";
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
    inventory: 10,
    description: "Fotbollskort",
    category: ["fotboll"],
};

describe("ProductComponent", () => {
    it("ska visa rätt produkt när man klickar på kortet", () => {
        render(
            <MemoryRouter>
                <CartProvider>
                    <ProductComponent product={product} />
                </CartProvider>
            </MemoryRouter>
        );

        const link = screen.getByRole("link");
        expect(link.getAttribute("href")).toBe("/1");
    });
});