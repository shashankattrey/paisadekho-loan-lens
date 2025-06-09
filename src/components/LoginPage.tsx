
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, EyeOff, Lock, User, Mail } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin@paisadekho.com', password: 'admin123', color: 'bg-red-100 text-red-800' },
    { role: 'Credit Officer', email: 'amit@paisadekho.com', password: 'credit123', color: 'bg-blue-100 text-blue-800' },
    { role: 'Risk Manager', email: 'priya@paisadekho.com', password: 'risk123', color: 'bg-orange-100 text-orange-800' },
    { role: 'Collections Officer', email: 'rahul@paisadekho.com', password: 'collect123', color: 'bg-green-100 text-green-800' },
    { role: 'Compliance Officer', email: 'sneha@paisadekho.com', password: 'comply123', color: 'bg-purple-100 text-purple-800' },
  ];

  const fillCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start mb-6">
            <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Paisadekho</h1>
              <p className="text-blue-600 font-semibold">NBFC Admin Portal</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Secure access to your lending operations dashboard
          </p>
          
          {/* Features */}
          <div className="space-y-4 text-left">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-700">Role-based access control</span>
            </div>
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-gray-700">Secure authentication</span>
            </div>
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-gray-700">Advanced permissions</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="space-y-6">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">Demo Credentials</CardTitle>
              <CardDescription>
                Click on any role to auto-fill login credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {demoCredentials.map((cred, index) => (
                  <div 
                    key={index}
                    onClick={() => fillCredentials(cred.email, cred.password)}
                    className="cursor-pointer p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className={cred.color}>
                          {cred.role}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{cred.email}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        Click to use
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
