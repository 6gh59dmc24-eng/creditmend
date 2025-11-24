"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Users, 
  Settings, 
  Shield, 
  Database, 
  CreditCard, 
  FileText, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const systemStats = {
    totalUsers: 248,
    activeUsers: 187,
    totalCases: 142,
    openCases: 89,
    monthlyRevenue: 24800,
    systemUptime: "99.9%",
    storageUsed: "67.3%",
    lastBackup: "2024-01-20T02:00:00Z"
  }

  const recentActivity = [
    {
      id: 1,
      type: "user_registered",
      user: "john.doe@example.com",
      description: "New user registration",
      timestamp: "2024-01-20T10:30:00Z",
      severity: "info"
    },
    {
      id: 2,
      type: "case_created",
      user: "agent@creditrepair.com",
      description: "New case CR-2024-001 created",
      timestamp: "2024-01-20T09:15:00Z",
      severity: "success"
    },
    {
      id: 3,
      type: "payment_failed",
      user: "client@example.com",
      description: "Payment processing failed",
      timestamp: "2024-01-20T08:45:00Z",
      severity: "error"
    },
    {
      id: 4,
      type: "system_backup",
      user: "System",
      description: "Automated system backup completed",
      timestamp: "2024-01-20T02:00:00Z",
      severity: "info"
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error": return "text-red-600 bg-red-100"
      case "warning": return "text-yellow-600 bg-yellow-100"
      case "success": return "text-green-600 bg-green-100"
      default: return "text-blue-600 bg-blue-100"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registered": return <Users className="h-4 w-4" />
      case "case_created": return <FileText className="h-4 w-4" />
      case "payment_failed": return <CreditCard className="h-4 w-4" />
      case "system_backup": return <Database className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          System Settings
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {["overview", "users", "cases", "billing", "system"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">89 pending response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${systemStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.systemUptime}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "users" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Input placeholder="Search users..." className="max-w-sm" />
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
                
                {/* User List */}
                <div className="space-y-3">
                  {["admin@creditrepair.com", "agent@creditrepair.com", "client@example.com"].map((email, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">A</span>
                        </div>
                        <div>
                          <p className="font-medium">{email}</p>
                          <p className="text-sm text-gray-500">Role: {index === 0 ? "Admin" : index === 1 ? "Agent" : "Client"}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Disable</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "system" && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="encryption">File Encryption</Label>
                <div className="flex items-center space-x-2">
                  <Input id="encryption" value="AES-256" disabled />
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup">Automated Backups</Label>
                <div className="flex items-center space-x-2">
                  <Input id="backup" value="Daily" disabled />
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audit">Audit Logging</Label>
                <div className="flex items-center space-x-2">
                  <Input id="audit" value="Enabled" disabled />
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Storage Used</Label>
                  <div className="text-2xl font-bold">{systemStats.storageUsed}</div>
                </div>
                <div>
                  <Label>Last Backup</Label>
                  <div className="text-sm">{systemStats.lastBackup}</div>
                </div>
              </div>
              <div className="pt-4">
                <Button className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Run Manual Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
          <CardDescription>Latest system events and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{new Date(activity.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}