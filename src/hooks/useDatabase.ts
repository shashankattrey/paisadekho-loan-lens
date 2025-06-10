
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DatabaseService } from '@/services/database';
import { useToast } from '@/hooks/use-toast';

// Query keys
export const QUERY_KEYS = {
  loanApplications: ['loan-applications'],
  loanApplication: (id: string) => ['loan-application', id],
  customers: ['customers'],
  customer: (id: string) => ['customer', id],
  dashboardStats: ['dashboard-stats'],
  overdueEMIs: ['overdue-emis'],
  userProfile: ['user-profile'],
  profiles: ['profiles'],
};

// Loan Applications
export const useLoanApplications = () => {
  return useQuery({
    queryKey: QUERY_KEYS.loanApplications,
    queryFn: DatabaseService.getLoanApplications,
  });
};

export const useLoanApplication = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.loanApplication(id),
    queryFn: () => DatabaseService.getLoanApplication(id),
    enabled: !!id,
  });
};

export const useCreateLoanApplication = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: DatabaseService.createLoanApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.loanApplications });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboardStats });
      toast({
        title: "Success",
        description: "Loan application created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create loan application",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateLoanApplication = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      DatabaseService.updateLoanApplication(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.loanApplications });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.loanApplication(data.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboardStats });
      toast({
        title: "Success",
        description: "Loan application updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update loan application",
        variant: "destructive",
      });
    },
  });
};

// Customers
export const useCustomers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.customers,
    queryFn: DatabaseService.getCustomers,
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.customer(id),
    queryFn: () => DatabaseService.getCustomer(id),
    enabled: !!id,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: DatabaseService.createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.customers });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboardStats });
      toast({
        title: "Success",
        description: "Customer created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create customer",
        variant: "destructive",
      });
    },
  });
};

// Dashboard
export const useDashboardStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.dashboardStats,
    queryFn: DatabaseService.getDashboardStats,
  });
};

export const useOverdueEMIs = () => {
  return useQuery({
    queryKey: QUERY_KEYS.overdueEMIs,
    queryFn: DatabaseService.getOverdueEMIs,
  });
};

// User Profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: QUERY_KEYS.userProfile,
    queryFn: DatabaseService.getCurrentUserProfile,
  });
};

export const useProfiles = () => {
  return useQuery({
    queryKey: QUERY_KEYS.profiles,
    queryFn: DatabaseService.getProfiles,
  });
};

// Document upload
export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ file, applicationId, customerId, documentType }: {
      file: File;
      applicationId: string;
      customerId: string;
      documentType: string;
    }) => DatabaseService.uploadDocument(file, applicationId, customerId, documentType),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload document",
        variant: "destructive",
      });
    },
  });
};
