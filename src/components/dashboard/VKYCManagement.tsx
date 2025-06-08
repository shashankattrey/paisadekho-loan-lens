
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Video,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

interface VKYCManagementProps {
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

const VKYCManagement: React.FC<VKYCManagementProps> = ({ userRole }) => {
  const [selectedVKYC, setSelectedVKYC] = useState<any>(null);

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

  const canPerformVKYC = userRole === 'admin' || userRole === 'compliance_officer' || userRole === 'credit_officer';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Video className="w-5 h-5 mr-2 text-purple-600" />
            Today's VKYC Schedule
          </div>
          <Badge variant="outline">{mockVKYCApplications.length} pending</Badge>
        </CardTitle>
        <CardDescription>
          Video KYC appointments and verification queue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockVKYCApplications.map((vkyc) => (
            <div key={vkyc.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{vkyc.borrower}</span>
                  <span className="text-xs text-gray-500">{vkyc.business}</span>
                  <span className="text-xs text-gray-500">{vkyc.scheduledTime}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getPriorityBadge(vkyc.priority)}>
                  {vkyc.priority}
                </Badge>
                <Badge className={getStatusBadge(vkyc.status)}>
                  {vkyc.status}
                </Badge>
                {canPerformVKYC && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => setSelectedVKYC(vkyc)}>
                        <Video className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>VKYC Session - {selectedVKYC?.id}</DialogTitle>
                        <DialogDescription>
                          Video KYC verification for {selectedVKYC?.borrower}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedVKYC && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Customer Video</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div><strong>Name:</strong> {selectedVKYC.borrower}</div>
                              <div><strong>Business:</strong> {selectedVKYC.business}</div>
                              <div><strong>Phone:</strong> {selectedVKYC.phone}</div>
                              <div><strong>Loan Amount:</strong> {selectedVKYC.loanAmount}</div>
                            </div>
                          </div>
                          <div className="flex space-x-4 pt-4 border-t">
                            <Button className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve VKYC
                            </Button>
                            <Button variant="destructive">
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject VKYC
                            </Button>
                            <Button variant="outline">
                              <Clock className="w-4 h-4 mr-2" />
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VKYCManagement;
