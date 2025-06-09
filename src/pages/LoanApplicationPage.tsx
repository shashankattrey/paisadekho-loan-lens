
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Mail,
  Building,
  Calendar,
  CreditCard,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Eye,
} from "lucide-react";

const LoanApplicationPage: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();

  // Mock application data
  const application = {
    id: 'APP002',
    applicantName: 'Priya Sharma',
    businessName: 'Sharma Textiles',
    phone: '+91 87654 32109',
    email: 'priya.sharma@email.com',
    location: 'Delhi, DL',
    pincode: '110001',
    amount: 35000,
    tenure: 24,
    purpose: 'Inventory Purchase',
    status: 'in_review',
    submittedDate: '2024-01-12T14:20:00Z',
    lastUpdated: '2024-01-16T09:15:00Z',
    riskScore: 8.5,
    cibilScore: 768,
    monthlyIncome: 62000,
    businessVintage: 48,
    kycStatus: 'verified',
    vkycStatus: 'verified',
    assignedTo: 'CRO001',
    priority: 'high',
    documents: ['pan', 'aadhaar', 'bank_statement', 'gst_certificate'],
    missingDocs: [],
    personalDetails: {
      dateOfBirth: '1985-06-15',
      fatherName: 'Ram Sharma',
      address: '123 Main Street, Delhi',
      panNumber: 'ABCDE1234F',
      aadhaarNumber: '1234 5678 9012',
    },
    businessDetails: {
      type: 'Retail',
      address: '456 Business District, Delhi',
      gstNumber: 'GST123456789',
      vintage: '4 years',
      employees: '5-10',
    },
    bankDetails: {
      accountNumber: '1234567890',
      ifscCode: 'HDFC0001234',
      bankName: 'HDFC Bank',
      branch: 'Delhi Main Branch',
    },
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      submitted: 'bg-blue-100 text-blue-800 border-blue-300',
      in_review: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
    };
    return variants[status as keyof typeof variants] || variants.submitted;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Application {application.id}
              </h1>
              <p className="text-gray-600">
                {application.applicantName} - {application.businessName}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusBadge(application.status)}>
              {application.status.replace('_', ' ').toUpperCase()}
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700">
              HIGH PRIORITY
            </Badge>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <CreditCard className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <p className="text-2xl font-bold text-blue-600">₹{application.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Loan Amount</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <p className="text-2xl font-bold text-green-600">{application.tenure}m</p>
                <p className="text-sm text-gray-600">Tenure</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <AlertTriangle className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
                <p className="text-2xl font-bold text-yellow-600">{application.riskScore}/10</p>
                <p className="text-sm text-gray-600">Risk Score</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <p className="text-2xl font-bold text-purple-600">{application.cibilScore}</p>
                <p className="text-sm text-gray-600">CIBIL Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="business">Business Details</TabsTrigger>
            <TabsTrigger value="financial">Financial Info</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                    <p className="font-semibold">{application.applicantName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Date of Birth</Label>
                    <p className="font-semibold">{application.personalDetails.dateOfBirth}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Father's Name</Label>
                    <p className="font-semibold">{application.personalDetails.fatherName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Phone</Label>
                    <p className="font-semibold flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {application.phone}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p className="font-semibold flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {application.email}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Address</Label>
                    <p className="font-semibold flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {application.personalDetails.address}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">PAN Number</Label>
                    <p className="font-semibold">{application.personalDetails.panNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Aadhaar Number</Label>
                    <p className="font-semibold">{application.personalDetails.aadhaarNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Business Name</Label>
                    <p className="font-semibold">{application.businessName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Business Type</Label>
                    <p className="font-semibold">{application.businessDetails.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Business Address</Label>
                    <p className="font-semibold">{application.businessDetails.address}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">GST Number</Label>
                    <p className="font-semibold">{application.businessDetails.gstNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Business Vintage</Label>
                    <p className="font-semibold">{application.businessDetails.vintage}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Employees</Label>
                    <p className="font-semibold">{application.businessDetails.employees}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Monthly Income</Label>
                    <p className="font-semibold">₹{application.monthlyIncome.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Loan Purpose</Label>
                    <p className="font-semibold">{application.purpose}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Bank Account</Label>
                    <p className="font-semibold">{application.bankDetails.accountNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">IFSC Code</Label>
                    <p className="font-semibold">{application.bankDetails.ifscCode}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Bank Name</Label>
                    <p className="font-semibold">{application.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Branch</Label>
                    <p className="font-semibold">{application.bankDetails.branch}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Documents & Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">KYC Status</Label>
                    <Badge variant={application.kycStatus === 'verified' ? 'default' : 'secondary'}>
                      {application.kycStatus}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">VKYC Status</Label>
                    <Badge variant={application.vkycStatus === 'verified' ? 'default' : 'secondary'}>
                      {application.vkycStatus}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Submitted Documents</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {application.documents.map((doc) => (
                      <div key={doc} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium capitalize">{doc.replace('_', ' ')}</span>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions">
            <Card>
              <CardHeader>
                <CardTitle>Application Actions</CardTitle>
                <CardDescription>
                  Take action on this loan application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="remarks">Remarks</Label>
                    <Textarea
                      id="remarks"
                      placeholder="Enter your remarks or comments..."
                      rows={4}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Application
                    </Button>
                    <Button variant="destructive">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Application
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Request Documents
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoanApplicationPage;
