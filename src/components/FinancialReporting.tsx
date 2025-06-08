
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart as PieChartIcon,
  Download,
  FileText,
  Calendar,
  Filter,
  BarChart3,
} from "lucide-react";

interface FinancialReportingProps {
  userRole: string;
}

const revenueData = [
  { month: 'Jan', interest: 2400, fees: 800, penalties: 200 },
  { month: 'Feb', interest: 2200, fees: 750, penalties: 150 },
  { month: 'Mar', interest: 2800, fees: 900, penalties: 300 },
  { month: 'Apr', interest: 2600, fees: 850, penalties: 180 },
  { month: 'May', interest: 3200, fees: 1000, penalties: 250 },
  { month: 'Jun', interest: 3000, fees: 950, penalties: 220 },
];

const disbursementData = [
  { month: 'Jan', amount: 25000, count: 45 },
  { month: 'Feb', amount: 28000, count: 52 },
  { month: 'Mar', amount: 32000, count: 58 },
  { month: 'Apr', amount: 29000, count: 48 },
  { month: 'May', amount: 35000, count: 62 },
  { month: 'Jun', amount: 38000, count: 67 },
];

const portfolioData = [
  { category: 'Performing', value: 85, amount: 42500000, color: '#10b981' },
  { category: 'Special Mention', value: 10, amount: 5000000, color: '#f59e0b' },
  { category: 'Sub-standard', value: 3, amount: 1500000, color: '#ef4444' },
  { category: 'Doubtful', value: 2, amount: 1000000, color: '#991b1b' },
];

const profitabilityData = [
  { month: 'Jan', revenue: 3400, expenses: 2800, profit: 600 },
  { month: 'Feb', revenue: 3100, expenses: 2600, profit: 500 },
  { month: 'Mar', revenue: 4000, expenses: 3200, profit: 800 },
  { month: 'Apr', revenue: 3630, expenses: 2950, profit: 680 },
  { month: 'May', revenue: 4450, expenses: 3600, profit: 850 },
  { month: 'Jun', revenue: 4170, expenses: 3400, profit: 770 },
];

const FinancialReporting: React.FC<FinancialReportingProps> = ({ userRole }) => {
  const [dateRange, setDateRange] = useState<any>(null);
  const [reportType, setReportType] = useState('monthly');

  const financialKPIs = [
    {
      title: 'Total Revenue',
      value: '₹42.7L',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      period: 'This Month',
    },
    {
      title: 'Interest Income',
      value: '₹38.2L',
      change: '+8.3%',
      changeType: 'positive',
      icon: TrendingUp,
      period: 'This Month',
    },
    {
      title: 'Platform Fees',
      value: '₹3.8L',
      change: '+15.2%',
      changeType: 'positive',
      icon: PieChartIcon,
      period: 'This Month',
    },
    {
      title: 'Net Profit',
      value: '₹7.7L',
      change: '+18.4%',
      changeType: 'positive',
      icon: BarChart3,
      period: 'This Month',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reporting</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive financial analytics and performance reporting
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Report</SelectItem>
                <SelectItem value="weekly">Weekly Report</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="quarterly">Quarterly Report</SelectItem>
                <SelectItem value="yearly">Yearly Report</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialKPIs.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <IconComponent className="w-4 h-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs ${
                    kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.change}
                  </p>
                  <p className="text-xs text-gray-500">{kpi.period}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Reports */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="disbursement">Disbursement</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Health</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Revenue Streams
                </CardTitle>
                <CardDescription>
                  Monthly breakdown of interest income, fees, and penalties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}K`, '']} />
                    <Area 
                      type="monotone" 
                      dataKey="interest" 
                      stackId="1"
                      stroke="#10b981" 
                      fill="#10b981"
                      name="Interest Income"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="fees" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6"
                      name="Platform Fees"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="penalties" 
                      stackId="1"
                      stroke="#f59e0b" 
                      fill="#f59e0b"
                      name="Penalties"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Summary</CardTitle>
                <CardDescription>
                  Current month revenue breakdown and targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-semibold text-green-800">Interest Income</p>
                    <p className="text-sm text-green-600">89% of target achieved</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-700">₹30.0L</p>
                    <p className="text-sm text-green-600">Target: ₹33.7L</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="font-semibold text-blue-800">Platform Fees</p>
                    <p className="text-sm text-blue-600">102% of target achieved</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-700">₹9.5L</p>
                    <p className="text-sm text-blue-600">Target: ₹9.3L</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <p className="font-semibold text-orange-800">Processing Fees</p>
                    <p className="text-sm text-orange-600">76% of target achieved</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-700">₹2.2L</p>
                    <p className="text-sm text-orange-600">Target: ₹2.9L</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="disbursement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Disbursement Trends
              </CardTitle>
              <CardDescription>
                Monthly loan disbursement amounts and count trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={disbursementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="amount" fill="#3b82f6" name="Amount (₹'000)" />
                  <Line yAxisId="right" type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} name="Loan Count" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-2 text-purple-600" />
                  Portfolio Classification
                </CardTitle>
                <CardDescription>
                  Asset quality distribution by classification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Quality Metrics</CardTitle>
                <CardDescription>
                  Key asset quality indicators and ratios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolioData.map((category, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <p className="font-medium">{category.category}</p>
                        <p className="text-sm text-gray-600">{category.value}% of portfolio</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{(category.amount / 1000000).toFixed(1)}Cr</p>
                      <p className="text-sm text-gray-600">Outstanding</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profitability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                Profitability Analysis
              </CardTitle>
              <CardDescription>
                Monthly profit and loss breakdown with revenue vs expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={profitabilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}K`, '']} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="Expenses"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Net Profit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReporting;
