
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
} from "lucide-react";

interface LoanManagementProps {
  userRole: string;
}

const mockLoans = [
  {
    id: 'LN001',
    applicantName: 'Rajesh Kumar',
    businessName: 'Kumar Electronics',
    amount: 500000,
    tenure: 24,
    interestRate: 12.5,
    status: 'pending',
    riskScore: 7.2,
    applicationDate: '2024-01-15',
    location: 'Mumbai, MH',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    vkycStatus: 'verified',
    documents: ['PAN', 'Aadhaar', 'Bank Statement', 'GST Certificate'],
  },
  {
    id: 'LN002',
    applicantName: 'Priya Sharma',
    businessName: 'Sharma Textiles',
    amount: 750000,
    tenure: 36,
    interestRate: 11.8,
    status: 'approved',
    riskScore: 8.5,
    applicationDate: '2024-01-12',
    location: 'Delhi, DL',
    phone: '+91 87654 32109',
    email: 'priya.sharma@email.com',
    vkycStatus: 'pending',
    documents: ['PAN', 'Aadhaar', 'Bank Statement', 'ITR'],
  },
  {
    id: 'LN003',
    applicantName: 'Mohammed Ali',
    businessName: 'Ali Trading Co.',
    amount: 300000,
    tenure: 18,
    interestRate: 13.2,
    status: 'under_review',
    riskScore: 6.8,
    applicationDate: '2024-01-18',
    location: 'Bangalore, KA',
    phone: '+91 76543 21098',
    email: 'mohammed.ali@email.com',
    vkycStatus: 'verified',
    documents: ['PAN', 'Aadhaar', 'Bank Statement'],
  },
];

const LoanManagement: React.FC<LoanManagementProps> = ({ userRole }) => {
  const [loans, setLoans] = useState(mockLoans);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [actionComment, setActionComment] = useState('');

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      under_review: 'bg-blue-100 text-blue-800 border-blue-300',
      disbursed: 'bg-purple-100 text-purple-800 border-purple-300',
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getRiskBadge = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 6.5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const handleLoanAction = (loanId: string, action: 'approve' | 'reject') => {
    setLoans(loans.map(loan => 
      loan.id === loanId 
        ? { ...loan, status: action === 'approve' ? 'approved' : 'rejected' }
        : loan
    ));
    setActionComment('');
    setSelectedLoan(null);
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const canTakeAction = userRole === 'admin' || userRole === 'credit_officer' || userRole === 'risk_manager';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Loan Management</h1>
          <p className="text-gray-600 mt-1">
            Manage loan applications, review, and approve SME lending requests
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
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
                  placeholder="Search by name, business, or loan ID..."
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
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="disbursed">Disbursed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loan Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Applications ({filteredLoans.length})</CardTitle>
          <CardDescription>
            Complete list of SME loan applications with current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>VKYC</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLoans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{loan.applicantName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {loan.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{loan.businessName}</TableCell>
                  <TableCell className="font-medium">
                    ₹{(loan.amount / 100000).toFixed(1)}L
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRiskBadge(loan.riskScore)}>
                        {loan.riskScore}/10
                      </Badge>
                      <div className="flex">
                        {[...Array(Math.floor(loan.riskScore / 2))].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(loan.status)}>
                      {loan.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={loan.vkycStatus === 'verified' ? 'default' : 'secondary'}
                      className={loan.vkycStatus === 'verified' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {loan.vkycStatus === 'verified' ? 'Verified' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>{loan.applicationDate}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedLoan(loan)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Loan Application Details - {selectedLoan?.id}</DialogTitle>
                          <DialogDescription>
                            Complete information and documents for loan application
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedLoan && (
                          <Tabs defaultValue="details" className="mt-4">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="details">Details</TabsTrigger>
                              <TabsTrigger value="documents">Documents</TabsTrigger>
                              <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
                              <TabsTrigger value="actions">Actions</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="details" className="space-y-4">
                              <div className="grid grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg flex items-center">
                                      <FileText className="w-5 h-5 mr-2" />
                                      Loan Details
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Amount:</span>
                                      <span className="font-semibold">₹{(selectedLoan.amount / 100000).toFixed(1)}L</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Tenure:</span>
                                      <span className="font-semibold">{selectedLoan.tenure} months</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Interest Rate:</span>
                                      <span className="font-semibold">{selectedLoan.interestRate}% p.a.</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">EMI:</span>
                                      <span className="font-semibold">₹{Math.round(selectedLoan.amount * selectedLoan.interestRate / 1200).toLocaleString()}</span>
                                    </div>
                                  </CardContent>
                                </Card>
                                
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Applicant Information</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Name:</span>
                                      <span className="font-semibold">{selectedLoan.applicantName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Business:</span>
                                      <span className="font-semibold">{selectedLoan.businessName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Location:</span>
                                      <span className="font-semibold">{selectedLoan.location}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-gray-600">Phone:</span>
                                      <span className="font-semibold flex items-center">
                                        <Phone className="w-4 h-4 mr-1" />
                                        {selectedLoan.phone}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-gray-600">Email:</span>
                                      <span className="font-semibold flex items-center">
                                        <Mail className="w-4 h-4 mr-1" />
                                        {selectedLoan.email}
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="documents">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Uploaded Documents</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 gap-4">
                                    {selectedLoan.documents.map((doc: string, index: number) => (
                                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center">
                                          <FileText className="w-5 h-5 text-blue-600 mr-2" />
                                          <span className="font-medium">{doc}</span>
                                        </div>
                                        <Button variant="outline" size="sm">
                                          <Eye className="w-4 h-4 mr-1" />
                                          View
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            
                            <TabsContent value="risk">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Risk Assessment</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">Overall Risk Score:</span>
                                      <Badge className={getRiskBadge(selectedLoan.riskScore)}>
                                        {selectedLoan.riskScore}/10
                                      </Badge>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span>Credit History:</span>
                                        <span className="text-green-600 font-medium">Good</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Business Stability:</span>
                                        <span className="text-yellow-600 font-medium">Moderate</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Financial Health:</span>
                                        <span className="text-green-600 font-medium">Strong</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Industry Risk:</span>
                                        <span className="text-green-600 font-medium">Low</span>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            
                            <TabsContent value="actions">
                              {canTakeAction && selectedLoan.status === 'pending' ? (
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Loan Decision</CardTitle>
                                    <CardDescription>
                                      Review the application and take appropriate action
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <Textarea
                                      placeholder="Add comments for your decision..."
                                      value={actionComment}
                                      onChange={(e) => setActionComment(e.target.value)}
                                      rows={3}
                                    />
                                    <div className="flex space-x-4">
                                      <Button 
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => handleLoanAction(selectedLoan.id, 'approve')}
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Approve Loan
                                      </Button>
                                      <Button 
                                        variant="destructive"
                                        onClick={() => handleLoanAction(selectedLoan.id, 'reject')}
                                      >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Reject Loan
                                      </Button>
                                      <Button variant="outline">
                                        <Clock className="w-4 h-4 mr-2" />
                                        Request More Info
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ) : (
                                <Card>
                                  <CardContent className="py-8 text-center">
                                    <p className="text-gray-500">
                                      {!canTakeAction 
                                        ? "You don't have permission to take actions on this loan."
                                        : "No actions available for this loan status."
                                      }
                                    </p>
                                  </CardContent>
                                </Card>
                              )}
                            </TabsContent>
                          </Tabs>
                        )}
                      </DialogContent>
                    </Dialog>
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
