
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Shield,
  AlertTriangle,
  Eye,
  Ban,
  CheckCircle,
  Clock,
  Search,
  Flag,
} from "lucide-react";

interface FraudDetectionProps {
  userRole: string;
}

const fraudAlerts = [
  {
    id: 'FD001',
    borrower: 'Suspicious Application',
    riskLevel: 'high',
    fraudType: 'Identity Theft',
    confidence: 95,
    timestamp: '2 minutes ago',
    status: 'pending',
    details: 'Multiple applications with same phone number',
  },
  {
    id: 'FD002',
    borrower: 'Rajesh Kumar',
    riskLevel: 'medium',
    fraudType: 'Document Forgery',
    confidence: 78,
    timestamp: '15 minutes ago',
    status: 'investigating',
    details: 'Bank statement inconsistencies detected',
  },
  {
    id: 'FD003',
    borrower: 'Priya Sharma',
    riskLevel: 'low',
    fraudType: 'Address Mismatch',
    confidence: 65,
    timestamp: '1 hour ago',
    status: 'resolved',
    details: 'Minor address verification issue',
  },
];

const fraudTrends = [
  { month: 'Jan', detected: 12, prevented: 11, losses: 45000 },
  { month: 'Feb', detected: 15, prevented: 14, losses: 38000 },
  { month: 'Mar', detected: 18, prevented: 16, losses: 52000 },
  { month: 'Apr', detected: 22, prevented: 20, losses: 28000 },
  { month: 'May', detected: 16, prevented: 15, losses: 31000 },
  { month: 'Jun', detected: 13, prevented: 12, losses: 22000 },
];

const fraudTypes = [
  { name: 'Identity Theft', value: 35, color: '#ef4444' },
  { name: 'Document Forgery', value: 28, color: '#f97316' },
  { name: 'First Party Fraud', value: 20, color: '#eab308' },
  { name: 'Synthetic Identity', value: 12, color: '#8b5cf6' },
  { name: 'Others', value: 5, color: '#6b7280' },
];

const riskIndicators = [
  { indicator: 'Multiple applications from same IP', risk: 'High', count: 5 },
  { indicator: 'Rapid succession applications', risk: 'High', count: 3 },
  { indicator: 'Inconsistent employment history', risk: 'Medium', count: 8 },
  { indicator: 'Address verification failed', risk: 'Medium', count: 12 },
  { indicator: 'Bank statement anomalies', risk: 'High', count: 6 },
  { indicator: 'Phone number format issues', risk: 'Low', count: 15 },
];

const FraudDetection: React.FC<FraudDetectionProps> = ({ userRole }) => {
  const [alertFilter, setAlertFilter] = useState('all');

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'investigating':
        return <Search className="w-4 h-4 text-blue-600" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'blocked':
        return <Ban className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const canTakeAction = userRole === 'admin' || userRole === 'compliance_officer';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fraud Detection</h1>
          <p className="text-gray-600 mt-1">
            AI-powered fraud detection and prevention system
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Flag className="w-4 h-4 mr-2" />
            Flag Review
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Shield className="w-4 h-4 mr-2" />
            Fraud Report
          </Button>
        </div>
      </div>

      {/* Fraud Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23</div>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <AlertTriangle className="w-4 h-4 mr-1" />
              +5 new today
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cases Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <CheckCircle className="w-4 h-4 mr-1" />
              This month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Prevention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">94.2%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <Shield className="w-4 h-4 mr-1" />
              +2.1% improved
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Savings (MTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">₹2.8L</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <CheckCircle className="w-4 h-4 mr-1" />
              Fraud prevented
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Fraud Analytics</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
          <TabsTrigger value="settings">Detection Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Fraud Alerts Dashboard</CardTitle>
                  <CardDescription>
                    Real-time fraud detection alerts requiring investigation
                  </CardDescription>
                </div>
                <Select value={alertFilter} onValueChange={setAlertFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fraudAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          {getStatusIcon(alert.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{alert.borrower}</h3>
                          <p className="text-sm text-gray-600">{alert.fraudType} • {alert.timestamp}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <Badge className={getRiskBadge(alert.riskLevel)}>
                            {alert.riskLevel.toUpperCase()}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{alert.confidence}% Confidence</p>
                        </div>
                        
                        <div>
                          <Progress value={alert.confidence} className="w-24 mb-2" />
                          <p className="text-xs text-gray-500">Risk Score</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Investigate
                          </Button>
                          {canTakeAction && alert.riskLevel === 'high' && (
                            <Button size="sm" variant="destructive">
                              <Ban className="w-4 h-4 mr-1" />
                              Block
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{alert.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  Fraud Trends
                </CardTitle>
                <CardDescription>
                  Monthly fraud detection and prevention statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={fraudTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="detected" stroke="#ef4444" strokeWidth={2} name="Detected" />
                    <Line type="monotone" dataKey="prevented" stroke="#10b981" strokeWidth={2} name="Prevented" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fraud Type Distribution</CardTitle>
                <CardDescription>
                  Breakdown of fraud attempts by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={fraudTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fraudTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="patterns">
          <Card>
            <CardHeader>
              <CardTitle>Risk Pattern Analysis</CardTitle>
              <CardDescription>
                Common fraud indicators and their frequency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{indicator.indicator}</h3>
                      <p className="text-sm text-gray-600">Detected {indicator.count} times this month</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={
                        indicator.risk === 'High' ? 'bg-red-100 text-red-800' :
                        indicator.risk === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {indicator.risk} Risk
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection Rules</CardTitle>
                <CardDescription>
                  Configure automated fraud detection parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Identity Verification</span>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Document Analysis</span>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Behavioral Patterns</span>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Device Fingerprinting</span>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Thresholds</CardTitle>
                <CardDescription>
                  Set confidence thresholds for different alert levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">High Risk Threshold</span>
                    <span className="text-sm">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Medium Risk Threshold</span>
                    <span className="text-sm">65%</span>
                  </div>
                  <Progress value={65} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Low Risk Threshold</span>
                    <span className="text-sm">45%</span>
                  </div>
                  <Progress value={45} />
                </div>
                
                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FraudDetection;
