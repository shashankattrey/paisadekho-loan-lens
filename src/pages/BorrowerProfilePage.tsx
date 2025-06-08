
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, User, CreditCard, FileText, Phone, Mail, MapPin } from "lucide-react";

const BorrowerProfilePage = () => {
  const { borrowerId } = useParams();
  const navigate = useNavigate();

  // Mock borrower data
  const borrowerData = {
    id: borrowerId,
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
    loans: [
      {
        id: 'LN001',
        amount: 25000,
        status: 'active',
        disbursalDate: '2024-01-20',
        outstanding: 6660,
        dpd: 0,
        repaymentModel: 'daily'
      },
      {
        id: 'LN002',
        amount: 15000,
        status: 'closed',
        disbursalDate: '2023-08-15',
        outstanding: 0,
        dpd: 0,
        repaymentModel: 'monthly'
      },
      {
        id: 'LN003',
        amount: 35000,
        status: 'overdue',
        disbursalDate: '2023-12-10',
        outstanding: 28500,
        dpd: 15,
        repaymentModel: 'tenth_day'
      }
    ],
    creditScores: {
      cibil: 742,
      experian: 738,
      equifax: 745,
      highmark: 740
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
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
            <h1 className="text-3xl font-bold text-gray-900">Borrower Profile</h1>
            <p className="text-gray-600">Complete borrower information and loan history</p>
          </div>
        </div>

        {/* Borrower Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Borrower Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <img 
                  src={borrowerData.photo} 
                  alt={borrowerData.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
                />
                <h3 className="text-xl font-semibold">{borrowerData.name}</h3>
                <p className="text-gray-600">{borrowerData.businessName}</p>
                <Badge variant="outline" className="mt-2">ID: {borrowerData.id}</Badge>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{borrowerData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">{borrowerData.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-1" />
                    <div className="text-sm">
                      <p>{borrowerData.address}</p>
                      <p>{borrowerData.city}, {borrowerData.state}</p>
                      <p>PIN: {borrowerData.pincode}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Identity</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">PAN Number</p>
                    <p className="text-sm font-semibold">{borrowerData.pan}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Aadhaar Number</p>
                    <p className="text-sm font-semibold">{borrowerData.aadhaar}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Business Type</p>
                    <p className="text-sm font-semibold">{borrowerData.businessType}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Credit Scores</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">CIBIL:</span>
                    <span className="text-sm font-semibold">{borrowerData.creditScores.cibil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Experian:</span>
                    <span className="text-sm font-semibold">{borrowerData.creditScores.experian}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Equifax:</span>
                    <span className="text-sm font-semibold">{borrowerData.creditScores.equifax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">CRIF High Mark:</span>
                    <span className="text-sm font-semibold">{borrowerData.creditScores.highmark}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Accounts ({borrowerData.loans.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Disbursal Date</TableHead>
                  <TableHead>Outstanding</TableHead>
                  <TableHead>DPD</TableHead>
                  <TableHead>Repayment Model</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrowerData.loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.id}</TableCell>
                    <TableCell>₹{loan.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(loan.status)}>
                        {loan.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{loan.disbursalDate}</TableCell>
                    <TableCell className="font-medium">
                      ₹{loan.outstanding.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className={loan.dpd > 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {loan.dpd}
                      </span>
                    </TableCell>
                    <TableCell>{getRepaymentModelText(loan.repaymentModel)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/loan/${loan.id}`)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BorrowerProfilePage;
