import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Syringe,
  AlertCircle,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  X,
  ChevronDown,
  Eye
} from 'lucide-react';
import { useStore } from '../store/useStore';

// Mock data for health records - based on ERD schema
const vaccinationRecords = [
  {
    vaccinationId: 'VAC-001', // vaccination_id
    livestockId: 'C-023', // livestock_id
    livestockName: 'Brahman Heifer',
    species: 'Cattle',
    breed: 'Brahman',
    treatmentType: 'Vaccine', // treatment_type_id (will reference Treatment Type Table)
    treatmentName: 'FMD Vaccine', // treatment_name
    dosage: '5', // dosage (numeric value)
    dosageUnit: 'ml', // dosage_unit_id (will reference Dosage Unit Table)
    administrationRoute: 'Intramuscular', // administration_route_id (will reference Administration Route Table)
    dateAdministered: '2025-11-15', // date_administered
    administeredBy: 'Dr. Santos', // administered_by
    nextDueDate: '2026-05-15', // next_due_date
    withdrawalEndDate: null, // withdrawal_end_date
    isInWithdrawal: false,
    status: 'completed',
    notes: 'Provided by City Vet Office', // notes
    createdAt: '2025-11-15T10:30:00', // created_at
    updatedAt: '2025-11-15T10:30:00' // updated_at
  },
  {
    vaccinationId: 'VAC-002',
    livestockId: 'G-019',
    livestockName: 'Boer Maiden Doe',
    species: 'Goat',
    breed: 'Boer',
    treatmentType: 'Vitamins',
    treatmentName: 'Vitamin B1, B2, B3, B6 + B12',
    dosage: '2',
    dosageUnit: 'ml',
    administrationRoute: 'Subcutaneous',
    dateAdministered: '2025-11-10',
    administeredBy: 'Kyle Stephen',
    nextDueDate: '2025-12-10',
    withdrawalEndDate: null,
    isInWithdrawal: false,
    status: 'completed',
    notes: 'Booster required in 1 month',
    createdAt: '2025-11-10T14:20:00',
    updatedAt: '2025-11-10T14:20:00'
  },
  {
    vaccinationId: 'VAC-003',
    livestockId: 'C-015',
    livestockName: 'Brahman Cow',
    species: 'Cattle',
    breed: 'Brahman',
    treatmentType: 'Antibiotics',
    treatmentName: 'Oxytetracycline (Oxytet LA)',
    dosage: '10',
    dosageUnit: 'ml',
    administrationRoute: 'Intramuscular',
    dateAdministered: '2025-11-10',
    administeredBy: 'Dr. Santos',
    nextDueDate: null,
    withdrawalEndDate: '2025-12-01', // Withdrawal period tracked via Withdrawal_Period Table
    isInWithdrawal: true,
    status: 'completed',
    notes: '⚠️ Animal under AMR treatment - Cannot be sold/consumed until Dec 1, 2025',
    createdAt: '2025-11-10T09:15:00',
    updatedAt: '2025-11-10T09:15:00'
  },
  {
    vaccinationId: 'VAC-004',
    livestockId: 'S-005',
    livestockName: 'Dorper Ewe',
    species: 'Sheep',
    breed: 'Dorper',
    treatmentType: 'Vaccine',
    treatmentName: 'CDT Vaccine',
    dosage: '2',
    dosageUnit: 'ml',
    administrationRoute: 'Subcutaneous',
    dateAdministered: '2025-11-08',
    administeredBy: 'Laiza Limpin',
    nextDueDate: '2025-12-08',
    withdrawalEndDate: null,
    isInWithdrawal: false,
    status: 'completed',
    notes: 'Provided by City Vet Office',
    createdAt: '2025-11-08T11:00:00',
    updatedAt: '2025-11-08T11:00:00'
  },
  {
    vaccinationId: 'VAC-005',
    livestockId: 'C-008',
    livestockName: 'Brahman Bull',
    species: 'Cattle',
    breed: 'Brahman',
    treatmentType: 'Antibiotics',
    treatmentName: 'Penicillin G Procaine',
    dosage: '15',
    dosageUnit: 'ml',
    administrationRoute: 'Intramuscular',
    dateAdministered: '2025-11-01',
    administeredBy: 'Dr. Santos',
    nextDueDate: null,
    withdrawalEndDate: '2025-11-22',
    isInWithdrawal: true,
    status: 'completed',
    notes: '⚠️ Withdrawal period ends today - Can be cleared for sale after today',
    createdAt: '2025-11-01T08:45:00',
    updatedAt: '2025-11-01T08:45:00'
  },
  {
    vaccinationId: 'VAC-006',
    livestockId: 'G-012',
    livestockName: 'Boer Doe',
    species: 'Goat',
    breed: 'Boer',
    treatmentType: 'Vaccine',
    treatmentName: 'Rabies Vaccine',
    dosage: '1',
    dosageUnit: 'ml',
    administrationRoute: 'Intramuscular',
    dateAdministered: '2025-08-15',
    administeredBy: 'Kyle Stephen',
    nextDueDate: '2025-11-15',
    withdrawalEndDate: null,
    isInWithdrawal: false,
    status: 'overdue',
    notes: 'Provided by City Vet Office',
    createdAt: '2025-08-15T16:30:00',
    updatedAt: '2025-08-15T16:30:00'
  }
];

