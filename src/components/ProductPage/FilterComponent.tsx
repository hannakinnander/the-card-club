import { useEffect } from "react";
import type { ICategory } from "../../types/categories";
import {
  COUNTRY_IDS,
  GENDERS,
  POSITION_IDS,
  type GenderFilters,
} from "./filterProducts";

interface FilterComponentProps {
  categories: ICategory[];
  genderFilters: GenderFilters;
  onToggleCategory: (genderId: string, categoryId: string) => void;
  onSaleOnly: boolean;
  onToggleOnSaleOnly: () => void;
  onClearFilters: () => void;
}

const FilterComponent = ({
  categories,
  genderFilters,
  onToggleCategory,
  onSaleOnly,
  onToggleOnSaleOnly,
  onClearFilters,
}: FilterComponentProps) => {
  // Close open dropdowns when clicking outside them or pressing Escape
  useEffect(() => {
    const closeDropdowns = (event: Event) => {
      document
        .querySelectorAll("details[data-dropdown][open]")
        .forEach((el) => {
          const clickedInside =
            event instanceof PointerEvent && el.contains(event.target as Node);
          if (!clickedInside) el.removeAttribute("open");
        });
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDropdowns(event);
    };

    document.addEventListener("pointerdown", closeDropdowns);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", closeDropdowns);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const hasActiveFilters =
    onSaleOnly ||
    Object.values(genderFilters).some((selected) => selected.length > 0);

  const byIds = (ids: string[]) =>
    categories.filter((category) => ids.includes(category.id));

  return (
    <div className="mb-6 flex flex-wrap items-start gap-2">
      {GENDERS.map((gender) => {
        const title =
          categories.find((category) => category.id === gender.id)?.title ??
          gender.param;
        const selected = genderFilters[gender.id] ?? [];

        const checkbox = (category: ICategory, label = category.title) => (
          <label
            key={category.id}
            className="flex cursor-pointer items-center gap-2 py-0.5 text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(category.id)}
              onChange={() => onToggleCategory(gender.id, category.id)}
            />
            {label}
          </label>
        );

        return (
          <details key={gender.id} data-dropdown className="relative">
            <summary
              className={`cursor-pointer list-none rounded-full px-4 py-1 text-sm font-medium ${
                selected.length > 0
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {title}
              {selected.length > 0 && ` (${selected.length})`} ▾
            </summary>

            <div className="absolute left-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
              {checkbox(
                { id: gender.id, title },
                `Alla ${title.toLowerCase()}`,
              )}

              <p className="mt-2 text-xs font-semibold text-gray-500 uppercase">
                Land
              </p>
              {byIds(COUNTRY_IDS).map((category) => checkbox(category))}

              <p className="mt-2 text-xs font-semibold text-gray-500 uppercase">
                Position
              </p>
              {byIds(POSITION_IDS).map((category) => checkbox(category))}
            </div>
          </details>
        );
      })}

      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="rounded-full px-4 py-1 text-sm font-medium text-gray-300 underline hover:text-white"
        >
          Ta bort filter
        </button>
      )}

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
