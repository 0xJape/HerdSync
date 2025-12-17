import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart,
  Calendar,
  TrendingUp,
  Plus,
  Search,
  User,
  Users,
  Save,
  AlertCircle,
  CheckCircle,
  Eye
} from 'lucide-react';
import { useStore } from '../store/useStore';

// Mock data for recent breeding records
const recentBreedings = [
  {
    // Breeding Table
    id: 1,
    species: 'cattle',
    breedingDate: '2025-09-15', // Check due in ~1 month
    breedingTime: '09:30 AM',
    breedingLocation: 'Breeding Pen 1',
    handlerName: 'Marlo Gel',
    notes: 'Observed natural mating, dam in standing heat',
    recordedBy: 'Marlo Gel',
    // Dam Table
    damId: 'C-023',
    damName: 'Brahman Heifer',
    damBreed: 'Brahman',
    damAge: '4 years',
    damHealthStatus: 'Healthy',
    damBodyCondition: 3.5,
    heatSignsObserved: 'Standing heat, clear mucus discharge',
    // Sire Table
    sireId: 'B-001',
    sireName: 'Brahman Bull',
    sireBreed: 'Brahman',
    sireAge: '5 years',
    // Breeding Status Table
    status: 'Not Confirmed'
  },
  {
    // Breeding Table
    id: 2,
    species: 'cattle',
    breedingDate: '2025-10-05',
    breedingTime: '02:15 PM',
    breedingLocation: 'Breeding Pen 2',
    handlerName: 'Kyle Stephen',
    notes: 'First breeding for this maiden heifer',
    recordedBy: 'Kyle Stephen',
    // Dam Table
    damId: 'C-019',
    damName: 'Angus Heifer',
    damBreed: 'Angus',
    damAge: '2 years',
    damHealthStatus: 'Healthy',
    damBodyCondition: 3,
    heatSignsObserved: 'Standing heat, vocalization',
    // Sire Table
    sireId: 'B-002',
    sireName: 'Angus Bull',
    sireBreed: 'Angus',
    sireAge: '5 years',
    // Breeding Status Table
    status: 'Confirmed'
  },
  {
    // Breeding Table
    id: 3,
    species: 'cattle',
    breedingDate: '2025-11-14',
    breedingTime: '10:00 AM',
    breedingLocation: 'Breeding Pen 3',
    handlerName: 'Laiza Limpin',
    notes: 'Bull introduced to breeding group',
    recordedBy: 'Laiza Limpin',
    // Dam Table
    damId: 'C-005',
    damName: 'Holstein Cow',
    damBreed: 'Holstein',
    damAge: '4 years',
    damHealthStatus: 'Healthy',
    damBodyCondition: 3.5,
    heatSignsObserved: 'Receptive to bull',
    // Sire Table
    sireId: 'B-001',
    sireName: 'Brahman Bull',
    sireBreed: 'Brahman',
    sireAge: '5 years',
    // Breeding Status Table
    status: 'Not Confirmed'
  },
  {
    // Breeding Table
    id: 4,
    species: 'cattle',
    breedingDate: '2025-09-20',
    breedingTime: '08:45 AM',
    breedingLocation: 'Breeding Pen 2',
    handlerName: 'Marlo Gel',
    notes: 'Natural breeding observed',
    recordedBy: 'Marlo Gel',
    // Dam Table
    damId: 'C-015',
    damName: 'Brahman Cow',
    damBreed: 'Brahman',
    damAge: '5 years',
    damHealthStatus: 'Healthy',
    damBodyCondition: 4,
    heatSignsObserved: 'Clear heat signs observed',
    // Sire Table
    sireId: 'B-002',
    sireName: 'Angus Bull',
    sireBreed: 'Angus',
    sireAge: '6 years',
    // Breeding Status Table
    status: 'Confirmed'
  },
  {
    // Breeding Table
    id: 5,
    species: 'cattle',
    breedingDate: '2025-11-21',
    breedingTime: '11:30 AM',
    breedingLocation: 'Breeding Pen 1',
    handlerName: 'Kyle Stephen',
    notes: 'Second breeding for this cow',
    recordedBy: 'Kyle Stephen',
    // Dam Table
    damId: 'C-008',
    damName: 'Angus Cow',
    damBreed: 'Angus',
    damAge: '3 years',
    damHealthStatus: 'Healthy',
    damBodyCondition: 3.5,
    heatSignsObserved: 'Strong vocalization, standing heat',
    // Sire Table
    sireId: 'B-002',
    sireName: 'Angus Bull',
    sireBreed: 'Angus',
    sireAge: '5 years',
    // Breeding Status Table
    status: 'Not Confirmed'
  }
];

