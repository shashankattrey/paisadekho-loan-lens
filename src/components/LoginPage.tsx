
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, User, FileText, AlertCircle, TrendingUp } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { availableUsers, signInAsUser } = useAuth();

  const getRoleIcon = (role: string) => {
    const icons = {
      admin: Shield,
      credit_officer: FileText,
      risk_manager: AlertCircle,
      collections_officer: TrendingUp,
      compliance_officer: User,
    };
    return icons[role as keyof typeof icons] || User;
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'bg-red-100 text-red-800 border-red-300',
      credit_officer: 'bg-blue-100 text-blue-800 border-blue-300',
      risk_manager: 'bg-orange-100 text-orange-800 border-orange-300',
      collections_officer: 'bg-green-100 text-green-800 border-green-300',
      compliance_officer: 'bg-purple-100 text-purple-800 border-purple-300',
    };
    return variants[role as keyof typeof variants] || variants.credit_officer;
  };

  const handleUserSelect = async (userId: string) => {
    await signInAsUser(userId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Paisadekho</h1>
              <p className="text-blue-600 font-semibold">NBFC Admin Portal</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Select User to Sign In
          </h2>
          <p className="text-gray-600 mb-8">
            Choose from the available user roles to access the dashboard
          </p>
        </div>

        {/* User Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableUsers.map((user) => {
            const IconComponent = getRoleIcon(user.role);
            
            return (
              <Card 
                key={user.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-300"
                onClick={() => handleUserSelect(user.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{user.full_name}</CardTitle>
                  <CardDescription className="text-gray-600">{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge className={`mb-4 ${getRoleBadge(user.role)}`}>
                    {user.role.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Sign In as {user.full_name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {availableUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users available. Please check your database configuration.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
