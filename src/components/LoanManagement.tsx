
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Eye,
  User,
  MapPin,
  Phone,
  Mail,
  Download,
} from "lucide-react";

interface LoanManagementProps {
  userRole: string;
}

const mockLoans = [
  {
    id: 'LN001',
    applicantName: 'Rajesh Kumar',
    businessName: 'Kumar Electronics',
    amount: 25000,
    tenure: 18,
    interestRate: 12.5,
    status: 'active',
    riskScore: 7.2,
    applicationDate: '2024-01-15',
    location: 'Noida, UP',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    vkycStatus: 'verified',
    repaymentModel: 'daily',
    dpd: 0,
    outstanding: 6660,
    cibilScore: 742,
    pincode: '201301'
  },
  {
    id: 'LN002',
    applicantName: 'Priya Sharma',
    businessName: 'Sharma Textiles',
    amount: 35000,
    tenure: 24,
    interestRate: 11.8,
    status: 'overdue',
    riskScore: 8.5,
    applicationDate: '2024-01-12',
    location: 'Delhi, DL',
    phone: '+91 87654 32109',
    email: 'priya.sharma@email.com',
    vkycStatus: 'verified',
    repaymentModel: 'tenth_day',
    dpd: 5,
    outstanding: 28500,
    cibilScore: 768,
    pincode: '110001'
  },
  {
    id: 'LN003',
    applicantName: 'Mohammed Ali',
    businessName: 'Ali Trading Co.',
    amount: 15000,
    tenure: 12,
    interestRate: 13.2,
    status: 'pending',
    riskScore: 6.8,
    applicationDate: '2024-01-18',
    location: 'Bangalore, KA',
    phone: '+91 76543 21098',
    email: 'mohammed.ali@email.com',
    vkycStatus: 'pending',
    repaymentModel: 'monthly',
    dpd: 0,
    outstanding: 0,
    cibilScore: 695,
    pincode: '560001'
  },
  {
    id: 'LN004',
    applicantName: 'Sunita Devi',
    businessName: 'Sunita Saree Center',
    amount: 40000,
    tenure: 36,
    interestRate: 12.0,
    status: 'active',
    riskScore: 8.2,
    applicationDate: '2024-01-10',
    location: 'Mumbai, MH',
    phone: '+91 98765 12345',
    email: 'sunita.devi@email.com',
    vkycStatus: 'verified',
    repaymentModel: 'daily',
    dpd: 0,
    outstanding: 35200,
    cibilScore: 756,
    pincode: '400001'
  },
  {
    id: 'LN005',
    applicantName: 'Ravi Patel',
    businessName: 'Patel Hardware Store',
    amount: 20000,
    tenure: 18,
    interestRate: 13.5,
    status: 'closed',
    riskScore: 7.8,
    applicationDate: '2023-12-05',
    location: 'Ahmedabad, GJ',
    phone: '+91 99876 54321',
    email: 'ravi.patel@email.com',
    vkycStatus: 'verified',
    repaymentModel: 'monthly',
    dpd: 0,
    outstanding: 0,
    cibilScore: 723,
    pincode: '380001'
  },
  {
    id: 'LN006',
    applicantName: 'Lakshmi Narayan',
    businessName: 'Narayan Grocery Store',
    amount: 12000,
    tenure: 15,
    interestRate: 14.0,
    status: 'overdue',
    riskScore: 6.2,
    applicationDate: '2024-01-08',
    location: 'Chennai, TN',
    phone: '+91 98765 67890',
    email: 'lakshmi.n@email.com',
    vkycStatus: 'verified',
    repaymentModel: 'tenth_day',
    dpd: 12,
    outstanding: 9800,
    cibilScore: 678,
    pincode: '600001'
  }
];

const LoanManagement: React.FC<LoanManagementProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const [loans] = useState(mockLoans);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [repaymentFilter, setRepaymentFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      active: 'bg-green-100 text-green-800 border-green-300',
      overdue: 'bg-red-100 text-red-800 border-red-300',
      closed: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getRiskBadge = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 6.5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getRepaymentModelText = (model: string) => {
    const models = {
      daily: 'Daily',
      tenth_day: '10th Day',
      monthly: 'Monthly'
    };
    return models[model as keyof typeof models] || model;
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.phone.includes(searchTerm) ||
                         loan.pincode.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    const matchesRepayment = repaymentFilter === 'all' || loan.repaymentModel === repaymentFilter;
    return matchesSearch && matchesStatus && matchesRepayment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Loan Management</h1>
          <p className="text-gray-600 mt-1">
            Manage loan applications and accounts with detailed borrower information
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{loans.filter(l => l.status === 'active').length}</p>
              <p className="text-sm text-gray-600">Active Loans</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{loans.filter(l => l.status === 'overdue').length}</p>
              <p className="text-sm text-gray-600">Overdue Loans</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{loans.filter(l => l.status === 'pending').length}</p>
              <p className="text-sm text-gray-600">Pending Approval</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ₹{loans.reduce((sum, loan) => sum + loan.outstanding, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Outstanding</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, business, loan ID, phone, or pincode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={repaymentFilter} onValueChange={setRepaymentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Repayment Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                <SelectItem value="daily">Daily Collection</SelectItem>
                <SelectItem value="tenth_day">10th Day Collection</SelectItem>
                <SelectItem value="monthly">Monthly EMI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Accounts ({filteredLoans.length})</CardTitle>
          <CardDescription>
            Complete list of loan accounts with borrower details and repayment information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan ID</TableHead>
                <TableHead>Borrower Details</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Amount & Outstanding</TableHead>
                <TableHead>Repayment Model</TableHead>
                <TableHead>Status & DPD</TableHead>
                <TableHead>CIBIL Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLoans.map((loan) => (
                <TableRow key={loan.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{loan.id}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{loan.applicantName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {loan.phone}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {loan.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {loan.location} - {loan.pincode}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{loan.businessName}</div>
                      <div className="text-sm text-gray-500">
                        Applied: {loan.applicationDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">₹{loan.amount.toLocaleString()}</div>
                      {loan.outstanding > 0 && (
                        <div className="text-sm text-red-600">
                          Outstanding: ₹{loan.outstanding.toLocaleString()}
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        {loan.interestRate}% • {loan.tenure}m
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {getRepaymentModelText(loan.repaymentModel)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getStatusBadge(loan.status)}>
                        {loan.status.toUpperCase()}
                      </Badge>
                      {loan.dpd > 0 && (
                        <div className="text-sm text-red-600 font-semibold">
                          DPD: {loan.dpd}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-semibold">{loan.cibilScore}</div>
                      <Badge className={getRiskBadge(loan.riskScore)} variant="outline">
                        Risk: {loan.riskScore}/10
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/loan/${loan.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Loan
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/borrower/${loan.id.replace('LN', 'BR')}`)}
                      >
                        <User className="w-4 h-4 mr-1" />
                        View Profile
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanManagement;
