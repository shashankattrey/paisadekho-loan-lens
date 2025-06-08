
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, User, FileText, CreditCard, Calendar, Phone, Mail, MapPin, Download } from "lucide-react";

const LoanDetailsPage = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();

  // Mock detailed loan data
  const loanData = {
    id: loanId,
    borrower: {
      name: 'Rajesh Kumar',
      photo: '/placeholder.svg',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      address: 'Shop No. 45, Market Road, Sector 18',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      aadhaar: '1234-5678-9012',
      pan: 'ABCDE1234F',
      businessName: 'Kumar Electronics',
      businessType: 'Electronics Retail',
      businessVintage: '5 years',
      monthlyIncome: 85000,
      cibilScore: 742,
      experian: 738,
      equifax: 745,
      highmark: 740
    },
    loan: {
      amount: 25000,
      tenure: 18,
      interestRate: 12.5,
      processingFee: 1250,
      repaymentModel: 'daily',
      emi: 1445,
      applicationDate: '2024-01-15',
      approvalDate: '2024-01-18',
      disbursalDate: '2024-01-20',
      status: 'active',
      purpose: 'Working Capital',
      riskScore: 7.2,
      dpd: 0,
      totalPaid: 18340,
      outstanding: 6660,
      nextDueDate: '2024-02-15',
      nextDueAmount: 1445
    },
    repayments: [
      { date: '2024-01-20', amount: 1445, status: 'paid', mode: 'UPI', dpd: 0 },
      { date: '2024-01-21', amount: 1445, status: 'paid', mode: 'Cash', dpd: 0 },
      { date: '2024-01-22', amount: 1445, status: 'paid', mode: 'UPI', dpd: 0 },
      { date: '2024-01-23', amount: 1445, status: 'paid', mode: 'Bank Transfer', dpd: 0 },
      { date: '2024-01-24', amount: 1445, status: 'paid', mode: 'UPI', dpd: 0 },
      { date: '2024-01-25', amount: 1445, status: 'paid', mode: 'Cash', dpd: 0 },
      { date: '2024-01-26', amount: 1445, status: 'paid', mode: 'UPI', dpd: 0 },
      { date: '2024-01-27', amount: 1445, status: 'paid', mode: 'Bank Transfer', dpd: 0 },
      { date: '2024-01-28', amount: 1445, status: 'paid', mode: 'UPI', dpd: 0 },
      { date: '2024-01-29', amount: 1445, status: 'paid', mode: 'Cash', dpd: 0 },
      { date: '2024-01-30', amount: 1445, status: 'paid', mode: 'UPI', dpd: 0 },
      { date: '2024-01-31', amount: 1445, status: 'paid', mode: 'Bank Transfer', dpd: 0 },
      { date: '2024-02-01', amount: 1445, status: 'paid', mode: 'UPI', dpd: 0 },
      { date: '2024-02-15', amount: 1445, status: 'due', mode: '-', dpd: 0 }
    ]
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      paid: 'bg-blue-100 text-blue-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || variants.active;
  };

  const getRepaymentModelText = (model: string) => {
    const models = {
      daily: 'Daily Collection',
      tenth_day: '10th Day Collection',
      monthly: 'Monthly EMI'
    };
    return models[model as keyof typeof models] || model;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="outline" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Loan Details - {loanId}</h1>
            <p className="text-gray-600">Complete loan account information and payment history</p>
          </div>
        </div>

        {/* Loan Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Loan Amount</p>
                  <p className="text-2xl font-bold text-gray-900">₹{loanData.loan.amount.toLocaleString()}</p>
                </div>
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Outstanding</p>
                  <p className="text-2xl font-bold text-red-600">₹{loanData.loan.outstanding.toLocaleString()}</p>
                </div>
                <FileText className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">DPD (Days Past Due)</p>
                  <p className="text-2xl font-bold text-green-600">{loanData.loan.dpd}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CIBIL Score</p>
                  <p className="text-2xl font-bold text-blue-600">{loanData.borrower.cibilScore}</p>
                </div>
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="borrower">Borrower Profile</TabsTrigger>
            <TabsTrigger value="repayments">Repayment History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Loan ID</p>
                      <p className="font-semibold">{loanData.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <Badge className={getStatusBadge(loanData.loan.status)}>
                        {loanData.loan.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Principal Amount</p>
                      <p className="font-semibold">₹{loanData.loan.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Interest Rate</p>
                      <p className="font-semibold">{loanData.loan.interestRate}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tenure</p>
                      <p className="font-semibold">{loanData.loan.tenure} months</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Repayment Model</p>
                      <p className="font-semibold">{getRepaymentModelText(loanData.loan.repaymentModel)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">EMI Amount</p>
                      <p className="font-semibold">₹{loanData.loan.emi.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Risk Score</p>
                      <p className="font-semibold">{loanData.loan.riskScore}/10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Repayment Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Paid: ₹{loanData.loan.totalPaid.toLocaleString()}</span>
                      <span>Outstanding: ₹{loanData.loan.outstanding.toLocaleString()}</span>
                    </div>
                    <Progress value={(loanData.loan.totalPaid / loanData.loan.amount) * 100} className="w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Next Due Date</p>
                      <p className="font-semibold">{loanData.loan.nextDueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Next Due Amount</p>
                      <p className="font-semibold">₹{loanData.loan.nextDueAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Application Date</p>
                      <p className="font-semibold">{loanData.loan.applicationDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Disbursal Date</p>
                      <p className="font-semibold">{loanData.loan.disbursalDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="borrower">
            <Card>
              <CardHeader>
                <CardTitle>Borrower Profile</CardTitle>
                <CardDescription>Complete borrower information and credit scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <div className="text-center">
                      <img 
                        src={loanData.borrower.photo} 
                        alt={loanData.borrower.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
                      />
                      <h3 className="text-xl font-semibold">{loanData.borrower.name}</h3>
                      <p className="text-gray-600">{loanData.borrower.businessName}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Personal Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{loanData.borrower.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{loanData.borrower.phone}</span>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-1" />
                            <div>
                              <p>{loanData.borrower.address}</p>
                              <p>{loanData.borrower.city}, {loanData.borrower.state}</p>
                              <p>PIN: {loanData.borrower.pincode}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">PAN Number</p>
                            <p className="font-semibold">{loanData.borrower.pan}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Aadhaar Number</p>
                            <p className="font-semibold">{loanData.borrower.aadhaar}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Business Information</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Business Type</p>
                            <p className="font-semibold">{loanData.borrower.businessType}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Business Vintage</p>
                            <p className="font-semibold">{loanData.borrower.businessVintage}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                            <p className="font-semibold">₹{loanData.borrower.monthlyIncome.toLocaleString()}</p>
                          </div>
                        </div>
                        <h4 className="font-semibold text-lg">Credit Scores</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>CIBIL:</span>
                            <span className="font-semibold">{loanData.borrower.cibilScore}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Experian:</span>
                            <span className="font-semibold">{loanData.borrower.experian}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Equifax:</span>
                            <span className="font-semibold">{loanData.borrower.equifax}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>CRIF High Mark:</span>
                            <span className="font-semibold">{loanData.borrower.highmark}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="repayments">
            <Card>
              <CardHeader>
                <CardTitle>Repayment History</CardTitle>
                <CardDescription>Complete payment history with DPD tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Mode</TableHead>
                      <TableHead>DPD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanData.repayments.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(payment.status)}>
                            {payment.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.mode}</TableCell>
                        <TableCell>
                          <span className={payment.dpd > 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                            {payment.dpd}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>All uploaded documents and verification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['PAN Card', 'Aadhaar Card', 'Bank Statement', 'GST Certificate', 'Business Proof', 'Photo'].map((doc, index) => (
                    <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-medium">{doc}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions">
            <Card>
              <CardHeader>
                <CardTitle>Loan Actions</CardTitle>
                <CardDescription>Available actions for this loan account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Mark Payment Received
                  </Button>
                  <Button variant="outline">
                    Send Payment Reminder
                  </Button>
                  <Button variant="outline">
                    Update Contact Info
                  </Button>
                  <Button variant="outline">
                    Generate Statement
                  </Button>
                  <Button variant="outline">
                    Schedule Follow-up
                  </Button>
                  <Button variant="destructive">
                    Mark as NPA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoanDetailsPage;
