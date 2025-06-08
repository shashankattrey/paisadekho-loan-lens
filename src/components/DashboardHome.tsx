
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
} from "lucide-react";

interface DashboardHomeProps {
  userRole: string;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ userRole }) => {
  // Mock data for charts
  const loanPipelineData = [
    { status: 'Applied', count: 245, color: '#3b82f6' },
    { status: 'Under Review', count: 156, color: '#f59e0b' },
    { status: 'Approved', count: 89, color: '#10b981' },
    { status: 'Disbursed', count: 67, color: '#6366f1' },
    { status: 'Rejected', count: 34, color: '#ef4444' },
  ];

  const riskDistributionData = [
    { name: 'Low Risk', value: 45, color: '#10b981' },
    { name: 'Medium Risk', value: 35, color: '#f59e0b' },
    { name: 'High Risk', value: 20, color: '#ef4444' },
  ];

  const monthlyTrendsData = [
    { month: 'Jan', disbursed: 2400, collected: 2100 },
    { month: 'Feb', disbursed: 1398, collected: 2200 },
    { month: 'Mar', disbursed: 9800, collected: 2000 },
    { month: 'Apr', disbursed: 3908, collected: 2780 },
    { month: 'May', disbursed: 4800, collected: 1890 },
    { month: 'Jun', disbursed: 3800, collected: 2390 },
  ];

  const kpiCards = [
    {
      title: 'Total Applications',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Pending VKYC',
      value: '89',
      change: '-5%',
      changeType: 'negative',
      icon: Users,
      color: 'bg-orange-500',
    },
    {
      title: 'Monthly Disbursed',
      value: '₹38.5L',
      change: '+23%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Overdue Rate',
      value: '2.4%',
      change: '-0.8%',
      changeType: 'negative',
      icon: AlertCircle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your SME lending portfolio.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            System Healthy
          </Badge>
          <Badge variant="outline" className="text-gray-600">
            Role: {userRole.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
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
                  {kpi.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Loan Pipeline Status
            </CardTitle>
            <CardDescription>
              Current status distribution of loan applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={loanPipelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
              Risk Score Distribution
            </CardTitle>
            <CardDescription>
              Portfolio risk assessment breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trends and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Monthly Trends
            </CardTitle>
            <CardDescription>
              Disbursement vs Collection trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="disbursed" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Disbursed (₹'000)"
                />
                <Line 
                  type="monotone" 
                  dataKey="collected" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Collected (₹'000)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              Quick Alerts
            </CardTitle>
            <CardDescription>
              Actions requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <XCircle className="w-4 h-4 text-red-600 mr-2" />
                <span className="text-sm font-medium text-red-700">High Risk Loans</span>
              </div>
              <Badge variant="destructive">23</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-orange-600 mr-2" />
                <span className="text-sm font-medium text-orange-700">Pending Approvals</span>
              </div>
              <Badge variant="outline" className="bg-orange-100 text-orange-700">45</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <Users className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-700">VKYC Pending</span>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">12</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-700">Today's Target</span>
              </div>
              <Progress value={75} className="w-16 h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
