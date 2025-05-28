import {
  AlertTriangle,
  CheckCircle,
  HelpCircle,
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
