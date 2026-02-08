import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ShopCategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}

const ShopCategoryFilter = ({ categories, selected, onSelect }: ShopCategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect(null)}
        className={selected === null ? "shadow-button" : ""}
      >
        Tout
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selected === cat.slug ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(cat.slug)}
          className={selected === cat.slug ? "shadow-button" : ""}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
};

export default ShopCategoryFilter;
