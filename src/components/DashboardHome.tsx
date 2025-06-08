
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  FileText,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Video,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  AlertTriangle,
  Eye,
  UserCheck,
  Banknote,
  MapPin,
} from "lucide-react";

interface DashboardHomeProps {
  userRole: string;
}

const mockVKYCApplications = [
  {
    id: 'VKYC001',
    borrower: 'Rajesh Kumar',
    business: 'Kumar Electronics',
    phone: '+91 98765 43210',
    scheduledTime: '10:30 AM',
    status: 'scheduled',
    priority: 'high',
    loanAmount: '₹25,000',
  },
  {
    id: 'VKYC002',
    borrower: 'Priya Sharma',
    business: 'Sharma Textiles',
    phone: '+91 87654 32109',
    scheduledTime: '2:00 PM',
    status: 'pending',
    priority: 'medium',
    loanAmount: '₹18,000',
  },
  {
    id: 'VKYC003',
    borrower: 'Mohammed Ali',
    business: 'Ali Trading Co.',
    phone: '+91 76543 21098',
    scheduledTime: '4:15 PM',
    status: 'completed',
    priority: 'low',
    loanAmount: '₹35,000',
  },
];

const mockTodayEMI = [
  {
    id: 'L001',
    borrower: 'Suresh Patel',
    business: 'Patel Grocery',
    amount: '₹1,250',
    dueTime: '11:00 AM',
    phone: '+91 99887 76655',
    daysPastDue: 0,
    emiType: 'daily',
    totalDue: '₹1,250',
  },
  {
    id: 'L045',
    borrower: 'Kavita Devi',
    business: 'Beauty Parlour',
    amount: '₹2,100',
    dueTime: '12:30 PM',
    phone: '+91 88776 65544',
    daysPastDue: 2,
    emiType: 'tenth_day',
    totalDue: '₹6,300',
  },
  {
    id: 'L089',
    borrower: 'Ramesh Agarwal',
    business: 'Mobile Repair Shop',
    amount: '₹1,800',
    dueTime: '3:00 PM',
    phone: '+91 77665 54433',
    daysPastDue: 0,
    emiType: 'monthly',
    totalDue: '₹1,800',
  },
];

const emiCollectionData = [
  { time: '9 AM', collected: 15000, pending: 8000 },
  { time: '11 AM', collected: 28000, pending: 12000 },
  { time: '1 PM', collected: 45000, pending: 18000 },
  { time: '3 PM', collected: 62000, pending: 15000 },
  { time: '5 PM', collected: 78000, pending: 10000 },
];

const dpd0to30Data = [
  { range: '0-7 days', count: 45, amount: 125000 },
  { range: '8-15 days', count: 23, amount: 78000 },
  { range: '16-23 days', count: 12, amount: 45000 },
  { range: '24-30 days', count: 8, amount: 32000 },
];

