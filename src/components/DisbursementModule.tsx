
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Wallet,
  ArrowUpRight,
  AlertTriangle,
  CreditCard,
} from "lucide-react";

interface DisbursementModuleProps {
  userRole: string;
}

const mockDisbursements = [
  {
    id: 'DISB001',
    loanId: 'LN001',
    applicantName: 'Rajesh Kumar',
    amount: 25000,
    approvedAmount: 25000,
    disbursedAmount: 25000,
    bankName: 'HDFC Bank',
    accountNumber: '****1234',
    ifscCode: 'HDFC0001234',
    utrNumber: 'HD240115001234',
    disbursementDate: '2024-01-15T14:30:00Z',
    status: 'success',
    processingFee: 750,
    gst: 135,
    netDisbursement: 24115,
    disbursementMethod: 'NEFT',
    retryCount: 0,
  },
  {
    id: 'DISB002',
    loanId: 'LN002',
    applicantName: 'Priya Sharma',
    amount: 35000,
    approvedAmount: 35000,
    disbursedAmount: 0,
    bankName: 'SBI',
    accountNumber: '****5678',
    ifscCode: 'SBIN0005678',
    utrNumber: null,
    disbursementDate: null,
    status: 'failed',
    processingFee: 1050,
    gst: 189,
    netDisbursement: 33761,
    disbursementMethod: 'IMPS',
    retryCount: 2,
    failureReason: 'Invalid account number',
  },
  {
    id: 'DISB003',
    loanId: 'LN003',
    applicantName: 'Mohammed Ali',
    amount: 15000,
    approvedAmount: 12000,
    disbursedAmount: 0,
    bankName: 'Axis Bank',
    accountNumber: '****9012',
    ifscCode: 'UTIB0009012',
    utrNumber: null,
    disbursementDate: null,
    status: 'pending',
    processingFee: 360,
    gst: 65,
    netDisbursement: 11575,
    disbursementMethod: 'NEFT',
    retryCount: 0,
  },
  {
    id: 'DISB004',
    loanId: 'LN004',
    applicantName: 'Sunita Devi',
    amount: 40000,
    approvedAmount: 40000,
    disbursedAmount: 40000,
    bankName: 'ICICI Bank',
    accountNumber: '****3456',
    ifscCode: 'ICIC0003456',
    utrNumber: 'IC240118002345',
    disbursementDate: '2024-01-18T16:45:00Z',
    status: 'success',
    processingFee: 1200,
    gst: 216,
    netDisbursement: 38584,
    disbursementMethod: 'RTGS',
    retryCount: 0,
  },
];

