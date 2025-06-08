
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import DashboardHome from "@/components/DashboardHome";
import LoanManagement from "@/components/LoanManagement";
import RiskUnderwriting from "@/components/RiskUnderwriting";
import Collections from "@/components/Collections";
import KYCCompliance from "@/components/KYCCompliance";
import FinancialReporting from "@/components/FinancialReporting";
import UserManagement from "@/components/UserManagement";

interface DashboardProps {
  userRole: string;
  userInfo: any;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, userInfo }) => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardHome userRole={userRole} />;
      case 'loans':
        return <LoanManagement userRole={userRole} />;
      case 'risk':
        return <RiskUnderwriting userRole={userRole} />;
      case 'collections':
        return <Collections userRole={userRole} />;
      case 'kyc':
        return <KYCCompliance userRole={userRole} />;
      case 'reporting':
        return <FinancialReporting userRole={userRole} />;
      case 'users':
        return <UserManagement userRole={userRole} />;
      default:
        return <DashboardHome userRole={userRole} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar 
          userRole={userRole} 
          userInfo={userInfo}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
        />
        <main className="flex-1 p-6 overflow-auto">
          {renderActiveModule()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
