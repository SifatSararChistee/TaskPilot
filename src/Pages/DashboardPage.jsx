import React, { useState } from 'react';
import { Users, Activity, UserCheck, Menu, X, LogOut, Home, BarChart3, Settings } from 'lucide-react';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Simulated database data - replace with actual API calls
  const mockUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', registrationDate: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Michael Chen', email: 'michael.chen@example.com', registrationDate: '2024-02-20', status: 'Active' },
    { id: 3, name: 'Emma Davis', email: 'emma.davis@example.com', registrationDate: '2024-03-10', status: 'Active' },
    { id: 4, name: 'James Wilson', email: 'james.wilson@example.com', registrationDate: '2024-04-05', status: 'Inactive' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.anderson@example.com', registrationDate: '2024-05-12', status: 'Active' }
  ];
  
  const currentUser = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    registrationDate: '2024-01-15',
    role: 'Administrator'
  };
  
  const stats = {
    totalUsers: mockUsers.length,
    activeToday: mockUsers.filter(u => u.status === 'Active').length,
    newThisWeek: 2
  };

  const handleLogout = () => {
    alert('Logging out...');
    // Add your logout logic here
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gradient-to-b from-indigo-600 to-indigo-800 text-white transition-all duration-300 overflow-hidden`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-indigo-700 hover:bg-indigo-500 transition">
              <Home size={20} />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-700 transition">
              <Users size={20} />
              <span>Users</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-700 transition">
              <BarChart3 size={20} />
              <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-700 transition">
              <Settings size={20} />
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
            </div>
            
            <div className="flex items-center gap-4">
              {currentUser && (
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.role}</p>
                </div>
              )}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Current User Card */}
          {currentUser && (
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 mb-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Logged-in User Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-purple-100 text-sm">Name</p>
                  <p className="text-xl font-semibold">{currentUser.name}</p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Email</p>
                  <p className="text-xl font-semibold">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Registration Date</p>
                  <p className="text-xl font-semibold">{new Date(currentUser.registrationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Role</p>
                  <p className="text-xl font-semibold">{currentUser.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="text-blue-600" size={28} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Active Today</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stats.activeToday}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <UserCheck className="text-green-600" size={28} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">New This Week</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stats.newThisWeek}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Activity className="text-purple-600" size={28} />
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Registered Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-800">{user.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(user.registrationDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}