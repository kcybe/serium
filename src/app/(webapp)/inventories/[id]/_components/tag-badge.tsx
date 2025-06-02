// src/app/(webapp)/inventories/[id]/_components/tag-badge.tsx
import { Tag as TagIcon } from "lucide-react"; // Using lucide-react's Tag icon

interface TagBadgeProps {
  tagName: string;
  // You could also add an optional className to allow further customization
  className?: string;
}

export const TagBadge = ({ tagName, className }: TagBadgeProps) => {
  const defaultTagColor = "bg-indigo-100 text-indigo-700"; // A neutral, distinct color

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-md ${defaultTagColor}  ${
        className || ""
      } */`}
      title={tagName} // Good for accessibility if tagName could be long
    >
      <TagIcon className="w-3 h-3 mr-1.5" />
      {/* You might want to truncate long tag names if they can be very long */}
      {tagName.length > 20 ? `${tagName.substring(0, 18)}...` : tagName}
    </span>
  );
};
