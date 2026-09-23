import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { IProduct } from "../../types/product";
import FilterComponent, {
  filterProducts,
  type ICategory,
} from "./FilterComponent";
import ProductComponent from "../ProductPage/ProductComponent";

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const filteredProducts = filterProducts(products, selectedCategories, onSaleOnly);

  if (productsLoading) {
    return <p className="p-4">Laddar produkter...</p>;
  }

  return (
    <section className="px-4 py-8">
      <FilterComponent
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        onSaleOnly={onSaleOnly}
        onToggleOnSaleOnly={() => setOnSaleOnly((prev) => !prev)}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredProducts.map((product) => (
          <ProductComponent key={product.id} product={product} />
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

