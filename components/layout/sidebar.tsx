"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  Brain,
  Stethoscope,
  DollarSign,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview and analytics",
  },
  {
    name: "Patients",
    href: "/dashboard/patients",
    icon: Users,
    description: "Patient management",
  },
  {
    name: "Encounters",
    href: "/dashboard/encounters",
    icon: Stethoscope,
    description: "Clinical encounters",
  },
  {
    name: "Claims",
    href: "/dashboard/claims",
    icon: CreditCard,
    description: "Claims processing",
  },
  {
    name: "AI Assistant",
    href: "/dashboard/ai-chat",
    icon: Brain,
    description: "RCM AI agent",
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: Activity,
    description: "Performance metrics",
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: DollarSign,
    description: "Financial reports",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, sidebarCollapsed, setSidebarCollapsed, setSidebarOpen } =
    useUIStore();

  const toggleCollapsed = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex transform flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!sidebarCollapsed && (
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-falcon-500 flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                FalconCare
              </span>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="hidden lg:flex h-8 w-8"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-falcon-50 text-falcon-700 border-r-2 border-falcon-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive
                      ? "text-falcon-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    sidebarCollapsed ? "mx-auto" : "mr-3"
                  )}
                />
                {!sidebarCollapsed && (
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-xs text-gray-500">
                      {item.description}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-healthcare-100 flex items-center justify-center">
                <span className="text-sm font-medium text-healthcare-700">
                  AI
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">AI Agent</p>
                <p className="text-xs text-gray-500">Online & Ready</p>
              </div>
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