const DashboardHome: React.FC<DashboardHomeProps> = ({ userRole }) => {
  const [selectedVKYC, setSelectedVKYC] = useState<any>(null);

  const enhancedKpiCards = [
    {
      title: 'Total Applications',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-blue-500',
      subMetrics: [
        { label: 'Pending Review', value: '156' },
        { label: 'Approved Today', value: '23' },
        { label: 'Rejected Today', value: '8' },
      ]
    },
    {
      title: 'VKYC Queue',
      value: '45',
      change: '-5%',
      changeType: 'negative',
      icon: Video,
      color: 'bg-purple-500',
      subMetrics: [
        { label: 'Scheduled Today', value: '12' },
        { label: 'Completed', value: '89' },
        { label: 'Failed/Rejected', value: '7' },
      ]
    },
    {
      title: "Today's EMI Due",
      value: '₹1.2L',
      change: '+8%',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-green-500',
      subMetrics: [
        { label: 'Collected', value: '₹78K' },
        { label: 'Pending', value: '₹42K' },
        { label: 'Overdue', value: '₹18K' },
      ]
    },
    {
      title: 'DPD 0-30',
      value: '88',
      change: '-12%',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'bg-red-500',
      subMetrics: [
        { label: '0-7 days', value: '45' },
        { label: '8-15 days', value: '23' },
        { label: '16-30 days', value: '20' },
      ]
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'bg-blue-100 text-blue-800 border-blue-300',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      completed: 'bg-green-100 text-green-800 border-green-300',
      failed: 'bg-red-100 text-red-800 border-red-300',
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800 border-red-300',
      medium: 'bg-orange-100 text-orange-800 border-orange-300',
      low: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  const getEMIStatusColor = (daysPastDue: number) => {
    if (daysPastDue === 0) return 'text-green-600';
    if (daysPastDue <= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const canPerformVKYC = userRole === 'admin' || userRole === 'compliance_officer' || userRole === 'credit_officer';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Operations Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Real-time overview of lending operations, VKYC, and collections
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Live Data
          </Badge>
          <Badge variant="outline" className="text-gray-600">
            {new Date().toLocaleDateString('en-IN')}
          </Badge>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {enhancedKpiCards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <div className={`${kpi.color} p-2 rounded-lg text-white`}>
                  <IconComponent className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                <p className={`text-xs mt-1 ${
                  kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change} from yesterday
                </p>
                <div className="mt-3 space-y-1">
                  {kpi.subMetrics.map((metric, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-gray-600">
                      <span>{metric.label}:</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* VKYC and EMI Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VKYC Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Video className="w-5 h-5 mr-2 text-purple-600" />
                Today's VKYC Schedule
              </div>
              <Badge variant="outline">{mockVKYCApplications.length} pending</Badge>
            </CardTitle>
            <CardDescription>
              Video KYC appointments and verification queue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockVKYCApplications.map((vkyc) => (
                <div key={vkyc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{vkyc.borrower}</span>
                      <span className="text-xs text-gray-500">{vkyc.business}</span>
                      <span className="text-xs text-gray-500">{vkyc.scheduledTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityBadge(vkyc.priority)}>
                      {vkyc.priority}
                    </Badge>
                    <Badge className={getStatusBadge(vkyc.status)}>
                      {vkyc.status}
                    </Badge>
                    {canPerformVKYC && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedVKYC(vkyc)}>
                            <Video className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>VKYC Session - {selectedVKYC?.id}</DialogTitle>
                            <DialogDescription>
                              Video KYC verification for {selectedVKYC?.borrower}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedVKYC && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
                                  <div className="text-center">
                                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">Customer Video</p>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div><strong>Name:</strong> {selectedVKYC.borrower}</div>
                                  <div><strong>Business:</strong> {selectedVKYC.business}</div>
                                  <div><strong>Phone:</strong> {selectedVKYC.phone}</div>
                                  <div><strong>Loan Amount:</strong> {selectedVKYC.loanAmount}</div>
                                </div>
                              </div>
                              <div className="flex space-x-4 pt-4 border-t">
                                <Button className="bg-green-600 hover:bg-green-700">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve VKYC
                                </Button>
                                <Button variant="destructive">
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject VKYC
                                </Button>
                                <Button variant="outline">
                                  <Clock className="w-4 h-4 mr-2" />
                                  Reschedule
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's EMI Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                Today's EMI Due
              </div>
              <Badge variant="outline">{mockTodayEMI.length} accounts</Badge>
            </CardTitle>
            <CardDescription>
              EMI collection schedule and status tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTodayEMI.map((emi) => (
                <div key={emi.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{emi.borrower}</span>
                      <span className="text-xs text-gray-500">{emi.business}</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {emi.emiType}
                        </Badge>
                        <span className="text-xs text-gray-500">Due: {emi.dueTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${getEMIStatusColor(emi.daysPastDue)}`}>
                      {emi.amount}
                    </div>
                    {emi.daysPastDue > 0 && (
                      <div className="text-xs text-red-600">
                        {emi.daysPastDue} days overdue
                      </div>
                    )}
                    <div className="flex space-x-1 mt-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Collect
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EMI Collection Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Today's Collection Trend
            </CardTitle>
            <CardDescription>
              Real-time EMI collection vs pending amounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={emiCollectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="collected" 
                  stackId="1"
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Collected (₹)"
                />
                <Area 
                  type="monotone" 
                  dataKey="pending" 
                  stackId="1"
                  stroke="#f59e0b" 
                  fill="#f59e0b"
                  fillOpacity={0.6}
                  name="Pending (₹)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* DPD Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              DPD 0-30 Analysis
            </CardTitle>
            <CardDescription>
              Days Past Due breakdown for early intervention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dpd0to30Data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} name="Account Count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <Tabs defaultValue="vkyc" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vkyc">VKYC Queue</TabsTrigger>
          <TabsTrigger value="collections">Collection Details</TabsTrigger>
          <TabsTrigger value="alerts">Priority Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vkyc">
          <Card>
            <CardHeader>
              <CardTitle>Complete VKYC Queue</CardTitle>
              <CardDescription>All pending and scheduled VKYC sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>VKYC ID</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Scheduled Time</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVKYCApplications.map((vkyc) => (
                    <TableRow key={vkyc.id}>
                      <TableCell className="font-medium">{vkyc.id}</TableCell>
                      <TableCell>{vkyc.borrower}</TableCell>
                      <TableCell>{vkyc.business}</TableCell>
                      <TableCell>{vkyc.scheduledTime}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadge(vkyc.priority)}>
                          {vkyc.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(vkyc.status)}>
                          {vkyc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Video className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="collections">
          <Card>
            <CardHeader>
              <CardTitle>Today's Collection Details</CardTitle>
              <CardDescription>Detailed EMI collection status and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Loan ID</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>EMI Amount</TableHead>
                    <TableHead>Due Time</TableHead>
                    <TableHead>DPD</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTodayEMI.map((emi) => (
                    <TableRow key={emi.id}>
                      <TableCell className="font-medium">{emi.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{emi.borrower}</div>
                          <div className="text-sm text-gray-500">{emi.business}</div>
                        </div>
                      </TableCell>
                      <TableCell className={`font-bold ${getEMIStatusColor(emi.daysPastDue)}`}>
                        {emi.amount}
                      </TableCell>
                      <TableCell>{emi.dueTime}</TableCell>
                      <TableCell>
                        <Badge className={emi.daysPastDue === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {emi.daysPastDue === 0 ? 'On Time' : `${emi.daysPastDue} days`}
                        </Badge>
                      </TableCell>
                      <TableCell>{emi.phone}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Collect
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Priority Alerts & Actions</CardTitle>
              <CardDescription>Critical items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-red-800">High Priority VKYC</h3>
                  </div>
                  <p className="text-sm text-red-700 mb-2">3 high-priority VKYC sessions overdue</p>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                    Review Now
                  </Button>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-orange-600 mr-2" />
                    <h3 className="font-semibold text-orange-800">Overdue EMIs</h3>
                  </div>
                  <p className="text-sm text-orange-700 mb-2">₹45,000 in EMIs overdue by 2+ days</p>
                  <Button size="sm" variant="outline" className="border-orange-300 text-orange-700">
                    Start Collection
                  </Button>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-800">Pending Approvals</h3>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">12 loan applications awaiting approval</p>
                  <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                    Review Queue
                  </Button>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center mb-2">
                    <FileText className="w-5 h-5 text-purple-600 mr-2" />
                    <h3 className="font-semibold text-purple-800">Document Verification</h3>
                  </div>
                  <p className="text-sm text-purple-700 mb-2">8 documents pending verification</p>
                  <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                    Verify Documents
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardHome;
