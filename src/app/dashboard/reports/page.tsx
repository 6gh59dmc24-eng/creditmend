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
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  DollarSign,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  FileSearch,
} from 'lucide-react';

interface ReportData {
  month: string;
  revenue: number;
  cases: number;
  clients: number;
  successRate: number;
}

interface DisputeResult {
  reason: string;
  priority: string;
  details: string;
  bureau: string;
  type: string;
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [importContent, setImportContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    disputeCount: number;
    disputes: DisputeResult[];
    caseId: string;
  } | null>(null);

  const reportsData: ReportData[] = [
    {
      month: 'January 2024',
      revenue: 45230,
      cases: 156,
      clients: 89,
      successRate: 78.5,
    },
    {
      month: 'December 2023',
      revenue: 38920,
      cases: 142,
      clients: 82,
      successRate: 75.2,
    },
  ];

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return 'text-green-600';
    if (current < previous) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4" />;
    if (current < previous) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  const getTrendPercentage = (current: number, previous: number) => {
    if (previous === 0) return '0%';
    const percentage = ((current - previous) / previous) * 100;
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(1)}%`;
  };

  const handleImport = async () => {
    if (!importContent) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/reports/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: importContent,
          clientId: 'mock-client-id', // In real app this would be selected
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAnalysisResult(data);
      } else {
        alert('Failed to analyze report');
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading report');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSampleData = () => {
    const sample = {
      clientName: 'John Doe',
      ssnLast4: '1234',
      bureau: 'EXPERIAN',
      score: 580,
      accounts: [
        {
          creditorName: 'CHASE BANK',
          accountNumber: 'XXXX1234',
          accountType: 'REVOLVING',
          status: 'LATE_30',
          balance: 4500,
          paymentStatus: 'LATE',
          latePayments: 2,
        },
        {
          creditorName: 'MIDLAND FUNDING',
          accountNumber: 'XXXX5678',
          accountType: 'COLLECTION',
          status: 'COLLECTION',
          balance: 1200,
          paymentStatus: 'COLLECTION',
        },
      ],
      inquiries: [
        {
          inquirerName: 'CAPITAL ONE',
          inquiryDate: '2023-11-15',
          inquiryType: 'HARD',
        },
      ],
      publicRecords: [],
    };
    setImportContent(JSON.stringify(sample, null, 2));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
            className="rounded-md border-gray-300 px-3 py-2 text-sm">
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'import', label: 'Credit Analysis', icon: FileSearch },
          { id: 'clients', label: 'Clients', icon: Users },
          { id: 'cases', label: 'Cases', icon: FileText },
          { id: 'revenue', label: 'Revenue', icon: DollarSign },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedReport(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                selectedReport === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}>
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Credit Analysis (Import) Tab */}
      {selectedReport === 'import' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Report Analysis (AI Powered)</CardTitle>
              <CardDescription>
                Paste a JSON credit report to automatically detect disputes and
                generate a case.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={loadSampleData}>
                    Load Sample JSON
                  </Button>
                </div>
                <textarea
                  className="w-full h-64 p-4 font-mono text-sm border rounded-md"
                  placeholder="Paste JSON credit report data here..."
                  value={importContent}
                  onChange={e => setImportContent(e.target.value)}
                />
                <Button
                  onClick={handleImport}
                  disabled={isAnalyzing || !importContent}
                  className="w-full">
                  {isAnalyzing
                    ? 'Analyzing...'
                    : 'Analyze Report & Generate Disputes'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {analysisResult && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-green-800">
                      Disputes Identified
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-900">
                      {analysisResult.disputeCount}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-blue-800">
                      Case Created
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium text-blue-900 truncate">
                      ID: {analysisResult.caseId}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Disputes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.disputes.map((dispute, idx) => (
                      <div
                        key={idx}
                        className="flex items-start p-4 border rounded-lg bg-gray-50">
                        <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {dispute.type.replace(/_/g, ' ')}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {dispute.reason}
                          </p>
                          <p className="text-xs text-gray-500 mt-2 bg-white px-2 py-1 rounded border inline-block">
                            {dispute.details}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <span
                            className={`text-xs px-2 py-1 rounded font-medium ${
                              dispute.priority === 'HIGH'
                                ? 'bg-red-100 text-red-800'
                                : dispute.priority === 'MEDIUM'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                            }`}>
                            {dispute.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Overview Report */}
      {selectedReport === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${reportsData[0].revenue.toLocaleString()}
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(reportsData[0].revenue, reportsData[1].revenue)}
                  <span
                    className={`text-xs ${getTrendColor(reportsData[0].revenue, reportsData[1].revenue)}`}>
                    {getTrendPercentage(
                      reportsData[0].revenue,
                      reportsData[1].revenue
                    )}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Cases
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData[0].cases}</div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(reportsData[0].cases, reportsData[1].cases)}
                  <span
                    className={`text-xs ${getTrendColor(reportsData[0].cases, reportsData[1].cases)}`}>
                    {getTrendPercentage(
                      reportsData[0].cases,
                      reportsData[1].cases
                    )}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Clients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reportsData[0].clients}
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(reportsData[0].clients, reportsData[1].clients)}
                  <span
                    className={`text-xs ${getTrendColor(reportsData[0].clients, reportsData[1].clients)}`}>
                    {getTrendPercentage(
                      reportsData[0].clients,
                      reportsData[1].clients
                    )}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Success Rate
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reportsData[0].successRate}%
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(
                    reportsData[0].successRate,
                    reportsData[1].successRate
                  )}
                  <span
                    className={`text-xs ${getTrendColor(reportsData[0].successRate, reportsData[1].successRate)}`}>
                    {getTrendPercentage(
                      reportsData[0].successRate,
                      reportsData[1].successRate
                    )}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>
                  Monthly revenue over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Distribution</CardTitle>
                <CardDescription>Cases by type and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 mx-auto mb-2" />
                    <p>Pie chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Clients Report */}
      {selectedReport === 'clients' && (
        <Card>
          <CardHeader>
            <CardTitle>Client Analytics</CardTitle>
            <CardDescription>
              Detailed client metrics and demographics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-2" />
                <p>Client analytics dashboard would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cases Report */}
      {selectedReport === 'cases' && (
        <Card>
          <CardHeader>
            <CardTitle>Case Performance</CardTitle>
            <CardDescription>
              Case outcomes and processing times
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-2" />
                <p>Case performance metrics would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Revenue Report */}
      {selectedReport === 'revenue' && (
        <Card>
          <CardHeader>
            <CardTitle>Revenue Analysis</CardTitle>
            <CardDescription>
              Detailed revenue breakdown and projections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <DollarSign className="h-12 w-12 mx-auto mb-2" />
                <p>Revenue analysis dashboard would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>Download reports in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              <span>Excel Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              <span>PDF Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              <span>CSV Data</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              <span>Schedule Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
