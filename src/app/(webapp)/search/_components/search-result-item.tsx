import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemSearchResult } from "@/types";
import {
  ArrowRight,
  Calendar,
  Hash,
  Package,
  Tag,
  Layers,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  item: ItemSearchResult;
}

const statusColors = {
  Available:
    "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  InUse: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  Broken: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  Repair:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  Lost: "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300",
};

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <div className="text-muted-foreground mt-0.5">{icon}</div>
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  </div>
);

export function SearchResultItem({ item }: Props) {
  const router = useRouter();

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">{item.name}</span>
          <Badge
            variant="outline"
            className={statusColors[item.status as keyof typeof statusColors]}
          >
            {item.status}
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground pt-1">
          {item.description || "No description."}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <DetailRow
            icon={<Layers className="h-4 w-4" />}
            label="Inventory"
            value={item.inventory.name}
          />
          <DetailRow
            icon={<Hash className="h-4 w-4" />}
            label="Serial Number"
            value={item.serialNumber || "N/A"}
          />
          <DetailRow
            icon={<Package className="h-4 w-4" />}
            label="Quantity"
            value={item.quantity}
          />
          <DetailRow
            icon={<Calendar className="h-4 w-4" />}
            label="Created"
            value={new Date(item.createdAt).toLocaleDateString()}
          />
          {item.lastVerified && (
            <DetailRow
              icon={<CheckCircle className="h-4 w-4" />}
              label="Last Verified"
              value={new Date(item.lastVerified).toLocaleDateString()}
            />
          )}
          {item.tags?.length > 0 && (
            <DetailRow
              icon={<Tag className="h-4 w-4" />}
              label="Tags"
              value={
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.tags?.map((tag) => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              }
            />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => router.push(`/inventories/${item.inventory.id}`)}
        >
          View in Inventory
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
