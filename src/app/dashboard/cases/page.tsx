'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Calendar,
  FileText,
  User,
} from 'lucide-react';

interface Case {
  id: number;
  caseNumber: string;
  clientName: string;
  status:
    | 'open'
    | 'in_progress'
    | 'pending_client'
    | 'pending_bureau'
    | 'completed'
    | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  expectedEndDate: string;
  totalDisputes: number;
  successfulDisputes: number;
  progressPercentage: number;
  assignedAgent: string;
}

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const cases: Case[] = [
    {
      id: 1,
      caseNumber: 'CR-2024-001',
      clientName: 'John Smith',
      status: 'in_progress',
      priority: 'high',
      startDate: '2024-01-15',
      expectedEndDate: '2024-04-15',
      totalDisputes: 8,
      successfulDisputes: 3,
      progressPercentage: 37,
      assignedAgent: 'Sarah Johnson',
    },
    {
      id: 2,
      caseNumber: 'CR-2024-002',
      clientName: 'Emily Davis',
      status: 'pending_bureau',
      priority: 'medium',
      startDate: '2024-01-10',
      expectedEndDate: '2024-03-10',
      totalDisputes: 5,
      successfulDisputes: 2,
      progressPercentage: 40,
      assignedAgent: 'Mike Wilson',
    },
    {
      id: 3,
      caseNumber: 'CR-2024-003',
      clientName: 'Robert Brown',
      status: 'completed',
      priority: 'low',
      startDate: '2023-12-01',
      expectedEndDate: '2024-02-01',
      totalDisputes: 12,
      successfulDisputes: 10,
      progressPercentage: 100,
      assignedAgent: 'Sarah Johnson',
    },
    {
      id: 4,
      caseNumber: 'CR-2024-004',
      clientName: 'Lisa Anderson',
      status: 'open',
      priority: 'urgent',
      startDate: '2024-01-22',
      expectedEndDate: '2024-04-22',
      totalDisputes: 3,
      successfulDisputes: 0,
      progressPercentage: 0,
      assignedAgent: 'John Davis',
    },
  ];

  const filteredCases = cases.filter(
    c =>
      (filterStatus === 'all' || c.status === filterStatus) &&
      (c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in_progress':
        return 'text-blue-600 bg-blue-100';
      case 'pending_bureau':
        return 'text-orange-600 bg-orange-100';
      case 'pending_client':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Cases Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Case
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search cases..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="rounded-md border-gray-300 px-3 py-2 text-sm">
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="pending_client">Pending Client</option>
            <option value="pending_bureau">Pending Bureau</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid gap-6">
        {filteredCases.map(case_ => (
          <Card key={case_.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{case_.caseNumber}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    {case_.clientName}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${getPriorityColor(case_.priority)}`}>
                    {case_.priority.toUpperCase()}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${getStatusColor(case_.status)}`}>
                    {case_.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Start Date:</span>
                    <span className="font-medium">{case_.startDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Expected End:</span>
                    <span className="font-medium">{case_.expectedEndDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Assigned Agent:</span>
                    <span className="font-medium">{case_.assignedAgent}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Progress:</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${case_.progressPercentage}%` }}
                        />
                      </div>
                      <span className="font-medium">
                        {case_.progressPercentage}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total Disputes:</span>
                    <span className="font-medium">{case_.totalDisputes}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Successful:</span>
                    <span className="font-medium text-green-600">
                      {case_.successfulDisputes}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Created {new Date(case_.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No cases found
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? 'No cases match your search criteria.'
              : 'No cases in this status.'}
          </p>
        </div>
      )}
    </div>
  );
}
