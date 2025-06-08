
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  Eye,
  Phone,
  CheckCircle,
} from "lucide-react";

interface DetailedTablesProps {
  userRole: string;
}

const mockVKYCApplications = [
  {
    id: 'VKYC001',
    borrower: 'Rajesh Kumar',
    business: 'Kumar Electronics',
    phone: '+91 98765 43210',
    scheduledTime: '10:30 AM',
    status: 'scheduled',
    priority: 'high',
    loanAmount: '₹25,000',
  },
  {
    id: 'VKYC002',
    borrower: 'Priya Sharma',
    business: 'Sharma Textiles',
    phone: '+91 87654 32109',
    scheduledTime: '2:00 PM',
    status: 'pending',
    priority: 'medium',
    loanAmount: '₹18,000',
  },
  {
    id: 'VKYC003',
    borrower: 'Mohammed Ali',
    business: 'Ali Trading Co.',
    phone: '+91 76543 21098',
    scheduledTime: '4:15 PM',
    status: 'completed',
    priority: 'low',
    loanAmount: '₹35,000',
  },
];

const mockTodayEMI = [
  {
    id: 'L001',
    borrower: 'Suresh Patel',
    business: 'Patel Grocery',
    amount: '₹1,250',
    dueTime: '11:00 AM',
    phone: '+91 99887 76655',
    daysPastDue: 0,
    emiType: 'daily',
    totalDue: '₹1,250',
  },
  {
    id: 'L045',
    borrower: 'Kavita Devi',
    business: 'Beauty Parlour',
    amount: '₹2,100',
    dueTime: '12:30 PM',
    phone: '+91 88776 65544',
    daysPastDue: 2,
    emiType: 'tenth_day',
    totalDue: '₹6,300',
  },
  {
    id: 'L089',
    borrower: 'Ramesh Agarwal',
    business: 'Mobile Repair Shop',
    amount: '₹1,800',
    dueTime: '3:00 PM',
    phone: '+91 77665 54433',
    daysPastDue: 0,
    emiType: 'monthly',
    totalDue: '₹1,800',
  },
];

const DetailedTables: React.FC<DetailedTablesProps> = ({ userRole }) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'bg-blue-100 text-blue-800 border-blue-300',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      completed: 'bg-green-100 text-green-800 border-green-300',
      failed: 'bg-red-100 text-red-800 border-red-300',
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800 border-red-300',
      medium: 'bg-orange-100 text-orange-800 border-orange-300',
      low: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  const getEMIStatusColor = (daysPastDue: number) => {
    if (daysPastDue === 0) return 'text-green-600';
    if (daysPastDue <= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Tabs defaultValue="vkyc" className="space-y-4">
      <TabsList>
        <TabsTrigger value="vkyc">VKYC Queue</TabsTrigger>
        <TabsTrigger value="collections">Collection Details</TabsTrigger>
        <TabsTrigger value="alerts">Priority Alerts</TabsTrigger>
      </TabsList>
      
      <TabsContent value="vkyc">
        <Card>
          <CardHeader>
            <CardTitle>Complete VKYC Queue</CardTitle>
            <CardDescription>All pending and scheduled VKYC sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>VKYC ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Scheduled Time</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVKYCApplications.map((vkyc) => (
                  <TableRow key={vkyc.id}>
                    <TableCell className="font-medium">{vkyc.id}</TableCell>
                    <TableCell>{vkyc.borrower}</TableCell>
                    <TableCell>{vkyc.business}</TableCell>
                    <TableCell>{vkyc.scheduledTime}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityBadge(vkyc.priority)}>
                        {vkyc.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(vkyc.status)}>
                        {vkyc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Video className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="collections">
        <Card>
          <CardHeader>
            <CardTitle>Today's Collection Details</CardTitle>
            <CardDescription>Detailed EMI collection status and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>EMI Amount</TableHead>
                  <TableHead>Due Time</TableHead>
                  <TableHead>DPD</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTodayEMI.map((emi) => (
                  <TableRow key={emi.id}>
                    <TableCell className="font-medium">{emi.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{emi.borrower}</div>
                        <div className="text-sm text-gray-500">{emi.business}</div>
                      </div>
                    </TableCell>
                    <TableCell className={`font-bold ${getEMIStatusColor(emi.daysPastDue)}`}>
                      {emi.amount}
                    </TableCell>
                    <TableCell>{emi.dueTime}</TableCell>
                    <TableCell>
                      <Badge className={emi.daysPastDue === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {emi.daysPastDue === 0 ? 'On Time' : `${emi.daysPastDue} days`}
                      </Badge>
                    </TableCell>
                    <TableCell>{emi.phone}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Collect
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="alerts">
        <Card>
          <CardHeader>
            <CardTitle>Priority Alerts & Actions</CardTitle>
            <CardDescription>Critical items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-800">High Priority VKYC</h3>
                </div>
                <p className="text-sm text-red-700 mb-2">3 high-priority VKYC sessions overdue</p>
                <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                  Review Now
                </Button>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 text-orange-600 mr-2" />
                  <h3 className="font-semibold text-orange-800">Overdue EMIs</h3>
                </div>
                <p className="text-sm text-orange-700 mb-2">₹45,000 in EMIs overdue by 2+ days</p>
                <Button size="sm" variant="outline" className="border-orange-300 text-orange-700">
                  Start Collection
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-800">Pending Approvals</h3>
                </div>
                <p className="text-sm text-blue-700 mb-2">12 loan applications awaiting approval</p>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                  Review Queue
                </Button>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-purple-800">Document Verification</h3>
                </div>
                <p className="text-sm text-purple-700 mb-2">8 documents pending verification</p>
                <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                  Verify Documents
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DetailedTables;