// Active breeding animals (sires)
const activeSires = [
  {
    id: 'B-001',
    name: 'Brahman Bull',
    species: 'Cattle',
    breed: 'Brahman',
    age: '4y 2m',
    totalBreedings: 8,
    successRate: 87,
    lastBreeding: '2024-11-20'
  },
  {
    id: 'B-002',
    name: 'Angus Bull',
    species: 'Cattle', 
    breed: 'Angus',
    age: '5y 1m',
    totalBreedings: 6,
    successRate: 92,
    lastBreeding: '2024-11-10'
  },
  {
    id: 'B-003',
    name: 'Holstein Bull',
    species: 'Cattle',
    breed: 'Holstein',
    age: '4y 6m',
    totalBreedings: 7,
    successRate: 85,
    lastBreeding: '2024-11-18'
  }
];

// Mock livestock data for selection
const mockLivestock = [
  // Females
  { id: 'C-023', name: 'Brahman Heifer', species: 'Cattle', breed: 'Brahman', sex: 'Female', status: 'Healthy', isOnHeat: true, breedingStatus: 'Open for Breeding', age: '3y 2m' },
  { id: 'C-015', name: 'Brahman Cow', species: 'Cattle', breed: 'Brahman', sex: 'Female', status: 'Healthy', isOnHeat: false, breedingStatus: 'Not in Heat', age: '5y 1m' },
  { id: 'C-042', name: 'Holstein Cow', species: 'Cattle', breed: 'Holstein', sex: 'Female', status: 'Sick', isOnHeat: false, breedingStatus: 'Under Treatment', age: '4y 0m' },
  { id: 'C-019', name: 'Angus Heifer', species: 'Cattle', breed: 'Angus', sex: 'Female', status: 'Healthy', isOnHeat: true, breedingStatus: 'Open for Breeding', age: '2y 1m' },
  { id: 'C-008', name: 'Angus Cow', species: 'Cattle', breed: 'Angus', sex: 'Female', status: 'Healthy', isOnHeat: true, breedingStatus: 'Open for Breeding', age: '3y 6m' },
  { id: 'C-005', name: 'Holstein Cow 2', species: 'Cattle', breed: 'Holstein', sex: 'Female', status: 'Healthy', isOnHeat: false, breedingStatus: 'Not in Heat', age: '4y 0m' },
  { id: 'C-012', name: 'Holstein Heifer', species: 'Cattle', breed: 'Holstein', sex: 'Female', status: 'Healthy', isOnHeat: true, breedingStatus: 'Open for Breeding', age: '2y 8m' },
  // Males
  { id: 'B-001', name: 'Brahman Bull', species: 'Cattle', breed: 'Brahman', sex: 'Male', status: 'Healthy', age: '5y 0m' },
  { id: 'B-002', name: 'Angus Bull', species: 'Cattle', breed: 'Angus', sex: 'Male', status: 'Healthy', age: '6y 1m' },
  { id: 'B-005', name: 'Brahman Bull 2', species: 'Cattle', breed: 'Brahman', sex: 'Male', status: 'Sick', age: '4y 6m' },
];

