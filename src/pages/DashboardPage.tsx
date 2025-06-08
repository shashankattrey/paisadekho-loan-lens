
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Dashboard from "@/components/Dashboard";

const UserRoles = {
  admin: {
    id: 'admin',
    title: 'Admin',
    description: 'Full access to all modules and user management',
    permissions: ['all']
  },
  credit_officer: {
    id: 'credit_officer',
    title: 'Credit Officer',
    description: 'Review loan applications, approve/reject, underwriting',
    permissions: ['loans', 'underwriting', 'kyc']
  },
  risk_manager: {
    id: 'risk_manager',
    title: 'Risk Manager',
    description: 'Review flagged loans, risk monitoring, manual decisions',
    permissions: ['risk', 'underwriting', 'loans']
  },
  collections_officer: {
    id: 'collections_officer',
    title: 'Collections Officer',
    description: 'Monitor repayments, overdue accounts, follow-ups',
    permissions: ['collections', 'disbursement']
  },
  compliance_officer: {
    id: 'compliance_officer',
    title: 'Compliance Officer',
    description: 'KYC/VKYC approvals, AML alerts, document verification',
    permissions: ['kyc', 'compliance', 'reporting']
  }
};

const DashboardPage = () => {
  const { userRole } = useParams<{ userRole: string }>();
  
  if (!userRole || !UserRoles[userRole as keyof typeof UserRoles]) {
    return <Navigate to="/" replace />;
  }

  const userInfo = UserRoles[userRole as keyof typeof UserRoles];

  return <Dashboard userRole={userRole} userInfo={userInfo} />;
};

export default DashboardPage;
