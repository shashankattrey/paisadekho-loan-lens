
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeModule, setActiveModule }) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <Header />
        <div className="flex flex-1">
          <AppSidebar 
            userRole={user.role} 
            userInfo={user}
            activeModule={activeModule}
            setActiveModule={setActiveModule}
          />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
