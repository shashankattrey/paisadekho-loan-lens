
import React from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  const { userRole } = useParams<{ userRole: string }>();
  
  return <Dashboard />;
};

export default DashboardPage;
