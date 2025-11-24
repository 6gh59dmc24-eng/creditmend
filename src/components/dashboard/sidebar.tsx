"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  CreditCard,
  BarChart3,
  Calendar,
  FolderOpen
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  userRole: string
}

export function Sidebar({ userRole, className }: SidebarProps) {
  const pathname = usePathname()

  const clientNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "My Profile",
      href: "/dashboard/profile",
      icon: Users
    },
    {
      title: "Documents",
      href: "/dashboard/documents",
      icon: FolderOpen
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: CreditCard
    }
  ]

  const staffNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Cases",
      href: "/dashboard/cases",
      icon: FileText
    },
    {
      title: "Clients",
      href: "/dashboard/clients",
      icon: Users
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3
    }
  ]

  const adminNavItems = [
    ...staffNavItems,
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings
    }
  ]

  const navItems = userRole === "CLIENT" ? clientNavItems : 
                   userRole === "ADMIN" ? adminNavItems : 
                   staffNavItems

  return (
    <div className={cn("w-64 bg-white shadow-lg", className)}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Credit Mend
        </h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-6 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
