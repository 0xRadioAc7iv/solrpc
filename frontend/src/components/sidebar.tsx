"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { BarChart3, Database,  Network, Settings, Cpu, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function Sidebar() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Don't render anything until we've checked if we're on mobile
  if (!isMounted) return null

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dash/dashboard",
      icon: <Cpu className="h-5 w-5" />,
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
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#050816] text-white">
      <div className="p-4 flex gap-2 items-center">
        <Image src="/icon.png" alt="icon" height={34} width={34} />
        <h1 className="text-2xl font-bold -mt-2 text-slate-100/90">SOLRPC</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-purple-900/70",
                  pathname === item.href ? "custom-get-started-button text-white" : "text-slate-300",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 bg-[#050816]/80 text-white hover:bg-[#050816] hover:text-white"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 border-r border-gray-600/30 bg-[#050816]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop sidebar
  return (
    <div className="hidden md:block fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-600/30 bg-[#050816] text-white">
      <SidebarContent />
    </div>
  )
}
