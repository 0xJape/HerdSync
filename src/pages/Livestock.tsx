import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Beef, Filter, AlertCircle, CheckCircle, AlertTriangle, X, Eye } from 'lucide-react';
import { useStore } from '../store/useStore';

interface LivestockItem {
  id: string;
  tag: string;
  species: 'Cattle' | 'Goat' | 'Sheep';
  breed: string;
  category: string;
  sex: 'Male' | 'Female';
  age: string;
  status: 'Healthy' | 'Monitor' | 'Sick';
}

// Sample data matching farm inventory (showing 10 animals from 67 total)
const mockLivestock: LivestockItem[] = [
  // Cattle samples (from 25 total: 2 bulls, 1 yearling bull, 11 cows, 8 heifers, 3 calves)
  { id: 'C-001', tag: 'C-001', species: 'Cattle', breed: 'Brahman', category: 'Bull', sex: 'Male', age: '4y 2m', status: 'Healthy' },
  { id: 'C-015', tag: 'C-015', species: 'Cattle', breed: 'Brahman', category: 'Cow', sex: 'Female', age: '5y 8m', status: 'Healthy' },
  { id: 'C-023', tag: 'C-023', species: 'Cattle', breed: 'Brahman', category: 'Heifer', sex: 'Female', age: '2y 3m', status: 'Monitor' },
  
  // Goat samples (from 26 total: 1 buck, 11 does, 11 maiden does, 3 kids)
  { id: 'G-001', tag: 'G-001', species: 'Goat', breed: 'Anglo-Nubian', category: 'Buck', sex: 'Male', age: '3y 1m', status: 'Healthy' },
  { id: 'G-008', tag: 'G-008', species: 'Goat', breed: 'Anglo-Nubian', category: 'Doe', sex: 'Female', age: '2y 7m', status: 'Healthy' },
  { id: 'G-019', tag: 'G-019', species: 'Goat', breed: 'Native/Philippine Native', category: 'Maiden Doe', sex: 'Female', age: '1y 4m', status: 'Healthy' },
  { id: 'G-025', tag: 'G-025', species: 'Goat', breed: 'Crossbreed', category: 'Kid', sex: 'Female', age: '0y 5m', status: 'Healthy' },
  
  // Sheep samples (from 16 total: 1 ram, 8 ewes, 3 maiden ewes, 4 lambs)
  { id: 'S-001', tag: 'S-001', species: 'Sheep', breed: 'Barbados Blackbelly', category: 'Ram', sex: 'Male', age: '4y 0m', status: 'Healthy' },
  { id: 'S-005', tag: 'S-005', species: 'Sheep', breed: 'Native/Philippine Native', category: 'Ewe', sex: 'Female', age: '3y 2m', status: 'Sick' },
  { id: 'S-013', tag: 'S-013', species: 'Sheep', breed: 'Crossbreed', category: 'Lamb', sex: 'Male', age: '0y 6m', status: 'Healthy' },

  // Newborn livestock from recent births
  { id: 'LS-31', tag: 'LS-31', species: 'Cattle', breed: 'Brahman', category: 'Calf', sex: 'Male', age: '0y 0m (10 days)', status: 'Healthy' },
  { id: 'LS-41', tag: 'LS-41', species: 'Goat', breed: 'Anglo-Nubian x Boer', category: 'Kid', sex: 'Female', age: '0y 0m (5 days)', status: 'Healthy' },
  { id: 'LS-42', tag: 'LS-42', species: 'Goat', breed: 'Anglo-Nubian x Boer', category: 'Kid', sex: 'Male', age: '0y 0m (5 days)', status: 'Monitor' },
  { id: 'LS-51', tag: 'LS-51', species: 'Sheep', breed: 'Native x Barbados Blackbelly', category: 'Lamb', sex: 'Female', age: '0y 0m (15 days)', status: 'Monitor' },
];

