
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
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
  },
  {
    id: 'CRO001',
    name: 'Amit Sharma',
    email: 'amit@paisadekho.com',
    password: 'credit123',
    role: 'credit_officer',
    permissions: ['loans', 'underwriting', 'kyc'],
    lastLogin: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'RSK001',
    name: 'Priya Singh',
    email: 'priya@paisadekho.com',
    password: 'risk123',
    role: 'risk_manager',
    permissions: ['risk', 'underwriting', 'loans', 'analytics'],
    lastLogin: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'COL001',
    name: 'Rahul Verma',
    email: 'rahul@paisadekho.com',
    password: 'collect123',
    role: 'collections_officer',
    permissions: ['collections', 'disbursement'],
    lastLogin: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'COM001',
    name: 'Sneha Patel',
    email: 'sneha@paisadekho.com',
    password: 'comply123',
    role: 'compliance_officer',
    permissions: ['kyc', 'compliance', 'reporting'],
    lastLogin: new Date().toISOString(),
    isActive: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('paisadekho_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password && u.isActive);
    
    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        permissions: foundUser.permissions,
        lastLogin: new Date().toISOString(),
        isActive: foundUser.isActive,
      };
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('paisadekho_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('paisadekho_user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes('all') || user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      hasPermission,
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
