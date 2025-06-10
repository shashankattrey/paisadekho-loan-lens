
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStats, useLoanApplications, useOverdueEMIs } from "@/hooks/useDatabase";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, TrendingUp, Users, FileText, CreditCard, Clock } from "lucide-react";

interface DashboardHomeProps {
  userRole: string;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ userRole }) => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: applications, isLoading: appsLoading } = useLoanApplications();
  const { data: overdueEMIs, isLoading: overdueLoading } = useOverdueEMIs();

  if (statsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Operations Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time overview of lending operations</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const recentApplications = applications?.slice(0, 5) || [];
  const overdueCount = overdueEMIs?.length || 0;
  const totalOverdueAmount = overdueEMIs?.reduce((sum, emi) => sum + (emi.total_amount || 0), 0) || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Operations Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Real-time overview of lending operations
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalApplications || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.pendingApplications || 0} pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(stats?.totalApprovedAmount || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.approvedApplications || 0} approved loans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCustomers || 0}</div>
            <p className="text-xs text-muted-foreground">
              Active borrowers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue EMIs</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
            <p className="text-xs text-muted-foreground">
              ₹{totalOverdueAmount.toLocaleString()} overdue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest loan applications submitted</CardDescription>
          </CardHeader>
          <CardContent>
            {appsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{app.customer?.name}</p>
                      <p className="text-sm text-gray-500">{app.application_number}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{app.amount.toLocaleString()}</p>
                      <Badge 
                        variant={app.status === 'submitted' ? 'secondary' : 
                                app.status === 'approved' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {app.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
                {recentApplications.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No applications yet</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collections Overview</CardTitle>
            <CardDescription>Overdue EMIs requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            {overdueLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {overdueEMIs?.slice(0, 5).map((emi) => (
                  <div key={emi.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{emi.customer?.name}</p>
                      <p className="text-sm text-red-500">
                        Due: {new Date(emi.due_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">₹{emi.total_amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">EMI #{emi.emi_number}</p>
                    </div>
                  </div>
                ))}
                {overdueEMIs?.length === 0 && (
                  <p className="text-center text-green-600 py-4">No overdue EMIs</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
