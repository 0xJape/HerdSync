import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Heart,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  Stethoscope,
  Plus,
  Save,
  Baby,
  Edit,
  TrendingUp,
  User,
  FileText
} from 'lucide-react';

interface BCSRecord {
  month: string;
  bcs: number;
  notes: string;
  recordedBy: string;
  date: string;
}

interface CheckupRecord {
  id: number;
  date: string;
  month: string;
  veterinarian: string;
  bcs: number;
  weight: number;
  healthStatus: 'Good' | 'Attention Needed' | 'Critical';
  findings: string;
  recommendations: string;
  nextCheckupDate: string;
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
  damAge: string;
  sireId: string;
  sireName: string;
  sireBreed: string;
  pregnancyStatus: 'Early' | 'Mid' | 'Late' | 'Overdue';
  lastCheckup: string;
  healthStatus: 'Good' | 'Attention Needed' | 'Critical';
  notes: string;
  bcsRecords: BCSRecord[];
  checkupHistory: CheckupRecord[];
  birthStatus: 'Pregnant' | 'Given Birth';
  birthDate?: string;
  overallCalvingProblem?: string;
  damBodyConditionScore?: string;
  calvingProblem?: string;
  offspring?: OffspringRecord[];
}

export default function PregnancyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCheckupModal, setShowCheckupModal] = useState(false);
  const [showBirthModal, setShowBirthModal] = useState(false);
  const [showBirthSuccessModal, setShowBirthSuccessModal] = useState(false);
  const [recordedOffspringCount, setRecordedOffspringCount] = useState(0);
  const [generatedLivestockIds, setGeneratedLivestockIds] = useState<string[]>([]);

  const [checkupFormData, setCheckupFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    bcs: '',
    weight: '',
    healthStatus: 'Good' as 'Good' | 'Attention Needed' | 'Critical',
    findings: '',
    recommendations: '',
    nextCheckupDate: ''
  });

  const [birthFormData, setBirthFormData] = useState({
    birthDate: new Date().toISOString().split('T')[0],
    numberOfOffspring: 1,
    overallCalvingProblem: 'None',
    damBodyConditionScore: '',
    calvingProblem: '',
    offspring: [{ sex: 'Male' as 'Male' | 'Female', weight: '', condition: '', calfVigor: '', notes: '' }]
  });

  // Mock pregnancy data - In production, fetch by ID from API
  const mockPregnancy: PregnancyRecord = {
    id: 2,
    species: 'Goat',
    breedingDate: '2024-10-05',
    expectedDueDate: '2025-03-05',
    daysPregnant: 142,
    gestationProgress: 95,
    damId: 'G-019',
    damName: 'Boer Maiden Doe',
    damBreed: 'Boer',
    damAge: '2y 1m',
    sireId: 'G-001',
    sireName: 'Boer Buck',
    sireBreed: 'Boer',
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
    checkupHistory: [
      {
        id: 1,
        date: '2024-11-05',
        month: 'Month 3',
        veterinarian: 'Dr. Alexis Cruz',
        bcs: 3.0,
        weight: 45.5,
        healthStatus: 'Good',
        findings: 'Pregnancy confirmed via palpation. Fetal movement detected. Dam is healthy and showing good appetite.',
        recommendations: 'Continue regular feeding. Monitor for signs of distress. Schedule next checkup in 30 days.',
        nextCheckupDate: '2024-12-05'
      },
      {
        id: 2,
        date: '2024-12-05',
        month: 'Month 4',
        veterinarian: 'Dr. Alexis Cruz',
        bcs: 3.5,
        weight: 48.2,
        healthStatus: 'Good',
        findings: 'Pregnancy progressing well. Weight gain appropriate. Udder development beginning. Fetal movements strong.',
        recommendations: 'Increase protein in diet. Prepare birthing area. Monitor closely as due date approaches. Next checkup in 3 weeks.',
        nextCheckupDate: '2024-12-26'
      }
    ],
    birthStatus: 'Pregnant'
  };

  const [pregnancy, setPregnancy] = useState<PregnancyRecord>(mockPregnancy);

  const handleAddCheckup = (e: React.FormEvent) => {
    e.preventDefault();
    const currentMonth = pregnancy.checkupHistory.length + 3;
    const newCheckup: CheckupRecord = {
      id: pregnancy.checkupHistory.length + 1,
      date: checkupFormData.date,
      month: `Month ${currentMonth}`,
      veterinarian: 'Dr. Alexis Cruz',
      bcs: parseFloat(checkupFormData.bcs),
      weight: parseFloat(checkupFormData.weight),
      healthStatus: checkupFormData.healthStatus,
      findings: checkupFormData.findings,
      recommendations: checkupFormData.recommendations,
      nextCheckupDate: checkupFormData.nextCheckupDate
    };

    setPregnancy({
      ...pregnancy,
      checkupHistory: [...pregnancy.checkupHistory, newCheckup],
      lastCheckup: 'Today',
      healthStatus: checkupFormData.healthStatus
    });

    setCheckupFormData({
      date: new Date().toISOString().split('T')[0],
      bcs: '',
      weight: '',
      healthStatus: 'Good',
      findings: '',
      recommendations: '',
      nextCheckupDate: ''
    });
    setShowCheckupModal(false);

    console.log('Activity Log:', {
      type: 'Monthly Checkup Recorded',
      pregnancyId: pregnancy.id,
      damId: pregnancy.damId,
      month: newCheckup.month,
      timestamp: new Date().toLocaleString()
    });
  };

  const handleRecordBirth = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate livestock IDs for offspring
    const livestockIds = birthFormData.offspring.map((_, index) => {
      const timestamp = Date.now() + index;
      return `LS-${timestamp.toString().slice(-6)}`;
    });
    
    const offspring: OffspringRecord[] = birthFormData.offspring.map((off, index) => ({
      id: index + 1,
      sex: off.sex,
      weight: parseFloat(off.weight),
      condition: off.condition,
      calfVigor: off.calfVigor,
      notes: off.notes
    }));

    // Check for weak calves that need monitoring
    const weakCalves = offspring.filter(off => off.calfVigor === 'Weak' || off.calfVigor === 'Very Weak');
    
    setPregnancy({
      ...pregnancy,
      birthStatus: 'Given Birth',
      birthDate: birthFormData.birthDate,
      overallCalvingProblem: birthFormData.overallCalvingProblem,
      damBodyConditionScore: birthFormData.damBodyConditionScore,
      calvingProblem: birthFormData.calvingProblem,
      offspring: offspring
    });

    console.log('Activity Log:', {
      type: 'Birth Recorded',
      pregnancyId: pregnancy.id,
      damId: pregnancy.damId,
      birthDate: birthFormData.birthDate,
      numberOfOffspring: offspring.length,
      weakCalves: weakCalves.length,
      timestamp: new Date().toLocaleString()
    });

    // Log monitoring alerts for weak calves
    if (weakCalves.length > 0) {
      console.log('Monitoring Alert:', {
        type: 'Weak Calf Care',
        offspringIds: weakCalves.map(c => c.id),
        message: `${weakCalves.length} weak calf(ves) require immediate care and monitoring`,
        timestamp: new Date().toLocaleString()
      });
    }

    // Schedule deworming for all offspring after 2 months
    const dewormingDate = new Date(birthFormData.birthDate);
    dewormingDate.setMonth(dewormingDate.getMonth() + 2);
    console.log('Scheduled Treatment:', {
      type: 'Deworming Scheduled',
      offspringIds: offspring.map(c => c.id),
      scheduledDate: dewormingDate.toLocaleDateString(),
      message: 'Deworming scheduled for all offspring after 2 months',
      timestamp: new Date().toLocaleString()
    });

    setRecordedOffspringCount(offspring.length);
    setGeneratedLivestockIds(livestockIds);
    setShowBirthModal(false);
    setShowBirthSuccessModal(true);
  };

  const updateOffspringCount = (count: number) => {
    const newOffspring = Array.from({ length: count }, (_, i) => 
      birthFormData.offspring[i] || { sex: 'Male' as 'Male' | 'Female', weight: '', condition: '', calfVigor: '', calvingProblem: '', notes: '' }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/pregnancy')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Pregnancy Monitoring</h1>
            <p className="text-sm text-slate-600 mt-1">
              Dam: <Link to={`/livestock/${pregnancy.damId}`} className="text-primary-600 hover:text-primary-700 font-medium">{pregnancy.damId}</Link> - {pregnancy.damName}
            </p>
          </div>
        </div>
        {pregnancy.birthStatus === 'Pregnant' && (
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCheckupModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus size={18} />
              <span>Add Checkup</span>
            </button>
            <button
              onClick={() => setShowBirthModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              <Baby size={18} />
              <span>Record Birth</span>
            </button>
          </div>
        )}
      </div>

      {/* Progress Overview Card */}
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg border border-primary-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-slate-600">Gestation Progress</p>
            <p className="text-4xl font-bold text-slate-900 mt-2">
              {pregnancy.gestationProgress}%
            </p>
            <p className="text-sm text-slate-600 mt-1">{pregnancy.daysPregnant} days pregnant</p>
          </div>
          <div className="text-right">
            <span className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(pregnancy.pregnancyStatus)}`}>
              {pregnancy.pregnancyStatus} Stage
            </span>
            <p className="text-xs text-slate-600 mt-2">
              Gestation Period: {pregnancy.species === 'Cattle' ? '~283 days' : pregnancy.species === 'Goat' ? '~150 days' : '~147 days'}
            </p>
          </div>
        </div>
        <div className="w-full bg-white rounded-full h-6 shadow-inner">
          <div
            className={`h-6 rounded-full transition-all flex items-center justify-end pr-2 ${
              pregnancy.gestationProgress >= 100 ? 'bg-red-500' : 'bg-gradient-to-r from-primary-500 to-purple-500'
            }`}
            style={{ width: `${Math.min(pregnancy.gestationProgress, 100)}%` }}
          >
            <span className="text-xs font-bold text-white">{pregnancy.gestationProgress}%</span>
          </div>
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <span className="text-slate-600">
            Breeding: {new Date(pregnancy.breedingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="font-medium text-slate-900">
            Expected Due: {new Date(pregnancy.expectedDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Stethoscope className="text-emerald-600" size={20} />
            </div>
            <p className="text-sm font-medium text-slate-700">Health Status</p>
          </div>
          <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-bold ${getHealthStatusColor(pregnancy.healthStatus)}`}>
            {pregnancy.healthStatus}
          </span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <p className="text-sm font-medium text-slate-700">Last Checkup</p>
          </div>
          <p className="text-lg font-bold text-slate-900">{pregnancy.lastCheckup}</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Activity className="text-purple-600" size={20} />
            </div>
            <p className="text-sm font-medium text-slate-700">Total Checkups</p>
          </div>
          <p className="text-lg font-bold text-slate-900">{pregnancy.checkupHistory.length} visits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Dam & Sire Info */}
        <div className="space-y-6">
          {/* Dam Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
              <Heart className="mr-2 text-primary-600" size={18} />
              Dam (Mother)
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500">Livestock ID</p>
                <Link to={`/livestock/${pregnancy.damId}`} className="text-sm font-bold text-primary-600 hover:text-primary-700">
                  {pregnancy.damId}
                </Link>
              </div>
              <div>
                <p className="text-xs text-slate-500">Name</p>
                <p className="text-sm font-medium text-slate-900">{pregnancy.damName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Species</p>
                <p className="text-sm font-medium text-slate-900">{pregnancy.species}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Breed</p>
                <p className="text-sm font-medium text-slate-900">{pregnancy.damBreed}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Age</p>
                <p className="text-sm font-medium text-slate-900">{pregnancy.damAge}</p>
              </div>
            </div>
          </div>

          {/* Sire Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center">
              <Activity className="mr-2 text-blue-600" size={18} />
              Sire (Father)
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500">Livestock ID</p>
                <Link to={`/livestock/${pregnancy.sireId}`} className="text-sm font-bold text-blue-600 hover:text-blue-700">
                  {pregnancy.sireId}
                </Link>
              </div>
              <div>
                <p className="text-xs text-slate-500">Name</p>
                <p className="text-sm font-medium text-slate-900">{pregnancy.sireName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Breed</p>
                <p className="text-sm font-medium text-slate-900">{pregnancy.sireBreed}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center">
              <FileText className="mr-2 text-slate-600" size={18} />
              General Notes
            </h3>
            <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">
              {pregnancy.notes}
            </p>
          </div>
        </div>

        {/* Right Column - Checkup History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monthly Checkup History */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                <Stethoscope className="mr-2 text-emerald-600" size={20} />
                Monthly Checkup History
              </h3>
              <span className="text-sm text-slate-600">
                {pregnancy.checkupHistory.length} checkup{pregnancy.checkupHistory.length !== 1 ? 's' : ''} recorded
              </span>
            </div>

            {pregnancy.checkupHistory.length > 0 ? (
              <div className="space-y-4">
                {pregnancy.checkupHistory.map((checkup, index) => (
                  <div key={checkup.id} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-5 border border-slate-200">
                    {/* Checkup Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{checkup.month}</p>
                        <p className="text-xs text-slate-600">
                          {new Date(checkup.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getHealthStatusColor(checkup.healthStatus)}`}>
                        {checkup.healthStatus}
                      </span>
                    </div>

                    {/* Vital Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-white rounded-lg">
                      <div>
                        <p className="text-xs text-slate-500">BCS</p>
                        <p className="text-lg font-bold text-slate-900">{checkup.bcs}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Weight</p>
                        <p className="text-lg font-bold text-slate-900">{checkup.weight} kg</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Veterinarian</p>
                        <p className="text-xs font-medium text-slate-900">{checkup.veterinarian}</p>
                      </div>
                    </div>

                    {/* Findings */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-slate-700 mb-1">Findings:</p>
                      <p className="text-sm text-slate-700 bg-white p-2 rounded">{checkup.findings}</p>
                    </div>

                    {/* Recommendations */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-slate-700 mb-1">Recommendations:</p>
                      <p className="text-sm text-slate-700 bg-white p-2 rounded">{checkup.recommendations}</p>
                    </div>

                    {/* Next Checkup */}
                    <div className="flex items-center space-x-2 text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded">
                      <Calendar size={14} />
                      <span className="font-medium">
                        Next checkup: {new Date(checkup.nextCheckupDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Stethoscope size={48} className="mx-auto mb-4 text-slate-300" />
                <p className="font-medium">No checkup records yet</p>
                <p className="text-sm mt-1">Click "Add Checkup" to record the first monthly examination</p>
              </div>
            )}
          </div>

          {/* Birth Record (if given birth) */}
          {pregnancy.birthStatus === 'Given Birth' && pregnancy.offspring && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Baby className="mr-2 text-emerald-600" size={20} />
                Birth Record
              </h3>
              
              {/* Birth Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-lg border border-emerald-200">
                <div>
                  <p className="text-xs text-slate-500">Birth Date</p>
                  <p className="text-sm font-bold text-slate-900">
                    {pregnancy.birthDate && new Date(pregnancy.birthDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Overall Calving Problem</p>
                  <p className={`text-sm font-bold ${
                    pregnancy.overallCalvingProblem === 'None' ? 'text-emerald-600' :
                    pregnancy.overallCalvingProblem === 'Difficult Labor' || pregnancy.overallCalvingProblem === 'Breech' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {pregnancy.overallCalvingProblem || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Dam Body Condition Score</p>
                  <p className={`text-sm font-bold ${
                    pregnancy.damBodyConditionScore === '3' || pregnancy.damBodyConditionScore === '4' ? 'text-emerald-600' :
                    pregnancy.damBodyConditionScore === '2' || pregnancy.damBodyConditionScore === '5' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {pregnancy.damBodyConditionScore ? `${pregnancy.damBodyConditionScore}/6` : 'Not specified'}
                  </p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs text-slate-500">Dam Calving Problem</p>
                  <p className={`text-sm font-bold ${
                    pregnancy.calvingProblem === 'None' ? 'text-emerald-600' :
                    pregnancy.calvingProblem === 'Stillborn' || pregnancy.calvingProblem === 'Mummified' ? 'text-red-600' :
                    'text-orange-600'
                  }`}>
                    {pregnancy.calvingProblem || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-900">
                  Offspring ({pregnancy.offspring.length})
                </p>
                {pregnancy.offspring.map((off, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-emerald-200">
                    <p className="text-xs font-semibold text-slate-700 mb-3">Offspring #{index + 1}</p>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-slate-500">Sex</p>
                        <p className="text-sm font-bold text-slate-900">{off.sex}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Birth Weight</p>
                        <p className="text-sm font-bold text-slate-900">{off.weight} kg</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Condition</p>
                        <p className="text-sm font-bold text-slate-900">{off.condition}</p>
                      </div>
                    </div>
                    {off.notes && (
                      <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded">
                        <span className="font-semibold">Notes:</span> {off.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Checkup Modal */}
      {showCheckupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-slate-900">Add Monthly Checkup</h3>
              <button
                onClick={() => {
                  setShowCheckupModal(false);
                  setCheckupFormData({
                    date: new Date().toISOString().split('T')[0],
                    bcs: '',
                    weight: '',
                    healthStatus: 'Good',
                    findings: '',
                    recommendations: '',
                    nextCheckupDate: ''
                  });
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <ArrowLeft size={20} />
              </button>
            </div>
            <form onSubmit={handleAddCheckup} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Checkup Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={checkupFormData.date}
                    onChange={(e) => setCheckupFormData({ ...checkupFormData, date: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Health Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={checkupFormData.healthStatus}
                    onChange={(e) => setCheckupFormData({ ...checkupFormData, healthStatus: e.target.value as any })}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Good">Good</option>
                    <option value="Attention Needed">Attention Needed</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Body Condition Score (1-5) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="5"
                    value={checkupFormData.bcs}
                    onChange={(e) => setCheckupFormData({ ...checkupFormData, bcs: e.target.value })}
                    placeholder="3.5"
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Weight (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={checkupFormData.weight}
                    onChange={(e) => setCheckupFormData({ ...checkupFormData, weight: e.target.value })}
                    placeholder="45.5"
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Findings & Observations <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={checkupFormData.findings}
                  onChange={(e) => setCheckupFormData({ ...checkupFormData, findings: e.target.value })}
                  rows={3}
                  placeholder="Describe the physical examination findings, fetal movement, overall condition..."
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Recommendations & Care Plan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={checkupFormData.recommendations}
                  onChange={(e) => setCheckupFormData({ ...checkupFormData, recommendations: e.target.value })}
                  rows={3}
                  placeholder="Feeding adjustments, monitoring instructions, next steps..."
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Next Checkup Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={checkupFormData.nextCheckupDate}
                  onChange={(e) => setCheckupFormData({ ...checkupFormData, nextCheckupDate: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-slate-500 mt-1">Typically 30 days from today</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCheckupModal(false);
                    setCheckupFormData({
                      date: new Date().toISOString().split('T')[0],
                      bcs: '',
                      weight: '',
                      healthStatus: 'Good',
                      findings: '',
                      recommendations: '',
                      nextCheckupDate: ''
                    });
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
                  <span>Save Checkup</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Birth Modal */}
      {showBirthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-slate-900">Record Birth</h3>
              <button
                onClick={() => {
                  setShowBirthModal(false);
                  setBirthFormData({
                    birthDate: new Date().toISOString().split('T')[0],
                    numberOfOffspring: 1,
                    overallCalvingProblem: 'None',
                    damBodyConditionScore: '',
                    calvingProblem: '',
                    offspring: [{ sex: 'Male', weight: '', condition: '', calfVigor: '', notes: '' }]
                  });
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <ArrowLeft size={20} />
              </button>
            </div>
            <form onSubmit={handleRecordBirth} className="p-6 space-y-6">
              {/* Birth Information */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-4">Birth Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Birth Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={birthFormData.birthDate}
                      onChange={(e) => setBirthFormData({ ...birthFormData, birthDate: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Dam Body Condition Score (1-6) <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={birthFormData.damBodyConditionScore}
                      onChange={(e) => setBirthFormData({ ...birthFormData, damBodyConditionScore: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select BCS</option>
                      <option value="1">1 - Very Thin (Emaciated)</option>
                      <option value="2">2 - Thin (Underconditioned)</option>
                      <option value="3">3 - Moderate (Ideal Range)</option>
                      <option value="4">4 - Good (Ideal Range)</option>
                      <option value="5">5 - Fat (Overconditioned)</option>
                      <option value="6">6 - Very Fat (Obese)</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">Based on fat coverage and body shape</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Dam Calving Problem <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={birthFormData.calvingProblem}
                      onChange={(e) => setBirthFormData({ ...birthFormData, calvingProblem: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select status</option>
                      <option value="None">None - Born alive & healthy</option>
                      <option value="Stillborn">Stillborn - Born dead</option>
                      <option value="Died Shortly After">Died shortly after birth</option>
                      <option value="Mummified">Mummified fetus</option>
                      <option value="Deformed">Deformed/Abnormal</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">Dam's calving complications</p>
                  </div>
                </div>
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
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
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
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Calf Vigor <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={off.calfVigor}
                          onChange={(e) => updateOffspring(index, 'calfVigor', e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        >
                          <option value="">Select vigor</option>
                          <option value="Strong">Strong - Active, alert</option>
                          <option value="Moderate">Moderate - Fair activity</option>
                          <option value="Weak">Weak - Needs care ⚠️</option>
                          <option value="Very Weak">Very Weak - Critical ⚠️</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Condition <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={off.condition}
                          onChange={(e) => updateOffspring(index, 'condition', e.target.value)}
                          placeholder="e.g., Healthy and active, Requires monitoring"
                          required
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
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
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
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
                      birthDate: new Date().toISOString().split('T')[0],
                      numberOfOffspring: 1,
                      overallCalvingProblem: 'None',
                      damBodyConditionScore: '',
                      calvingProblem: '',
                      offspring: [{ sex: 'Male', weight: '', condition: '', calfVigor: '', notes: '' }]
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

      {/* Birth Success Modal */}
      {showBirthSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full">
                <CheckCircle className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                Birth Successfully Recorded!
              </h3>
              <p className="text-slate-600 text-center mb-4">
                {recordedOffspringCount} offspring {recordedOffspringCount === 1 ? 'has' : 'have'} been added to the livestock records.
              </p>

              {/* Assigned IDs */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-emerald-900 mb-2">
                  Assigned Livestock {generatedLivestockIds.length === 1 ? 'ID' : 'IDs'}:
                </p>
                <div className="space-y-1">
                  {generatedLivestockIds.map((id, index) => (
                    <div key={id} className="flex items-center space-x-2 text-sm">
                      <span className="text-emerald-700">Offspring #{index + 1}:</span>
                      <span className="font-mono font-bold text-emerald-900">{id}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">
                      Deworming Alert Scheduled
                    </p>
                    <p className="text-sm text-blue-700">
                      You will receive an alert <span className="font-semibold">2 months from now</span> to deworm {recordedOffspringCount === 1 ? 'this offspring' : 'these offspring'}.
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      Scheduled date: {new Date(new Date(pregnancy.birthDate!).setMonth(new Date(pregnancy.birthDate!).getMonth() + 2)).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowBirthSuccessModal(false);
                  setBirthFormData({
                    birthDate: new Date().toISOString().split('T')[0],
                    numberOfOffspring: 1,
                    overallCalvingProblem: 'None',
                    damBodyConditionScore: '',
                    calvingProblem: '',
                    offspring: [{ sex: 'Male', weight: '', condition: '', calfVigor: '', notes: '' }]
                  });
                }}
                className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
