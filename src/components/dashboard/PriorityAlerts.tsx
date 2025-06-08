
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Clock,
  Users,
  FileText,
} from "lucide-react";

const PriorityAlerts: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Priority Alerts & Actions</CardTitle>
        <CardDescription>Critical items requiring immediate attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <h3 className="font-semibold text-red-800">High Priority VKYC</h3>
            </div>
            <p className="text-sm text-red-700 mb-2">3 high-priority VKYC sessions overdue</p>
            <Button size="sm" variant="outline" className="border-red-300 text-red-700">
              Review Now
            </Button>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="font-semibold text-orange-800">Overdue EMIs</h3>
            </div>
            <p className="text-sm text-orange-700 mb-2">₹45,000 in EMIs overdue by 2+ days</p>
            <Button size="sm" variant="outline" className="border-orange-300 text-orange-700">
              Start Collection
            </Button>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <Users className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-800">Pending Approvals</h3>
            </div>
            <p className="text-sm text-blue-700 mb-2">12 loan applications awaiting approval</p>
            <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
              Review Queue
            </Button>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center mb-2">
              <FileText className="w-5 h-5 text-purple-600 mr-2" />
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
  );
};

export default PriorityAlerts;
