
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  Home,
  LayoutDashboard,
  Palette,
  Phone,
  Printer,
  Receipt,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  roles?: string[];
}

const items: SidebarItem[] = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: FileText,
    label: "Leads",
    href: "/leads",
  },
  {
    icon: Phone,
    label: "Tele-Sales",
    href: "/telesales",
    roles: ["super_admin", "admin", "tele_sales"],
  },
  {
    icon: Receipt,
    label: "Quotations",
    href: "/quotations",
    roles: ["super_admin", "admin", "quotation"],
  },
  {
    icon: Palette,
    label: "Design",
    href: "/design",
    roles: ["super_admin", "admin", "design"],
  },
  {
    icon: Printer,
    label: "Production",
    href: "/production",
    roles: ["super_admin", "admin", "digital_production", "offset_production"],
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/analytics",
    roles: ["super_admin", "admin"],
  },
  {
    icon: Users,
    label: "Team",
    href: "/team",
    roles: ["super_admin", "admin"],
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

export function Sidebar() {
  const location = useLocation();
  const userRole = currentUser.role;

  const filteredItems = items.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="font-bold text-lg text-attracta-500">Attracta</span>
          <span className="font-semibold text-sm text-muted-foreground">CRM</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {filteredItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors",
                location.pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", location.pathname === item.href ? "text-foreground" : "text-muted-foreground")} />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <Separator className="my-2" />
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>
              {currentUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="font-medium text-sm truncate">{currentUser.name}</span>
            <span className="text-xs text-muted-foreground truncate">{currentUser.team}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full justify-start gap-2"
          asChild
        >
          <Link to="/profile">
            <User className="h-4 w-4" />
            View Profile
          </Link>
        </Button>
      </div>
    </div>
  );
}
