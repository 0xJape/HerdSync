import React, { useState } from 'react';
import { UserPlus, Edit2, Trash2, Search, CheckCircle, X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  dateAdded: string;
  lastLogin: string;
}

export default function ManageUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock user data
  const [users, setUsers] = useState<User[]>([
    {
      id: 'U-001',
      name: 'Doc Alexis',
      email: 'alexis.vet@herdsync.com',
      role: 'Admin',
      status: 'Active',
      dateAdded: '2024-01-15',
      lastLogin: '2 hours ago'
    },
    {
      id: 'U-002',
      name: 'Maria Santos',
      email: 'maria.santos@herdsync.com',
      role: 'Veterinarian',
      status: 'Active',
      dateAdded: '2024-02-20',
      lastLogin: '1 day ago'
    },
    {
      id: 'U-003',
      name: 'Juan Dela Cruz',
      email: 'juan.delacruz@herdsync.com',
      role: 'Farm Manager',
      status: 'Active',
      dateAdded: '2024-03-10',
      lastLogin: '3 days ago'
    },
    {
      id: 'U-004',
      name: 'Pedro Reyes',
      email: 'pedro.reyes@herdsync.com',
      role: 'Viewer',
      status: 'Inactive',
      dateAdded: '2024-01-25',
      lastLogin: '2 weeks ago'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser: User = {
      id: `U-${String(users.length + 1).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'Active',
      dateAdded: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };

    setUsers([...users, newUser]);
    setSuccessMessage(`User ${formData.name} has been added successfully!`);
    setShowSuccessModal(true);
    setShowAddModal(false);
    setFormData({ name: '', email: '', role: '', password: '', confirmPassword: '' });

    // Log activity
    console.log('Activity Log:', {
      type: 'User Added',
      userId: newUser.id,
      userName: newUser.name,
      timestamp: new Date().toLocaleString(),
      performedBy: 'Doc Alexis'
    });
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, name: formData.name, email: formData.email, role: formData.role }
          : user
      ));

      setSuccessMessage(`User ${formData.name} has been updated successfully!`);
      setShowSuccessModal(true);
      setShowEditModal(false);
      setSelectedUser(null);
      setFormData({ name: '', email: '', role: '', password: '', confirmPassword: '' });

      // Log activity
      console.log('Activity Log:', {
        type: 'User Updated',
        userId: selectedUser.id,
        userName: formData.name,
        timestamp: new Date().toLocaleString(),
        performedBy: 'Doc Alexis'
      });
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setSuccessMessage(`User ${selectedUser.name} has been removed from the system.`);
      setShowSuccessModal(true);
      setShowDeleteModal(false);

      // Log activity
      console.log('Activity Log:', {
        type: 'User Deleted',
        userId: selectedUser.id,
        userName: selectedUser.name,
        timestamp: new Date().toLocaleString(),
        performedBy: 'Doc Alexis'
      });

      setSelectedUser(null);
    }
  };

  const toggleUserStatus = (user: User) => {
    setUsers(users.map(u => 
      u.id === user.id 
        ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
        : u
    ));

    // Log activity
    console.log('Activity Log:', {
      type: 'User Status Changed',
      userId: user.id,
      userName: user.name,
      newStatus: user.status === 'Active' ? 'Inactive' : 'Active',
      timestamp: new Date().toLocaleString(),
      performedBy: 'Doc Alexis'
    });
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: '',
      confirmPassword: ''
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Manage Users</h1>
          <p className="text-sm text-slate-600 mt-1">Add, edit, or remove system users</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
        >
          <UserPlus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-slate-900">{user.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-900">{user.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-600">{user.email}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleUserStatus(user)}
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                          user.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-600">{user.lastLogin}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Edit user"
                        >
                          <Edit2 size={16} />
                        </button>
                        {user.role !== 'Admin' && (
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                            title="Delete user"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Add New User</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({ name: '', email: '', role: '', password: '', confirmPassword: '' });
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Juan Dela Cruz"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jalelprincegayo@herdsync.com"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Farm Manager">Farm Manager</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ name: '', email: '', role: '', password: '', confirmPassword: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Edit User</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                  setFormData({ name: '', email: '', role: '', password: '', confirmPassword: '' });
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Farm Manager">Farm Manager</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                    setFormData({ name: '', email: '', role: '', password: '', confirmPassword: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete User</h3>
              <p className="text-sm text-slate-600 mb-4">
                Are you sure you want to remove <span className="font-semibold">{selectedUser.name}</span> from the system? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center animate-fade-in">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Success!</h3>
            <p className="text-sm text-slate-600 mb-4">{successMessage}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
