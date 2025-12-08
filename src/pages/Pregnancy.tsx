import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  calfVigor: string;
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
  const [activeTab, setActiveTab] = useState<'pregnant' | 'newborn'>('pregnant');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPregnancy, setSelectedPregnancy] = useState<PregnancyRecord | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBCSModal, setShowBCSModal] = useState(false);
  const [showBirthModal, setShowBirthModal] = useState(false);
  const [showNewbornModal, setShowNewbornModal] = useState(false);
  const [selectedNewborn, setSelectedNewborn] = useState<any>(null);
  
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
    },
    {
      id: 3,
      species: 'Cattle',
      breedingDate: '2024-06-15',
      expectedDueDate: '2025-03-23', // Cattle gestation: ~280 days
      daysPregnant: 168,
      gestationProgress: 60,
      damId: 'C-015',
      damName: 'Brahman Cow',
      damBreed: 'Brahman',
      sireId: 'C-001',
      sireName: 'Brahman Bull',
      pregnancyStatus: 'Mid',
      lastCheckup: '3 weeks ago',
      healthStatus: 'Good',
      notes: 'Second pregnancy. Doing well.',
      bcsRecords: [
        {
          month: 'Month 3',
          bcs: 3.5,
          notes: 'Excellent condition',
          recordedBy: 'Dr. Santos',
          date: '2024-09-15'
        }
      ],
      birthStatus: 'Given Birth',
      birthDate: '2024-11-20',
      offspring: [
        {
          id: 1,
          sex: 'Male',
          weight: 32,
          condition: 'Healthy and active',
          calfVigor: 'Strong',
          notes: 'Born naturally, standing within 30 minutes'
        }
      ]
    },
    {
      id: 4,
      species: 'Goat',
      breedingDate: '2024-07-10',
      expectedDueDate: '2024-12-07',
      daysPregnant: 143,
      gestationProgress: 95,
      damId: 'G-008',
      damName: 'Anglo-Nubian Doe',
      damBreed: 'Anglo-Nubian',
      sireId: 'G-001',
      sireName: 'Boer Buck',
      pregnancyStatus: 'Late',
      lastCheckup: '5 days ago',
      healthStatus: 'Good',
      notes: 'Third pregnancy, twins expected',
      bcsRecords: [
        {
          month: 'Month 3',
          bcs: 3.0,
          notes: 'Twins confirmed via ultrasound',
          recordedBy: 'Dr. Santos',
          date: '2024-10-10'
        }
      ],
      birthStatus: 'Given Birth',
      birthDate: '2024-11-25',
      offspring: [
        {
          id: 1,
          sex: 'Female',
          weight: 3.2,
          condition: 'Healthy, nursing well',
          calfVigor: 'Strong',
          notes: 'First twin, born at 8:15 AM'
        },
        {
          id: 2,
          sex: 'Male',
          weight: 2.8,
          condition: 'Slightly weak, improving',
          calfVigor: 'Moderate',
          notes: 'Second twin, born at 8:22 AM, needed assistance'
        }
      ]
    },
    {
      id: 5,
      species: 'Sheep',
      breedingDate: '2024-08-01',
      expectedDueDate: '2024-12-28',
      daysPregnant: 121,
      gestationProgress: 81,
      damId: 'S-005',
      damName: 'Native Ewe',
      damBreed: 'Native/Philippine Native',
      sireId: 'S-001',
      sireName: 'Barbados Blackbelly Ram',
      pregnancyStatus: 'Mid',
      lastCheckup: '2 weeks ago',
      healthStatus: 'Attention Needed',
      notes: 'First pregnancy, monitoring closely due to previous illness',
      bcsRecords: [
        {
          month: 'Month 3',
          bcs: 2.5,
          notes: 'Recovering well, gaining weight',
          recordedBy: 'Dr. Santos',
          date: '2024-11-01'
        }
      ],
      birthStatus: 'Given Birth',
      birthDate: '2024-11-15',
      offspring: [
        {
          id: 1,
          sex: 'Female',
          weight: 2.1,
          condition: 'Needs monitoring',
          calfVigor: 'Weak',
          notes: 'Born small, receiving supplemental feeding'
        }
      ]
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
        calfVigor: off.calfVigor || 'Strong',
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

      {/* Summary Cards - Simplified */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Confirmed Pregnancies */}
        <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-lg border border-primary-200 p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Heart className="text-primary-600" size={16} />
                <p className="text-xs font-semibold text-slate-700">Total Confirmed</p>
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-1">{totalPregnancies}</p>
              <p className="text-xs text-slate-600 mt-1">90+ days pregnant</p>
            </div>
          </div>
          {/* Stage Breakdown */}
          <div className="mt-3 pt-3 border-t border-primary-200 flex items-center justify-between text-xs">
            <div className="text-center">
              <p className="text-slate-600">Early</p>
              <p className="font-bold text-blue-600">{earlyStage}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-600">Mid</p>
              <p className="font-bold text-amber-600">{midStage}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-600">Late</p>
              <p className="font-bold text-purple-600">{lateStage}</p>
            </div>
          </div>
        </div>

        {/* Due This Month */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 hover:border-purple-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar className="text-purple-600" size={18} />
            </div>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
              URGENT
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-1">Due This Month</p>
          <p className="text-2xl font-bold text-purple-600 mb-1">{dueThisMonth}</p>
          <p className="text-xs text-slate-500">Expected births in December</p>
        </div>

        {/* Need Attention */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 hover:border-red-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertCircle className="text-red-600" size={18} />
            </div>
            {(needsAttention + overdue) > 0 && (
              <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-bold rounded-full animate-pulse">
                ACTION NEEDED
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 mb-1">Need Attention</p>
          <p className="text-2xl font-bold text-red-600 mb-1">{needsAttention + overdue}</p>
          <p className="text-xs text-slate-500">
            {overdue > 0 ? `${overdue} overdue, ` : ''}{needsAttention} health concerns
          </p>
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

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('pregnant')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === 'pregnant'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Heart size={16} />
                <span>Pregnant Livestock</span>
                <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold">
                  {filteredPregnancies.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('newborn')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === 'newborn'
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Baby size={16} />
                <span>Newborn Livestock</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                  {filteredPregnancies.filter(p => p.birthStatus === 'Given Birth').reduce((sum, p) => sum + (p.offspring?.length || 0), 0)}
                </span>
              </div>
            </button>
          </div>
        </div>

      {/* Pregnancy Records Table */}
      {activeTab === 'pregnant' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b-2 border-slate-300">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Dam
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Sire
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Health
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredPregnancies.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <Heart size={48} className="mx-auto mb-3 text-slate-300" />
                    <p className="text-base font-medium text-slate-600">No pregnancy records found</p>
                    <p className="text-sm text-slate-500 mt-1">Try adjusting your filters</p>
                  </td>
                </tr>
              ) : (
                filteredPregnancies.map((pregnancy) => (
                  <tr key={pregnancy.id} className="hover:bg-primary-50 transition-colors group">
                    <td className="px-5 py-4">
                      <div>
                        <div className="text-base font-bold text-slate-900">{pregnancy.damId}</div>
                        <div className="text-sm text-slate-600 mt-1">{pregnancy.damName}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{pregnancy.damBreed}</div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-semibold text-slate-900">{pregnancy.sireId}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-semibold text-slate-900">
                        {new Date(pregnancy.expectedDueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">{pregnancy.daysPregnant} days</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="bg-slate-200 rounded-full h-2.5 w-20 shadow-inner">
                          <div
                            className={`h-2.5 rounded-full transition-all ${
                              pregnancy.gestationProgress >= 100 ? 'bg-red-500 shadow-sm' : 'bg-primary-600 shadow-sm'
                            }`}
                            style={{ width: `${Math.min(pregnancy.gestationProgress, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-slate-800 min-w-[40px]">
                          {pregnancy.gestationProgress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full shadow-sm ${getStatusColor(pregnancy.pregnancyStatus)}`}>
                        {pregnancy.pregnancyStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full shadow-sm ${getHealthStatusColor(pregnancy.healthStatus)}`}>
                        {pregnancy.healthStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        to={`/pregnancy/${pregnancy.id}`}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-primary-700 hover:text-primary-800 hover:bg-primary-100 rounded-lg transition-colors font-medium"
                      >
                        <Eye size={16} />
                        <span className="text-sm">View</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Newborn Livestock Tab */}
      {activeTab === 'newborn' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b-2 border-slate-300">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Species
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Sex
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Birth Date
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Vigor
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Dam
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredPregnancies
                .filter(p => p.birthStatus === 'Given Birth' && p.offspring)
                .flatMap(pregnancy => 
                  pregnancy.offspring!.map((offspring, index) => ({
                    livestockId: `LS-${pregnancy.id}${offspring.id}`,
                    species: pregnancy.species,
                    sex: offspring.sex,
                    birthDate: pregnancy.birthDate,
                    weight: offspring.weight,
                    vigor: offspring.calfVigor,
                    condition: offspring.condition,
                    damId: pregnancy.damId,
                    damName: pregnancy.damName,
                    pregnancyId: pregnancy.id
                  }))
                )
                .map((newborn, index) => (
                  <tr key={index} className="hover:bg-emerald-50 transition-colors group">
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-bold text-slate-900">{newborn.livestockId}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-slate-900">{newborn.species}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-bold shadow-sm ${
                        newborn.sex === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                      }`}>
                        {newborn.sex === 'Male' ? '♂' : '♀'} {newborn.sex}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {newborn.birthDate && new Date(newborn.birthDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-slate-900">
                      {newborn.weight} kg
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${
                        newborn.vigor === 'Strong' ? 'bg-emerald-100 text-emerald-800' :
                        newborn.vigor === 'Moderate' ? 'bg-blue-100 text-blue-800' :
                        newborn.vigor === 'Weak' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {newborn.vigor || 'N/A'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-bold text-slate-900 text-base">{newborn.damId}</p>
                        <p className="text-sm text-slate-600 mt-1">{newborn.damName}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => {
                          setSelectedNewborn(newborn);
                          setShowNewbornModal(true);
                        }}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-primary-700 hover:text-primary-800 hover:bg-primary-100 rounded-lg transition-colors font-medium"
                      >
                        <Eye size={16} />
                        <span className="text-sm">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              {filteredPregnancies.filter(p => p.birthStatus === 'Given Birth' && p.offspring).length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <Baby className="mx-auto mb-3 text-slate-300" size={48} />
                    <p className="text-slate-500 font-medium">No newborn livestock yet</p>
                    <p className="text-sm text-slate-400 mt-1">Newborns will appear here after birth is recorded</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
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

      {/* Newborn Detail Modal */}
      {showNewbornModal && selectedNewborn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Baby className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Newborn Livestock Profile</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    ID: <span className="font-mono font-semibold">{selectedNewborn.livestockId}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNewbornModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Species</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedNewborn.species}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Sex</p>
                    <p className={`text-sm font-semibold ${
                      selectedNewborn.sex === 'Male' ? 'text-blue-600' : 'text-pink-600'
                    }`}>
                      {selectedNewborn.sex}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Birth Date</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {selectedNewborn.birthDate && new Date(selectedNewborn.birthDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Age</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {selectedNewborn.birthDate && Math.floor((new Date().getTime() - new Date(selectedNewborn.birthDate).getTime()) / (1000 * 60 * 60 * 24))} days old
                    </p>
                  </div>
                </div>
              </div>

              {/* Health Information */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Health Information</h4>
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Birth Weight</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedNewborn.weight} kg</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 mb-2">Calf Vigor</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedNewborn.vigor === 'Strong' ? 'bg-emerald-100 text-emerald-700' :
                      selectedNewborn.vigor === 'Moderate' ? 'bg-blue-100 text-blue-700' :
                      selectedNewborn.vigor === 'Weak' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedNewborn.vigor || 'N/A'}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Condition</p>
                    <p className="text-sm text-slate-900">{selectedNewborn.condition}</p>
                  </div>
                  {(selectedNewborn.vigor === 'Weak' || selectedNewborn.vigor === 'Very Weak') && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                          <p className="text-sm font-semibold text-orange-900 mb-1">⚠️ Needs Monitoring</p>
                          <p className="text-sm text-orange-700 mb-2">This newborn requires special care and monitoring.</p>
                          <div className="text-xs text-orange-700 space-y-1">
                            <p>• Provide veterinary care</p>
                            <p>• Ensure proper nursing assistance</p>
                            <p>• Deworming scheduled: {selectedNewborn.birthDate && new Date(new Date(selectedNewborn.birthDate).setMonth(new Date(selectedNewborn.birthDate).getMonth() + 2)).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Dam Information */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Dam (Mother) Information</h4>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Dam ID</p>
                      <p className="text-sm font-semibold text-slate-900">{selectedNewborn.damId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Dam Name</p>
                      <p className="text-sm font-semibold text-slate-900">{selectedNewborn.damName}</p>
                    </div>
                  </div>
                  <Link
                    to={`/livestock/${selectedNewborn.damId}`}
                    className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 mt-3 text-sm"
                  >
                    <Eye size={14} />
                    <span>View Dam Profile</span>
                  </Link>
                </div>
              </div>

              {/* Scheduled Treatments */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Scheduled Treatments</h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-1">Deworming Scheduled</p>
                      <p className="text-sm text-blue-700">
                        {selectedNewborn.birthDate && new Date(new Date(selectedNewborn.birthDate).setMonth(new Date(selectedNewborn.birthDate).getMonth() + 2)).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">2 months after birth</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowNewbornModal(false)}
                  className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
