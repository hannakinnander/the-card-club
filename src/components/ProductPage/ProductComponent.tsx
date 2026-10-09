import { Link } from "react-router-dom";
import type { IProduct } from "../../types/product";
import AddToCartBtn from "../common/AddToCartBtn";

interface ProductComponentProps {
  product: IProduct;
}

const ProductComponent = ({ product }: ProductComponentProps) => {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg  bg-gray-800 ${product.inventory === 0 ? "brightness-70" : "shadow-amber-50/40 shadow-md"}`}
    >
      <Link to={`/details/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative">
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
        <div className="flex flex-1 flex-col gap-1 p-3 bg-black text-white">
          <h3 className="text-sm font-semibold">{product.title}</h3>
          <p className="mt-auto text-sm font-bold">
            {product.price != null ? `${product.price} SEK` : "Pris saknas"}
          </p>
        </div>
      </Link>
      <div className="px-3 pb-3 bg-black">
        <AddToCartBtn product={product} className={"w-full"} />
      </div>
    </div>
  );
};

export default ProductComponent;
