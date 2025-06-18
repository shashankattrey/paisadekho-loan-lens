
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  phone?: string;
  is_active?: boolean;
  employee_id?: string;
}

interface AuthContextType {
  user: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInAsUser: (userId: string) => Promise<void>;
  signOut: () => void;
  availableUsers: Profile[];
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [availableUsers, setAvailableUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all available users from profiles table
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('is_active', true);

        if (error) {
          console.error('Error fetching users:', error);
        } else {
          setAvailableUsers(data || []);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    // Check if user was previously signed in
    const savedUserId = localStorage.getItem('selectedUserId');
    if (savedUserId) {
      signInAsUser(savedUserId);
    }
  }, []);

  const signInAsUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user:', error);
        return;
      }

      setUser(data);
      localStorage.setItem('selectedUserId', userId);
    } catch (error) {
      console.error('Error signing in as user:', error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('selectedUserId');
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;

    const rolePermissions = {
      admin: ['all', 'users', 'loans', 'disbursement', 'risk', 'collections', 'kyc', 'reporting', 'analytics', 'underwriting', 'fraud'],
      credit_officer: ['loans', 'disbursement', 'kyc'],
      risk_manager: ['risk', 'analytics', 'underwriting'],
      collections_officer: ['collections'],
      compliance_officer: ['kyc', 'reporting', 'fraud']
    };

    const userRole = user.role;
    const permissions = rolePermissions[userRole as keyof typeof rolePermissions] || [];
    
    return permissions.includes(permission) || permissions.includes('all');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signInAsUser,
    signOut,
    availableUsers,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
