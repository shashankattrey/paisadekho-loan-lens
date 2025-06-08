
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  FileText,
  Search,
  Download,
  Upload,
  User,
  Phone,
  Mail,
} from "lucide-react";

interface KYCComplianceProps {
  userRole: string;
}

const mockKYCApplications = [
  {
    id: 'KYC001',
    applicant: 'Rajesh Kumar',
    business: 'Kumar Electronics',
    submissionDate: '2024-01-15',
    status: 'pending',
    documentsUploaded: 4,
    documentsRequired: 4,
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    riskFlags: [],
    officer: 'Amit Sharma',
  },
  {
    id: 'KYC002',
    applicant: 'Priya Sharma',
    business: 'Sharma Textiles',
    submissionDate: '2024-01-12',
    status: 'verified',
    documentsUploaded: 5,
    documentsRequired: 5,
    phone: '+91 87654 32109',
    email: 'priya.sharma@email.com',
    riskFlags: [],
    officer: 'Sneha Patel',
  },
  {
    id: 'KYC003',
    applicant: 'Mohammed Ali',
    business: 'Ali Trading Co.',
    submissionDate: '2024-01-18',
    status: 'flagged',
    documentsUploaded: 3,
    documentsRequired: 4,
    phone: '+91 76543 21098',
    email: 'mohammed.ali@email.com',
    riskFlags: ['Address Mismatch'],
    officer: 'Rahul Verma',
  },
];

const kycStatusData = [
  { name: 'Verified', value: 65, color: '#10b981' },
  { name: 'Pending', value: 25, color: '#f59e0b' },
  { name: 'Flagged', value: 7, color: '#ef4444' },
  { name: 'Rejected', value: 3, color: '#6b7280' },
];

const complianceAlertsData = [
  { category: 'AML Alerts', count: 5, severity: 'high' },
  { category: 'Document Expiry', count: 12, severity: 'medium' },
  { category: 'Address Verification', count: 8, severity: 'medium' },
  { category: 'Identity Mismatch', count: 3, severity: 'high' },
];

const KYCCompliance: React.FC<KYCComplianceProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      verified: 'bg-green-100 text-green-800 border-green-300',
      flagged: 'bg-red-100 text-red-800 border-red-300',
      rejected: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'flagged':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800 border-red-300',
      medium: 'bg-orange-100 text-orange-800 border-orange-300',
      low: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };
    return variants[severity as keyof typeof variants] || variants.medium;
  };

  const canTakeAction = userRole === 'admin' || userRole === 'compliance_officer';

  const filteredApplications = mockKYCApplications.filter(app => {
    const matchesSearch = app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">KYC & Compliance</h1>
          <p className="text-gray-600 mt-1">
            Manage KYC verification, VKYC processes, and regulatory compliance monitoring
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Compliance Report
          </Button>
        </div>
      </div>

      {/* KYC Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
              Verified KYC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-600 mt-1">65% completion rate</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Clock className="w-4 h-4 mr-1 text-yellow-600" />
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">45</div>
            <div className="text-sm text-gray-600 mt-1">Awaiting verification</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1 text-red-600" />
              Flagged Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
            <div className="text-sm text-gray-600 mt-1">Requires investigation</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Shield className="w-4 h-4 mr-1 text-blue-600" />
              AML Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600 mt-1">Active alerts</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KYC Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              KYC Status Distribution
            </CardTitle>
            <CardDescription>
              Current status breakdown of all KYC applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={kycStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {kycStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compliance Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Compliance Alerts
            </CardTitle>
            <CardDescription>
              Current compliance issues requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceAlertsData.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{alert.category}</p>
                      <Badge className={getSeverityBadge(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{alert.count}</p>
                    <p className="text-sm text-gray-600">cases</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYC Applications Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>KYC Applications</CardTitle>
              <CardDescription>
                Manage and review KYC submissions and VKYC processes
              </CardDescription>
            </div>
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="applications" className="space-y-4">
            <TabsList>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="documents">Document Review</TabsTrigger>
              <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>KYC ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Flags</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Officer</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{app.applicant}</div>
                          <div className="text-sm text-gray-500">{app.business}</div>
                          <div className="text-xs text-gray-400 flex items-center mt-1">
                            <Phone className="w-3 h-3 mr-1" />
                            {app.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(app.documentsUploaded / app.documentsRequired) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {app.documentsUploaded}/{app.documentsRequired}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(app.status)}
                          <Badge className={getStatusBadge(app.status)}>
                            {app.status.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {app.riskFlags.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {app.riskFlags.map((flag, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {flag}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No flags</span>
                        )}
                      </TableCell>
                      <TableCell>{app.submissionDate}</TableCell>
                      <TableCell>{app.officer}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedApplication(app)}>
                                <Eye className="w-4 h-4 mr-1" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>KYC Application Review - {selectedApplication?.id}</DialogTitle>
                                <DialogDescription>
                                  Complete KYC information and document verification
                                </DialogDescription>
                              </DialogHeader>
                              
                              {selectedApplication && (
                                <div className="space-y-6 mt-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h3 className="font-semibold mb-2">Applicant Details</h3>
                                      <div className="space-y-2 text-sm">
                                        <div><strong>Name:</strong> {selectedApplication.applicant}</div>
                                        <div><strong>Business:</strong> {selectedApplication.business}</div>
                                        <div><strong>Phone:</strong> {selectedApplication.phone}</div>
                                        <div><strong>Email:</strong> {selectedApplication.email}</div>
                                      </div>
                                    </div>
                                    <div>
                                      <h3 className="font-semibold mb-2">Application Status</h3>
                                      <div className="space-y-2 text-sm">
                                        <div><strong>Status:</strong> 
                                          <Badge className={`ml-2 ${getStatusBadge(selectedApplication.status)}`}>
                                            {selectedApplication.status.toUpperCase()}
                                          </Badge>
                                        </div>
                                        <div><strong>Submitted:</strong> {selectedApplication.submissionDate}</div>
                                        <div><strong>Officer:</strong> {selectedApplication.officer}</div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h3 className="font-semibold mb-2">Document Checklist</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                      {['PAN Card', 'Aadhaar Card', 'Bank Statement', 'GST Certificate', 'Business Registration'].map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                                          <span className="text-sm">{doc}</span>
                                          <CheckCircle className="w-4 h-4 text-green-600" />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {canTakeAction && selectedApplication.status === 'pending' && (
                                    <div className="flex space-x-4 pt-4 border-t">
                                      <Button className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Approve KYC
                                      </Button>
                                      <Button variant="destructive">
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Reject KYC
                                      </Button>
                                      <Button variant="outline">
                                        <AlertTriangle className="w-4 h-4 mr-2" />
                                        Flag for Review
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="documents">
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Document review interface would be implemented here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="audit">
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Audit trail and compliance logs would be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCCompliance;