export default function BreedingOverview() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDamSelectOpen, setIsDamSelectOpen] = React.useState(false);
  const [isSireSelectOpen, setIsSireSelectOpen] = React.useState(false);
  const [damSearchQuery, setDamSearchQuery] = React.useState('');
  const [sireSearchQuery, setSireSearchQuery] = React.useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const [successBreedingId, setSuccessBreedingId] = React.useState('');

  // Calculate 3-month breeding check date
  const getBreedingCheckDate = (breedingDate: string) => {
    const date = new Date(breedingDate);
    date.setMonth(date.getMonth() + 3);
    return date;
  };

  // Check if breeding check is due soon (within 7 days)
  const isBreedingCheckDueSoon = (breedingDate: string) => {
    const checkDate = getBreedingCheckDate(breedingDate);
    const today = new Date();
    const daysUntilCheck = Math.ceil((checkDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilCheck <= 7 && daysUntilCheck >= 0;
  };

  // Check if breeding check is overdue
  const isBreedingCheckOverdue = (breedingDate: string) => {
    const checkDate = getBreedingCheckDate(breedingDate);
    const today = new Date();
    return today > checkDate;
  };

  const [formData, setFormData] = React.useState({
    // Breeding Table
    species: '',
    breedingDate: new Date().toISOString().split('T')[0],
    breedingTime: '',
    breedingLocation: '',
    breedingMethod: 'Natural', // New field for breeding method
    handlerName: '',
    notes: '',
    // Dam Table
    damId: '',
    damBreed: '',
    damAge: '',
    damHealthStatus: '',
    damBodyCondition: '',
    heatSignsObserved: '',
    // Sire Table (Natural Breeding)
    sireId: '',
    sireBreed: '',
    sireAge: '',
    // AI Semen Details (Artificial Insemination)
    semenIdentity: '',
    batchNumber: '',
    semenBreed: '',
    semenSource: '',
    technicianName: '',
    // Breeding Status Table
    status: 'Not Confirmed'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('New breeding record:', formData);
    
    // Generate breeding record ID (mock)
    const newBreedingId = `BR-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    setSuccessBreedingId(newBreedingId);
    
    // Close breeding modal and show success modal
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
    
    // Reset form
    setFormData({
      // Breeding Table
      species: '',
      breedingDate: new Date().toISOString().split('T')[0],
      breedingTime: '',
      breedingLocation: '',
      breedingMethod: 'Natural',
      handlerName: '',
      notes: '',
      // Dam Table
      damId: '',
      damBreed: '',
      damAge: '',
      damHealthStatus: '',
      damBodyCondition: '',
      heatSignsObserved: '',
      // Sire Table (Natural Breeding)
      sireId: '',
      sireBreed: '',
      sireAge: '',
      // AI Semen Details (Artificial Insemination)
      semenIdentity: '',
      batchNumber: '',
      semenBreed: '',
      semenSource: '',
      technicianName: '',
      // Breeding Status Table
      status: 'Not Confirmed'
    });
  };

  const filteredBreedings = recentBreedings.filter(breeding => {
    const matchesSearch = breeding.damId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         breeding.sireId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         breeding.damBreed.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const totalBreedings = recentBreedings.length;
  const naturalBreedings = 3;

  const { userRole } = useStore();
  const isViewer = userRole === 'viewer';
  const canEdit = userRole === 'veterinarian' || userRole === 'farm_manager';

  return (
    <div className="space-y-6">
      {/* View-Only Banner for Viewers */}
      {isViewer && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-medium text-blue-900">View-Only Mode - You can view breeding records but cannot add or modify them</p>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Breeding Records</h1>
          <p className="text-sm text-slate-600 mt-1">Record and manage breeding activities (sire and dam pairings)</p>
        </div>
        {!isViewer && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Plus size={16} />
            <span>Record New Breeding</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-pink-900">Total Breedings</h3>
            <Heart size={20} className="text-pink-600" />
          </div>
          <p className="text-3xl font-bold text-pink-600">{totalBreedings}</p>
          <p className="text-xs text-pink-700 mt-1">This month</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-900">Natural Breeding</h3>
            <Users size={20} className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{naturalBreedings}</p>
          <p className="text-xs text-blue-700 mt-1">Natural mating</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-emerald-900">Active Sires</h3>
            <User size={20} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-emerald-600">{activeSires.length}</p>
          <p className="text-xs text-emerald-700 mt-1">Bulls, bucks, rams</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by dam ID, sire ID, or breed..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Breeding Records */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recent Breeding Records</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {filteredBreedings.map((breeding) => {
                const checkDate = getBreedingCheckDate(breeding.breedingDate);
                const isDueSoon = isBreedingCheckDueSoon(breeding.breedingDate);
                const isOverdue = isBreedingCheckOverdue(breeding.breedingDate);
                const daysUntilCheck = Math.ceil((checkDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                return (
                  <div
                    key={breeding.id}
                    className="p-5 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/breeding/${breeding.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1 flex-wrap">
                          <span className="inline-flex items-center px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full capitalize">
                            {breeding.species}
                          </span>
                          <Calendar size={16} className="text-slate-400" />
                          <span className="font-semibold text-slate-900">
                            {new Date(breeding.breedingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            breeding.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {breeding.status === 'Confirmed' ? '✓ Confirmed' : '⏳ Not Confirmed'}
                          </span>
                          {isOverdue && (
                            <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                              <AlertCircle size={12} className="mr-1" />
                              Check Overdue
                            </span>
                          )}
                          {isDueSoon && !isOverdue && (
                            <span className="inline-flex items-center px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                              <AlertCircle size={12} className="mr-1" />
                              Check Due Soon
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">Recorded by {breeding.recordedBy}</p>
                      </div>
                    </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    {/* Dam (Female) */}
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-semibold text-pink-900">♀ Dam (Female)</span>
                      </div>
                      <Link 
                        to={`/livestock/${breeding.damId}`}
                        className="text-sm font-semibold text-primary-600 hover:text-primary-700 mb-0.5 block"
                      >
                        {breeding.damId}
                      </Link>
                      <p className="text-xs text-slate-600">{breeding.damBreed}</p>
                    </div>

                    {/* Sire (Male) */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-semibold text-blue-900">♂ Sire (Male)</span>
                      </div>
                      <Link 
                        to={`/livestock/${breeding.sireId}`}
                        className="text-sm font-semibold text-primary-600 hover:text-primary-700 mb-0.5 block"
                      >
                        {breeding.sireId}
                      </Link>
                      <p className="text-xs text-slate-600">{breeding.sireBreed}</p>
                    </div>
                  </div>

                  {breeding.notes && (
                    <div className="bg-slate-50 rounded-lg p-2 mt-3">
                      <p className="text-xs text-slate-600">
                        <span className="font-medium">Notes:</span> {breeding.notes}
                      </p>
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Sires Sidebar */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Active Sires</h2>
            </div>
            <div className="p-4 space-y-3">
              {activeSires.map((sire) => (
                <Link
                  key={sire.id}
                  to={`/livestock/${sire.id}`}
                  className="block p-3 rounded-lg border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">{sire.id}</h3>
                      <p className="text-xs text-slate-600">{sire.breed}</p>
                    </div>
                    <span className="text-xs font-medium text-primary-600">{sire.age}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-slate-500">Breedings</p>
                      <p className="font-semibold text-slate-900">{sire.totalBreedings}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Success Rate</p>
                      <p className="font-semibold text-emerald-600">{sire.successRate}%</p>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <p className="text-xs text-slate-500">
                      Last breeding: {new Date(sire.lastBreeding).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg border border-slate-200 mt-4 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Breeding Statistics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">This Month</span>
                <span className="text-sm font-semibold text-slate-900">{totalBreedings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">This Year</span>
                <span className="text-sm font-semibold text-slate-900">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Avg Success Rate</span>
                <span className="text-sm font-semibold text-emerald-600">88%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Breeding Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Record New Breeding</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Breeding Method Selection */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Breeding Method</h3>
                <p className="text-sm text-slate-600 mb-3">Select the breeding method to continue</p>
                <div className="flex items-center space-x-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <label className="flex items-center space-x-3 cursor-pointer flex-1 bg-white border-2 border-slate-200 rounded-lg p-4 hover:border-primary-300 transition-colors has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50">
                    <input
                      type="radio"
                      name="breedingMethod"
                      value="Natural"
                      checked={formData.breedingMethod === 'Natural'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-primary-600 border-slate-300 focus:ring-primary-500"
                    />
                    <div>
                      <span className="text-sm font-semibold text-slate-900 block">Natural Breeding</span>
                      <span className="text-xs text-slate-600">Traditional mating between dam and sire</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer flex-1 bg-white border-2 border-slate-200 rounded-lg p-4 hover:border-primary-300 transition-colors has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50">
                    <input
                      type="radio"
                      name="breedingMethod"
                      value="Artificial Insemination"
                      checked={formData.breedingMethod === 'Artificial Insemination'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-primary-600 border-slate-300 focus:ring-primary-500"
                    />
                    <div>
                      <span className="text-sm font-semibold text-slate-900 block">Artificial Insemination</span>
                      <span className="text-xs text-slate-600">Controlled breeding with genetic selection</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Breeding Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="breedingDate"
                      value={formData.breedingDate}
                      onChange={handleInputChange}
                      required
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Species <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="species"
                      value={formData.species}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="Cattle">Cattle</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dam (Female) Information */}
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm font-semibold text-pink-900">♀ Dam (Female) Information</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Dam Livestock ID <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="damId"
                        value={formData.damId}
                        readOnly
                        placeholder={formData.species === '' ? 'Select species first' : 'Click to select female in heat'}
                        required
                        onClick={() => formData.species !== '' && setIsDamSelectOpen(true)}
                        disabled={formData.species === ''}
                        className={`w-full px-3 py-2 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${formData.species === '' ? 'bg-slate-100 cursor-not-allowed text-slate-400' : 'cursor-pointer bg-white'}`}
                      />
                      <button
                        type="button"
                        onClick={() => formData.species !== '' && setIsDamSelectOpen(true)}
                        disabled={formData.species === ''}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded ${formData.species === '' ? 'cursor-not-allowed' : 'hover:bg-slate-100'}`}
                      >
                        <Search size={18} className={formData.species === '' ? 'text-slate-300' : 'text-slate-400'} />
                      </button>
                    </div>
                    <p className="text-xs text-pink-700 mt-1">
                      ✓ Only females on heat and healthy
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Breed <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="damBreed"
                      value={formData.damBreed}
                      onChange={handleInputChange}
                      placeholder="e.g., Brahman"
                      required
                      readOnly={!!formData.damId}
                      disabled={!!formData.damId}
                      className={`w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${formData.damId ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Age
                    </label>
                    <input
                      type="text"
                      name="damAge"
                      value={formData.damAge}
                      onChange={handleInputChange}
                      placeholder="e.g., 3y 2m"
                      readOnly={!!formData.damId}
                      disabled={!!formData.damId}
                      className={`w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${formData.damId ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Health Status
                    </label>
                    <select
                      name="damHealthStatus"
                      value={formData.damHealthStatus}
                      onChange={handleInputChange}
                      disabled={!!formData.damId}
                      className={`w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${formData.damId ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}`}
                    >
                      <option value="">Select status</option>
                      <option value="Healthy">Healthy</option>
                      <option value="Monitor">Monitor</option>
                      <option value="Sick">Sick</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Body Condition Score (1-5)
                    </label>
                    <input
                      type="number"
                      name="damBodyCondition"
                      value={formData.damBodyCondition}
                      onChange={handleInputChange}
                      step="0.5"
                      min="1"
                      max="5"
                      placeholder="e.g., 3.5"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Heat Signs Observed
                    </label>
                    <input
                      type="text"
                      name="heatSignsObserved"
                      value={formData.heatSignsObserved}
                      onChange={handleInputChange}
                      placeholder="e.g., Standing heat"
                      readOnly={!!formData.damId}
                      disabled={!!formData.damId}
                      className={`w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${formData.damId ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Sire Information - Conditional based on breeding method */}
              {formData.breedingMethod === 'Natural' ? (
                /* Natural Breeding - Sire (Male) Information */
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm font-semibold text-blue-900">♂ Sire (Male) Information</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Sire Livestock ID <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="sireId"
                          value={formData.sireId}
                          readOnly
                          placeholder={formData.species === '' ? 'Select species first' : 'Click to select healthy male'}
                          required
                          onClick={() => formData.species !== '' && setIsSireSelectOpen(true)}
                          disabled={formData.species === ''}
                          className={`w-full px-3 py-2 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${formData.species === '' ? 'bg-slate-100 cursor-not-allowed text-slate-400' : 'cursor-pointer bg-white'}`}
                        />
                        <button
                          type="button"
                          onClick={() => formData.species !== '' && setIsSireSelectOpen(true)}
                          disabled={formData.species === ''}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded ${formData.species === '' ? 'cursor-not-allowed' : 'hover:bg-slate-100'}`}
                        >
                          <Search size={18} className={formData.species === '' ? 'text-slate-300' : 'text-slate-400'} />
                        </button>
                      </div>
                      <p className="text-xs text-blue-700 mt-1">
                        ✓ Only healthy males
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Breed <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="sireBreed"
                        value={formData.sireBreed}
                        onChange={handleInputChange}
                        placeholder="e.g., Brahman"
                        required
                        readOnly={!!formData.sireId}
                        disabled={!!formData.sireId}
                        className={`w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${formData.sireId ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Age
                      </label>
                      <input
                        type="text"
                        name="sireAge"
                        value={formData.sireAge}
                        onChange={handleInputChange}
                        placeholder="e.g., 4y 2m"
                        readOnly={!!formData.sireId}
                        disabled={!!formData.sireId}
                        className={`w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${formData.sireId ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Artificial Insemination - Semen Details */
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm font-semibold text-teal-900">🧬 Semen Details</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Semen Identity/ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="semenIdentity"
                        value={formData.semenIdentity}
                        onChange={handleInputChange}
                        placeholder="e.g., SEM-BR-2024-001"
                        required
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Batch Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="batchNumber"
                        value={formData.batchNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., BATCH-2024-Q4-025"
                        required
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Breed/Genetics <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="semenBreed"
                        value={formData.semenBreed}
                        onChange={handleInputChange}
                        placeholder="e.g., Brahman, Angus"
                        required
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Semen Source/Supplier
                      </label>
                      <input
                        type="text"
                        name="semenSource"
                        value={formData.semenSource}
                        onChange={handleInputChange}
                        placeholder="e.g., Genetics Inc., Local Farm"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Technician Name
                    </label>
                    <input
                      type="text"
                      name="technicianName"
                      value={formData.technicianName}
                      onChange={handleInputChange}
                      placeholder="e.g., Dr. Smith, John Technician"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="mt-3 bg-teal-100 border border-teal-300 rounded-lg p-3">
                    <p className="text-xs text-teal-800">
                      ℹ️ <strong>Artificial Insemination:</strong> Ensure semen is properly stored and handled. Record all batch information for traceability and genetic tracking.
                    </p>
                  </div>
                </div>
              )}

              {/* Breeding Details */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  {formData.breedingMethod === 'Natural' ? 'Natural Breeding Details' : 'Artificial Insemination Details'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Breeding Time
                    </label>
                    <input
                      type="time"
                      name="breedingTime"
                      value={formData.breedingTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Breeding Location
                    </label>
                    <input
                      type="text"
                      name="breedingLocation"
                      value={formData.breedingLocation}
                      onChange={handleInputChange}
                      placeholder="e.g., Breeding Pen A, Pasture 3"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Handler/Observer Name
                    </label>
                    <input
                      type="text"
                      name="handlerName"
                      value={formData.handlerName}
                      onChange={handleInputChange}
                      placeholder="e.g., Marlo Gel"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Breeding Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="Not Confirmed">Not Confirmed</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Notes & Observations
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any observations, breeding behavior, environmental conditions, or additional information..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <Save size={16} />
                  <span>Save Breeding Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dam Selection Modal */}
      {isDamSelectOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Select Dam (Female)</h3>
                <p className="text-xs text-slate-600 mt-1">Only females on heat and healthy are shown</p>
              </div>
              <button
                onClick={() => {
                  setIsDamSelectOpen(false);
                  setDamSearchQuery('');
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search by ID, name, or breed..."
                  value={damSearchQuery}
                  onChange={(e) => setDamSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {mockLivestock
                  .filter((animal) => 
                    animal.sex === 'Female' && 
                    animal.status === 'Healthy' && 
                    animal.isOnHeat &&
                    (formData.species === '' || animal.species === formData.species) &&
                    (damSearchQuery === '' || 
                      animal.id.toLowerCase().includes(damSearchQuery.toLowerCase()) ||
                      animal.name.toLowerCase().includes(damSearchQuery.toLowerCase()) ||
                      animal.breed.toLowerCase().includes(damSearchQuery.toLowerCase()))
                  )
                  .map((animal) => (
                    <button
                      key={animal.id}
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          damId: animal.id,
                          damBreed: animal.breed,
                          damAge: animal.age,
                          damHealthStatus: animal.status,
                          heatSignsObserved: 'Confirmed in heat'
                        });
                        setIsDamSelectOpen(false);
                        setDamSearchQuery('');
                      }}
                      className="w-full p-4 border-2 border-pink-200 bg-pink-50 hover:border-pink-400 hover:bg-pink-100 rounded-lg transition-colors text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900">{animal.id}</span>
                          <span className="px-2 py-0.5 bg-pink-200 text-pink-900 text-xs font-bold rounded">
                            ♀ ON HEAT
                          </span>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-medium rounded">
                            {animal.status}
                          </span>
                        </div>
                        <span className="text-xs text-slate-600">{animal.age}</span>
                      </div>
                      <p className="text-sm text-slate-600">{animal.name} • {animal.breed}</p>
                      <p className="text-xs text-pink-700 mt-1">{animal.breedingStatus}</p>
                    </button>
                  ))}
                {mockLivestock.filter((animal) => 
                  animal.sex === 'Female' && 
                  animal.status === 'Healthy' && 
                  animal.isOnHeat &&
                  (formData.species === '' || animal.species === formData.species)
                ).length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <Heart size={48} className="mx-auto mb-4 text-slate-300" />
                    <p className="font-medium">No females available for breeding</p>
                    <p className="text-sm mt-1">
                      {formData.species === '' 
                        ? 'Please select a species first'
                        : 'No females are currently on heat and healthy'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sire Selection Modal */}
      {isSireSelectOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Select Sire (Male)</h3>
                <p className="text-xs text-slate-600 mt-1">Only healthy males are shown</p>
              </div>
              <button
                onClick={() => {
                  setIsSireSelectOpen(false);
                  setSireSearchQuery('');
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search by ID, name, or breed..."
                  value={sireSearchQuery}
                  onChange={(e) => setSireSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {mockLivestock
                  .filter((animal) => 
                    animal.sex === 'Male' && 
                    animal.status === 'Healthy' &&
                    (formData.species === '' || animal.species === formData.species) &&
                    (sireSearchQuery === '' || 
                      animal.id.toLowerCase().includes(sireSearchQuery.toLowerCase()) ||
                      animal.name.toLowerCase().includes(sireSearchQuery.toLowerCase()) ||
                      animal.breed.toLowerCase().includes(sireSearchQuery.toLowerCase()))
                  )
                  .map((animal) => (
                    <button
                      key={animal.id}
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          sireId: animal.id,
                          sireBreed: animal.breed,
                          sireAge: animal.age
                        });
                        setIsSireSelectOpen(false);
                        setSireSearchQuery('');
                      }}
                      className="w-full p-4 border-2 border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 rounded-lg transition-colors text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900">{animal.id}</span>
                          <span className="px-2 py-0.5 bg-blue-200 text-blue-900 text-xs font-bold rounded">
                            ♂ MALE
                          </span>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-medium rounded">
                            {animal.status}
                          </span>
                        </div>
                        <span className="text-xs text-slate-600">{animal.age}</span>
                      </div>
                      <p className="text-sm text-slate-600">{animal.name} • {animal.breed}</p>
                    </button>
                  ))}
                {mockLivestock.filter((animal) => 
                  animal.sex === 'Male' && 
                  animal.status === 'Healthy' &&
                  (formData.species === '' || animal.species === formData.species)
                ).length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <User size={48} className="mx-auto mb-4 text-slate-300" />
                    <p className="font-medium">No males available for breeding</p>
                    <p className="text-sm mt-1">
                      {formData.species === '' 
                        ? 'Please select a species first'
                        : 'No healthy males found for this species'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6 text-center">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-emerald-600" />
              </div>

              {/* Success Message */}
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Breeding Record Added Successfully!
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Breeding record <span className="font-mono font-bold text-primary-600">{successBreedingId}</span> has been created.
              </p>

              {/* Alert Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <AlertCircle size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">
                      Automatic Alert Scheduled
                    </h4>
                    <p className="text-xs text-blue-800">
                      You will receive an alert <span className="font-bold">2 weeks in advance</span> (approximately <span className="font-bold">2.5 months from now</span>) to remind you about the pregnancy check for this breeding.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                >
                  Add Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