const DisbursementModule: React.FC<DisbursementModuleProps> = ({ userRole }) => {
  const [disbursements, setDisbursements] = useState(mockDisbursements);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [escrowBalance] = useState(2500000); // Mock escrow balance

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      success: 'bg-green-100 text-green-800 border-green-300',
      failed: 'bg-red-100 text-red-800 border-red-300',
      processing: 'bg-blue-100 text-blue-800 border-blue-300',
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredDisbursements = disbursements.filter(disb => {
    const matchesSearch = disb.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disb.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disb.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disb.utrNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || disb.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || disb.disbursementMethod === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleRetryDisbursement = (disbId: string) => {
    const updatedDisbursements = disbursements.map(disb => {
      if (disb.id === disbId) {
        return {
          ...disb,
          status: 'processing',
          retryCount: disb.retryCount + 1,
        };
      }
      return disb;
    });
    setDisbursements(updatedDisbursements);

    // Simulate processing delay
    setTimeout(() => {
      const finalUpdate = disbursements.map(disb => {
        if (disb.id === disbId) {
          const isSuccess = Math.random() > 0.3; // 70% success rate
          return {
            ...disb,
            status: isSuccess ? 'success' : 'failed',
            disbursedAmount: isSuccess ? disb.approvedAmount : 0,
            utrNumber: isSuccess ? `UTR${Date.now()}` : null,
            disbursementDate: isSuccess ? new Date().toISOString() : null,
            failureReason: !isSuccess ? 'Bank server timeout' : undefined,
          };
        }
        return disb;
      });
      setDisbursements(finalUpdate);
    }, 3000);
  };

  const totalDisbursed = disbursements
    .filter(d => d.status === 'success')
    .reduce((sum, d) => sum + d.disbursedAmount, 0);

  const totalPending = disbursements
    .filter(d => d.status === 'pending' || d.status === 'processing')
    .reduce((sum, d) => sum + d.approvedAmount, 0);

  const totalFailed = disbursements.filter(d => d.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Disbursement Management</h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage loan disbursements, UTR tracking, and escrow balance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Escrow Wallet Balance */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">NBFC Escrow Balance</h3>
                <p className="text-3xl font-bold text-blue-600">₹{escrowBalance.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Available for disbursement</p>
              <p className="text-lg font-semibold text-green-600">
                ₹{(escrowBalance - totalPending).toLocaleString()} remaining
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">₹{totalDisbursed.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Successfully Disbursed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">₹{totalPending.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Pending Disbursement</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{totalFailed}</p>
              <p className="text-sm text-gray-600">Failed Disbursements</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {disbursements.filter(d => d.status === 'success').length}
              </p>
              <p className="text-sm text-gray-600">Total Transactions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter Disbursements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, loan ID, disbursement ID, or UTR number..."
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
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="NEFT">NEFT</SelectItem>
                <SelectItem value="IMPS">IMPS</SelectItem>
                <SelectItem value="RTGS">RTGS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Disbursements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Disbursement Records ({filteredDisbursements.length})</CardTitle>
          <CardDescription>
            Complete list of loan disbursements with tracking information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Disbursement ID</TableHead>
                <TableHead>Loan & Applicant</TableHead>
                <TableHead>Amount Details</TableHead>
                <TableHead>Bank Details</TableHead>
                <TableHead>Status & UTR</TableHead>
                <TableHead>Date & Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDisbursements.map((disb) => (
                <TableRow key={disb.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{disb.id}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{disb.applicantName}</div>
                      <div className="text-sm text-gray-500">
                        Loan: {disb.loanId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">₹{disb.approvedAmount.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">
                        Fees: ₹{disb.processingFee + disb.gst}
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        Net: ₹{disb.netDisbursement.toLocaleString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{disb.bankName}</div>
                      <div className="text-sm text-gray-500">
                        A/C: {disb.accountNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        IFSC: {disb.ifscCode}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(disb.status)}
                        <Badge className={getStatusBadge(disb.status)}>
                          {disb.status.toUpperCase()}
                        </Badge>
                      </div>
                      {disb.utrNumber && (
                        <div className="text-sm font-medium text-blue-600">
                          UTR: {disb.utrNumber}
                        </div>
                      )}
                      {disb.status === 'failed' && disb.failureReason && (
                        <div className="text-sm text-red-600">
                          {disb.failureReason}
                        </div>
                      )}
                      {disb.retryCount > 0 && (
                        <div className="text-xs text-orange-600">
                          Retries: {disb.retryCount}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {disb.disbursementDate && (
                        <div className="text-sm">
                          {new Date(disb.disbursementDate).toLocaleDateString()}
                        </div>
                      )}
                      <Badge variant="outline">
                        {disb.disbursementMethod}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {disb.status === 'failed' && (
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleRetryDisbursement(disb.id)}
                          disabled={disb.retryCount >= 3}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Retry
                        </Button>
                      )}
                      {disb.status === 'success' && (
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                      {disb.status === 'pending' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          Process
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Failed Disbursements Alert */}
      {totalFailed > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <h4 className="font-semibold text-red-800">
                  {totalFailed} Failed Disbursement{totalFailed > 1 ? 's' : ''} Require Attention
                </h4>
                <p className="text-sm text-red-600">
                  Review failed transactions and retry or contact support for resolution.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DisbursementModule;
