import React, { useContext, useEffect, useState } from 'react';
import { Users, Activity, UserCheck, Menu, X, LogOut, Home, BarChart3, Settings, User } from 'lucide-react';
import { AuthContext } from '../AuthContext';
import { toast } from 'react-toastify';
import { Zap } from 'lucide-react';

export default function DashboardPage() {
 const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout, user } = useContext(AuthContext); 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://task-pilot-server-iota.vercel.app/api/users');
        const result = await response.json();
        if (result.success) {
          setUsers(result.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);


  console.log(loading)


const today = new Date();
const formattedDate = today.toISOString().split('T')[0];

  const currentUser = {
    name: User ? user.name : 'Sarah Johnson',
    email: User ? user.email : 'sarah.johnson@example.com',
    created_at: formattedDate,
    role: 'Administrator'
  };

  console.log('Current User:', currentUser);
  
  const stats = {
    totalUsers: users.length,
    activeToday: users.filter(u => u.status === 'Active').length,
    newThisWeek: 2
  };

  const handleLogout = () => {
  logout();
  toast.success('Logged out successfully!');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white/5 backdrop-blur-xl border-r border-white/10 text-white transition-all duration-300 overflow-hidden relative z-10`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold">FlowSync</h1>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 hover:from-cyan-500/30 hover:to-purple-600/30 transition">
              <Home size={20} />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition">
              <Users size={20} />
              <span>Users</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition">
              <BarChart3 size={20} />
              <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition">
              <Settings size={20} />
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Navbar */}
        <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-xl transition text-white"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-xl font-semibold text-white">User Management</h2>
            </div>
            
            <div className="flex items-center gap-4">
              {currentUser && (
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{currentUser.name}</p>
                  <p className="text-xs text-purple-200">{currentUser.role}</p>
                </div>
              )}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white rounded-xl transition shadow-lg shadow-red-500/30"
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
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mb-6 text-white border border-white/20">
              <h3 className="text-lg font-semibold mb-4">Logged-in User Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-purple-200 text-sm">Name</p>
                  <p className="text-xl font-semibold">{currentUser.name}</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Email</p>
                  <p className="text-xl font-semibold">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Registration Date</p>
                  <p className="text-xl font-semibold">{currentUser.created_at}</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Role</p>
                  <p className="text-xl font-semibold">{currentUser.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/10 hover:bg-white/10 transition group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-400/30 group-hover:scale-110 transition-transform">
                  <Users className="text-cyan-400" size={28} />
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/10 hover:bg-white/10 transition group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Active Today</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.activeToday}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/30 group-hover:scale-110 transition-transform">
                  <UserCheck className="text-green-400" size={28} />
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/10 hover:bg-white/10 transition group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">New This Week</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.newThisWeek}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30 group-hover:scale-110 transition-transform">
                  <Activity className="text-purple-400" size={28} />
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Registered Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase">Registration Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-sm text-white">{user.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-white">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-purple-200">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-purple-200">{new Date(user.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-400/30">
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