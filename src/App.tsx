import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Bell, AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
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
import { useStore } from './store/useStore';

// Create sidebar collapse context
const SidebarContext = createContext({ collapsed: false, setCollapsed: (_: boolean) => {} });
export const useSidebarContext = () => useContext(SidebarContext);

// Mock alerts data
const mockAlerts = [
  {
    id: 1,
    type: 'warning' as const,
    message: '3-Month Pregnancy Check: Cow C-011 bred on Sep 15 - Check due by Dec 15',
    timestamp: '23 days',
    animalId: 'C-011',
    linkTo: '/pregnancy'
  },
  {
    id: 2,
    type: 'warning' as const,
    message: '3-Month Pregnancy Check: Cow C-023 bred on Oct 5 - Check overdue',
    timestamp: 'Overdue',
    animalId: 'C-023',
    linkTo: '/pregnancy'
  },
  {
    id: 3,
    type: 'warning' as const,
    message: 'Rabies vaccine overdue for Boer Doe G-012',
    timestamp: 'Overdue',
    animalId: 'G-012',
    linkTo: '/vaccination'
  },
  {
    id: 4,
    type: 'info' as const,
    message: 'CDT vaccine due for Dorper Ewe S-005 on Dec 8',
    timestamp: '16 days',
    animalId: 'S-005',
    linkTo: '/vaccination'
  },
  {
    id: 5,
    type: 'success' as const,
    message: 'Withdrawal period ends today: Brahman Bull C-008 can be cleared for sale',
    timestamp: 'Today',
    animalId: 'C-008',
    linkTo: '/livestock/C-008'
  },
];

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login';
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { livestock } = useStore();

  // Filter livestock based on search query
  const searchResults = searchQuery.trim() 
    ? livestock.filter(animal => 
        animal.livestockId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.colorMarkings?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8) // Limit to 8 results
    : [];

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      case 'success': return CheckCircle;
      case 'critical': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const getAlertColors = (type: string) => {
    switch (type) {
      case 'warning': return { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-600' };
      case 'info': return { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-600' };
      case 'success': return { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'text-emerald-600' };
      case 'critical': return { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-600' };
      default: return { bg: 'bg-slate-50', text: 'text-slate-700', icon: 'text-slate-600' };
    }
  };

  return (
    <SidebarContext.Provider value={{ collapsed: sidebarCollapsed, setCollapsed: setSidebarCollapsed }}>
      <div className="min-h-screen bg-slate-50">
        {!isHomePage && !isAuthPage && <Sidebar />}
        
        <main className={`${!isHomePage && !isAuthPage ? (sidebarCollapsed ? 'ml-16' : 'ml-64') : ''} transition-all duration-300`}>
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
                <div className="relative" ref={searchRef}>
                  <input
                    type="search"
                    placeholder="Search livestock..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchResults(true);
                    }}
                    onFocus={() => setShowSearchResults(true)}
                    className="w-64 pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all"
                  />
                  <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  
                  {/* Search Results Dropdown */}
                  {showSearchResults && searchQuery.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 z-50 max-h-96 overflow-hidden">
                      {searchResults.length > 0 ? (
                        <div className="py-2">
                          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                          </div>
                          <div className="max-h-80 overflow-y-auto">
                            {searchResults.map((animal) => (
                              <Link
                                key={animal.id}
                                to="/livestock"
                                state={{ searchQuery: animal.livestockId }}
                                onClick={() => {
                                  setSearchQuery('');
                                  setShowSearchResults(false);
                                }}
                                className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-slate-50 transition-colors"
                              >
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                                  <span className="text-sm font-bold text-primary-700">
                                    {animal.species === 'Cattle' ? '🐄' : animal.species === 'Goat' ? '🐐' : '🐑'}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2">
                                    <p className="text-sm font-semibold text-slate-900">{animal.livestockId}</p>
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded">
                                      {animal.species}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500 truncate">
                                    {animal.breed} • {animal.category} • {animal.sex}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="px-4 py-8 text-center">
                          <Search size={32} className="mx-auto text-slate-300 mb-2" />
                          <p className="text-sm font-medium text-slate-900">No results found</p>
                          <p className="text-xs text-slate-500 mt-1">
                            Try searching by ID, breed, or category
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Bell size={20} />
                    {mockAlerts.length > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {mockAlerts.length}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-slate-200 z-50 max-h-[600px] overflow-hidden flex flex-col">
                      {/* Header */}
                      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            {mockAlerts.length} alerts
                          </span>
                        </div>
                      </div>

                      {/* Alerts List */}
                      <div className="overflow-y-auto max-h-[500px]">
                        {mockAlerts.length > 0 ? (
                          mockAlerts.map((alert) => {
                            const Icon = getAlertIcon(alert.type);
                            const colors = getAlertColors(alert.type);
                            
                            return (
                              <Link
                                key={alert.id}
                                to={alert.linkTo || '#'}
                                onClick={() => setShowNotifications(false)}
                                className="flex items-start space-x-3 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 cursor-pointer"
                              >
                                <div className={`flex-shrink-0 ${colors.bg} w-8 h-8 rounded-lg flex items-center justify-center`}>
                                  <Icon size={16} className={colors.icon} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-slate-900 leading-tight">{alert.message}</p>
                                  <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-slate-500">{alert.timestamp}</p>
                                    {alert.linkTo && (
                                      <span className="text-xs font-medium text-primary-600">
                                        View →
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            );
                          })
                        ) : (
                          <div className="p-8 text-center">
                            <Bell size={32} className="mx-auto text-slate-300 mb-2" />
                            <p className="text-sm text-slate-500">No notifications</p>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
                        <Link
                          to="/alerts"
                          onClick={() => setShowNotifications(false)}
                          className="text-xs font-medium text-primary-600 hover:text-primary-700 block text-center"
                        >
                          View all alerts →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

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
    </SidebarContext.Provider>
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
