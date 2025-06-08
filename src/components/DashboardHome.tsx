
import React from 'react';
import { Badge } from "@/components/ui/badge";
import KPICards from "@/components/dashboard/KPICards";
import VKYCManagement from "@/components/dashboard/VKYCManagement";
import EMICollection from "@/components/dashboard/EMICollection";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import DetailedTables from "@/components/dashboard/DetailedTables";
import PriorityAlerts from "@/components/dashboard/PriorityAlerts";

interface DashboardHomeProps {
  userRole: string;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ userRole }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Operations Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Real-time overview of lending operations, VKYC, and collections
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Live Data
          </Badge>
          <Badge variant="outline" className="text-gray-600">
            {new Date().toLocaleDateString('en-IN')}
          </Badge>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <KPICards userRole={userRole} />

      {/* VKYC and EMI Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VKYCManagement userRole={userRole} />
        <EMICollection userRole={userRole} />
      </div>

      {/* Charts and Analytics */}
      <DashboardCharts />

      {/* Detailed Tables */}
      <DetailedTables userRole={userRole} />
    </div>
  );
};

export default DashboardHome;
