
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Users,
  UserPlus,
  Settings,
  Shield,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  Activity,
} from "lucide-react";

interface UserManagementProps {
  userRole: string;
}

const mockUsers = [
  {
    id: 'USR001',
    name: 'Amit Sharma',
    email: 'amit.sharma@paisadekho.com',
    phone: '+91 98765 43210',
    role: 'credit_officer',
    status: 'active',
    lastLogin: '2024-01-20 14:30',
    createdDate: '2023-06-15',
    permissions: ['loans', 'underwriting', 'kyc'],
    loginCount: 145,
  },
  {
    id: 'USR002',
    name: 'Priya Singh',
    email: 'priya.singh@paisadekho.com',
    phone: '+91 87654 32109',
    role: 'collections_officer',
    status: 'active',
    lastLogin: '2024-01-20 09:15',
    createdDate: '2023-08-22',
    permissions: ['collections', 'disbursement'],
    loginCount: 98,
  },
  {
    id: 'USR003',
    name: 'Rahul Verma',
    email: 'rahul.verma@paisadekho.com',
    phone: '+91 76543 21098',
    role: 'risk_manager',
    status: 'inactive',
    lastLogin: '2024-01-18 16:45',
    createdDate: '2023-04-10',
    permissions: ['risk', 'underwriting', 'loans'],
    loginCount: 67,
  },
  {
    id: 'USR004',
    name: 'Sneha Patel',
    email: 'sneha.patel@paisadekho.com',
    phone: '+91 65432 10987',
    role: 'compliance_officer',
    status: 'active',
    lastLogin: '2024-01-19 11:20',
    createdDate: '2023-09-05',
    permissions: ['kyc', 'compliance', 'reporting'],
    loginCount: 123,
  },
];

const rolePermissions = {
  admin: ['all'],
  credit_officer: ['loans', 'underwriting', 'kyc'],
  risk_manager: ['risk', 'underwriting', 'loans'],
  collections_officer: ['collections', 'disbursement'],
  compliance_officer: ['kyc', 'compliance', 'reporting'],
};

const UserManagement: React.FC<UserManagementProps> = ({ userRole }) => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

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

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const canManageUsers = userRole === 'admin';

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const user = {
        id: `USR${String(users.length + 1).padStart(3, '0')}`,
        ...newUser,
        status: 'active',
        lastLogin: 'Never',
        createdDate: new Date().toISOString().split('T')[0],
        permissions: rolePermissions[newUser.role as keyof typeof rolePermissions] || [],
        loginCount: 0,
      };
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', phone: '', role: '' });
      setIsAddUserOpen(false);
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const userStats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Users',
      value: users.filter(u => u.status === 'active').length,
      icon: Activity,
      color: 'bg-green-500',
    },
    {
      title: 'Roles',
      value: new Set(users.map(u => u.role)).size,
      icon: Shield,
      color: 'bg-purple-500',
    },
    {
      title: 'Today\'s Logins',
      value: 8,
      icon: Calendar,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage user accounts, roles, and permissions for the NBFC platform
          </p>
        </div>
        <div className="flex space-x-2">
          {canManageUsers && (
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account for the NBFC platform
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit_officer">Credit Officer</SelectItem>
                        <SelectItem value="risk_manager">Risk Manager</SelectItem>
                        <SelectItem value="collections_officer">Collections Officer</SelectItem>
                        <SelectItem value="compliance_officer">Compliance Officer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser}>
                      Create User
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {userStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded-lg text-white`}>
                  <IconComponent className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="credit_officer">Credit Officer</SelectItem>
                <SelectItem value="risk_manager">Risk Manager</SelectItem>
                <SelectItem value="collections_officer">Collections Officer</SelectItem>
                <SelectItem value="compliance_officer">Compliance Officer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Accounts ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name & Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Login Count</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {user.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadge(user.role)}>
                      {user.role.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(user.status)}>
                      {user.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>{user.loginCount}</TableCell>
                  <TableCell>{user.createdDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>User Details - {selectedUser?.name}</DialogTitle>
                            <DialogDescription>
                              Complete user information and permissions
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedUser && (
                            <div className="space-y-6 mt-4">
                              <div className="grid grid-cols-2 gap-6">
                                <div>
                                  <h3 className="font-semibold mb-3">Personal Information</h3>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>Name:</strong> {selectedUser.name}</div>
                                    <div><strong>Email:</strong> {selectedUser.email}</div>
                                    <div><strong>Phone:</strong> {selectedUser.phone}</div>
                                    <div><strong>User ID:</strong> {selectedUser.id}</div>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-3">Account Information</h3>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>Role:</strong> 
                                      <Badge className={`ml-2 ${getRoleBadge(selectedUser.role)}`}>
                                        {selectedUser.role.replace('_', ' ').toUpperCase()}
                                      </Badge>
                                    </div>
                                    <div><strong>Status:</strong> 
                                      <Badge className={`ml-2 ${getStatusBadge(selectedUser.status)}`}>
                                        {selectedUser.status.toUpperCase()}
                                      </Badge>
                                    </div>
                                    <div><strong>Created:</strong> {selectedUser.createdDate}</div>
                                    <div><strong>Last Login:</strong> {selectedUser.lastLogin}</div>
                                    <div><strong>Login Count:</strong> {selectedUser.loginCount}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="font-semibold mb-3">Permissions</h3>
                                <div className="flex flex-wrap gap-2">
                                  {selectedUser.permissions.map((permission: string, index: number) => (
                                    <Badge key={index} variant="secondary">
                                      {permission.charAt(0).toUpperCase() + permission.slice(1)}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              {canManageUsers && (
                                <div className="flex items-center justify-between pt-4 border-t">
                                  <div className="flex items-center space-x-2">
                                    <Switch 
                                      checked={selectedUser.status === 'active'}
                                      onCheckedChange={() => toggleUserStatus(selectedUser.id)}
                                    />
                                    <Label>Account Active</Label>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      <Edit className="w-4 h-4 mr-1" />
                                      Edit
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Settings className="w-4 h-4 mr-1" />
                                      Reset Password
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {canManageUsers && (
                        <>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => toggleUserStatus(user.id)}>
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
