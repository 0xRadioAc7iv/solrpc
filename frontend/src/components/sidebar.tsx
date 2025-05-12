"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  BarChart3,
  Database,
  Layers,
  Network,
  Settings,
  Cpu,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dash/dashboard",
      icon: <Cpu className="h-5 w-5" />,
    },
    {
      title: "Load Balancing",
      href: "/dash/load",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      title: "Networks",
      href: "/dash/networks",
      icon: <Network className="h-5 w-5" />,
    },
    {
      title: "Endpoints",
      href: "/dash/endpoints",
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: "Analytics & Logs",
      href: "/dash/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dash/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-600/30 transform transition-transform duration-200 ease-in-out md:translate-x-0 bg-[#050816] text-white ",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex gap-2 items-center">
            <Image src="/icon.png" alt="icon" height={34} width={34}  />
            <h1 className="text-2xl font-bold -mt-2 text-slate-100/90">SOLRPC</h1>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-purple-900",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
        </div>
      </div>
    </>
  );
}
