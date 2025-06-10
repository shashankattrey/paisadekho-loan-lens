
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for better data integrity
CREATE TYPE user_role AS ENUM ('admin', 'credit_officer', 'risk_manager', 'collections_officer', 'compliance_officer');
CREATE TYPE application_status AS ENUM ('submitted', 'in_review', 'approved', 'rejected', 'disbursed', 'closed');
CREATE TYPE kyc_status AS ENUM ('pending', 'verified', 'failed', 'expired');
CREATE TYPE document_type AS ENUM ('pan', 'aadhaar', 'bank_statement', 'gst_certificate', 'business_proof', 'address_proof');
CREATE TYPE loan_purpose AS ENUM ('working_capital', 'inventory_purchase', 'equipment_purchase', 'shop_expansion', 'business_growth');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'overdue');
CREATE TYPE priority_level AS ENUM ('low', 'normal', 'high', 'urgent');

-- User profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'credit_officer',
    employee_id TEXT UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Customers table
CREATE TABLE public.customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT NOT NULL,
    aadhaar_number TEXT,
    pan_number TEXT,
    address JSONB, -- {street, city, state, pincode}
    business_name TEXT,
    business_type TEXT,
    business_vintage INTEGER, -- in months
    monthly_income DECIMAL(12,2),
    cibil_score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Loan applications table
CREATE TABLE public.loan_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_number TEXT UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL,
    tenure INTEGER NOT NULL, -- in months
    purpose loan_purpose NOT NULL,
    status application_status DEFAULT 'submitted',
    priority priority_level DEFAULT 'normal',
    assigned_to UUID REFERENCES profiles(id),
    risk_score DECIMAL(3,2),
    approved_amount DECIMAL(12,2),
    interest_rate DECIMAL(5,2),
    processing_fee DECIMAL(10,2),
    kyc_status kyc_status DEFAULT 'pending',
    vkyc_status kyc_status DEFAULT 'pending',
    rejection_reason TEXT,
    approval_conditions TEXT[],
    disbursement_date TIMESTAMP WITH TIME ZONE,
    maturity_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table
CREATE TABLE public.documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES loan_applications(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    is_verified BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES profiles(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disbursements table
CREATE TABLE public.disbursements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES loan_applications(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL,
    bank_account_number TEXT NOT NULL,
    ifsc_code TEXT NOT NULL,
    beneficiary_name TEXT NOT NULL,
    transaction_id TEXT UNIQUE,
    payment_status payment_status DEFAULT 'pending',
    disbursed_by UUID REFERENCES profiles(id),
    disbursed_at TIMESTAMP WITH TIME ZONE,
    failure_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EMI schedule table
CREATE TABLE public.emi_schedule (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES loan_applications(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    emi_number INTEGER NOT NULL,
    due_date DATE NOT NULL,
    principal_amount DECIMAL(12,2) NOT NULL,
    interest_amount DECIMAL(12,2) NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    outstanding_balance DECIMAL(12,2) NOT NULL,
    is_paid BOOLEAN DEFAULT false,
    paid_amount DECIMAL(12,2) DEFAULT 0,
    paid_date TIMESTAMP WITH TIME ZONE,
    payment_method TEXT,
    late_fee DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collections tracking table
CREATE TABLE public.collections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    application_id UUID NOT NULL REFERENCES loan_applications(id) ON DELETE CASCADE,
    emi_id UUID REFERENCES emi_schedule(id),
    amount DECIMAL(12,2) NOT NULL,
    collection_date DATE NOT NULL,
    payment_mode TEXT NOT NULL,
    reference_number TEXT,
    collected_by UUID REFERENCES profiles(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Application activity log
CREATE TABLE public.application_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES loan_applications(id) ON DELETE CASCADE,
    performed_by UUID REFERENCES profiles(id),
    activity_type TEXT NOT NULL,
    description TEXT NOT NULL,
    old_status application_status,
    new_status application_status,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System notifications
CREATE TABLE public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL, -- 'info', 'warning', 'error', 'success'
    is_read BOOLEAN DEFAULT false,
    reference_id UUID, -- can reference application_id or other entities
    reference_type TEXT, -- 'application', 'disbursement', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disbursements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emi_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for loan applications (role-based access)
CREATE POLICY "Staff can view applications" ON public.loan_applications
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'credit_officer', 'risk_manager', 'collections_officer', 'compliance_officer')
        )
    );

CREATE POLICY "Staff can insert applications" ON public.loan_applications
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'credit_officer')
        )
    );

