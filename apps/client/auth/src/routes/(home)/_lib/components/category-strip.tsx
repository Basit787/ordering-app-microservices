import { frontendUrl } from "frontend-common";
import { Shapes } from "lucide-react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "oamui";
import { useCategories } from "../api/hook";

// One tile per category, each opening the shop
export const CategoryStrip = () => {
  const { data: categories } = useCategories();
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <Item key={category.id} asChild variant="outline">
          <a href={frontendUrl("products")}>
            <ItemMedia variant="icon">
              <Shapes />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{category.name}</ItemTitle>
            </ItemContent>
          </a>
        </Item>
      ))}
    </div>
  );
};
