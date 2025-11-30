import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Livestock from './pages/Livestock';
import LivestockProfile from './pages/LivestockProfile';
import AddLivestock from './pages/AddLivestock';
import Breeding from './pages/Breeding';
import BreedingOverview from './pages/BreedingOverview';
import BreedingRecordDetail from './pages/BreedingRecordDetail';
import Vaccination from './pages/Vaccination';
import Reports from './pages/Reports';
import ManageUsers from './pages/ManageUsers';
import Pregnancy from './pages/Pregnancy';
import PregnancyDetail from './pages/PregnancyDetail';
import Sidebar from './components/Sidebar';

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-slate-50">
      {!isHomePage && !isAuthPage && <Sidebar />}
      
      <main className={`${!isHomePage && !isAuthPage ? 'ml-64' : ''} transition-all duration-300`}>
        {!isHomePage && !isAuthPage && (
          <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
            <div className="px-8 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-slate-900">
                  {getPageTitle(location.pathname)}
                </h1>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search"
                    className="w-64 pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 focus:bg-white transition-all"
                  />
                  <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                  <img 
                    src="/images/main_logo.png" 
                    alt="User" 
                    className="w-9 h-9 rounded-lg object-contain"
                  />
                </button>
              </div>
            </div>
          </header>
        )}

        <div className={`${!isHomePage && !isAuthPage ? 'p-8' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/livestock" element={<Livestock />} />
            <Route path="/livestock/add" element={<AddLivestock />} />
            <Route path="/livestock/:id" element={<LivestockProfile />} />
            <Route path="/livestock/:id/breeding" element={<Breeding />} />
            <Route path="/vaccination" element={<Vaccination />} />
            <Route path="/breeding" element={<BreedingOverview />} />
            <Route path="/breeding/:id" element={<BreedingRecordDetail />} />
            <Route path="/pregnancy" element={<Pregnancy />} />
            <Route path="/pregnancy/:id" element={<PregnancyDetail />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/manage-users" element={<ManageUsers />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function getPageTitle(pathname: string): string {
  // Handle dynamic routes
  if (pathname === '/livestock/add') {
    return 'Add New Livestock';
  }
  if (pathname.startsWith('/livestock/') && pathname !== '/livestock') {
    return 'Livestock Profile';
  }
  if (pathname.startsWith('/breeding/') && pathname !== '/breeding') {
    return 'Breeding Record Details';
  }
  if (pathname.startsWith('/pregnancy/') && pathname !== '/pregnancy') {
    return 'Pregnancy Details';
  }
  
  const titles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/overview': 'Overview',
    '/livestock': 'All Livestock',
    '/vaccination': 'Health Records',
    '/breeding': 'Breeding Programs',
    '/pregnancy': 'Pregnancy Monitoring',
    '/activity': 'Activity Logs',
    '/reports': 'Reports',
    '/analytics': 'Analytics',
    '/settings': 'Farm Settings',
    '/users': 'Users & Roles',
    '/notifications': 'Notifications',
    '/manage-users': 'Manage Users',
  };
  return titles[pathname] || 'DigiFarm';
}

function getPageSubtitle(pathname: string): string {
  const subtitles: Record<string, string> = {
    '/dashboard': 'Welcome back! Here\'s what\'s happening on your farm today',
    '/overview': 'Get a complete view of your farm operations',
    '/livestock': 'Manage and track all your livestock',
    '/health': 'Monitor health status and medical records',
    '/breeding': 'Track breeding cycles and genetics',
    '/activity': 'View all recent activities and changes',
    '/reports': 'Generate and view farm reports',
    '/analytics': 'Deep insights into your farm performance',
    '/settings': 'Configure your farm preferences',
    '/users': 'Manage team access and permissions',
    '/notifications': 'Manage your notification preferences',
  };
  return subtitles[pathname] || '';
}
