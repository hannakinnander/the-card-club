import type { IProduct } from "../../types/product";
import type { ICategory } from "../../types/categories";


interface FilterComponentProps {
  categories: ICategory[];
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
  onSaleOnly: boolean;
  onToggleOnSaleOnly: () => void;
}

export const filterProducts = (
  products: IProduct[],
  selectedCategories: string[],
  onSaleOnly: boolean,
): IProduct[] => {
  return products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.every((category) =>
        product.category.includes(category),
      );
    const matchesOnSale = !onSaleOnly || product.onSale;
    return matchesCategory && matchesOnSale;
  });
};

const FilterComponent = ({
  categories,
  selectedCategories,
  onToggleCategory,
  onSaleOnly,
  onToggleOnSaleOnly,
}: FilterComponentProps) => {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        return (
          <button
            key={category.id}
            onClick={() => onToggleCategory(category.id)}
            aria-pressed={isSelected}
            className={`rounded-full px-4 py-1 text-sm font-medium ${
              isSelected ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
          >
            {category.title}
          </button>
        );
      })}

      <button
        onClick={onToggleOnSaleOnly}
        aria-pressed={onSaleOnly}
        className={`ml-auto rounded-full px-4 py-1 text-sm font-medium ${
          onSaleOnly ? "bg-red-600 text-white" : "bg-gray-200 text-black"
        }`}
      >
        Rea
      </button>
    </div>
  );
};

export default FilterComponent;