CREATE POLICY "Staff can update applications" ON public.loan_applications
    FOR UPDATE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'credit_officer', 'risk_manager')
        )
    );

-- Similar policies for other tables (customers, documents, etc.)
CREATE POLICY "Staff can manage customers" ON public.customers
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'credit_officer', 'collections_officer')
        )
    );

CREATE POLICY "Staff can manage documents" ON public.documents
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'credit_officer', 'compliance_officer')
        )
    );

CREATE POLICY "Staff can manage disbursements" ON public.disbursements
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'credit_officer')
        )
    );

CREATE POLICY "Staff can view EMI schedule" ON public.emi_schedule
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'credit_officer', 'collections_officer')
        )
    );

CREATE POLICY "Staff can manage collections" ON public.collections
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'collections_officer')
        )
    );

CREATE POLICY "Staff can view activities" ON public.application_activities
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'credit_officer', 'risk_manager', 'collections_officer', 'compliance_officer')
        )
    );

CREATE POLICY "Users can view their notifications" ON public.notifications
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "System can insert notifications" ON public.notifications
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_loan_applications_customer_id ON public.loan_applications(customer_id);
CREATE INDEX idx_loan_applications_status ON public.loan_applications(status);
CREATE INDEX idx_loan_applications_assigned_to ON public.loan_applications(assigned_to);
CREATE INDEX idx_loan_applications_created_at ON public.loan_applications(created_at);
CREATE INDEX idx_documents_application_id ON public.documents(application_id);
CREATE INDEX idx_emi_schedule_application_id ON public.emi_schedule(application_id);
CREATE INDEX idx_emi_schedule_due_date ON public.emi_schedule(due_date);
CREATE INDEX idx_collections_customer_id ON public.collections(customer_id);
CREATE INDEX idx_application_activities_application_id ON public.application_activities(application_id);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loan_applications_updated_at BEFORE UPDATE ON public.loan_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'credit_officer')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to generate application numbers
CREATE OR REPLACE FUNCTION generate_application_number()
RETURNS TEXT AS $$
DECLARE
    app_number TEXT;
    year_suffix TEXT;
    sequence_num INTEGER;
BEGIN
    year_suffix := TO_CHAR(NOW(), 'YY');
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(application_number FROM 4) AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM loan_applications
    WHERE application_number LIKE 'APP' || year_suffix || '%';
    
    app_number := 'APP' || year_suffix || LPAD(sequence_num::TEXT, 6, '0');
    
    RETURN app_number;
END;
$$ LANGUAGE plpgsql;

-- Function to create EMI schedule
CREATE OR REPLACE FUNCTION create_emi_schedule(
    p_application_id UUID,
    p_customer_id UUID,
    p_principal DECIMAL,
    p_rate DECIMAL,
    p_tenure INTEGER
) RETURNS VOID AS $$
DECLARE
    emi_amount DECIMAL;
    monthly_rate DECIMAL;
    balance DECIMAL;
    principal_part DECIMAL;
    interest_part DECIMAL;
    i INTEGER;
    due_date DATE;
BEGIN
    monthly_rate := p_rate / 100 / 12;
    emi_amount := p_principal * monthly_rate * POWER(1 + monthly_rate, p_tenure) / (POWER(1 + monthly_rate, p_tenure) - 1);
    balance := p_principal;
    
    FOR i IN 1..p_tenure LOOP
        due_date := (SELECT disbursement_date::DATE + INTERVAL '1 month' * i FROM loan_applications WHERE id = p_application_id);
        interest_part := balance * monthly_rate;
        principal_part := emi_amount - interest_part;
        balance := balance - principal_part;
        
        INSERT INTO emi_schedule (
            application_id, customer_id, emi_number, due_date,
            principal_amount, interest_amount, total_amount, outstanding_balance
        ) VALUES (
            p_application_id, p_customer_id, i, due_date,
            principal_part, interest_part, emi_amount, balance
        );
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage policies for documents
CREATE POLICY "Authenticated users can upload documents" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Authenticated users can view documents" ON storage.objects
    FOR SELECT TO authenticated
    USING (bucket_id = 'documents');

CREATE POLICY "Authenticated users can update documents" ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = 'documents');
