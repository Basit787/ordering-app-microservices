import { Button } from "oamui";
import { useCategories } from "../api/hook";
import { useCatalogFilterStore } from "../store/catalog-filter-store";

// "All" plus one chip per category
export const CategoryFilter = () => {
  const { data: categories } = useCategories();
  const { categoryId: value, setCategory: onChange } = useCatalogFilterStore();
  return (
    <fieldset className="flex flex-wrap gap-2">
      <legend className="sr-only">Categories</legend>
      <Button size="sm" variant={value ? "outline" : "secondary"} onClick={() => onChange(undefined)}>
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          size="sm"
          variant={value === category.id ? "secondary" : "outline"}
          onClick={() => onChange(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </fieldset>
  );
};