export default function Livestock() {
  const { userRole } = useStore();
  const isViewer = userRole === 'viewer';
  
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [speciesFilter, setSpeciesFilter] = React.useState<string>('all');
  const [sexFilter, setSexFilter] = React.useState<string>('all');
  const [categoryFilter, setCategoryFilter] = React.useState<string>('all');
  const [showFilters, setShowFilters] = React.useState(false);

  const filteredLivestock = mockLivestock.filter(animal => {
    const matchesSearch = animal.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         animal.species.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || animal.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSpecies = speciesFilter === 'all' || animal.species === speciesFilter;
    const matchesSex = sexFilter === 'all' || animal.sex === sexFilter;
    
    // Category filter for newborns
    const matchesCategory = categoryFilter === 'all' || 
      (categoryFilter === 'newborn' && ['Calf', 'Kid', 'Lamb'].includes(animal.category));
    
    return matchesSearch && matchesStatus && matchesSpecies && matchesSex && matchesCategory;
  });

  const activeFiltersCount = [statusFilter, speciesFilter, sexFilter, categoryFilter].filter(f => f !== 'all').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Monitor': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Sick': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Healthy': return CheckCircle;
      case 'Monitor': return AlertTriangle;
      case 'Sick': return AlertCircle;
      default: return CheckCircle;
    }
  };

  return (
    <div className="space-y-4">
      {/* View-Only Banner for Viewers */}
      {isViewer && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-medium text-blue-900">View-Only Mode - You can view livestock data but cannot add or modify records</p>
          </div>
        </div>
      )}
      
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <input
              type="search"
              placeholder="Search by ID, breed, species..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
              showFilters 
                ? 'bg-primary-50 border-primary-300 text-primary-700' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Filter size={16} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {!isViewer && (
          <Link
            to="/livestock/add"
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus size={16} />
            <span>Add Animal</span>
          </Link>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900">Filter Options</h3>
            <button
              onClick={() => {
                setStatusFilter('all');
                setSpeciesFilter('all');
                setSexFilter('all');
              }}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center space-x-1"
            >
              <X size={14} />
              <span>Clear All</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Species Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Species</label>
              <select
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Species</option>
                <option value="Cattle">Cattle (25)</option>
                <option value="Goat">Goat (26)</option>
                <option value="Sheep">Sheep (16)</option>
              </select>
            </div>

            {/* Sex Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Sex</label>
              <select
                value={sexFilter}
                onChange={(e) => setSexFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="Male">Male (5)</option>
                <option value="Female">Female (62)</option>
              </select>
            </div>

            {/* Age/Category Quick Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="newborn">🍼 Newborn (0-3 months)</option>
                <option value="young">Young (3-12 months)</option>
                <option value="breeding">Breeding Age</option>
                <option value="mature">Mature</option>
              </select>
            </div>

            {/* Health Status Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Health Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="healthy">Healthy (60)</option>
                <option value="monitor">Monitor (6)</option>
                <option value="sick">Sick (1)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-slate-500">Total Animals</p>
            <Beef size={16} className="text-slate-400" />
          </div>
          <p className="text-2xl font-semibold text-slate-900">71</p>
          <p className="text-xs text-slate-500 mt-1">26 Cattle, 28 Goats, 17 Sheep</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-emerald-700">Healthy</p>
            <CheckCircle size={16} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-semibold text-emerald-900">62</p>
          <p className="text-xs text-emerald-600 mt-1">87% of herd</p>
        </div>
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-amber-700">Monitor</p>
            <AlertTriangle size={16} className="text-amber-600" />
          </div>
          <p className="text-2xl font-semibold text-amber-900">8</p>
          <p className="text-xs text-amber-600 mt-1">Needs attention</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-red-700">Needs Care</p>
            <AlertCircle size={16} className="text-red-600" />
          </div>
          <p className="text-2xl font-semibold text-red-900">1</p>
          <p className="text-xs text-red-600 mt-1">Requires treatment</p>
        </div>
      </div>

      {/* Livestock Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Species</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Breed</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Sex</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Age</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLivestock.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Search size={40} className="text-slate-300" />
                      <p className="text-slate-500 text-sm font-medium">No animals found</p>
                      <p className="text-slate-400 text-xs">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLivestock.map((animal) => {
                  const StatusIcon = getStatusIcon(animal.status);
                  return (
                    <tr key={animal.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3">
                        <span className="font-mono text-sm font-semibold text-slate-900">{animal.tag}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-slate-700">{animal.species}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-slate-700">{animal.breed}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {animal.category}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-slate-600">{animal.sex}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-slate-600">{animal.age}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(animal.status)}`}>
                          <StatusIcon size={12} />
                          <span>{animal.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Link
                          to="/livestock/A-001"
                          className="text-xs font-medium text-primary-600 hover:text-primary-700"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredLivestock.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold">{filteredLivestock.length}</span> of <span className="font-semibold">67</span> animals
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors border border-slate-300">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm font-medium bg-primary-600 text-white rounded-lg">
                1
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors border border-slate-300">
                2
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors border border-slate-300">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
