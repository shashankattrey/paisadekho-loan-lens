
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  Calculator,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  User,
  Building,
} from "lucide-react";

interface CreditScoringProps {
  userRole: string;
}

const creditFactors = [
  { factor: 'Payment History', score: 85, weight: 35 },
  { factor: 'Credit Utilization', score: 70, weight: 30 },
  { factor: 'Length of Credit', score: 90, weight: 15 },
  { factor: 'Types of Credit', score: 75, weight: 10 },
  { factor: 'New Credit', score: 80, weight: 10 },
];

const radarData = [
  { subject: 'Payment History', A: 85, fullMark: 100 },
  { subject: 'Debt-to-Income', A: 70, fullMark: 100 },
  { subject: 'Business Stability', A: 90, fullMark: 100 },
  { subject: 'Cash Flow', A: 75, fullMark: 100 },
  { subject: 'Collateral', A: 80, fullMark: 100 },
  { subject: 'Character', A: 88, fullMark: 100 },
];

const scoreDistribution = [
  { range: '300-499', count: 5, color: '#ef4444' },
  { range: '500-649', count: 15, color: '#f97316' },
  { range: '650-749', count: 45, color: '#eab308' },
  { range: '750-850', count: 35, color: '#22c55e' },
];

const CreditScoring: React.FC<CreditScoringProps> = ({ userRole }) => {
  const [borrowerData, setBorrowerData] = useState({
    monthlyIncome: '',
    monthlyExpenses: '',
    existingDebt: '',
    businessAge: '',
    creditHistory: '',
  });

  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  const calculateCreditScore = () => {
    // Simplified credit scoring algorithm
    const income = parseInt(borrowerData.monthlyIncome) || 0;
    const expenses = parseInt(borrowerData.monthlyExpenses) || 0;
    const debt = parseInt(borrowerData.existingDebt) || 0;
    const businessAge = parseInt(borrowerData.businessAge) || 0;
    const creditHistory = parseInt(borrowerData.creditHistory) || 0;

    const debtToIncome = debt / income;
    const cashFlow = income - expenses;
    
    let score = 300; // Base score
    
    // Income factor (0-150 points)
    if (income >= 50000) score += 150;
    else if (income >= 30000) score += 100;
    else if (income >= 20000) score += 50;
    
    // Debt-to-income factor (0-150 points)
    if (debtToIncome < 0.3) score += 150;
    else if (debtToIncome < 0.5) score += 100;
    else if (debtToIncome < 0.7) score += 50;
    
    // Cash flow factor (0-100 points)
    if (cashFlow >= 20000) score += 100;
    else if (cashFlow >= 10000) score += 70;
    else if (cashFlow >= 5000) score += 40;
    
    // Business age factor (0-100 points)
    if (businessAge >= 5) score += 100;
    else if (businessAge >= 2) score += 70;
    else if (businessAge >= 1) score += 40;
    
    // Credit history factor (0-100 points)
    if (creditHistory >= 720) score += 100;
    else if (creditHistory >= 650) score += 70;
    else if (creditHistory >= 580) score += 40;
    
    setCalculatedScore(Math.min(850, score));
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-yellow-600';
    if (score >= 500) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 750) return { className: 'bg-green-100 text-green-800', label: 'Excellent' };
    if (score >= 650) return { className: 'bg-yellow-100 text-yellow-800', label: 'Good' };
    if (score >= 500) return { className: 'bg-orange-100 text-orange-800', label: 'Fair' };
    return { className: 'bg-red-100 text-red-800', label: 'Poor' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Credit Scoring</h1>
          <p className="text-gray-600 mt-1">
            Advanced credit assessment and scoring system
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calculator className="w-4 h-4 mr-2" />
          Credit Report
        </Button>
      </div>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculator">Score Calculator</TabsTrigger>
          <TabsTrigger value="analysis">Credit Analysis</TabsTrigger>
          <TabsTrigger value="distribution">Portfolio Distribution</TabsTrigger>
          <TabsTrigger value="models">Scoring Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                  Credit Score Calculator
                </CardTitle>
                <CardDescription>
                  Enter borrower details to calculate credit score
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={borrowerData.monthlyIncome}
                    onChange={(e) => setBorrowerData({...borrowerData, monthlyIncome: e.target.value})}
                    placeholder="50000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="monthlyExpenses">Monthly Expenses (₹)</Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={borrowerData.monthlyExpenses}
                    onChange={(e) => setBorrowerData({...borrowerData, monthlyExpenses: e.target.value})}
                    placeholder="30000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="existingDebt">Existing Debt (₹)</Label>
                  <Input
                    id="existingDebt"
                    type="number"
                    value={borrowerData.existingDebt}
                    onChange={(e) => setBorrowerData({...borrowerData, existingDebt: e.target.value})}
                    placeholder="100000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="businessAge">Business Age (Years)</Label>
                  <Input
                    id="businessAge"
                    type="number"
                    value={borrowerData.businessAge}
                    onChange={(e) => setBorrowerData({...borrowerData, businessAge: e.target.value})}
                    placeholder="3"
                  />
                </div>
                
                <div>
                  <Label htmlFor="creditHistory">Existing Credit Score</Label>
                  <Input
                    id="creditHistory"
                    type="number"
                    value={borrowerData.creditHistory}
                    onChange={(e) => setBorrowerData({...borrowerData, creditHistory: e.target.value})}
                    placeholder="650"
                  />
                </div>
                
                <Button onClick={calculateCreditScore} className="w-full">
                  Calculate Score
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calculated Credit Score</CardTitle>
                <CardDescription>
                  Based on provided financial information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {calculatedScore ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getScoreColor(calculatedScore)}`}>
                        {calculatedScore}
                      </div>
                      <Badge className={getScoreBadge(calculatedScore).className}>
                        {getScoreBadge(calculatedScore).label}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Credit Range</span>
                        <span className="text-sm font-medium">300 - 850</span>
                      </div>
                      <Progress value={(calculatedScore / 850) * 100} />
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Recommendations</h3>
                      {calculatedScore >= 750 ? (
                        <p className="text-sm text-blue-700">Excellent credit profile. Approved for premium rates.</p>
                      ) : calculatedScore >= 650 ? (
                        <p className="text-sm text-blue-700">Good credit profile. Consider standard rates with monitoring.</p>
                      ) : calculatedScore >= 500 ? (
                        <p className="text-sm text-blue-700">Fair credit. Requires additional documentation and higher rates.</p>
                      ) : (
                        <p className="text-sm text-blue-700">Poor credit. High risk - consider rejection or secured loan.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Enter borrower details to calculate credit score</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Credit Factor Analysis</CardTitle>
                <CardDescription>
                  Weighted impact of different credit factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Score"
                      dataKey="A"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Factor Breakdown</CardTitle>
                <CardDescription>
                  Individual factor scores and weights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {creditFactors.map((factor) => (
                  <div key={factor.factor} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{factor.factor}</span>
                      <span className="text-sm">{factor.score}/100 ({factor.weight}%)</span>
                    </div>
                    <Progress value={factor.score} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Credit Score Distribution</CardTitle>
              <CardDescription>
                Distribution of credit scores across active portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="models">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-600" />
                  Individual Credit Model
                </CardTitle>
                <CardDescription>
                  Personal credit assessment model
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Payment History</span>
                  <Badge className="bg-blue-100 text-blue-800">35%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Amounts Owed</span>
                  <Badge className="bg-blue-100 text-blue-800">30%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Length of Credit History</span>
                  <Badge className="bg-blue-100 text-blue-800">15%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">New Credit</span>
                  <Badge className="bg-blue-100 text-blue-800">10%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Types of Credit</span>
                  <Badge className="bg-blue-100 text-blue-800">10%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-purple-600" />
                  Business Credit Model
                </CardTitle>
                <CardDescription>
                  Commercial credit assessment model
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Cash Flow</span>
                  <Badge className="bg-purple-100 text-purple-800">25%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Business Stability</span>
                  <Badge className="bg-purple-100 text-purple-800">20%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Industry Risk</span>
                  <Badge className="bg-purple-100 text-purple-800">15%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Financial Ratios</span>
                  <Badge className="bg-purple-100 text-purple-800">15%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Collateral</span>
                  <Badge className="bg-purple-100 text-purple-800">15%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Management Quality</span>
                  <Badge className="bg-purple-100 text-purple-800">10%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditScoring;
