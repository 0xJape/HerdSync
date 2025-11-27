import React, { useState } from 'react';
import { 
  Heart,
  Calendar,
  Search,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  Activity,
  Stethoscope,
  Plus,
  Save,
  Baby
} from 'lucide-react';

interface BCSRecord {
  month: string;
  bcs: number;
  notes: string;
  recordedBy: string;
  date: string;
}

interface OffspringRecord {
  id: number;
  sex: 'Male' | 'Female';
  weight: number;
  condition: string;
  notes: string;
}

interface PregnancyRecord {
  id: number;
  species: string;
  breedingDate: string;
  expectedDueDate: string;
  daysPregnant: number;
  gestationProgress: number;
  damId: string;
  damName: string;
  damBreed: string;
  sireId: string;
  sireName: string;
  pregnancyStatus: 'Early' | 'Mid' | 'Late' | 'Overdue';
  lastCheckup: string;
  healthStatus: 'Good' | 'Attention Needed' | 'Critical';
  notes: string;
  bcsRecords: BCSRecord[];
  birthStatus: 'Pregnant' | 'Given Birth';
  birthDate?: string;
  offspring?: OffspringRecord[];
}

export default function Pregnancy() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPregnancy, setSelectedPregnancy] = useState<PregnancyRecord | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBCSModal, setShowBCSModal] = useState(false);
  const [showBirthModal, setShowBirthModal] = useState(false);
  
  const [bcsFormData, setBcsFormData] = useState({
    bcs: '',
    notes: ''
  });

  const [birthFormData, setBirthFormData] = useState({
    birthDate: '',
    numberOfOffspring: 1,
    offspring: [{ sex: 'Male' as 'Male' | 'Female', weight: '', condition: '', notes: '' }]
  });

  // Mock pregnancy data - Only CONFIRMED breeding records that have passed 3 months (90 days)
  // In production, this would filter breeding records where:
  // 1. status === 'Confirmed' 
  // 2. Days since breeding >= 90 days
  // 3. Not yet given birth
  const [pregnancies, setPregnancies] = useState<PregnancyRecord[]>([
    {
      id: 2, // From BreedingOverview - G-019 breeding record
      species: 'Goat',
      breedingDate: '2024-10-05', // Confirmed breeding from Oct 5
      expectedDueDate: '2025-03-05', // Goat gestation: ~150 days
      daysPregnant: 142, // 142 days since breeding (passed 3 months/90 days)
      gestationProgress: 95, // 142/150 = 95%
      damId: 'G-019',
      damName: 'Boer Maiden Doe',
      damBreed: 'Boer',
      sireId: 'G-001',
      sireName: 'Boer Buck',
      pregnancyStatus: 'Late',
      lastCheckup: '1 day ago',
      healthStatus: 'Good',
      notes: 'Confirmed pregnancy at 90 days. First pregnancy. Preparing for kidding. Moved to maternity pen.',
      bcsRecords: [
        {
          month: 'Month 3',
          bcs: 3.0,
          notes: 'Pregnancy confirmed. Body condition good.',
          recordedBy: 'Doc Alexis',
          date: '2024-11-05'
        },
        {
          month: 'Month 4',
          bcs: 3.5,
          notes: 'Good weight gain. Appetite excellent.',
          recordedBy: 'Doc Alexis',
          date: '2024-12-05'
        }
      ],
      birthStatus: 'Pregnant'
    }
  ]);

  const handleAddBCS = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPregnancy) {
      const currentMonth = selectedPregnancy.bcsRecords.length + 3; // Starting from month 3
      const newBCSRecord: BCSRecord = {
        month: `Month ${currentMonth}`,
        bcs: parseFloat(bcsFormData.bcs),
        notes: bcsFormData.notes,
        recordedBy: 'Doc Alexis',
        date: new Date().toISOString().split('T')[0]
      };

      setPregnancies(pregnancies.map(p => 
        p.id === selectedPregnancy.id 
          ? { ...p, bcsRecords: [...p.bcsRecords, newBCSRecord] }
          : p
      ));

      setBcsFormData({ bcs: '', notes: '' });
      setShowBCSModal(false);
      
      console.log('Activity Log:', {
        type: 'BCS Recorded',
        pregnancyId: selectedPregnancy.id,
        damId: selectedPregnancy.damId,
        month: newBCSRecord.month,
        bcs: newBCSRecord.bcs,
        timestamp: new Date().toLocaleString(),
        performedBy: 'Doc Alexis'
      });
    }
  };

  const handleRecordBirth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPregnancy) {
      const offspring: OffspringRecord[] = birthFormData.offspring.map((off, index) => ({
        id: index + 1,
        sex: off.sex,
        weight: parseFloat(off.weight),
        condition: off.condition,
        notes: off.notes
      }));

      setPregnancies(pregnancies.map(p => 
        p.id === selectedPregnancy.id 
          ? { 
              ...p, 
              birthStatus: 'Given Birth',
              birthDate: birthFormData.birthDate,
              offspring: offspring
            }
          : p
      ));

      console.log('Activity Log:', {
        type: 'Birth Recorded',
        pregnancyId: selectedPregnancy.id,
        damId: selectedPregnancy.damId,
        birthDate: birthFormData.birthDate,
        numberOfOffspring: offspring.length,
        offspring: offspring,
        timestamp: new Date().toLocaleString(),
        performedBy: 'Doc Alexis'
      });

      setBirthFormData({
        birthDate: '',
        numberOfOffspring: 1,
        offspring: [{ sex: 'Male', weight: '', condition: '', notes: '' }]
      });
      setShowBirthModal(false);
      setShowDetailModal(false);
    }
  };

  const updateOffspringCount = (count: number) => {
    const newOffspring = Array.from({ length: count }, (_, i) => 
      birthFormData.offspring[i] || { sex: 'Male' as 'Male' | 'Female', weight: '', condition: '', notes: '' }
    );
    setBirthFormData({
      ...birthFormData,
      numberOfOffspring: count,
      offspring: newOffspring
    });
  };

  const updateOffspring = (index: number, field: string, value: any) => {
    const newOffspring = [...birthFormData.offspring];
    newOffspring[index] = { ...newOffspring[index], [field]: value };
    setBirthFormData({ ...birthFormData, offspring: newOffspring });
  };

  // Filter pregnancies
  const filteredPregnancies = pregnancies.filter(pregnancy => {
    const matchesSearch = 
      pregnancy.damId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pregnancy.damName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pregnancy.sireId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecies = filterSpecies === 'all' || pregnancy.species.toLowerCase() === filterSpecies;
    const matchesStatus = filterStatus === 'all' || pregnancy.pregnancyStatus.toLowerCase() === filterStatus;

    return matchesSearch && matchesSpecies && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Early':
        return 'bg-blue-100 text-blue-800';
      case 'Mid':
        return 'bg-amber-100 text-amber-800';
      case 'Late':
        return 'bg-purple-100 text-purple-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'Good':
        return 'bg-emerald-100 text-emerald-800';
      case 'Attention Needed':
        return 'bg-amber-100 text-amber-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  // Summary stats
  const totalPregnancies = pregnancies.length;
  const earlyStage = pregnancies.filter(p => p.pregnancyStatus === 'Early').length;
  const midStage = pregnancies.filter(p => p.pregnancyStatus === 'Mid').length;
  const lateStage = pregnancies.filter(p => p.pregnancyStatus === 'Late').length;
  const overdue = pregnancies.filter(p => p.pregnancyStatus === 'Overdue').length;
  const needsAttention = pregnancies.filter(p => p.healthStatus !== 'Good').length;
  const dueThisMonth = pregnancies.filter(p => {
    const dueDate = new Date(p.expectedDueDate);
    const today = new Date();
    return dueDate.getMonth() === today.getMonth() && dueDate.getFullYear() === today.getFullYear();
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Pregnancy Monitoring</h1>
          <p className="text-sm text-slate-600 mt-1">
            Track confirmed pregnancies (90+ days) and monitor expected birth dates
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600">
            Gestation Periods: Cattle ~283 days | Goat ~150 days | Sheep ~147 days
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Confirmed</p>
              <p className="text-2xl font-semibold text-slate-900 mt-1">{totalPregnancies}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <Heart className="text-primary-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">90+ days pregnant</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Due This Month</p>
              <p className="text-2xl font-semibold text-purple-600 mt-1">{dueThisMonth}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Calendar className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Expected births</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Early Stage</p>
              <p className="text-2xl font-semibold text-blue-600 mt-1">{earlyStage}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">3-6 months</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Mid Stage</p>
              <p className="text-2xl font-semibold text-amber-600 mt-1">{midStage}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <Calendar className="text-amber-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">6-8 months</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Late Stage</p>
              <p className="text-2xl font-semibold text-purple-600 mt-1">{lateStage}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Ready to birth</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Need Attention</p>
              <p className="text-2xl font-semibold text-red-600 mt-1">{needsAttention + overdue}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertCircle className="text-red-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Health or overdue</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by dam or sire ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Species Filter */}
          <select
            value={filterSpecies}
            onChange={(e) => setFilterSpecies(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Species</option>
            <option value="cattle">Cattle</option>
            <option value="goat">Goat</option>
            <option value="sheep">Sheep</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Stages</option>
            <option value="early">Early Stage</option>
            <option value="mid">Mid Stage</option>
            <option value="late">Late Stage</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Pregnancy Records Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Dam Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Sire Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Breeding Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Expected Due
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Health
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Last Checkup
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPregnancies.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-sm text-slate-500">
                    No pregnancy records found
                  </td>
                </tr>
              ) : (
                filteredPregnancies.map((pregnancy) => (
                  <tr key={pregnancy.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{pregnancy.damId}</div>
                        <div className="text-sm text-slate-600">{pregnancy.damName}</div>
                        <div className="text-xs text-slate-500">{pregnancy.damBreed}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{pregnancy.sireId}</div>
                        <div className="text-sm text-slate-600">{pregnancy.sireName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">
                        {new Date(pregnancy.breedingDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-slate-500">{pregnancy.daysPregnant} days ago</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">
                        {new Date(pregnancy.expectedDueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 w-20">
                          <div
                            className={`h-2 rounded-full ${
                              pregnancy.gestationProgress >= 100 ? 'bg-red-500' : 'bg-primary-500'
                            }`}
                            style={{ width: `${Math.min(pregnancy.gestationProgress, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {pregnancy.gestationProgress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(pregnancy.pregnancyStatus)}`}>
                        {pregnancy.pregnancyStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getHealthStatusColor(pregnancy.healthStatus)}`}>
                        {pregnancy.healthStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-600">{pregnancy.lastCheckup}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedPregnancy(pregnancy);
                          setShowDetailModal(true);
                        }}
                        className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                      >
                        <Eye size={16} />
                        <span className="text-sm">View Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pregnancy Detail Modal */}
      {showDetailModal && selectedPregnancy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Pregnancy Details</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Dam: {selectedPregnancy.damId} - {selectedPregnancy.damName}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedPregnancy(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Progress Overview */}
              <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Gestation Progress</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">
                      {selectedPregnancy.gestationProgress}%
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedPregnancy.pregnancyStatus)}`}>
                    {selectedPregnancy.pregnancyStatus} Stage
                  </div>
                </div>
                <div className="w-full bg-white rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      selectedPregnancy.gestationProgress >= 100 ? 'bg-red-500' : 'bg-primary-500'
                    }`}
                    style={{ width: `${Math.min(selectedPregnancy.gestationProgress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-600">
                  <span>Breeding Date: {new Date(selectedPregnancy.breedingDate).toLocaleDateString()}</span>
                  <span>Expected Due: {new Date(selectedPregnancy.expectedDueDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Dam Information */}
              <div className="bg-white rounded-lg border border-slate-200 p-5">
                <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                  <Heart className="mr-2 text-primary-600" size={18} />
                  Dam (Mother) Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Livestock ID</p>
                    <p className="text-sm font-medium text-slate-900">{selectedPregnancy.damId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Name</p>
                    <p className="text-sm font-medium text-slate-900">{selectedPregnancy.damName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Breed</p>
                    <p className="text-sm font-medium text-slate-900">{selectedPregnancy.damBreed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Species</p>
                    <p className="text-sm font-medium text-slate-900">{selectedPregnancy.species}</p>
                  </div>
                </div>
              </div>

              {/* Sire Information */}
              <div className="bg-white rounded-lg border border-slate-200 p-5">
                <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                  <Activity className="mr-2 text-blue-600" size={18} />
                  Sire (Father) Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Livestock ID</p>
                    <p className="text-sm font-medium text-slate-900">{selectedPregnancy.sireId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Name</p>
                    <p className="text-sm font-medium text-slate-900">{selectedPregnancy.sireName}</p>
                  </div>
                </div>
              </div>

              {/* Pregnancy Timeline */}
              <div className="bg-white rounded-lg border border-slate-200 p-5">
                <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                  <Calendar className="mr-2 text-amber-600" size={18} />
                  Pregnancy Timeline
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Breeding Date</p>
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(selectedPregnancy.breedingDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Days Pregnant</p>
                    <p className="text-sm font-medium text-slate-900">{selectedPregnancy.daysPregnant} days</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Expected Due Date</p>
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(selectedPregnancy.expectedDueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Health Status */}
              <div className="bg-white rounded-lg border border-slate-200 p-5">
                <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                  <Stethoscope className="mr-2 text-emerald-600" size={18} />
                  Health & Monitoring
                </h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500">Health Status</p>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full mt-1 ${getHealthStatusColor(selectedPregnancy.healthStatus)}`}>
                      {selectedPregnancy.healthStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Last Checkup</p>
                    <p className="text-sm font-medium text-slate-900">{selectedPregnancy.lastCheckup}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-2">Notes</p>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">
                    {selectedPregnancy.notes}
                  </p>
                </div>
              </div>

              {/* Monthly BCS Records */}
              <div className="bg-white rounded-lg border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-slate-900 flex items-center">
                    <Activity className="mr-2 text-blue-600" size={18} />
                    Monthly Body Condition Score (BCS)
                  </h4>
                  {selectedPregnancy.birthStatus === 'Pregnant' && (
                    <button
                      onClick={() => setShowBCSModal(true)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                    >
                      <Plus size={14} />
                      <span>Add BCS</span>
                    </button>
                  )}
                </div>
                {selectedPregnancy.bcsRecords.length > 0 ? (
                  <div className="space-y-3">
                    {selectedPregnancy.bcsRecords.map((record, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{record.month}</p>
                            <p className="text-xs text-slate-500">{new Date(record.date).toLocaleDateString()}</p>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                            BCS: {record.bcs}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700">{record.notes}</p>
                        <p className="text-xs text-slate-500 mt-2">Recorded by: {record.recordedBy}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 text-center py-4">No BCS records yet</p>
                )}
              </div>

              {/* Birth Record (if given birth) */}
              {selectedPregnancy.birthStatus === 'Given Birth' && selectedPregnancy.offspring && (
                <div className="bg-white rounded-lg border border-emerald-200 p-5 bg-emerald-50">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
                    <Baby className="mr-2 text-emerald-600" size={18} />
                    Birth Record
                  </h4>
                  <div className="mb-4">
                    <p className="text-xs text-slate-500">Birth Date</p>
                    <p className="text-sm font-medium text-slate-900">
                      {selectedPregnancy.birthDate && new Date(selectedPregnancy.birthDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-900">
                      Offspring ({selectedPregnancy.offspring.length})
                    </p>
                    {selectedPregnancy.offspring.map((off, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-emerald-200">
                        <div className="grid grid-cols-3 gap-3 mb-2">
                          <div>
                            <p className="text-xs text-slate-500">#{index + 1}</p>
                            <p className="text-sm font-medium text-slate-900">{off.sex}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Birth Weight</p>
                            <p className="text-sm font-medium text-slate-900">{off.weight} kg</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Condition</p>
                            <p className="text-sm font-medium text-slate-900">{off.condition}</p>
                          </div>
                        </div>
                        {off.notes && (
                          <p className="text-xs text-slate-600 mt-2">{off.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between space-x-3 p-6 border-t border-slate-200 bg-slate-50">
              <div>
                {selectedPregnancy.birthStatus === 'Pregnant' && (
                  <button
                    onClick={() => setShowBirthModal(true)}
                    className="flex items-center space-x-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
                  >
                    <Baby size={18} />
                    <span>Record Birth</span>
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedPregnancy(null);
                }}
                className="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-white transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add BCS Modal */}
      {showBCSModal && selectedPregnancy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Add Monthly BCS Record</h3>
              <button
                onClick={() => {
                  setShowBCSModal(false);
                  setBcsFormData({ bcs: '', notes: '' });
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddBCS} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Body Condition Score (1-5) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="5"
                  value={bcsFormData.bcs}
                  onChange={(e) => setBcsFormData({ ...bcsFormData, bcs: e.target.value })}
                  placeholder="3.5"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-500 mt-1">1=Very Thin, 3=Average, 5=Very Fat</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Notes & Observations <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={bcsFormData.notes}
                  onChange={(e) => setBcsFormData({ ...bcsFormData, notes: e.target.value })}
                  rows={3}
                  placeholder="Condition notes, appetite, mobility, etc..."
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowBCSModal(false);
                    setBcsFormData({ bcs: '', notes: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save BCS</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Birth Modal */}
      {showBirthModal && selectedPregnancy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-slate-900">Record Birth</h3>
              <button
                onClick={() => {
                  setShowBirthModal(false);
                  setBirthFormData({
                    birthDate: '',
                    numberOfOffspring: 1,
                    offspring: [{ sex: 'Male', weight: '', condition: '', notes: '' }]
                  });
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleRecordBirth} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Birth Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={birthFormData.birthDate}
                  onChange={(e) => setBirthFormData({ ...birthFormData, birthDate: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Number of Offspring <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={birthFormData.numberOfOffspring}
                  onChange={(e) => updateOffspringCount(parseInt(e.target.value))}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900">Offspring Details</h4>
                {birthFormData.offspring.map((off, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm font-medium text-slate-900 mb-3">Offspring #{index + 1}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Sex <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={off.sex}
                          onChange={(e) => updateOffspring(index, 'sex', e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Birth Weight (kg) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={off.weight}
                          onChange={(e) => updateOffspring(index, 'weight', e.target.value)}
                          placeholder="2.5"
                          required
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Condition <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={off.condition}
                          onChange={(e) => updateOffspring(index, 'condition', e.target.value)}
                          placeholder="e.g., Healthy, Weak, Strong"
                          required
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Notes (Optional)
                        </label>
                        <textarea
                          value={off.notes}
                          onChange={(e) => updateOffspring(index, 'notes', e.target.value)}
                          rows={2}
                          placeholder="Additional observations..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowBirthModal(false);
                    setBirthFormData({
                      birthDate: '',
                      numberOfOffspring: 1,
                      offspring: [{ sex: 'Male', weight: '', condition: '', notes: '' }]
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>Record Birth</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
