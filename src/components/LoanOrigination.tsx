
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  CreditCard,
  MapPin,
  Phone,
  Download,
} from "lucide-react";

interface LoanOriginationProps {
  userRole: string;
}

const mockApplications = [
  {
    id: 'APP001',
    applicantName: 'Rajesh Kumar',
    businessName: 'Kumar Electronics',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    location: 'Noida, UP',
    pincode: '201301',
    amount: 25000,
    tenure: 18,
    purpose: 'Working Capital',
    status: 'submitted',
    submittedDate: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-15T10:30:00Z',
    riskScore: 7.2,
    cibilScore: 742,
    monthlyIncome: 45000,
    businessVintage: 36,
    kycStatus: 'pending',
    vkycStatus: 'pending',
    assignedTo: 'CRO001',
    priority: 'normal',
    documents: ['pan', 'aadhaar', 'bank_statement'],
    missingDocs: ['gst_certificate'],
  },
  {
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
  },
  {
    id: 'APP003',
    applicantName: 'Mohammed Ali',
    businessName: 'Ali Trading Co.',
    phone: '+91 76543 21098',
    email: 'mohammed.ali@email.com',
    location: 'Bangalore, KA',
    pincode: '560001',
    amount: 15000,
    tenure: 12,
    purpose: 'Equipment Purchase',
    status: 'approved',
    submittedDate: '2024-01-18T16:45:00Z',
    lastUpdated: '2024-01-20T11:30:00Z',
    riskScore: 6.8,
    cibilScore: 695,
    monthlyIncome: 38000,
    businessVintage: 24,
    kycStatus: 'verified',
    vkycStatus: 'verified',
    assignedTo: 'RSK001',
    priority: 'normal',
    documents: ['pan', 'aadhaar', 'bank_statement', 'gst_certificate'],
    missingDocs: [],
    approvalAmount: 12000,
    approvalConditions: ['Provide additional collateral'],
  },
  {
    id: 'APP004',
    applicantName: 'Sunita Devi',
    businessName: 'Sunita Saree Center',
    phone: '+91 98765 12345',
    email: 'sunita.devi@email.com',
    location: 'Mumbai, MH',
    pincode: '400001',
    amount: 40000,
    tenure: 36,
    purpose: 'Shop Expansion',
    status: 'rejected',
    submittedDate: '2024-01-10T08:15:00Z',
    lastUpdated: '2024-01-18T15:45:00Z',
    riskScore: 4.2,
    cibilScore: 625,
    monthlyIncome: 28000,
    businessVintage: 12,
    kycStatus: 'verified',
    vkycStatus: 'failed',
    assignedTo: 'RSK001',
    priority: 'low',
    documents: ['pan', 'aadhaar'],
    missingDocs: ['bank_statement', 'gst_certificate'],
    rejectionReason: 'Low CIBIL score and insufficient business vintage',
  },
];

const LoanOrigination: React.FC<LoanOriginationProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'request_docs' | null>(null);
  const [remarks, setRemarks] = useState('');

  const getStatusBadge = (status: string) => {
    const variants = {
      submitted: 'bg-blue-100 text-blue-800 border-blue-300',
      in_review: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
    };
    return variants[status as keyof typeof variants] || variants.submitted;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800 border-red-300',
      normal: 'bg-blue-100 text-blue-800 border-blue-300',
      low: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return variants[priority as keyof typeof variants] || variants.normal;
  };

  const getRiskBadge = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 6.5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.phone.includes(searchTerm) ||
                         app.pincode.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'all' || app.assignedTo === assigneeFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const handleAction = (appId: string, action: 'approve' | 'reject' | 'request_docs') => {
    setSelectedApplication(appId);
    setActionType(action);
  };

  const submitAction = () => {
    if (!selectedApplication || !actionType) return;

    const updatedApplications = applications.map(app => {
      if (app.id === selectedApplication) {
        const updatedApp = { ...app, lastUpdated: new Date().toISOString() };
        
        switch (actionType) {
          case 'approve':
            updatedApp.status = 'approved';
            break;
          case 'reject':
            updatedApp.status = 'rejected';
            updatedApp.rejectionReason = remarks;
            break;
          case 'request_docs':
            // Add logic for requesting additional documents
            break;
        }
        
        return updatedApp;
      }
      return app;
    });

    setApplications(updatedApplications);
    setSelectedApplication(null);
    setActionType(null);
    setRemarks('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="w-4 h-4" />;
      case 'in_review':
        return <AlertTriangle className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Loan Origination</h1>
          <p className="text-gray-600 mt-1">
            Manage loan applications from submission to approval
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Applications
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{applications.filter(a => a.status === 'submitted').length}</p>
              <p className="text-sm text-gray-600">New Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{applications.filter(a => a.status === 'in_review').length}</p>
              <p className="text-sm text-gray-600">Under Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{applications.filter(a => a.status === 'approved').length}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{applications.filter(a => a.status === 'rejected').length}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                ₹{applications.filter(a => a.status === 'approved').reduce((sum, app) => sum + (app.approvalAmount || app.amount), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Approved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, business, application ID, phone, or pincode..."
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
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Applications ({filteredApplications.length})</CardTitle>
          <CardDescription>
            Complete list of loan applications with status and actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Applicant Details</TableHead>
                <TableHead>Business & Amount</TableHead>
                <TableHead>Status & Priority</TableHead>
                <TableHead>Risk & CIBIL</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{app.id}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{app.applicantName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {app.phone}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {app.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{app.businessName}</div>
                      <div className="text-sm text-blue-600 font-semibold">
                        ₹{app.amount.toLocaleString()} • {app.tenure}m
                      </div>
                      <div className="text-sm text-gray-500">{app.purpose}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(app.status)}
                        <Badge className={getStatusBadge(app.status)}>
                          {app.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <Badge className={getPriorityBadge(app.priority)} variant="outline">
                        {app.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-center">
                        <div className="font-semibold">CIBIL: {app.cibilScore}</div>
                        <Badge className={getRiskBadge(app.riskScore)} variant="outline">
                          Risk: {app.riskScore}/10
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        KYC: <Badge variant={app.kycStatus === 'verified' ? 'default' : 'secondary'}>
                          {app.kycStatus}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        VKYC: <Badge variant={app.vkycStatus === 'verified' ? 'default' : 'secondary'}>
                          {app.vkycStatus}
                        </Badge>
                      </div>
                      {app.missingDocs.length > 0 && (
                        <div className="text-xs text-red-600">
                          Missing: {app.missingDocs.length} docs
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                      >
                        <Link to={`/loan-application/${app.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Link>
                      </Button>
                      {app.status === 'in_review' && (
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleAction(app.id, 'approve')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleAction(app.id, 'reject')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Dialog */}
      {selectedApplication && actionType && (
        <Card className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {actionType === 'approve' ? 'Approve Application' : 
               actionType === 'reject' ? 'Reject Application' : 'Request Documents'}
            </h3>
            <div className="space-y-4">
              <Textarea
                placeholder={`Enter ${actionType} remarks...`}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
              />
              <div className="flex space-x-2">
                <Button onClick={submitAction} className="flex-1">
                  Submit
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedApplication(null);
                    setActionType(null);
                    setRemarks('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LoanOrigination;
