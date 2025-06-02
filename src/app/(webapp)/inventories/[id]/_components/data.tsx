import { useTags } from "@/hooks/inventory";
import {
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Tag,
  Wrench,
  XCircle,
} from "lucide-react";

export const statuses = [
  {
    value: "Available",
    label: "Available",
    icon: CheckCircle,
  },
  {
    value: "InUse",
    label: "In Use",
    icon: Wrench,
  },
  {
    value: "Broken",
    label: "Broken",
    icon: XCircle,
  },
  {
    value: "Repair",
    label: "Repair",
    icon: AlertTriangle,
  },
  {
    value: "Lost",
    label: "Lost",
    icon: HelpCircle,
  },
];

export function UserTags() {
  const { data: allUserTags } = useTags();

  const tagFilterOptions = () => {
    if (!allUserTags || !Array.isArray(allUserTags)) {
      return [];
    }
    return allUserTags.map((tag: { name: string }) => ({
      label: tag.name,
      value: tag.name,
      icon: Tag,
    }));
  };

  return { tagFilterOptions };
}
