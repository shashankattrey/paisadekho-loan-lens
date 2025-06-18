
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Settings, LogOut, User, Shield } from "lucide-react";

const Header = () => {
  const { user, signOut } = useAuth();

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'bg-red-100 text-red-800 border-red-300',
      credit_officer: 'bg-blue-100 text-blue-800 border-blue-300',
      risk_manager: 'bg-orange-100 text-orange-800 border-orange-300',
      collections_officer: 'bg-green-100 text-green-800 border-green-300',
      compliance_officer: 'bg-purple-100 text-purple-800 border-purple-300',
    };
    return variants[role as keyof typeof variants] || variants.credit_officer;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!user) return null;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Paisadekho Admin</h1>
            <p className="text-sm text-gray-600">NBFC Management Portal</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 px-3 py-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {getInitials(user.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-medium text-sm">{user.full_name}</div>
                  <Badge className={`text-xs ${getRoleBadge(user.role)}`}>
                    {user.role.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <div className="font-medium">{user.full_name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
