import type { IProduct } from "../../types/product";

// Category ids from db.json, grouped by what kind of category they are
export const GENDERS = [
  { id: "1", param: "herrar" },
  { id: "2", param: "damer" },
];
export const COUNTRY_IDS = ["3", "4", "5", "6"];
export const POSITION_IDS = ["7", "8", "9", "10"];

// Selected category ids per gender id, e.g. { "1": ["3", "4", "7"] }
export type GenderFilters = Record<string, string[]>;

export const filterProducts = (
  products: IProduct[],
  genderFilters: GenderFilters,
  onSaleOnly: boolean,
): IProduct[] => {
  const activeGenders = GENDERS.filter(
    (gender) => (genderFilters[gender.id] ?? []).length > 0,
  );

  return products.filter((product) => {
    const matchesOnSale = !onSaleOnly || product.onSale;
    if (activeGenders.length === 0) return matchesOnSale;

    // Within a gender: any of the checked countries AND any of the checked positions
    const matchesCategory = activeGenders.some((gender) => {
      const selected = genderFilters[gender.id];
      const countries = selected.filter((id) => COUNTRY_IDS.includes(id));
      const positions = selected.filter((id) => POSITION_IDS.includes(id));
      return (
        product.category.includes(gender.id) &&
        (countries.length === 0 ||
          countries.some((id) => product.category.includes(id))) &&
        (positions.length === 0 ||
          positions.some((id) => product.category.includes(id)))
      );
    });
    return matchesCategory && matchesOnSale;
  });
};
