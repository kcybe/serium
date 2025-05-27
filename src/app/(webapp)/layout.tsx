import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { cookies } from "next/headers";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { InventoryBreadcrumb } from "@/components/inventories/inventory-breadcrumb";
import { Separator } from "@/components/ui/separator";

export default async function InventoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 m-2 flex-shrink-0">
            <SidebarTrigger className="m-2" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <InventoryBreadcrumb />
          </div>
          <div className="flex-1 overflow-auto">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