// Upcoming vaccinations schedule
const upcomingVaccinations = [
  { livestockId: 'C-008', name: 'Brahman Bull', vaccine: 'Vitamin B-Complex', dueDate: '2025-12-10', daysLeft: 10 },
  { livestockId: 'G-019', name: 'Boer Maiden Doe', vaccine: 'Deworming (Ivermectin)', dueDate: '2025-12-10', daysLeft: 10 },
  { livestockId: 'S-005', name: 'Dorper Ewe', vaccine: 'Vitamin Supplement', dueDate: '2025-12-08', daysLeft: 8 },
  { livestockId: 'G-012', name: 'Boer Doe', vaccine: 'Deworming (Levamisole)', dueDate: '2025-12-05', daysLeft: 5 }
];

export default function Vaccination() {
  const { userRole } = useStore();
  const isViewer = userRole === 'viewer';
  
  const [searchParams] = useSearchParams();
  const livestockIdFromUrl = searchParams.get('livestockId');
  
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'completed' | 'due-soon' | 'overdue'>('all');
  const [speciesFilter, setSpeciesFilter] = React.useState<'all' | 'cattle' | 'goat' | 'sheep'>('all');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isBatchMode, setIsBatchMode] = React.useState(false);
  const [selectedLivestock, setSelectedLivestock] = React.useState<string[]>([]);
  const [isLivestockSearchOpen, setIsLivestockSearchOpen] = React.useState(false);
  const [livestockSearchQuery, setLivestockSearchQuery] = React.useState('');
  const [expandedRecords, setExpandedRecords] = React.useState<string[]>([]);
  const [showAddVaccine, setShowAddVaccine] = React.useState(false);
  const [newVaccineName, setNewVaccineName] = React.useState('');
  
  // Treatment types with medicines - organized by category (matches schema tables)
  const [treatmentVaccines, setTreatmentVaccines] = React.useState({
    'Vaccine': [
      'FMD Vaccine',
      'Brucellosis Vaccine',
      'CDT Vaccine',
      'Rabies Vaccine'
    ],
    'Vitamins': [
      'Electrolytes + Amino Acids + Vitamin B Complex',
      'Vitamin B1, B2, B3, B6 + B12'
    ],
    'Antibiotics': [
      'Oxytetracycline (Oxytet LA)',
      'Penicillin G Procaine',
      'Streptomycin Sulfate (Penstrep LA)'
    ],
    'Anti-Inflammatory': [
      'Dexamethasone'
    ],
    'Dewormer': [
      'Doramectin (Dectomax)',
      'Levamisole Hydrochloride/Triclabendazole'
    ]
  });
  
  // Form data matching Vaccination_Records table schema
  const [formData, setFormData] = React.useState({
    livestockId: '', // livestock_id
    treatmentType: '', // treatment_type_id (will map to ID)
    treatmentName: '', // treatment_name
    dosage: '', // dosage
    dosageUnit: 'ml', // dosage_unit_id (will map to ID)
    administrationRoute: 'Intramuscular', // administration_route_id (will map to ID)
    administeredDate: '', // date_administered
    nextDueDate: '', // next_due_date
    administeredBy: '', // administered_by
    notes: '', // notes
    withdrawalEndDate: '', // withdrawal_end_date
    setReminder: false, // For notification creation
    reminderDays: '14' // For notification alert_date calculation
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    // Reset treatment name when treatment type changes and auto-set scheduling
    if (name === 'treatmentType') {
      // Calculate next due date based on treatment type
      let nextDueDate = '';
      let setReminder = false;
      let notes = formData.notes;
      
      if (value === 'Vitamins') {
        // Vitamins: Every 2 weeks
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        nextDueDate = dueDate.toISOString().split('T')[0];
        setReminder = true;
        notes = notes || 'Scheduled for routine vitamin supplementation every 2 weeks';
      } else if (value === 'Dewormer') {
        // Dewormer: Every 3-6 months (default to 3 months)
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + 3);
        nextDueDate = dueDate.toISOString().split('T')[0];
        setReminder = true;
        notes = notes || 'Scheduled for routine deworming (3-6 months interval, adjust as needed)';
      } else if (value === 'Antibiotics' || value === 'Anti-Inflammatory') {
        // Antibiotics/Anti-Inflammatory: Only when sick, no automatic scheduling
        // Set 3-day checkup if pain/symptoms remain
        nextDueDate = '';
        setReminder = false;
        if (value === 'Antibiotics') {
          notes = notes || '⚠️ AMR Treatment - 21 day withdrawal period. Checkup required every 3 days if symptoms persist.';
        } else {
          notes = notes || '⚠️ Monitor for pain. If pain persists, checkup required every 3 days.';
        }
      }
      
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        treatmentName: '',
        nextDueDate,
        setReminder,
        notes
      });
      setShowAddVaccine(false);
    } else if (name === 'administeredDate') {
      // Update withdrawal end date when administered date changes
      let withdrawalEndDate = formData.withdrawalEndDate;
      if (formData.treatmentType === 'Antibiotics' && value) {
        const endDate = new Date(value);
        endDate.setDate(endDate.getDate() + 21);
        withdrawalEndDate = endDate.toISOString().split('T')[0];
      } else if (formData.treatmentType === 'Anti-Inflammatory' && value) {
        const endDate = new Date(value);
        endDate.setDate(endDate.getDate() + 7);
        withdrawalEndDate = endDate.toISOString().split('T')[0];
      } else if (formData.treatmentType === 'Dewormer' && value) {
        const endDate = new Date(value);
        endDate.setDate(endDate.getDate() + 14);
        withdrawalEndDate = endDate.toISOString().split('T')[0];
      }
      
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        withdrawalEndDate
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleAddNewVaccine = () => {
    if (newVaccineName.trim() && formData.treatmentType) {
      setTreatmentVaccines({
        ...treatmentVaccines,
        [formData.treatmentType]: [...treatmentVaccines[formData.treatmentType as keyof typeof treatmentVaccines], newVaccineName.trim()]
      });
      setFormData({
        ...formData,
        treatmentName: newVaccineName.trim()
      });
      setNewVaccineName('');
      setShowAddVaccine(false);
    }
  };

  // Get available vaccines based on selected treatment type
  const availableVaccines = formData.treatmentType ? treatmentVaccines[formData.treatmentType as keyof typeof treatmentVaccines] || [] : [];

  // Auto-open modal and pre-fill livestock ID if coming from livestock profile
  React.useEffect(() => {
    if (livestockIdFromUrl) {
      setIsModalOpen(true);
      setFormData(prev => ({
        ...prev,
        livestockId: livestockIdFromUrl
      }));
    }
  }, [livestockIdFromUrl]);

  const handleBatchToggle = () => {
    setIsBatchMode(!isBatchMode);
    setSelectedLivestock([]);
    setFormData({ ...formData, livestockId: '' });
  };

  const handleLivestockSelection = (livestockId: string) => {
    if (selectedLivestock.includes(livestockId)) {
      setSelectedLivestock(selectedLivestock.filter(id => id !== livestockId));
    } else {
      setSelectedLivestock([...selectedLivestock, livestockId]);
    }
  };

  const toggleRecord = (recordId: string) => {
    if (expandedRecords.includes(recordId)) {
      setExpandedRecords(expandedRecords.filter(id => id !== recordId));
    } else {
      setExpandedRecords([...expandedRecords, recordId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const livestockIds = isBatchMode ? selectedLivestock : [formData.livestockId];
    
    console.log('Recording vaccination for:', {
      livestock: livestockIds,
      ...formData
    });
    
    // Reset form
    setIsModalOpen(false);
    setIsBatchMode(false);
    setSelectedLivestock([]);
    setShowAddVaccine(false);
    setNewVaccineName('');
    setFormData({
      livestockId: '',
      treatmentType: '',
      treatmentName: '',
      dosage: '',
      dosageUnit: 'ml',
      administrationRoute: 'Intramuscular',
      administeredDate: '',
      nextDueDate: '',
      administeredBy: '',
      notes: '',
      withdrawalEndDate: '',
      setReminder: false,
      reminderDays: '14'
    });
  };

  // Mock livestock data for batch selection
  const availableLivestock = [
    { id: 'C-001', name: 'Brahman Cow', species: 'Cattle' },
    { id: 'C-002', name: 'Brahman Bull', species: 'Cattle' },
    { id: 'C-003', name: 'Brahman Heifer', species: 'Cattle' },
    { id: 'G-001', name: 'Boer Buck', species: 'Goat' },
    { id: 'G-002', name: 'Boer Doe', species: 'Goat' },
    { id: 'S-001', name: 'Dorper Ram', species: 'Sheep' },
    { id: 'S-002', name: 'Dorper Ewe', species: 'Sheep' }
  ];

  const vaccineOptions = {
    vaccine: ['FMD Vaccine', 'Brucellosis Vaccine', 'CDT Vaccine', 'Rabies Vaccine', 'Custom'],
    vitamin: ['Vitamin A', 'B Complex', 'Vitamin D', 'Vitamin E', 'Multivitamin', 'Custom'],
    antibiotic: ['Penicillin', 'Oxytetracycline', 'Tylosin', 'Enrofloxacin', 'Custom'],
    antiInflammatory: ['Flunixin Meglumine', 'Ketoprofen', 'Meloxicam', 'Aspirin', 'Custom'],
    dewormer: ['Ivermectin', 'Fenbendazole', 'Albendazole', 'Moxidectin', 'Custom']
  };

  const typeCategories = {
    vaccine: ['Viral', 'Bacterial', 'Other'],
    vitamin: ['Nutritional'],
    antibiotic: ['Antibiotic'],
    antiInflammatory: ['Anti-inflammatory'],
    dewormer: ['Antiparasitic']
  };

  const withdrawalPeriods = {
    antibiotic: 21,
    antiInflammatory: 7,
    dewormer: 14,
    vaccine: 0,
    vitamin: 0
  };

  const filteredRecords = vaccinationRecords.filter((record) => {
    const matchesSearch = record.livestockId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.livestockName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.treatmentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesSpecies = speciesFilter === 'all' || record.species.toLowerCase() === speciesFilter;
    
    return matchesSearch && matchesStatus && matchesSpecies;
  });

  const totalVaccinations = vaccinationRecords.length;
  const completedVaccinations = vaccinationRecords.filter(v => v.status === 'completed').length;
  const dueSoonVaccinations = vaccinationRecords.filter(v => v.status === 'due-soon').length;
  const overdueVaccinations = vaccinationRecords.filter(v => v.status === 'overdue').length;
  const inWithdrawalPeriod = vaccinationRecords.filter(v => v.isInWithdrawal).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-600">Total Records</h3>
            <Syringe size={20} className="text-slate-400" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalVaccinations}</p>
          <p className="text-xs text-slate-500 mt-1">All time records</p>
        </div>

        <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-emerald-900">Completed</h3>
            <CheckCircle size={20} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-emerald-900">{completedVaccinations}</p>
          <p className="text-xs text-emerald-700 mt-1">Up to date</p>
        </div>

        <div className="bg-amber-50 rounded-lg border border-amber-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-amber-900">Due Soon</h3>
            <Clock size={20} className="text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-amber-900">{dueSoonVaccinations}</p>
          <p className="text-xs text-amber-700 mt-1">Next 30 days</p>
        </div>

        <div className="bg-red-50 rounded-lg border border-red-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-red-900">Overdue</h3>
            <AlertCircle size={20} className="text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-900">{overdueVaccinations}</p>
          <p className="text-xs text-red-700 mt-1">Requires attention</p>
        </div>

        <div className="bg-orange-50 rounded-lg border border-orange-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-orange-900">In Withdrawal</h3>
            <AlertCircle size={20} className="text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-900">{inWithdrawalPeriod}</p>
          <p className="text-xs text-orange-700 mt-1">Cannot be sold</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="relative flex-1 md:w-80">
              <input
                type="search"
                placeholder="Search by livestock ID, name, or vaccine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="due-soon">Due Soon</option>
              <option value="overdue">Overdue</option>
            </select>

            <select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value as any)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Species</option>
              <option value="cattle">Cattle</option>
              <option value="goat">Goat</option>
              <option value="sheep">Sheep</option>
            </select>
          </div>

          {!isViewer && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
            >
              <Plus size={18} className="mr-2" />
              Record Treatment
            </button>
          )}
        </div>
      </div>

      {/* View-Only Banner for Viewers */}
      {isViewer && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-medium text-blue-900">View-Only Mode - You can view health records but cannot add or modify treatments</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Vaccination Records */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Treatment Records</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {filteredRecords.map((record) => {
                const isExpanded = expandedRecords.includes(record.vaccinationId);
                
                const getTreatmentColor = (type: string) => {
                  switch(type) {
                    case 'Vaccine': return { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-200 text-blue-900' };
                    case 'Antibiotics': return { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-200 text-red-900' };
                    case 'Dewormer': return { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-200 text-amber-900' };
                    case 'Vitamins': return { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-200 text-emerald-900' };
                    case 'Anti-Inflammatory': return { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-200 text-purple-900' };
                    default: return { bg: 'bg-slate-50', border: 'border-slate-200', badge: 'bg-slate-200 text-slate-900' };
                  }
                };
                const colors = getTreatmentColor(record.treatmentType);
                
                return (
                  <div
                    key={record.vaccinationId}
                    className={`border-l-4 ${colors.border} transition-colors`}
                  >
                    <div 
                      className={`p-5 cursor-pointer hover:${colors.bg} transition-colors`}
                      onClick={() => toggleRecord(record.vaccinationId)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <ChevronDown 
                              size={16} 
                              className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            />
                            <Link
                              to={`/livestock/${record.livestockId}`}
                              className="font-semibold text-primary-600 hover:text-primary-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {record.livestockId}
                            </Link>
                            <span className="text-slate-600">•</span>
                            <span className="text-sm text-slate-600">{record.livestockName}</span>
                            <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                              {record.species}
                            </span>
                            {record.isInWithdrawal && (
                              <span className="inline-flex items-center px-2 py-0.5 bg-orange-100 text-orange-800 text-xs font-bold rounded-full">
                                🔒 WITHDRAWAL
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm ml-6">
                            <div className="flex items-center text-slate-600">
                              <Syringe size={14} className="mr-1" />
                              <span className="font-medium">{record.treatmentName}</span>
                            </div>
                            <div className="flex items-center">
                              <span className={`text-xs px-2 py-0.5 rounded font-semibold ${colors.badge}`}>
                                {record.treatmentType === 'Vaccine' && 'VACCINE'}
                                {record.treatmentType === 'Antibiotics' && 'ANTIBIOTIC'}
                                {record.treatmentType === 'Dewormer' && 'DEWORMER'}
                                {record.treatmentType === 'Vitamins' && 'VITAMIN'}
                                {record.treatmentType === 'Anti-Inflammatory' && 'ANTI-INFLAMMATORY'}
                              </span>
                            </div>
                            <div className="flex items-center text-slate-500">
                              <Calendar size={14} className="mr-1" />
                              {new Date(record.dateAdministered).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </div>
                          </div>
                        </div>

                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          record.status === 'completed' 
                            ? 'bg-emerald-100 text-emerald-700'
                            : record.status === 'due-soon'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {record.status === 'completed' && <CheckCircle size={12} className="mr-1" />}
                          {record.status === 'due-soon' && <Clock size={12} className="mr-1" />}
                          {record.status === 'overdue' && <AlertCircle size={12} className="mr-1" />}
                          {record.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 ml-6">
                        {record.isInWithdrawal && (
                          <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-900">
                            <strong>⚠️ Withdrawal Period:</strong> Cannot be sold/consumed until{' '}
                            {new Date(record.withdrawalEndDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-slate-50 rounded-lg p-2">
                            <p className="text-xs text-slate-500">Dosage</p>
                            <p className="text-sm font-medium text-slate-900">{record.dosage} {record.dosageUnit}</p>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-2">
                            <p className="text-xs text-slate-500">Administration Route</p>
                            <p className="text-sm font-medium text-slate-900">{record.administrationRoute}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs mb-2">
                          <div>
                            {record.nextDueDate ? (
                              <>
                                <span className="text-slate-500">Next due: </span>
                                <span className="font-medium text-slate-900">
                                  {new Date(record.nextDueDate).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </span>
                              </>
                            ) : (
                              <span className="text-slate-400">No booster required</span>
                            )}
                          </div>
                          <div className="text-slate-500">
                            By {record.administeredBy}
                          </div>
                        </div>

                        {record.notes && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <p className="text-xs text-slate-600">
                              <span className="font-medium">Notes:</span> {record.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Vaccinations Sidebar */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Upcoming Schedule</h2>
            </div>
            <div className="p-4 space-y-3">
              {upcomingVaccinations.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    item.overdue 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Link
                      to={`/livestock/${item.livestockId}`}
                      className="font-semibold text-primary-600 hover:text-primary-700 text-sm"
                    >
                      {item.livestockId}
                    </Link>
                    {item.overdue ? (
                      <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                        <AlertCircle size={10} className="mr-1" />
                        Overdue
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-600">
                        {item.daysLeft} days
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mb-1">{item.name}</p>
                  <p className="text-xs font-medium text-slate-900">{item.vaccine}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Due: {new Date(item.dueDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Vaccination Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Record Health Treatment</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Batch Mode Toggle */}
              <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBatchMode}
                    onChange={handleBatchToggle}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm font-medium text-slate-900">
                    Enable Batch Recording (Multiple Animals)
                  </span>
                </label>
                <p className="text-xs text-slate-500 mt-1 ml-6">
                  Record the same treatment for multiple animals at once
                </p>
              </div>

              {/* Livestock Selection */}
              {isBatchMode ? (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Livestock <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-3 border border-slate-200 rounded-lg">
                    {availableLivestock.map((animal) => (
                      <label
                        key={animal.id}
                        className={`flex items-center p-2 rounded-lg border cursor-pointer transition-colors ${
                          selectedLivestock.includes(animal.id)
                            ? 'bg-primary-50 border-primary-300'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedLivestock.includes(animal.id)}
                          onChange={() => handleLivestockSelection(animal.id)}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                        />
                        <div className="ml-2">
                          <p className="text-sm font-medium text-slate-900">{animal.id}</p>
                          <p className="text-xs text-slate-500">{animal.species}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedLivestock.length} animal(s) selected
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Livestock ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="livestockId"
                      value={formData.livestockId}
                      readOnly
                      required={!isBatchMode}
                      placeholder="Click to search and select livestock"
                      className="w-full px-4 py-2 pr-10 border border-slate-200 rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
                      onClick={() => setIsLivestockSearchOpen(true)}
                    />
                    <button
                      type="button"
                      onClick={() => setIsLivestockSearchOpen(true)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded"
                    >
                      <Search size={18} className="text-slate-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Treatment Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Treatment Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {['Vaccine', 'Vitamins', 'Antibiotics', 'Anti-Inflammatory', 'Dewormer'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleInputChange({ target: { name: 'treatmentType', value: type } } as any)}
                      className={`px-4 py-3 border rounded-lg font-medium transition-all ${
                        formData.treatmentType === type
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vaccine/Medicine Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Treatment Name <span className="text-red-500">*</span>
                </label>
                {!formData.treatmentType ? (
                  <div className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-400 text-sm">
                    Please select a treatment type first
                  </div>
                ) : !showAddVaccine ? (
                  <div className="flex space-x-2">
                    <select
                      name="treatmentName"
                      value={formData.treatmentName}
                      onChange={handleInputChange}
                      required
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select treatment</option>
                      {availableVaccines.map((vaccine) => (
                        <option key={vaccine} value={vaccine}>{vaccine}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowAddVaccine(true)}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <Plus size={16} />
                      <span>Add New</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newVaccineName}
                      onChange={(e) => setNewVaccineName(e.target.value)}
                      placeholder="Enter new vaccine/medicine name"
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddNewVaccine())}
                    />
                    <button
                      type="button"
                      onClick={handleAddNewVaccine}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddVaccine(false);
                        setNewVaccineName('');
                      }}
                      className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>



              {/* Dosage and Method */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Dosage <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="dosage"
                      value={formData.dosage}
                      onChange={handleInputChange}
                      required
                      step="0.1"
                      placeholder="5"
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <select
                      name="dosageUnit"
                      value={formData.dosageUnit}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="ml">ml</option>
                      <option value="cc">cc</option>
                      <option value="mg">mg</option>
                      <option value="g">g</option>
                      <option value="IU">IU</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Route of Administration <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="administrationRoute"
                    value={formData.administrationRoute}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Intramuscular">Intramuscular (IM)</option>
                    <option value="Subcutaneous">Subcutaneous (SC)</option>
                    <option value="Intravenous">Intravenous (IV)</option>
                    <option value="Oral">Oral</option>
                    <option value="Topical">Topical</option>
                    <option value="Nasal">Nasal</option>
                  </select>
                </div>
              </div>

              {/* Dates and Administrator */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date Administered <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="administeredDate"
                    value={formData.administeredDate}
                    onChange={handleInputChange}
                    required
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Administered By <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="administeredBy"
                    value={formData.administeredBy}
                    onChange={handleInputChange}
                    required
                    placeholder="Staff name or Veterinarian"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Treatment Scheduling Info */}
              {formData.treatmentType && (
                <div className={`mb-6 p-4 rounded-lg border ${
                  formData.treatmentType === 'Vitamins' ? 'bg-emerald-50 border-emerald-200' :
                  formData.treatmentType === 'Dewormer' ? 'bg-amber-50 border-amber-200' :
                  (formData.treatmentType === 'Antibiotics' || formData.treatmentType === 'Anti-Inflammatory') ? 'bg-orange-50 border-orange-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start space-x-2">
                    <AlertCircle size={20} className={`mt-0.5 ${
                      formData.treatmentType === 'Vitamins' ? 'text-emerald-600' :
                      formData.treatmentType === 'Dewormer' ? 'text-amber-600' :
                      (formData.treatmentType === 'Antibiotics' || formData.treatmentType === 'Anti-Inflammatory') ? 'text-orange-600' :
                      'text-blue-600'
                    }`} />
                    <div className="flex-1">
                      {formData.treatmentType === 'Vitamins' && (
                        <>
                          <h4 className="text-sm font-semibold text-emerald-900 mb-1">Automatic Scheduling Enabled</h4>
                          <p className="text-sm text-emerald-800 mb-1">
                            <strong>Vitamins are scheduled every 2 weeks</strong> for routine supplementation.
                          </p>
                          <p className="text-xs text-emerald-700">
                            Next due date has been automatically set. A reminder will be created 7 days before.
                          </p>
                        </>
                      )}
                      {formData.treatmentType === 'Dewormer' && (
                        <>
                          <h4 className="text-sm font-semibold text-amber-900 mb-1">Automatic Scheduling Enabled</h4>
                          <p className="text-sm text-amber-800 mb-1">
                            <strong>Deworming is scheduled every 3-6 months</strong> (default: 3 months).
                          </p>
                          <p className="text-xs text-amber-700">
                            You can adjust the next due date below. A reminder will be created 14 days before.
                          </p>
                          {formData.administeredDate && (
                            <div className="mt-3 p-2 bg-white border border-amber-200 rounded text-xs">
                              <strong>⚠️ Withdrawal Period:</strong> 14 days - Cannot be sold/consumed until{' '}
                              {new Date(
                                new Date(formData.administeredDate).getTime() + 14 * 24 * 60 * 60 * 1000
                              ).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                          )}
                        </>
                      )}
                      {formData.treatmentType === 'Antibiotics' && (
                        <>
                          <h4 className="text-sm font-semibold text-orange-900 mb-1">⚠️ AMR Treatment Protocol</h4>
                          <p className="text-sm text-orange-800 mb-2">
                            <strong>21-day withdrawal period required.</strong> Animal status will be changed to "Sick".
                          </p>
                          <ul className="text-xs text-orange-700 space-y-1 list-disc ml-4">
                            <li>Checkup required every 3 days if symptoms persist</li>
                            <li>If not recovered, treatment may be re-administered</li>
                            <li>Cannot be sold/consumed during withdrawal period</li>
                            <li>No automatic scheduling - only administer when animal is sick</li>
                          </ul>
                          {formData.administeredDate && (
                            <div className="mt-3 p-2 bg-white border border-orange-200 rounded text-xs">
                              <strong>🔒 Withdrawal End Date:</strong>{' '}
                              {new Date(
                                new Date(formData.administeredDate).getTime() + 21 * 24 * 60 * 60 * 1000
                              ).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                          )}
                        </>
                      )}
                      {formData.treatmentType === 'Anti-Inflammatory' && (
                        <>
                          <h4 className="text-sm font-semibold text-orange-900 mb-1">⚠️ Pain Management Protocol</h4>
                          <p className="text-sm text-orange-800 mb-2">
                            <strong>7-day withdrawal period required.</strong>
                          </p>
                          <ul className="text-xs text-orange-700 space-y-1 list-disc ml-4">
                            <li>Monitor for pain relief - if pain persists, checkup every 3 days</li>
                            <li>If no improvement, may need to re-administer</li>
                            <li>Cannot be sold/consumed during withdrawal period</li>
                            <li>Only administer when animal shows pain/inflammation</li>
                          </ul>
                          {formData.administeredDate && (
                            <div className="mt-3 p-2 bg-white border border-orange-200 rounded text-xs">
                              <strong>🔒 Withdrawal End Date:</strong>{' '}
                              {new Date(
                                new Date(formData.administeredDate).getTime() + 7 * 24 * 60 * 60 * 1000
                              ).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Reminder Settings */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <label className="flex items-center cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    name="setReminder"
                    checked={formData.setReminder}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm font-medium text-slate-900">
                    Set Reminder for Next Treatment
                  </span>
                </label>

                {formData.setReminder && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Next Due Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="nextDueDate"
                        value={formData.nextDueDate}
                        onChange={handleInputChange}
                        required={formData.setReminder}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Remind Me (Days Before)
                      </label>
                      <select
                        name="reminderDays"
                        value={formData.reminderDays}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="7">7 days before</option>
                        <option value="14">14 days before</option>
                        <option value="30">30 days before</option>
                        <option value="60">60 days before</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Notes / Observations
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any observations, reactions, or additional information..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center"
                >
                  <Syringe size={18} className="mr-2" />
                  {isBatchMode ? `Record for ${selectedLivestock.length} Animal${selectedLivestock.length !== 1 ? 's' : ''}` : 'Record Treatment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Livestock Search Modal */}
      {isLivestockSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Select Livestock</h3>
              <button
                onClick={() => {
                  setIsLivestockSearchOpen(false);
                  setLivestockSearchQuery('');
                }}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search by ID, name, species, or breed..."
                  value={livestockSearchQuery}
                  onChange={(e) => setLivestockSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {availableLivestock
                  .filter((animal) => {
                    const search = livestockSearchQuery.toLowerCase();
                    return (
                      animal.id.toLowerCase().includes(search) ||
                      animal.name.toLowerCase().includes(search) ||
                      animal.species.toLowerCase().includes(search)
                    );
                  })
                  .map((animal) => (
                    <button
                      key={animal.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, livestockId: animal.id });
                        setIsLivestockSearchOpen(false);
                        setLivestockSearchQuery('');
                      }}
                      className="w-full p-4 border border-slate-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{animal.id}</p>
                          <p className="text-sm text-slate-600">{animal.name}</p>
                        </div>
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                          {animal.species}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>

              {availableLivestock.filter((animal) => {
                const search = livestockSearchQuery.toLowerCase();
                return (
                  animal.id.toLowerCase().includes(search) ||
                  animal.name.toLowerCase().includes(search) ||
                  animal.species.toLowerCase().includes(search)
                );
              }).length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <p>No livestock found matching "{livestockSearchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
