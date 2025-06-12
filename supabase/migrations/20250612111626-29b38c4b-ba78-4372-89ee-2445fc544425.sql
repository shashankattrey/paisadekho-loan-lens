
-- Drop ALL policies that depend on the role column in profiles table
DO $$
BEGIN
    -- Drop all policies on loan_applications that reference profiles.role
    DROP POLICY IF EXISTS "Staff can view applications" ON loan_applications;
    DROP POLICY IF EXISTS "Staff can insert applications" ON loan_applications;
    DROP POLICY IF EXISTS "Staff can update applications" ON loan_applications;
    
    -- Drop all policies on other tables that might reference profiles.role
    DROP POLICY IF EXISTS "Staff can manage customers" ON customers;
    DROP POLICY IF EXISTS "Staff can manage documents" ON documents;
    DROP POLICY IF EXISTS "Staff can manage disbursements" ON disbursements;
    DROP POLICY IF EXISTS "Staff can view EMI schedule" ON emi_schedule;
    DROP POLICY IF EXISTS "Staff can manage collections" ON collections;
    DROP POLICY IF EXISTS "Staff can view activities" ON application_activities;
    
    -- Drop policies on profiles table
    DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
    
    -- Now safely update the column type
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
        -- First check if user_role enum exists
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
            CREATE TYPE user_role AS ENUM (
                'admin',
                'credit_officer', 
                'risk_manager',
                'collections_officer',
                'compliance_officer'
            );
        END IF;
        
        -- Update column type
        ALTER TABLE profiles ALTER COLUMN role TYPE user_role USING role::text::user_role;
    END IF;
END $$;

-- Drop existing function and trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create the trigger function with proper error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    user_role_value user_role;
BEGIN
    -- Safely cast the role with error handling
    BEGIN
        user_role_value := COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'credit_officer'::user_role);
    EXCEPTION WHEN OTHERS THEN
        user_role_value := 'credit_officer'::user_role;
    END;

    -- Insert the profile
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        user_role_value
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role;
    
    RETURN NEW;
END;
$function$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Recreate essential RLS policies
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Recreate role-based policies for loan applications
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
