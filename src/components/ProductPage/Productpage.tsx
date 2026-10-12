import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import { filterProducts, GENDERS, type GenderFilters } from "./filterProducts";
import ProductComponent from "../ProductPage/ProductComponent";
import { useGetAllProducts } from "../../hooks/useGetAllProducts";
import { useGetCategories } from "../../hooks/useGetCategories";

const Productpage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // e.g. ?herrar=3,4,7&damer=2&rea=1
  const genderFilters: GenderFilters = Object.fromEntries(
    GENDERS.map((gender) => [
      gender.id,
      searchParams.get(gender.param)?.split(",").filter(Boolean) ?? [],
    ]),
  );
  const onSaleOnly = searchParams.get("rea") === "1";

  useEffect(() => {
    sessionStorage.setItem("productFilters", searchParams.toString());
  }, [searchParams]);

  const updateFilters = (filters: GenderFilters, saleOnly: boolean) => {
    const params = new URLSearchParams();
    GENDERS.forEach((gender) => {
      const selected = filters[gender.id] ?? [];
      if (selected.length > 0) params.set(gender.param, selected.join(","));
    });
    if (saleOnly) params.set("rea", "1");
    setSearchParams(params, { replace: true });
  };

  const toggleCategory = (genderId: string, categoryId: string) => {
    const selected = genderFilters[genderId];
    let next: string[];
    if (selected.includes(categoryId)) {
      next = selected.filter((id) => id !== categoryId);
    } else if (categoryId === genderId) {
      // "Alla herrar/damer" clears the other checkboxes in that dropdown
      next = [genderId];
    } else {
      next = [...selected.filter((id) => id !== genderId), categoryId];
    }
    updateFilters({ ...genderFilters, [genderId]: next }, onSaleOnly);
  };

  const { data: products = [], isLoading: productsLoading } =
    useGetAllProducts();

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
    error: categoriesError,
  } = useGetCategories();

  const filteredProducts = filterProducts(products, genderFilters, onSaleOnly);

  if (productsLoading) {
    return <p className="p-10 text-white">Laddar produkter...</p>;
  }

  return (
    <section className="p-5 lg:p-10 ">
      {categoriesIsLoading && (
        <p className="text-white mb-5">Laddar kategorier...</p>
      )}
      {categoriesIsError && (
        <p className="text-red-600 mb-5">{categoriesError.message}</p>
      )}
      {categories && (
        <FilterComponent
          categories={categories}
          genderFilters={genderFilters}
          onToggleCategory={toggleCategory}
          onSaleOnly={onSaleOnly}
          onToggleOnSaleOnly={() => updateFilters(genderFilters, !onSaleOnly)}
          onClearFilters={() => updateFilters({}, false)}
        />
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredProducts.map((product) => (
          <ProductComponent key={product.id} product={product} />
        ))}

        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-200">
            Inga produkter hittades.
          </p>
        )}
      </div>
    </section>
  );
};

export default Productpage;
