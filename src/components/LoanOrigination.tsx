
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Phone,
  MapPin,
  Download,
  Loader2,
} from "lucide-react";
import { useLoanApplications, useUpdateLoanApplication } from "@/hooks/useDatabase";
import { Skeleton } from "@/components/ui/skeleton";

interface LoanOriginationProps {
  userRole: string;
}

const LoanOrigination: React.FC<LoanOriginationProps> = ({ userRole }) => {
  const navigate = useNavigate();
  const { data: applications, isLoading, error } = useLoanApplications();
  const updateApplication = useUpdateLoanApplication();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'request_docs' | null>(null);
  const [remarks, setRemarks] = useState('');

  const getStatusBadge = (status: string) => {
    const variants = {
      submitted: 'bg-blue-100 text-blue-800 border-blue-300',
      in_review: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      disbursed: 'bg-purple-100 text-purple-800 border-purple-300',
      closed: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return variants[status as keyof typeof variants] || variants.submitted;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800 border-red-300',
      normal: 'bg-blue-100 text-blue-800 border-blue-300',
      low: 'bg-gray-100 text-gray-800 border-gray-300',
      urgent: 'bg-orange-100 text-orange-800 border-orange-300',
    };
    return variants[priority as keyof typeof variants] || variants.normal;
  };

  const getRiskBadge = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 6.5) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const filteredApplications = applications?.filter(app => {
    const matchesSearch = app.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.customer?.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.application_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.customer?.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  }) || [];

  const handleAction = (appId: string, action: 'approve' | 'reject' | 'request_docs') => {
    setSelectedApplication(appId);
    setActionType(action);
  };

  const submitAction = async () => {
    if (!selectedApplication || !actionType) return;

    const updates: any = {};
    
    switch (actionType) {
      case 'approve':
        updates.status = 'approved';
        break;
      case 'reject':
        updates.status = 'rejected';
        updates.rejection_reason = remarks;
        break;
      case 'request_docs':
        // Add logic for requesting additional documents
        break;
    }

    try {
      await updateApplication.mutateAsync({
        id: selectedApplication,
        updates
      });
      
      setSelectedApplication(null);
      setActionType(null);
      setRemarks('');
    } catch (error) {
      console.error('Error updating application:', error);
    }
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading applications: {error.message}</p>
      </div>
    );
  }

  const statusCounts = {
    submitted: applications?.filter(a => a.status === 'submitted').length || 0,
    in_review: applications?.filter(a => a.status === 'in_review').length || 0,
    approved: applications?.filter(a => a.status === 'approved').length || 0,
    rejected: applications?.filter(a => a.status === 'rejected').length || 0,
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
              <p className="text-2xl font-bold text-blue-600">{statusCounts.submitted}</p>
              <p className="text-sm text-gray-600">New Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.in_review}</p>
              <p className="text-sm text-gray-600">Under Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{statusCounts.approved}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                ₹{applications?.filter(a => a.status === 'approved').reduce((sum, app) => sum + (app.approved_amount || app.amount), 0).toLocaleString() || '0'}
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
                  placeholder="Search by name, business, application ID, or phone..."
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
                <SelectItem value="urgent">Urgent</SelectItem>
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
                  <TableCell className="font-medium">{app.application_number}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{app.customer?.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {app.customer?.phone}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {app.customer?.address?.city}, {app.customer?.address?.state}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{app.customer?.business_name}</div>
                      <div className="text-sm text-blue-600 font-semibold">
                        ₹{app.amount.toLocaleString()} • {app.tenure}m
                      </div>
                      <div className="text-sm text-gray-500">{app.purpose.replace('_', ' ')}</div>
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
                        <div className="font-semibold">CIBIL: {app.customer?.cibil_score || 'N/A'}</div>
                        {app.risk_score && (
                          <Badge className={getRiskBadge(app.risk_score)} variant="outline">
                            Risk: {app.risk_score}/10
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        KYC: <Badge variant={app.kyc_status === 'verified' ? 'default' : 'secondary'}>
                          {app.kyc_status}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        VKYC: <Badge variant={app.vkyc_status === 'verified' ? 'default' : 'secondary'}>
                          {app.vkyc_status}
                        </Badge>
                      </div>
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
                      {app.status === 'submitted' && (
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleAction(app.id, 'approve')}
                            disabled={updateApplication.isPending}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleAction(app.id, 'reject')}
                            disabled={updateApplication.isPending}
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
          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No applications found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Dialog */}
      {selectedApplication && actionType && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
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
                <Button 
                  onClick={submitAction} 
                  className="flex-1"
                  disabled={updateApplication.isPending}
                >
                  {updateApplication.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
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
                  disabled={updateApplication.isPending}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanOrigination;
