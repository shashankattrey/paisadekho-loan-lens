import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Profile } from '@/services/database';

interface AuthContextType {
  user: (User & { profile?: Profile }) | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role?: string) => Promise<any>;
  signOut: () => Promise<void>;
  login: (email: string, password: string, otpCode?: string) => Promise<{ success: boolean; requires2FA?: boolean; message?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  loginSessions: Array<{ sessionId: string; loginTime: string; isActive: boolean }>;
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
  const [user, setUser] = useState<(User & { profile?: Profile }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginSessions] = useState<Array<{ sessionId: string; loginTime: string; isActive: boolean }>>([]);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await setUserWithProfile(session.user);
      }
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await setUserWithProfile(session.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const setUserWithProfile = async (authUser: User) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
      
      setUser({ ...authUser, profile: profile || undefined });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(authUser);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string, otpCode?: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: string = 'credit_officer') => {
    console.log('Attempting to sign up user:', { email, fullName, role });
    
    try {
      // First, let's try a simple signup without metadata to see if the basic auth works
      console.log('Trying signup with minimal data first...');
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          }
        }
      });

      if (error) {
        console.error('Signup error details:', {
          message: error.message,
          status: error.status,
          code: error.code,
          details: error
        });
        throw error;
      }

      console.log('Signup successful, checking response:', data);
      
      // Wait a moment for the trigger to complete
      if (data.user) {
        setTimeout(async () => {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();
            
            if (profileError) {
              console.error('Profile creation error:', profileError);
            } else {
              console.log('Profile created successfully:', profile);
            }
          } catch (err) {
            console.error('Error checking profile:', err);
          }
        }, 2000); // Wait longer for trigger to complete
      }

      return data;
    } catch (error: any) {
      console.error('Full signup error:', error);
      
      // Check if it's a specific trigger or database issue
      if (error.message?.includes('Database error saving new user')) {
        console.error('This appears to be a database trigger issue');
        
        // Try manual profile creation as fallback
        try {
          console.log('Attempting manual profile creation fallback...');
          const simpleSignup = await supabase.auth.signUp({
            email,
            password
          });
          
          if (simpleSignup.data.user && !simpleSignup.error) {
            console.log('Basic signup worked, creating profile manually...');
            
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: simpleSignup.data.user.id,
                email: email,
                full_name: fullName,
                role: role as any
              });
              
            if (profileError) {
              console.error('Manual profile creation failed:', profileError);
            } else {
              console.log('Manual profile creation successful');
            }
            
            return simpleSignup.data;
          }
        } catch (fallbackError) {
          console.error('Fallback attempt also failed:', fallbackError);
        }
      }
      
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  const logout = async () => {
    await signOut();
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return !error;
    } catch {
      return false;
    }
  };

  const hasPermission = (permission: string) => {
    if (!user?.profile) return false;

    const rolePermissions = {
      admin: ['all', 'users', 'loans', 'disbursement', 'risk', 'collections', 'kyc', 'reporting', 'analytics', 'underwriting', 'fraud'],
      credit_officer: ['loans', 'disbursement', 'kyc'],
      risk_manager: ['risk', 'analytics', 'underwriting'],
      collections_officer: ['collections'],
      compliance_officer: ['kyc', 'reporting', 'fraud']
    };

    const userRole = user.profile.role;
    const permissions = rolePermissions[userRole] || [];
    
    return permissions.includes(permission) || permissions.includes('all');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    login,
    logout,
    resetPassword,
    loginSessions,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
