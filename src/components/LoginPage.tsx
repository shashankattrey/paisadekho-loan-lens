
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle, Lock, Clock } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, resetPassword, loginSessions } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);

  const demoCredentials = [
    { role: 'Admin', email: 'admin@paisadekho.com', password: 'admin123', color: 'bg-red-100 text-red-800' },
    { role: 'Credit Officer', email: 'amit@paisadekho.com', password: 'credit123', color: 'bg-blue-100 text-blue-800' },
    { role: 'Risk Manager', email: 'priya@paisadekho.com', password: 'risk123', color: 'bg-orange-100 text-orange-800' },
    { role: 'Collections Officer', email: 'rahul@paisadekho.com', password: 'collect123', color: 'bg-green-100 text-green-800' },
    { role: 'Compliance Officer', email: 'sneha@paisadekho.com', password: 'comply123', color: 'bg-purple-100 text-purple-800' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await login(email, password, requires2FA ? otpCode : undefined);
      
      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else if (result.requires2FA) {
        setRequires2FA(true);
        setError('');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await resetPassword(resetEmail);
      if (result) {
        setSuccess('Password reset link sent to your email');
        setResetEmail('');
      } else {
        setError('Failed to send reset link');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError('');
    setRequires2FA(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <div className="flex flex-col justify-center space-y-8">
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Secure Access to Lending Operations
            </h2>
            <p className="text-gray-600 mb-8">
              Advanced role-based access control with 2FA security for comprehensive loan management, 
              risk assessment, and compliance monitoring.
            </p>
          </div>

          {/* Security Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Security Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Lock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">2FA Authentication</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Role-Based Access</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium">Session Tracking</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Eye className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Audit Logging</span>
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          {loginSessions.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Recent Login Activity</h4>
              <div className="space-y-2">
                {loginSessions.slice(-3).map((session) => (
                  <div key={session.sessionId} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {new Date(session.loginTime).toLocaleDateString()}
                    </span>
                    <Badge variant={session.isActive ? 'default' : 'secondary'}>
                      {session.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center">
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription>
                Access your NBFC admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="reset">Reset Password</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                          className="w-full pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {requires2FA && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          2FA Code
                        </label>
                        <Input
                          type="text"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                          required
                          className="w-full"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Enter the code from your authenticator app or use demo code: 123456
                        </p>
                      </div>
                    )}

                    {error && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {success && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">{success}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? 'Signing In...' : requires2FA ? 'Verify & Sign In' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="reset" className="space-y-4">
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full"
                      />
                    </div>

                    {error && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {success && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">{success}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Demo Credentials</CardTitle>
              <CardDescription>
                Click on any role to auto-fill login credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {demoCredentials.map((cred) => (
                  <button
                    key={cred.email}
                    onClick={() => fillDemoCredentials(cred.email, cred.password)}
                    className="text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className={cred.color}>
                          {cred.role}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{cred.email}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        Click to use
                      </div>
                    </div>
                  </button>
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
