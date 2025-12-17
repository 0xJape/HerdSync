import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Heart,
  Plus,
  FileText,
  Baby,
  Activity,
  TrendingUp,
  Clock
} from 'lucide-react';

// Mock breeding data for A-001
const mockBreedingData = {
  'A-001': {
    // Current Status
    currentStatus: 'Pregnant',
    daysPregnant: 180,
    totalGestationDays: 283, // Cattle gestation period
    conceptionDate: '2025-05-20',
    expectedDeliveryDate: '2026-02-24',
    
    // Current Pregnancy Details
    currentPregnancy: {
      pregnancyNumber: 3,
      conceptionDate: '2025-05-20',
      sireId: 'B-012',
      sireName: 'Angus Bull',
      breedingMethod: 'Natural Breeding',
      lastCheckDate: '2024-11-15',
      lastCheckFindings: 'Fetus healthy, normal development. Dam in good body condition.',
      upcomingMilestones: [
        { date: '2024-11-28', description: 'Pregnancy check (scheduled)' },
        { date: '2025-02-10', description: 'Move to calving pen' },
        { date: '2025-02-20', description: 'Prepare calving area' },
      ]
    },
    
    // Statistics
    totalPregnancies: 3,
    successfulBirths: 2,
    liveOffspring: 2,
    conceptionRate: 100,
    
    // Breeding History
    breedingHistory: [
      {
        id: 3,
        status: 'Pregnant',
        conceptionDate: '2025-05-20',
        expectedDate: '2026-02-24',
        sireId: 'B-012',
        sireName: 'Angus Bull',
        breedingMethod: 'Natural Breeding',
        currentDay: 180,
        gestationDays: 283,
        lastCheckupDate: '2024-11-15',
        nextCheckupDate: '2024-12-15',
        checkupInterval: 30
      },
      {
        id: 2,
        status: 'Successful',
        conceptionDate: '2024-03-10',
        birthDate: '2024-12-15',
        sireId: 'B-008',
        sireName: 'Brahman Bull',
        breedingMethod: 'Natural',
        offspringId: 'C-142',
        offspringSex: 'Female',
        offspringStatus: 'Healthy',
        birthWeight: 42,
        complications: 'None',
        gestationDays: 280
      },
      {
        id: 1,
        status: 'Successful',
        conceptionDate: '2023-02-05',
        birthDate: '2023-11-10',
        sireId: 'B-005',
        sireName: 'Brahman Bull',
        breedingMethod: 'Natural Breeding',
        offspringId: 'C-101',
        offspringSex: 'Male',
        offspringStatus: 'Sold',
        birthWeight: 45,
        complications: 'None',
        gestationDays: 278
      }
    ],
    
    // Heat Cycle Info (for non-pregnant status)
    lastHeatDate: '2025-05-18',
    averageCycleLength: 21,
    nextExpectedHeat: '2025-06-08'
  }
};

