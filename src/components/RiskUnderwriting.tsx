
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  Calculator,
} from "lucide-react";

interface RiskUnderwritingProps {
  userRole: string;
}

const mockRiskLoans = [
  {
    id: 'LN001',
    applicant: 'Rajesh Kumar',
    business: 'Kumar Electronics',
    amount: 500000,
    riskScore: 7.2,
    creditScore: 750,
    flags: ['High DTI Ratio'],
    status: 'flagged',
    industry: 'Electronics',
    experience: 5,
  },
  {
    id: 'LN002',
    applicant: 'Priya Sharma',
    business: 'Sharma Textiles',
    amount: 750000,
    riskScore: 8.5,
    creditScore: 780,
    flags: [],
    status: 'approved',
    industry: 'Textiles',
    experience: 8,
  },
  {
    id: 'LN004',
    applicant: 'Suresh Patel',
    business: 'Patel Manufacturing',
    amount: 1200000,
    riskScore: 5.8,
    creditScore: 650,
    flags: ['Industry Risk', 'Geographic Risk'],
    status: 'requires_review',
    industry: 'Manufacturing',
    experience: 3,
  },
];

const riskDistributionData = [
  { range: '0-3', count: 5, color: '#ef4444' },
  { range: '3-5', count: 12, color: '#f97316' },
  { range: '5-7', count: 28, color: '#eab308' },
  { range: '7-8.5', count: 35, color: '#22c55e' },
  { range: '8.5-10', count: 20, color: '#16a34a' },
];

const riskFactorsData = [
  { factor: 'Credit History', value: 85 },
  { factor: 'Business Stability', value: 70 },
  { factor: 'Financial Health', value: 90 },
  { factor: 'Industry Risk', value: 60 },
  { factor: 'Geographic Risk', value: 75 },
  { factor: 'Debt Service', value: 80 },
];

const RiskUnderwriting: React.FC<RiskUnderwritingProps> = ({ userRole }) => {
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [riskFilter, setRiskFilter] = useState('all');

  const getRiskBadge = (score: number) => {
    if (score >= 8) return { className: 'bg-green-100 text-green-800', label: 'Low Risk' };
    if (score >= 6.5) return { className: 'bg-yellow-100 text-yellow-800', label: 'Medium Risk' };
    return { className: 'bg-red-100 text-red-800', label: 'High Risk' };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'flagged':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'requires_review':
        return <Eye className="w-4 h-4 text-orange-600" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const canTakeAction = userRole === 'admin' || userRole === 'risk_manager';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk & Underwriting</h1>
          <p className="text-gray-600 mt-1">
            Monitor risk scores, review flagged loans, and manage underwriting decisions
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calculator className="w-4 h-4 mr-2" />
            Risk Calculator
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Risk Report
          </Button>
        </div>
      </div>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">High Risk Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23</div>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +3 from last week
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">15</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingDown className="w-4 h-4 mr-1" />
              -5 from yesterday
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">7.2</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +0.3 improvement
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Override Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">8.5%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingDown className="w-4 h-4 mr-1" />
              -1.2% this month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
              Risk Score Distribution
            </CardTitle>
            <CardDescription>
              Portfolio distribution across risk score ranges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Factors Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Factors Analysis</CardTitle>
            <CardDescription>
              Key risk factors evaluation matrix
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={riskFactorsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Risk Score"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Loans Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Risk Assessment Queue</CardTitle>
              <CardDescription>
                Loans requiring manual review and risk evaluation
              </CardDescription>
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk (0-6.5)</SelectItem>
                <SelectItem value="medium">Medium Risk (6.5-8)</SelectItem>
                <SelectItem value="low">Low Risk (8-10)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRiskLoans.map((loan) => {
              const riskBadge = getRiskBadge(loan.riskScore);
              return (
                <div key={loan.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        {getStatusIcon(loan.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{loan.applicant}</h3>
                        <p className="text-sm text-gray-600">{loan.business} • {loan.industry}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-semibold">₹{(loan.amount / 100000).toFixed(1)}L</p>
                        <p className="text-sm text-gray-600">Loan Amount</p>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={riskBadge.className}>
                          {loan.riskScore}/10
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{riskBadge.label}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold">{loan.creditScore}</p>
                        <p className="text-sm text-gray-600">Credit Score</p>
                      </div>
                      
                      <div>
                        {loan.flags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {loan.flags.map((flag, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {flag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {canTakeAction && (
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Risk Breakdown */}
                  <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Business Experience</p>
                      <p className="font-medium">{loan.experience} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Industry Risk</p>
                      <Progress value={70} className="mt-1" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Financial Stability</p>
                      <Progress value={loan.riskScore * 10} className="mt-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskUnderwriting;
