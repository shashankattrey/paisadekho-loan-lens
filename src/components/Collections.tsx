
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Search,
} from "lucide-react";

interface CollectionsProps {
  userRole: string;
}

const mockOverdueLoans = [
  {
    id: 'LN001',
    borrower: 'Rajesh Kumar',
    business: 'Kumar Electronics',
    principalDue: 45000,
    interestDue: 3200,
    penaltyDue: 500,
    daysPastDue: 15,
    lastPayment: '2024-01-10',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    agent: 'Amit Sharma',
    category: '0-30',
  },
  {
    id: 'LN005',
    borrower: 'Suresh Patel',
    business: 'Patel Manufacturing',
    principalDue: 120000,
    interestDue: 8500,
    penaltyDue: 2000,
    daysPastDue: 45,
    lastPayment: '2023-12-20',
    phone: '+91 87654 32109',
    email: 'suresh.patel@email.com',
    agent: 'Priya Singh',
    category: '31-60',
  },
  {
    id: 'LN008',
    borrower: 'Meera Nair',
    business: 'Nair Traders',
    principalDue: 85000,
    interestDue: 6200,
    penaltyDue: 3500,
    daysPastDue: 75,
    lastPayment: '2023-11-25',
    phone: '+91 76543 21098',
    email: 'meera.nair@email.com',
    agent: 'Rahul Verma',
    category: '61-90',
  },
];

const collectionTrendsData = [
  { month: 'Jan', collected: 2400, target: 2800 },
  { month: 'Feb', collected: 2200, target: 2600 },
  { month: 'Mar', collected: 2800, target: 3000 },
  { month: 'Apr', collected: 2600, target: 2900 },
  { month: 'May', collected: 3200, target: 3400 },
  { month: 'Jun', collected: 3000, target: 3200 },
];

const agingAnalysisData = [
  { category: '0-30 Days', count: 25, amount: 1250000 },
  { category: '31-60 Days', count: 12, amount: 840000 },
  { category: '61-90 Days', count: 8, amount: 560000 },
  { category: '90+ Days', count: 5, amount: 420000 },
];

const Collections: React.FC<CollectionsProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const getCategoryBadge = (category: string) => {
    const variants = {
      '0-30': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      '31-60': 'bg-orange-100 text-orange-800 border-orange-300',
      '61-90': 'bg-red-100 text-red-800 border-red-300',
      '90+': 'bg-red-200 text-red-900 border-red-400',
    };
    return variants[category as keyof typeof variants] || variants['0-30'];
  };

  const getTotalDue = (loan: any) => {
    return loan.principalDue + loan.interestDue + loan.penaltyDue;
  };

  const canTakeAction = userRole === 'admin' || userRole === 'collections_officer';

  const filteredLoans = mockOverdueLoans.filter(loan => {
    const matchesSearch = loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || loan.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collections & Recovery</h1>
          <p className="text-gray-600 mt-1">
            Monitor overdue accounts, track collections, and manage recovery operations
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Follow-up
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Collections Report
          </Button>
        </div>
      </div>

      {/* Collections KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              Total Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹30.7L</div>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5.2% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Collections Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87.5%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2.1% improvement
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">50</div>
            <div className="flex items-center text-sm text-orange-600 mt-1">
              <TrendingDown className="w-4 h-4 mr-1" />
              -3 from yesterday
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Recovery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">92.3%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +1.5% this quarter
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Collection Trends
            </CardTitle>
            <CardDescription>
              Monthly collection performance vs targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={collectionTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}K`, '']} />
                <Line 
                  type="monotone" 
                  dataKey="collected" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Collected"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Aging Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-600" />
              Aging Analysis
            </CardTitle>
            <CardDescription>
              Overdue portfolio breakdown by aging buckets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agingAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value, name) => 
                  name === 'amount' ? [`₹${(value as number / 100000).toFixed(1)}L`, 'Amount'] : [value, 'Count']
                } />
                <Bar dataKey="count" fill="#f59e0b" name="count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Loans Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Overdue Loans Management</CardTitle>
              <CardDescription>
                Track and manage accounts with pending payments
              </CardDescription>
            </div>
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="0-30">0-30 Days</SelectItem>
                  <SelectItem value="31-60">31-60 Days</SelectItem>
                  <SelectItem value="61-90">61-90 Days</SelectItem>
                  <SelectItem value="90+">90+ Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">Account List</TabsTrigger>
              <TabsTrigger value="summary">Summary View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Loan ID</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Total Due</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Assigned Agent</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell className="font-medium">{loan.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{loan.borrower}</div>
                          <div className="text-sm text-gray-500">{loan.business}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
                          <span className="font-medium text-red-600">{loan.daysPastDue} days</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold">₹{getTotalDue(loan).toLocaleString()}</div>
                          <div className="text-xs text-gray-500">
                            P: ₹{loan.principalDue.toLocaleString()} | I: ₹{loan.interestDue.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryBadge(loan.category)}>
                          {loan.category} Days
                        </Badge>
                      </TableCell>
                      <TableCell>{loan.lastPayment}</TableCell>
                      <TableCell>{loan.agent}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {canTakeAction && (
                            <>
                              <Button size="sm" variant="outline">
                                <Phone className="w-4 h-4 mr-1" />
                                Call
                              </Button>
                              <Button size="sm" variant="outline">
                                <Mail className="w-4 h-4 mr-1" />
                                Email
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="summary">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {agingAnalysisData.map((category, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Accounts:</span>
                          <span className="font-semibold">{category.count}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-semibold">₹{(category.amount / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg per account:</span>
                          <span className="font-semibold">₹{Math.round(category.amount / category.count / 1000)}K</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Collections;
