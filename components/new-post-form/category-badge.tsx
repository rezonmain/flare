import { FlareCategorySelect } from "@/components/flare-category-select/flare-category-select";
import { Badge } from "@/components/ui/badge";
import { FLARE_CATEGORY_LABELS } from "@/constants/flare.constants";
import type { FlareCategory } from "@/constants/flare.enums";
import { useSheet } from "@/state";
import { ChevronDown } from "lucide-react";
import { useCallback } from "react";

type CategoryBadgeProps = {
  value: FlareCategory;
  onChange: () => void;
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ value, onChange }) => {
  const { openSheet } = useSheet();

  const handleCategoryClick = useCallback(
    (value: FlareCategory, onChange: () => void) =>
      openSheet({
        component: <FlareCategorySelect value={value} onChange={onChange} />,
        name: "category-select",
      }),
    [openSheet]
  );
  return (
    <Badge
      className="flex gap-4 items-center"
      onClick={() => handleCategoryClick(value, onChange)}
    >
      <p>Category: {FLARE_CATEGORY_LABELS[value]}</p>
      <ChevronDown size="24px" />
    </Badge>
  );
};

export { CategoryBadge };
