
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Shield, TrendingUp, FileText, AlertCircle, LogIn } from "lucide-react";

const UserRoles = [
  {
    id: 'admin',
    title: 'Admin',
    description: 'Full access to all modules and user management',
    icon: Shield,
    color: 'bg-red-500',
    permissions: ['all']
  },
  {
    id: 'credit_officer',
    title: 'Credit Officer',
    description: 'Review loan applications, approve/reject, underwriting',
    icon: FileText,
    color: 'bg-blue-500',
    permissions: ['loans', 'underwriting', 'kyc']
  },
  {
    id: 'risk_manager',
    title: 'Risk Manager',
    description: 'Review flagged loans, risk monitoring, manual decisions',
    icon: AlertCircle,
    color: 'bg-orange-500',
    permissions: ['risk', 'underwriting', 'loans']
  },
  {
    id: 'collections_officer',
    title: 'Collections Officer',
    description: 'Monitor repayments, overdue accounts, follow-ups',
    icon: TrendingUp,
    color: 'bg-green-500',
    permissions: ['collections', 'disbursement']
  },
  {
    id: 'compliance_officer',
    title: 'Compliance Officer',
    description: 'KYC/VKYC approvals, AML alerts, document verification',
    icon: User,
    color: 'bg-purple-500',
    permissions: ['kyc', 'compliance', 'reporting']
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, availableUsers, signInAsUser } = useAuth();

  const handleRoleSelect = async (roleType: string) => {
    // Find a user with the matching role
    const matchingUser = availableUsers.find(user => user.role === roleType);
    if (matchingUser) {
      await signInAsUser(matchingUser.id);
      navigate('/dashboard');
    }
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      // Just show the role selection below
      document.getElementById('role-selection')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Paisadekho</h1>
              <p className="text-blue-600 font-semibold">NBFC Admin Dashboard</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Secure, scalable admin portal for SME lending operations management
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700" size="lg">
              <LogIn className="w-4 h-4 mr-2" />
              {isAuthenticated ? 'Go to Dashboard' : 'Select Your Role'}
            </Button>
          </div>
        </div>

        {/* Role Selection */}
        <div id="role-selection" className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            {isAuthenticated ? 'Switch Role' : 'Select Your Role'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UserRoles.map((role) => {
              const IconComponent = role.icon;
              const hasUser = availableUsers.some(user => user.role === role.id);
              
              return (
                <Card 
                  key={role.id} 
                  className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-300 ${!hasUser ? 'opacity-50' : ''}`}
                  onClick={() => hasUser && handleRoleSelect(role.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`${role.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 mb-4">
                      {role.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {role.permissions.slice(0, 3).map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission.charAt(0).toUpperCase() + permission.slice(1)}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className={`w-full mt-4 ${hasUser ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                      disabled={!hasUser}
                    >
                      {hasUser ? 'Sign In as ' + role.title : 'User Not Available'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            Platform Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Loan Management</h4>
              <p className="text-sm text-gray-600">Complete loan lifecycle management from application to closure</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">Risk Assessment</h4>
              <p className="text-sm text-gray-600">Advanced risk scoring and manual underwriting capabilities</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Collections</h4>
              <p className="text-sm text-gray-600">Efficient collections management and overdue tracking</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Compliance</h4>
              <p className="text-sm text-gray-600">KYC verification and regulatory compliance monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
