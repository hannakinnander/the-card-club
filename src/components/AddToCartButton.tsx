import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import type { IProduct } from "../types/product";

const AddToCartButton = ({ product }: { product: IProduct }) => {
    const cart = useContext(CartContext);

    if (!cart) {
        return null;
    }

    const { addOrderItem } = cart;

    return (
        <button onClick={() => addOrderItem(product)}>
            Lägg till i varukorgen
        </button>
    );
};

export default AddToCartButton;