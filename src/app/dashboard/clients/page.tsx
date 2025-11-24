"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  User,
  FileText,
  TrendingUp,
  Mail,
  Calendar
} from "lucide-react"

interface Client {
  id: number
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "pending"
  joinDate: string
  lastActivity: string
  caseCount: number
  creditScore?: number
  creditScoreChange?: number
  address: string
  city: string
  state: string
  assignedAgent: string | null
  monthlyFee: number
  nextBillingDate: string | null
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedClient, setSelectedClient] = useState<number | null>(null)

  const clients: Client[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      joinDate: "2024-01-15",
      lastActivity: "2 hours ago - Uploaded credit report",
      caseCount: 3,
      creditScore: 642,
      creditScoreChange: 23,
      address: "123 Main St",
      city: "New York",
      state: "NY",
      assignedAgent: "Sarah Johnson",
      monthlyFee: 199,
      nextBillingDate: "2024-02-15"
    },
    {
      id: 2,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 987-6543",
      status: "active",
      joinDate: "2024-01-10",
      lastActivity: "1 day ago - Dispute letter sent",
      caseCount: 5,
      creditScore: 589,
      creditScoreChange: -12,
      address: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      assignedAgent: "Mike Wilson",
      monthlyFee: 199,
      nextBillingDate: "2024-02-10"
    },
    {
      id: 3,
      name: "Robert Brown",
      email: "robert.brown@example.com",
      phone: "+1 (555) 234-5678",
      status: "pending",
      joinDate: "2024-01-20",
      lastActivity: "3 days ago - Account created",
      caseCount: 0,
      address: "789 Pine St",
      city: "Chicago",
      state: "IL",
      assignedAgent: null,
      monthlyFee: 199,
      nextBillingDate: "2024-02-01"
    },
    {
      id: 4,
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      phone: "+1 (555) 345-6789",
      status: "inactive",
      joinDate: "2023-12-01",
      lastActivity: "2 months ago - Account closed",
      caseCount: 12,
      creditScore: 721,
      creditScoreChange: 45,
      address: "321 Elm St",
      city: "Houston",
      state: "TX",
      assignedAgent: "John Davis",
      monthlyFee: 0,
      nextBillingDate: null
    }
  ]

  const filteredClients = clients.filter(client => {
    const matchesStatus = filterStatus === "all" || client.status === filterStatus
    const matchesSearch = !searchTerm || 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
    
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-100"
      case "pending": return "text-yellow-600 bg-yellow-100"
      case "inactive": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getScoreChangeColor = (change?: number) => {
    if (!change) return "text-gray-600"
    return change > 0 ? "text-green-600" : "text-red-600"
  }

  const selectedClientData = clients.find(c => c.id === selectedClient)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border-gray-300 px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.reduce((sum, client) => sum + client.caseCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Credit Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                clients.reduce((sum, client) => sum + (client.creditScore || 0), 0) / 
                clients.filter(client => client.creditScore).length
              )}
            </div>
            <p className="text-xs text-muted-foreground">Active clients only</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${clients.reduce((sum, client) => sum + client.monthlyFee, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Recurring monthly</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <Card 
            key={client.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedClient(client.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {client.email}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(client.status)}`}>
                    {client.status.toUpperCase()}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">{client.phone}</span>
                </div>
                <div>
                  <span className="text-gray-500">Join Date:</span>
                  <span className="font-medium">{client.joinDate}</span>
                </div>
                <div>
                  <span className="text-gray-500">Cases:</span>
                  <span className="font-medium">{client.caseCount}</span>
                </div>
                <div>
                  <span className="text-gray-500">Agent:</span>
                  <span className="font-medium">{client.assignedAgent || "Unassigned"}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                <div>
                  <span className="text-gray-500">Address:</span>
                  <span className="font-medium">{client.address}</span>
                </div>
                <div>
                  <span className="text-gray-500">City, State:</span>
                  <span className="font-medium">{client.city}, {client.state}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-1">
                  {client.creditScore && (
                    <div>
                      <span className="text-gray-500">Credit Score:</span>
                      <span className="font-medium">{client.creditScore}</span>
                      <span className={`text-sm ${getScoreChangeColor(client.creditScoreChange)}`}>
                        ({client.creditScoreChange ? (client.creditScoreChange > 0 ? '+' : '') + client.creditScoreChange : '0'})
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500">Last Activity:</span>
                    <span className="font-medium">{client.lastActivity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="space-y-1">
                    <div>
                      <span className="text-gray-500">Monthly Fee:</span>
                      <span className="font-medium">${client.monthlyFee}</span>
                    </div>
                    {client.nextBillingDate && (
                      <div>
                        <span className="text-gray-500">Next Billing:</span>
                        <span className="font-medium">{client.nextBillingDate}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
          <p className="text-gray-600">
            {searchTerm 
              ? "No clients match your search criteria."
              : "No clients in this status."
            }
          </p>
        </div>
      )}

      {/* Client Detail Modal */}
      {selectedClient && selectedClientData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Client Details</h2>
              <Button
                variant="ghost"
                onClick={() => setSelectedClient(null)}
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>Full Name</Label>
                      <p className="font-medium">{selectedClientData.name}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="font-medium">{selectedClientData.email}</p>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <p className="font-medium">{selectedClientData.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Address</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>Street Address</Label>
                      <p className="font-medium">{selectedClientData.address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>City</Label>
                        <p className="font-medium">{selectedClientData.city}</p>
                      </div>
                      <div>
                        <Label>State</Label>
                        <p className="font-medium">{selectedClientData.state}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Account Status</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Status</Label>
                    <span className={`text-sm px-2 py-1 rounded ${getStatusColor(selectedClientData.status)}`}>
                      {selectedClientData.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <Label>Join Date</Label>
                    <p className="font-medium">{selectedClientData.joinDate}</p>
                  </div>
                  <div>
                    <Label>Assigned Agent</Label>
                    <p className="font-medium">{selectedClientData.assignedAgent || "Unassigned"}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Credit Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Current Credit Score</Label>
                    <p className="text-2xl font-bold">{selectedClientData.creditScore || "N/A"}</p>
                  </div>
                  <div>
                    <Label>Score Change</Label>
                    <p className={`text-lg font-bold ${getScoreChangeColor(selectedClientData.creditScoreChange)}`}>
                      {selectedClientData.creditScoreChange ? 
                        `${selectedClientData.creditScoreChange > 0 ? '+' : ''}${Math.abs(selectedClientData.creditScoreChange)}` 
                        : "No change"
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Billing Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Monthly Fee</Label>
                    <p className="text-2xl font-bold">${selectedClientData.monthlyFee}</p>
                  </div>
                  <div>
                    <Label>Next Billing Date</Label>
                    <p className="font-medium">{selectedClientData.nextBillingDate || "N/A"}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Activity Summary</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Total Cases</Label>
                    <p className="font-medium">{selectedClientData.caseCount}</p>
                  </div>
                  <div>
                    <Label>Last Activity</Label>
                    <p className="font-medium">{selectedClientData.lastActivity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}