
-- Remove the foreign key constraint from profiles to auth.users
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Make the id column just a regular UUID (not tied to auth.users)
ALTER TABLE profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Clear existing profiles and insert sample users
DELETE FROM profiles;

-- Insert sample user profiles for role selection
INSERT INTO profiles (id, email, full_name, role) VALUES 
(gen_random_uuid(), 'admin@paisadekho.com', 'Admin User', 'admin'),
(gen_random_uuid(), 'credit@paisadekho.com', 'Credit Officer', 'credit_officer'),
(gen_random_uuid(), 'risk@paisadekho.com', 'Risk Manager', 'risk_manager'),
(gen_random_uuid(), 'collections@paisadekho.com', 'Collections Officer', 'collections_officer'),
(gen_random_uuid(), 'compliance@paisadekho.com', 'Compliance Officer', 'compliance_officer');
