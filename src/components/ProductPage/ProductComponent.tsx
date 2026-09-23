import type { IProduct } from "../../types/product";
import AddToCartBtn from "../common/AddToCartBtn";

interface ProductComponentProps {
  product: IProduct;
}

const ProductComponent = ({ product }: ProductComponentProps) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
      <div className="relative bg-gray-100">
        <img
          src={`/card-images/${product.img}`}
          alt={product.title}
          className="h-64 w-full object-contain"
        />
        {product.onSale && (
          <span className="absolute top-2 left-2 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
            REA
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="text-sm font-semibold">{product.title}</h3>
        <p className="mt-auto text-sm font-bold">
          {product.price != null ? `${product.price} kr` : "Pris saknas"}
        </p>
        <AddToCartBtn
          product={product}
          className="rounded bg-black px-3 py-1.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {product.inventory === 0 ? "Slut i lager" : "Lägg i varukorg"}
        </AddToCartBtn>
      </div>
    </div>
  );
};

export default ProductComponent;
