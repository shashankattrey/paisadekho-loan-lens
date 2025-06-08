
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  Target,
  Activity,
} from "lucide-react";

interface RiskAnalyticsProps {
  userRole: string;
}

const portfolioRiskData = [
  { month: 'Jan', lowRisk: 65, mediumRisk: 25, highRisk: 10 },
  { month: 'Feb', lowRisk: 62, mediumRisk: 28, highRisk: 10 },
  { month: 'Mar', lowRisk: 58, mediumRisk: 30, highRisk: 12 },
  { month: 'Apr', lowRisk: 55, mediumRisk: 32, highRisk: 13 },
  { month: 'May', lowRisk: 60, mediumRisk: 28, highRisk: 12 },
  { month: 'Jun', lowRisk: 63, mediumRisk: 26, highRisk: 11 },
];

const industryRiskData = [
  { name: 'Retail', value: 35, risk: 'Medium' },
  { name: 'Manufacturing', value: 20, risk: 'High' },
  { name: 'Services', value: 25, risk: 'Low' },
  { name: 'Food & Beverage', value: 15, risk: 'Medium' },
  { name: 'Others', value: 5, risk: 'High' },
];

const geoRiskData = [
  { state: 'Maharashtra', loans: 120, riskScore: 7.2, npa: 8.5 },
  { state: 'Gujarat', loans: 95, riskScore: 7.8, npa: 6.2 },
  { state: 'Karnataka', loans: 80, riskScore: 7.0, npa: 9.1 },
  { state: 'Tamil Nadu', loans: 70, riskScore: 7.5, npa: 7.3 },
  { state: 'Rajasthan', loans: 60, riskScore: 6.8, npa: 10.2 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const RiskAnalytics: React.FC<RiskAnalyticsProps> = ({ userRole }) => {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Analytics</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive risk assessment and portfolio analytics
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Risk Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Portfolio Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">7.2</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +0.3 from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">NPA Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8.2%</div>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +0.5% this month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Risk Adjusted Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">18.5%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2.1% improvement
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Concentration Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">Medium</div>
            <div className="flex items-center text-sm text-yellow-600 mt-1">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Monitor closely
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio Risk</TabsTrigger>
          <TabsTrigger value="industry">Industry Analysis</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Risk</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Portfolio Risk Trend
                </CardTitle>
                <CardDescription>
                  Risk distribution across portfolio over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={portfolioRiskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="lowRisk" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="mediumRisk" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="highRisk" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Actions</CardTitle>
                <CardDescription>
                  Recommended actions based on current risk profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-red-800">High Priority</h3>
                  </div>
                  <p className="text-sm text-red-700 mb-2">Review 15 high-risk loans immediately</p>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                    Review Now
                  </Button>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center mb-2">
                    <Target className="w-5 h-5 text-orange-600 mr-2" />
                    <h3 className="font-semibold text-orange-800">Medium Priority</h3>
                  </div>
                  <p className="text-sm text-orange-700 mb-2">Diversify industry concentration</p>
                  <Button size="sm" variant="outline" className="border-orange-300 text-orange-700">
                    View Strategy
                  </Button>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-2">
                    <Activity className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-800">Optimization</h3>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">Adjust pricing for medium-risk segment</p>
                  <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                    Implement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="industry">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry Distribution</CardTitle>
                <CardDescription>
                  Loan portfolio distribution by industry sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={industryRiskData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {industryRiskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Risk Assessment</CardTitle>
                <CardDescription>
                  Risk levels by industry with recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {industryRiskData.map((industry, index) => (
                  <div key={industry.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{industry.name}</h3>
                      <p className="text-sm text-gray-600">{industry.value}% of portfolio</p>
                    </div>
                    <div className="text-right">
                      <Badge className={
                        industry.risk === 'Low' ? 'bg-green-100 text-green-800' :
                        industry.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {industry.risk} Risk
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="geographic">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Risk Analysis</CardTitle>
              <CardDescription>
                State-wise risk assessment and portfolio performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">State</th>
                      <th className="text-left p-4 font-semibold">Active Loans</th>
                      <th className="text-left p-4 font-semibold">Avg Risk Score</th>
                      <th className="text-left p-4 font-semibold">NPA Rate</th>
                      <th className="text-left p-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geoRiskData.map((state) => (
                      <tr key={state.state} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{state.state}</td>
                        <td className="p-4">{state.loans}</td>
                        <td className="p-4">
                          <Badge className={
                            state.riskScore >= 7.5 ? 'bg-green-100 text-green-800' :
                            state.riskScore >= 7.0 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {state.riskScore}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className={
                            state.npa <= 7 ? 'text-green-600' :
                            state.npa <= 9 ? 'text-yellow-600' :
                            'text-red-600'
                          }>
                            {state.npa}%
                          </span>
                        </td>
                        <td className="p-4">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="predictive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Default Probability Model</CardTitle>
                <CardDescription>
                  ML-powered default prediction for next 12 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-red-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Low Risk (0-30%)</span>
                      <span className="text-sm font-bold">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '68%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Medium Risk (30-60%)</span>
                      <span className="text-sm font-bold">22%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '22%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">High Risk (60%+)</span>
                      <span className="text-sm font-bold">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '10%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Early Warning Indicators</CardTitle>
                <CardDescription>
                  Key metrics that predict potential defaults
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium">Payment Delays</span>
                  <Badge className="bg-red-100 text-red-800">23 accounts</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium">Credit Score Drop</span>
                  <Badge className="bg-orange-100 text-orange-800">15 accounts</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium">Business Volatility</span>
                  <Badge className="bg-yellow-100 text-yellow-800">8 accounts</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">Industry Stress</span>
                  <Badge className="bg-blue-100 text-blue-800">12 accounts</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskAnalytics;
