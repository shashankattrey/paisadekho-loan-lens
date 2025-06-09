
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  AlertCircle,
  TrendingUp,
  User,
  BarChart3,
  Users,
  Shield,
  LogOut,
} from "lucide-react";

interface AppSidebarProps {
  userRole: string;
  userInfo: any;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const menuItems = {
  admin: [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'loans', title: 'Loan Management', icon: FileText },
    { id: 'risk', title: 'Risk & Underwriting', icon: AlertCircle },
    { id: 'collections', title: 'Collections', icon: TrendingUp },
    { id: 'kyc', title: 'KYC & Compliance', icon: User },
    { id: 'reporting', title: 'Financial Reports', icon: BarChart3 },
    { id: 'users', title: 'User Management', icon: Users },
  ],
  credit_officer: [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'loans', title: 'Loan Management', icon: FileText },
    { id: 'risk', title: 'Risk & Underwriting', icon: AlertCircle },
    { id: 'kyc', title: 'KYC & Compliance', icon: User },
  ],
  risk_manager: [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'risk', title: 'Risk & Underwriting', icon: AlertCircle },
    { id: 'loans', title: 'Loan Management', icon: FileText },
    { id: 'reporting', title: 'Risk Reports', icon: BarChart3 },
  ],
  collections_officer: [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'collections', title: 'Collections', icon: TrendingUp },
    { id: 'loans', title: 'Loan Management', icon: FileText },
    { id: 'reporting', title: 'Collections Reports', icon: BarChart3 },
  ],
  compliance_officer: [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'kyc', title: 'KYC & Compliance', icon: User },
    { id: 'reporting', title: 'Compliance Reports', icon: BarChart3 },
  ],
};

const AppSidebar: React.FC<AppSidebarProps> = ({ 
  userRole, 
  userInfo, 
  activeModule, 
  setActiveModule 
}) => {
  const roleMenuItems = menuItems[userRole as keyof typeof menuItems] || [];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">Paisadekho</h2>
            <p className="text-sm text-gray-500">NBFC Portal</p>
          </div>
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {roleMenuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveModule(item.id)}
                      className={`w-full justify-start space-x-3 p-3 rounded-lg transition-colors ${
                        activeModule === item.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gray-200 text-gray-700">
              {userInfo?.name ? userInfo.name.charAt(0) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-900">{userInfo?.name || 'User'}</p>
            <p className="text-xs text-gray-500">Active Session</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.reload()}>
          <LogOut className="w-4 h-4 mr-2" />
          Switch Role
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
