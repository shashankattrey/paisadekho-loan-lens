
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Phone,
  CheckCircle,
} from "lucide-react";

interface EMICollectionProps {
  userRole: string;
}

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

const EMICollection: React.FC<EMICollectionProps> = ({ userRole }) => {
  const getEMIStatusColor = (daysPastDue: number) => {
    if (daysPastDue === 0) return 'text-green-600';
    if (daysPastDue <= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-green-600" />
            Today's EMI Due
          </div>
          <Badge variant="outline">{mockTodayEMI.length} accounts</Badge>
        </CardTitle>
        <CardDescription>
          EMI collection schedule and status tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTodayEMI.map((emi) => (
            <div key={emi.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{emi.borrower}</span>
                  <span className="text-xs text-gray-500">{emi.business}</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {emi.emiType}
                    </Badge>
                    <span className="text-xs text-gray-500">Due: {emi.dueTime}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${getEMIStatusColor(emi.daysPastDue)}`}>
                  {emi.amount}
                </div>
                {emi.daysPastDue > 0 && (
                  <div className="text-xs text-red-600">
                    {emi.daysPastDue} days overdue
                  </div>
                )}
                <div className="flex space-x-1 mt-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Collect
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EMICollection;
