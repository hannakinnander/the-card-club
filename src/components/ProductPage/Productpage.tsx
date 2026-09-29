import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterComponent, { filterProducts } from "./FilterComponent";
import ProductComponent from "../ProductPage/ProductComponent";
import { useGetAllProducts } from "../../hooks/useGetAllProducts";
import { useGetCategories } from "../../hooks/useGetCategories";

const Productpage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategories =
    searchParams.get("kategorier")?.split(",").filter(Boolean) ?? [];
  const onSaleOnly = searchParams.get("rea") === "1";


  useEffect(() => {
    sessionStorage.setItem("productFilters", searchParams.toString());
  }, [searchParams]);

  const updateFilters = (categories: string[], saleOnly: boolean) => {
    const params = new URLSearchParams();
    if (categories.length > 0) params.set("kategorier", categories.join(","));
    if (saleOnly) params.set("rea", "1");
    setSearchParams(params, { replace: true });
  };

  const toggleCategory = (categoryId: string) => {
    updateFilters(
      selectedCategories.includes(categoryId)
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...selectedCategories, categoryId],
      onSaleOnly,
    );
  };

  const { data: products = [], isLoading: productsLoading } =
    useGetAllProducts();

  const { data: categories = [] } = useGetCategories();

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
        onToggleOnSaleOnly={() => updateFilters(selectedCategories, !onSaleOnly)}
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

