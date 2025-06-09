
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from "@/components/DashboardLayout";
import DashboardHome from "@/components/DashboardHome";
import LoanManagement from "@/components/LoanManagement";
import LoanOrigination from "@/components/LoanOrigination";
import DisbursementModule from "@/components/DisbursementModule";
import RiskUnderwriting from "@/components/RiskUnderwriting";
import Collections from "@/components/Collections";
import KYCCompliance from "@/components/KYCCompliance";
import FinancialReporting from "@/components/FinancialReporting";
import UserManagement from "@/components/UserManagement";
import RiskAnalytics from "@/components/RiskAnalytics";
import CreditScoring from "@/components/CreditScoring";
import FraudDetection from "@/components/FraudDetection";

interface DashboardProps {
  userRole?: string;
  userInfo?: any;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const { user, hasPermission } = useAuth();
  const [activeModule, setActiveModule] = useState('dashboard');

  if (!user) {
    return null;
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardHome userRole={user.role} />;
      case 'loans':
        return hasPermission('loans') ? <LoanManagement userRole={user.role} /> : <div className="p-8 text-center text-gray-500">Access Denied</div>;
      case 'loan-origination':
        return hasPermission('loans') ? <LoanOrigination userRole={user.role} /> : <div className="p-8 text-center text-gray-500">Access Denied</div>;
      case 'disbursement':
        return hasPermission('disbursement') ? <DisbursementModule userRole={user.role} /> : <div className="p-8 text-center text-gray-500">Access Denied</div>;
      case 'risk':
        return hasPermission('risk') ? <RiskUnderwriting userRole={user.role} /> : <div className="p-8 text-center text-gray-500">Access Denied</div>;
      case 'collections':
        return hasPermission('collections') ? <Collections userRole={user.role} /> : <div className="p-8 text-center text-gray-500">Access Denied</div>;
      case 'kyc':
        return hasPermission('kyc') ? <KYCCompliance userRole={user.role} /> : <div className="p-8 text-center text-gray-500">Access Denied</div>;
      case 'reporting':
        return hasPermission('reporting') ? <FinancialReporting userRole={user.role} /> : <div className="p-8 text-center text-gray-500">Access Denied</div>;
      case 'users':
        return hasPermission('all') ? <UserManagement userRole={user.role} /> : <div className="p-8 text-center text-gray-500">Access Denied</div>;
      case 'risk-analytics':
        return hasPermission('analytics') || hasPermission('risk') ? <RiskAnalytics userRole={user.role} /> : <div className="p-8 text-center text-gray-500">Access Denied</div>;
      case 'credit-scoring':
        return hasPermission('underwriting') || hasPermission('risk') ? <CreditScoring userRole={user.role} /> : <div className="p-8 text-center text-gray-500">Access Denied</div>;
      case 'fraud-detection':
        return hasPermission('fraud') || hasPermission('all') ? <FraudDetection userRole={user.role} /> : <div className="p-8 text-center text-gray-500">Access Denied</div>;
      default:
        return <DashboardHome userRole={user.role} />;
    }
  };

  return (
    <DashboardLayout activeModule={activeModule} setActiveModule={setActiveModule}>
      {renderActiveModule()}
    </DashboardLayout>
  );
};

export default Dashboard;