export default function Breeding() {
  const { id } = useParams<{ id: string }>();
  const breedingData = mockBreedingData[id as keyof typeof mockBreedingData];
  
  if (!breedingData) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Heart size={48} className="text-slate-400 mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">No Breeding Records</h2>
        <p className="text-slate-600 mb-6">Breeding records for this animal are not available.</p>
        <Link
          to={`/livestock/${id}`}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Profile</span>
        </Link>
      </div>
    );
  }

  const progressPercent = (breedingData.daysPregnant / breedingData.totalGestationDays) * 100;
  const daysRemaining = breedingData.totalGestationDays - breedingData.daysPregnant;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={`/livestock/${id}`}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Breeding Records</h1>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-sm text-slate-600">Dam (Mother):</p>
              <Link 
                to={`/livestock/${id}`}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
              >
                {id}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Breeding Status Card */}
      <div className="bg-gradient-to-br from-pink-50 to-cyan-50 rounded-lg border border-pink-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Current Breeding Status</h2>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 bg-pink-100 text-pink-700 text-sm font-medium rounded-full">
                🤰 {breedingData.currentStatus}
              </span>
              <span className="text-sm text-slate-600">
                Day {breedingData.daysPregnant}/{breedingData.totalGestationDays}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 mb-1">Expected Delivery</p>
            <p className="text-lg font-semibold text-slate-900">{new Date(breedingData.expectedDeliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            <p className="text-sm text-pink-600">{daysRemaining} days remaining</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Conception</span>
            <span className="font-medium text-slate-900">Day {breedingData.daysPregnant}</span>
            <span>Expected Birth</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-pink-200">
          <div>
            <p className="text-xs text-slate-500 mb-1">Total Pregnancies</p>
            <p className="text-xl font-semibold text-slate-900">{breedingData.totalPregnancies}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Successful Births</p>
            <p className="text-xl font-semibold text-emerald-600">{breedingData.successfulBirths}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Live Offspring</p>
            <p className="text-xl font-semibold text-blue-600">{breedingData.liveOffspring}</p>
          </div>
        </div>
      </div>

      {/* Current Pregnancy Details */}
      {breedingData.currentPregnancy && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Pregnancy Details</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Conception Date</p>
              <p className="text-sm text-slate-900">{new Date(breedingData.currentPregnancy.conceptionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Sire</p>
              <Link 
                to={`/livestock/${breedingData.currentPregnancy.sireId}`}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
              >
                {breedingData.currentPregnancy.sireId} - {breedingData.currentPregnancy.sireName}
              </Link>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Breeding Method</p>
              <p className="text-sm text-slate-900">{breedingData.currentPregnancy.breedingMethod}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Last Pregnancy Check</p>
              <p className="text-sm text-slate-900">{new Date(breedingData.currentPregnancy.lastCheckDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
            <p className="text-xs font-medium text-emerald-900 mb-1">Last Check Findings</p>
            <p className="text-sm text-emerald-800">{breedingData.currentPregnancy.lastCheckFindings}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 mb-3">Upcoming Milestones</p>
            <div className="space-y-2">
              {breedingData.currentPregnancy.upcomingMilestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm">
                  <Calendar size={16} className="text-slate-400 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-900">{new Date(milestone.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="text-slate-600"> - {milestone.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
              <Plus size={16} />
              <span>New Breeding Record</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg transition-colors">
              <Activity size={16} />
              <span>Pregnancy Check</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg transition-colors">
              <Baby size={16} />
              <span>Record Birth</span>
            </button>
          </div>

      {/* Breeding History */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Breeding History</h3>
        
        <div className="space-y-4">
          {breedingData.breedingHistory.map((pregnancy) => (
            <div 
              key={pregnancy.id}
              className={`border rounded-lg p-4 ${
                pregnancy.status === 'Pregnant' 
                  ? 'border-pink-200 bg-pink-50' 
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Pregnancy #{pregnancy.id} {pregnancy.status === 'Pregnant' && '(Current)'}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      pregnancy.status === 'Successful' 
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-pink-100 text-pink-700'
                    }`}>
                      {pregnancy.status === 'Successful' ? '✅ Successful Birth' : '🤰 Pregnant'}
                    </span>
                    {pregnancy.status === 'Pregnant' && pregnancy.nextCheckupDate && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <Calendar size={10} className="mr-1" />
                        Next Check: {new Date(pregnancy.nextCheckupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
                {pregnancy.status === 'Pregnant' && (
                  <span className="text-sm font-medium text-pink-600">
                    Day {pregnancy.currentDay}/{pregnancy.gestationDays}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Conception</p>
                  <p className="font-medium text-slate-900">{new Date(pregnancy.conceptionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{pregnancy.status === 'Pregnant' ? 'Expected' : 'Birth Date'}</p>
                  <p className="font-medium text-slate-900">
                    {pregnancy.status === 'Pregnant' 
                      ? new Date(pregnancy.expectedDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : new Date(pregnancy.birthDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    }
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Sire</p>
                  <Link 
                    to={`/livestock/${pregnancy.sireId}`}
                    className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    {pregnancy.sireId}
                  </Link>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Method</p>
                  <p className="font-medium text-slate-900">Natural</p>
                </div>
              </div>

              {pregnancy.status === 'Pregnant' && pregnancy.lastCheckupDate && (
                <div className="mt-3 pt-3 border-t border-pink-200">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Last Checkup</p>
                      <p className="font-medium text-slate-900">{new Date(pregnancy.lastCheckupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Next Checkup Due</p>
                      <p className="font-semibold text-blue-600">{new Date(pregnancy.nextCheckupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Checkup scheduled every {pregnancy.checkupInterval} days during pregnancy
                  </p>
                </div>
              )}

              {pregnancy.status === 'Successful' && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm mb-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Dam (Mother)</p>
                      <Link to={`/livestock/${id}`} className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
                        {id}
                      </Link>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Offspring ID</p>
                      <Link to={`/livestock/${pregnancy.offspringId}`} className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
                        {pregnancy.offspringId}
                      </Link>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Sex</p>
                      <p className="font-medium text-slate-900">{pregnancy.offspringSex}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Birth Weight</p>
                      <p className="font-medium text-slate-900">{pregnancy.birthWeight} kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Status</p>
                      <p className="font-medium text-slate-900">{pregnancy.offspringStatus}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Complications</p>
                      <p className="font-medium text-emerald-600">{pregnancy.complications}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-3 flex items-center space-x-2">
                <button className="text-xs font-medium text-primary-600 hover:text-primary-700 underline">
                  View Timeline
                </button>
                {pregnancy.status === 'Pregnant' && (
                  <button className="text-xs font-medium text-primary-600 hover:text-primary-700 underline">
                    Add Check
                  </button>
                )}
                {pregnancy.status === 'Successful' && (
                  <Link to={`/livestock/${pregnancy.offspringId}`} className="text-xs font-medium text-primary-600 hover:text-primary-700 underline">
                    View Offspring
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

          {/* Breeding Performance Metrics */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Breeding Performance</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp size={16} className="text-emerald-600" />
              <p className="text-xs font-medium text-emerald-900">Conception Rate</p>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{breedingData.conceptionRate}%</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar size={16} className="text-blue-600" />
              <p className="text-xs font-medium text-blue-900">Avg Gestation</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">280 days</p>
          </div>
          
          <div className="bg-teal-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Heart size={16} className="text-teal-600" />
              <p className="text-xs font-medium text-teal-900">Birth Success</p>
            </div>
            <p className="text-2xl font-bold text-teal-600">100%</p>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Baby size={16} className="text-amber-600" />
              <p className="text-xs font-medium text-amber-900">Avg Birth Weight</p>
            </div>
            <p className="text-2xl font-bold text-amber-600">43.5 kg</p>
          </div>
        </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          {/* Dam (Current Animal) Details */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="px-4 py-3 bg-teal-50 border-b border-teal-200">
              <h3 className="text-sm font-semibold text-teal-900">Dam (Mother)</h3>
            </div>
            <div className="p-4">
              <Link 
                to={`/livestock/${id}`}
                className="text-lg font-bold text-primary-600 hover:text-primary-700 hover:underline block mb-2"
              >
                {id}
              </Link>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Status:</span>
                  <span className="font-semibold text-slate-900">{breedingData.currentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Pregnancies:</span>
                  <span className="font-semibold text-slate-900">{breedingData.totalPregnancies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Live Offspring:</span>
                  <span className="font-semibold text-slate-900">{breedingData.liveOffspring}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Success Rate:</span>
                  <span className="font-semibold text-emerald-600">{breedingData.conceptionRate}%</span>
                </div>
              </div>
              <Link 
                to={`/livestock/${id}`}
                className="mt-4 w-full px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                View Full Profile
              </Link>
            </div>
          </div>

          {/* Current Sire Details */}
          {breedingData.currentPregnancy && (
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="px-4 py-3 bg-blue-50 border-b border-blue-200">
                <h3 className="text-sm font-semibold text-blue-900">Current Sire</h3>
              </div>
              <div className="p-4">
                <Link 
                  to={`/livestock/${breedingData.currentPregnancy.sireId}`}
                  className="text-lg font-bold text-primary-600 hover:text-primary-700 hover:underline block mb-1"
                >
                  {breedingData.currentPregnancy.sireId}
                </Link>
                <p className="text-sm text-slate-600 mb-3">{breedingData.currentPregnancy.sireName}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Method:</span>
                    <span className="font-semibold text-slate-900">{breedingData.currentPregnancy.breedingMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Conception:</span>
                    <span className="font-semibold text-slate-900">
                      {new Date(breedingData.currentPregnancy.conceptionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Day:</span>
                    <span className="font-semibold text-pink-600">
                      {breedingData.daysPregnant}/{breedingData.totalGestationDays}
                    </span>
                  </div>
                </div>
                <Link 
                  to={`/livestock/${breedingData.currentPregnancy.sireId}`}
                  className="mt-4 w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
                >
                  View Sire Profile
                </Link>
              </div>
            </div>
          )}

          {/* Breeding Tips */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 p-4">
            <h3 className="text-sm font-semibold text-amber-900 mb-2">Breeding Tips</h3>
            <ul className="space-y-1 text-xs text-amber-800">
              <li>• Monitor body condition score</li>
              <li>• Regular pregnancy checks</li>
              <li>• Proper nutrition during gestation</li>
              <li>• Prepare calving area 2 weeks before</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
