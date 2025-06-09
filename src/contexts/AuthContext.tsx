
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
  is2FAEnabled: boolean;
  loginAttempts: number;
  isLocked: boolean;
  lockoutTime?: string;
}

interface LoginSession {
  sessionId: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
  loginTime: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, otp?: string) => Promise<{ success: boolean; requires2FA?: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  enable2FA: () => Promise<string>; // Returns QR code
  verify2FA: (token: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  loginSessions: LoginSession[];
  terminateSession: (sessionId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers = [
  {
    id: 'ADM001',
    name: 'System Administrator',
    email: 'admin@paisadekho.com',
    password: 'admin123',
    role: 'admin',
    permissions: ['all'],
    lastLogin: new Date().toISOString(),
    isActive: true,
    is2FAEnabled: false,
    loginAttempts: 0,
    isLocked: false,
  },
  {
    id: 'CRO001',
    name: 'Amit Sharma',
    email: 'amit@paisadekho.com',
    password: 'credit123',
    role: 'credit_officer',
    permissions: ['loans', 'underwriting', 'kyc', 'disbursement'],
    lastLogin: new Date().toISOString(),
    isActive: true,
    is2FAEnabled: false,
    loginAttempts: 0,
    isLocked: false,
  },
  {
    id: 'RSK001',
    name: 'Priya Singh',
    email: 'priya@paisadekho.com',
    password: 'risk123',
    role: 'risk_manager',
    permissions: ['risk', 'underwriting', 'loans', 'analytics', 'fraud'],
    lastLogin: new Date().toISOString(),
    isActive: true,
    is2FAEnabled: false,
    loginAttempts: 0,
    isLocked: false,
  },
  {
    id: 'COL001',
    name: 'Rahul Verma',
    email: 'rahul@paisadekho.com',
    password: 'collect123',
    role: 'collections_officer',
    permissions: ['collections', 'disbursement', 'repayment'],
    lastLogin: new Date().toISOString(),
    isActive: true,
    is2FAEnabled: false,
    loginAttempts: 0,
    isLocked: false,
  },
  {
    id: 'COM001',
    name: 'Sneha Patel',
    email: 'sneha@paisadekho.com',
    password: 'comply123',
    role: 'compliance_officer',
    permissions: ['kyc', 'compliance', 'reporting', 'audit'],
    lastLogin: new Date().toISOString(),
    isActive: true,
    is2FAEnabled: false,
    loginAttempts: 0,
    isLocked: false,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginSessions, setLoginSessions] = useState<LoginSession[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('paisadekho_user');
    const storedSessions = localStorage.getItem('paisadekho_sessions');
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    
    if (storedSessions) {
      setLoginSessions(JSON.parse(storedSessions));
    }
  }, []);

  const login = async (email: string, password: string, otp?: string): Promise<{ success: boolean; requires2FA?: boolean; message?: string }> => {
    const foundUser = mockUsers.find(u => u.email === email && u.isActive);
    
    if (!foundUser) {
      return { success: false, message: 'Invalid credentials' };
    }

    if (foundUser.isLocked) {
      return { success: false, message: 'Account is locked due to multiple failed attempts' };
    }

    if (foundUser.password !== password) {
      // Increment login attempts
      foundUser.loginAttempts += 1;
      if (foundUser.loginAttempts >= 5) {
        foundUser.isLocked = true;
        foundUser.lockoutTime = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 min lockout
      }
      return { success: false, message: 'Invalid credentials' };
    }

    // Check 2FA if enabled
    if (foundUser.is2FAEnabled && !otp) {
      return { success: false, requires2FA: true, message: 'Please enter your 2FA code' };
    }

    if (foundUser.is2FAEnabled && otp) {
      // In a real app, verify OTP against stored secret
      if (otp !== '123456') { // Mock verification
        return { success: false, message: 'Invalid 2FA code' };
      }
    }

    // Reset login attempts on successful login
    foundUser.loginAttempts = 0;
    foundUser.isLocked = false;

    const userWithoutPassword = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      permissions: foundUser.permissions,
      lastLogin: new Date().toISOString(),
      isActive: foundUser.isActive,
      is2FAEnabled: foundUser.is2FAEnabled,
      loginAttempts: foundUser.loginAttempts,
      isLocked: foundUser.isLocked,
    };

    // Create session
    const newSession: LoginSession = {
      sessionId: Math.random().toString(36).substr(2, 9),
      userId: foundUser.id,
      ipAddress: '192.168.1.1', // Mock IP
      userAgent: navigator.userAgent,
      loginTime: new Date().toISOString(),
      isActive: true,
    };

    const updatedSessions = [...loginSessions, newSession];
    setLoginSessions(updatedSessions);
    localStorage.setItem('paisadekho_sessions', JSON.stringify(updatedSessions));
    
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem('paisadekho_user', JSON.stringify(userWithoutPassword));
    
    return { success: true, message: 'Login successful' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('paisadekho_user');
    
    // Mark current session as inactive
    const updatedSessions = loginSessions.map(session => 
      session.userId === user?.id ? { ...session, isActive: false } : session
    );
    setLoginSessions(updatedSessions);
    localStorage.setItem('paisadekho_sessions', JSON.stringify(updatedSessions));
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes('all') || user.permissions.includes(permission);
  };

  const enable2FA = async (): Promise<string> => {
    // In a real app, generate QR code for authenticator app
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  };

  const verify2FA = async (token: string): Promise<boolean> => {
    // Mock verification - in real app, verify against TOTP
    return token === '123456';
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Mock password reset
    console.log(`Password reset requested for: ${email}`);
    return true;
  };

  const terminateSession = (sessionId: string) => {
    const updatedSessions = loginSessions.map(session => 
      session.sessionId === sessionId ? { ...session, isActive: false } : session
    );
    setLoginSessions(updatedSessions);
    localStorage.setItem('paisadekho_sessions', JSON.stringify(updatedSessions));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      hasPermission,
      enable2FA,
      verify2FA,
      resetPassword,
      loginSessions,
      terminateSession,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
