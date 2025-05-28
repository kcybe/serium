import {
  CheckCircle,
  Wrench,
  XCircle,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

const statusMap: Record<
  string,
  { label: string; color: string; icon: JSX.Element }
> = {
  Available: {
    label: "Available",
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle className="w-4 h-4 mr-1" />,
  },
  InUse: {
    label: "In Use",
    color: "bg-blue-100 text-blue-800",
    icon: <Wrench className="w-4 h-4 mr-1" />,
  },
  Broken: {
    label: "Broken",
    color: "bg-red-100 text-red-800",
    icon: <XCircle className="w-4 h-4 mr-1" />,
  },
  Repair: {
    label: "Repair",
    color: "bg-yellow-100 text-yellow-800",
    icon: <AlertTriangle className="w-4 h-4 mr-1" />,
  },
  Lost: {
    label: "Lost",
    color: "bg-gray-200 text-gray-600",
    icon: <HelpCircle className="w-4 h-4 mr-1" />,
  },
};

export const StatusBadge = ({ status }: { status: string }) => {
  const statusObj = statusMap[status] || {
    label: status,
    color: "bg-gray-100 text-gray-800",
    icon: <HelpCircle className="w-4 h-4 mr-1" />,
  };

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${statusObj.color}`}
    >
      {statusObj.icon}
      {statusObj.label}
    </span>
  );
};
