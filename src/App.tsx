
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LoanDetailsPage from "./pages/LoanDetailsPage";
import BorrowerProfilePage from "./pages/BorrowerProfilePage";
import LoanApplicationPage from "./pages/LoanApplicationPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/:userRole" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/loan/:loanId" element={
              <ProtectedRoute requiredPermission="loans">
                <LoanDetailsPage />
              </ProtectedRoute>
            } />
            <Route path="/loan-application/:appId" element={
              <ProtectedRoute requiredPermission="loans">
                <LoanApplicationPage />
              </ProtectedRoute>
            } />
            <Route path="/borrower/:borrowerId" element={
              <ProtectedRoute requiredPermission="loans">
                <BorrowerProfilePage />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
