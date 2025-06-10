
import { supabase } from "@/integrations/supabase/client";

// Types based on our database schema
export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  aadhaar_number?: string;
  pan_number?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  business_name?: string;
  business_type?: string;
  business_vintage?: number;
  monthly_income?: number;
  cibil_score?: number;
  created_at: string;
  updated_at: string;
}

export interface LoanApplication {
  id: string;
  application_number: string;
  customer_id: string;
  amount: number;
  tenure: number;
  purpose: 'working_capital' | 'inventory_purchase' | 'equipment_purchase' | 'shop_expansion' | 'business_growth';
  status: 'submitted' | 'in_review' | 'approved' | 'rejected' | 'disbursed' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assigned_to?: string;
  risk_score?: number;
  approved_amount?: number;
  interest_rate?: number;
  processing_fee?: number;
  kyc_status: 'pending' | 'verified' | 'failed' | 'expired';
  vkyc_status: 'pending' | 'verified' | 'failed' | 'expired';
  rejection_reason?: string;
  approval_conditions?: string[];
  disbursement_date?: string;
  maturity_date?: string;
  created_at: string;
  updated_at: string;
  customer?: Customer;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'admin' | 'credit_officer' | 'risk_manager' | 'collections_officer' | 'compliance_officer';
  employee_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Database service functions
export const DatabaseService = {
  // Loan Applications
  async getLoanApplications() {
    const { data, error } = await supabase
      .from('loan_applications')
      .select(`
        *,
        customer:customers(*),
        assigned_user:profiles!assigned_to(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as LoanApplication[];
  },

  async getLoanApplication(id: string) {
    const { data, error } = await supabase
      .from('loan_applications')
      .select(`
        *,
        customer:customers(*),
        assigned_user:profiles!assigned_to(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as LoanApplication;
  },

  async createLoanApplication(applicationData: Partial<LoanApplication>) {
    // Generate application number
    const { data: appNumber } = await supabase.rpc('generate_application_number');
    
    const { data, error } = await supabase
      .from('loan_applications')
      .insert({
        ...applicationData,
        application_number: appNumber
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateLoanApplication(id: string, updates: Partial<LoanApplication>) {
    const { data, error } = await supabase
      .from('loan_applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Customers
  async getCustomers() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Customer[];
  },

  async getCustomer(id: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Customer;
  },

  async createCustomer(customerData: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCustomer(id: string, updates: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Profile/User functions
  async getCurrentUserProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data as Profile;
  },

  async getProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Profile[];
  },

  // Dashboard stats
  async getDashboardStats() {
    const [
      { count: totalApplications },
      { count: pendingApplications },
      { count: approvedApplications },
      { count: rejectedApplications },
      { count: totalCustomers }
    ] = await Promise.all([
      supabase.from('loan_applications').select('*', { count: 'exact', head: true }),
      supabase.from('loan_applications').select('*', { count: 'exact', head: true }).eq('status', 'submitted'),
      supabase.from('loan_applications').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
      supabase.from('loan_applications').select('*', { count: 'exact', head: true }).eq('status', 'rejected'),
      supabase.from('customers').select('*', { count: 'exact', head: true })
    ]);

    // Calculate total approved amount
    const { data: approvedLoans } = await supabase
      .from('loan_applications')
      .select('approved_amount, amount')
      .eq('status', 'approved');

    const totalApprovedAmount = approvedLoans?.reduce((sum, loan) => 
      sum + (loan.approved_amount || loan.amount || 0), 0) || 0;

    return {
      totalApplications: totalApplications || 0,
      pendingApplications: pendingApplications || 0,
      approvedApplications: approvedApplications || 0,
      rejectedApplications: rejectedApplications || 0,
      totalCustomers: totalCustomers || 0,
      totalApprovedAmount
    };
  },

  // Collections and EMI
  async getOverdueEMIs() {
    const { data, error } = await supabase
      .from('emi_schedule')
      .select(`
        *,
        customer:customers(*),
        application:loan_applications(*)
      `)
      .eq('is_paid', false)
      .lt('due_date', new Date().toISOString().split('T')[0])
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Documents
  async uploadDocument(file: File, applicationId: string, customerId: string, documentType: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${applicationId}/${documentType}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data, error } = await supabase
      .from('documents')
      .insert({
        application_id: applicationId,
        customer_id: customerId,
        document_type: documentType as any,
        file_name: file.name,
        file_path: fileName,
        file_size: file.size,
        mime_type: file.type
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Activity logging
  async logActivity(applicationId: string, activityType: string, description: string, metadata?: any) {
    const { data, error } = await supabase
      .from('application_activities')
      .insert({
        application_id: applicationId,
        performed_by: (await supabase.auth.getUser()).data.user?.id,
        activity_type: activityType,
        description: description,
        metadata: metadata
      });

    if (error) throw error;
    return data;
  }
};
