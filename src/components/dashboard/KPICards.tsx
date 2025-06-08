
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Video,
  Calendar,
  AlertTriangle,
} from "lucide-react";

interface KPICardsProps {
  userRole: string;
}

const KPICards: React.FC<KPICardsProps> = ({ userRole }) => {
  const enhancedKpiCards = [
    {
      title: 'Total Applications',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-blue-500',
      subMetrics: [
        { label: 'Pending Review', value: '156' },
        { label: 'Approved Today', value: '23' },
        { label: 'Rejected Today', value: '8' },
      ]
    },
    {
      title: 'VKYC Queue',
      value: '45',
      change: '-5%',
      changeType: 'negative',
      icon: Video,
      color: 'bg-purple-500',
      subMetrics: [
        { label: 'Scheduled Today', value: '12' },
        { label: 'Completed', value: '89' },
        { label: 'Failed/Rejected', value: '7' },
      ]
    },
    {
      title: "Today's EMI Due",
      value: '₹1.2L',
      change: '+8%',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-green-500',
      subMetrics: [
        { label: 'Collected', value: '₹78K' },
        { label: 'Pending', value: '₹42K' },
        { label: 'Overdue', value: '₹18K' },
      ]
    },
    {
      title: 'DPD 0-30',
      value: '88',
      change: '-12%',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'bg-red-500',
      subMetrics: [
        { label: '0-7 days', value: '45' },
        { label: '8-15 days', value: '23' },
        { label: '16-30 days', value: '20' },
      ]
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {enhancedKpiCards.map((kpi, index) => {
        const IconComponent = kpi.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              <div className={`${kpi.color} p-2 rounded-lg text-white`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <p className={`text-xs mt-1 ${
                kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change} from yesterday
              </p>
              <div className="mt-3 space-y-1">
                {kpi.subMetrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-gray-600">
                    <span>{metric.label}:</span>
                    <span className="font-medium">{metric.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default KPICards;
