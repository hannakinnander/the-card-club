import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { IProduct } from "../types/product";

interface ICategory {
  id: string;
  title: string;
}

const API_URL = "http://localhost:3000";

const fetchProducts = async (): Promise<IProduct[]> => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

const fetchCategories = async (): Promise<ICategory[]> => {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

const Productpage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null,
  );
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category.includes(selectedCategory);
    const matchesOnSale = !onSaleOnly || product.onSale;
    return matchesCategory && matchesOnSale;
  });

  if (productsLoading) {
    return <p className="p-4">Laddar produkter...</p>;
  }

  return (
    <section className="px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-4 py-1 text-sm font-medium ${
            selectedCategory === null
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Alla
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full px-4 py-1 text-sm font-medium ${
              selectedCategory === category.id
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {category.title}
          </button>
        ))}

        <button
          onClick={() => setOnSaleOnly((prev) => !prev)}
          className={`ml-auto rounded-full px-4 py-1 text-sm font-medium ${
            onSaleOnly ? "bg-red-600 text-white" : "bg-gray-200 text-black"
          }`}
        >
          Rea
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col overflow-hidden rounded-lg border border-gray-200"
          >
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
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Inga produkter hittades.
          </p>
        )}
      </div>
    </section>
  );
};

export default Productpage;
