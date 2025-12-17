import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  ArrowLeft,
  AlertCircle,
  User,
  MapPin,
  Clock,
  Heart,
  Activity,
  CheckCircle
} from 'lucide-react';

// Mock data - in real app, this would come from API/store
const getBreedingRecord = (id: string) => {
  const records = [
    {
      id: 1,
      species: 'cattle',
      breedingDate: '2025-09-15',
      breedingTime: '09:30 AM',
      breedingLocation: 'Breeding Pen 1',
      handlerName: 'Marlo Gel',
      notes: 'Observed natural mating, dam in standing heat',
      recordedBy: 'Marlo Gel',
      damId: 'C-023',
      damName: 'Brahman Heifer',
      damBreed: 'Brahman',
      damAge: '4 years',
      damHealthStatus: 'Healthy',
      damBodyCondition: 3.5,
      heatSignsObserved: 'Standing heat, clear mucus discharge',
      sireId: 'B-001',
      sireName: 'Brahman Bull',
      sireBreed: 'Brahman',
      sireAge: '5 years',
      status: 'Not Confirmed'
    },
    {
      id: 2,
      species: 'cattle',
      breedingDate: '2025-10-05',
      breedingTime: '02:15 PM',
      breedingLocation: 'Breeding Pen 2',
      handlerName: 'Kyle Stephen',
      notes: 'First breeding for this maiden heifer',
      recordedBy: 'Kyle Stephen',
      damId: 'C-019',
      damName: 'Angus Heifer',
      damBreed: 'Angus',
      damAge: '2 years',
      damHealthStatus: 'Healthy',
      damBodyCondition: 3,
      heatSignsObserved: 'Standing heat, vocalization',
      sireId: 'B-002',
      sireName: 'Angus Bull',
      sireBreed: 'Angus',
      sireAge: '5 years',
      status: 'Confirmed'
    },
    {
      id: 3,
      species: 'cattle',
      breedingDate: '2025-11-14',
      breedingTime: '10:00 AM',
      breedingLocation: 'Breeding Pen 3',
      handlerName: 'Laiza Limpin',
      notes: 'Bull introduced to breeding group',
      recordedBy: 'Laiza Limpin',
      damId: 'C-005',
      damName: 'Holstein Cow',
      damBreed: 'Holstein',
      damAge: '4 years',
      damHealthStatus: 'Healthy',
      damBodyCondition: 3.5,
      heatSignsObserved: 'Receptive to bull',
      sireId: 'B-001',
      sireName: 'Brahman Bull',
      sireBreed: 'Brahman',
      sireAge: '5 years',
      status: 'Not Confirmed'
    },
    {
      id: 4,
      species: 'cattle',
      breedingDate: '2025-09-20',
      breedingTime: '08:45 AM',
      breedingLocation: 'Breeding Pen 2',
      handlerName: 'Marlo Gel',
      notes: 'Natural breeding observed',
      recordedBy: 'Marlo Gel',
      damId: 'C-015',
      damName: 'Brahman Cow',
      damBreed: 'Brahman',
      damAge: '5 years',
      damHealthStatus: 'Healthy',
      damBodyCondition: 4,
      heatSignsObserved: 'Clear heat signs observed',
      sireId: 'B-002',
      sireName: 'Angus Bull',
      sireBreed: 'Angus',
      sireAge: '6 years',
      status: 'Confirmed'
    },
    {
      id: 5,
      species: 'cattle',
      breedingDate: '2025-11-21',
      breedingTime: '11:30 AM',
      breedingLocation: 'Breeding Pen 1',
      handlerName: 'Kyle Stephen',
      notes: 'Second breeding for this cow',
      recordedBy: 'Kyle Stephen',
      damId: 'C-008',
      damName: 'Angus Cow',
      damBreed: 'Angus',
      damAge: '3 years',
      damHealthStatus: 'Healthy',
      damBodyCondition: 3.5,
      heatSignsObserved: 'Strong vocalization, standing heat',
      sireId: 'B-002',
      sireName: 'Angus Bull',
      sireBreed: 'Angus',
      sireAge: '5 years',
      status: 'Not Confirmed'
    }
  ];

  return records.find(r => r.id === parseInt(id));
};

export default function BreedingRecordDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

  const breeding = id ? getBreedingRecord(id) : null;

  if (!breeding) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-slate-600">Breeding record not found</p>
          <Link to="/breeding" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
            ← Back to Breeding Overview
          </Link>
        </div>
      </div>
    );
  }

  const getBreedingCheckDate = (breedingDate: string) => {
    const date = new Date(breedingDate);
    date.setMonth(date.getMonth() + 3);
    return date;
  };

  const isBreedingCheckDueSoon = (breedingDate: string) => {
    const checkDate = getBreedingCheckDate(breedingDate);
    const today = new Date();
    const daysUntilCheck = Math.ceil((checkDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilCheck <= 7 && daysUntilCheck >= 0;
  };

  const isBreedingCheckOverdue = (breedingDate: string) => {
    const checkDate = getBreedingCheckDate(breedingDate);
    const today = new Date();
    return today > checkDate;
  };

  const checkDate = getBreedingCheckDate(breeding.breedingDate);
  const isDueSoon = isBreedingCheckDueSoon(breeding.breedingDate);
  const isOverdue = isBreedingCheckOverdue(breeding.breedingDate);
  const daysUntilCheck = Math.ceil((checkDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const handleConfirmPregnancy = (status: 'pregnant' | 'open') => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setShowConfirmModal(false);
      setShowSuccessMessage(true);
      
      // Hide success message after 3 seconds and navigate
      setTimeout(() => {
        setShowSuccessMessage(false);
        
        if (status === 'pregnant') {
          // Navigate to pregnancy tracking page
          navigate(`/livestock/${breeding.damId}/breeding`);
        } else {
          // Return to breeding overview
          navigate('/breeding');
        }
      }, 2000);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link 
          to="/breeding"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Breeding Overview
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Breeding Record #{breeding.id}
            </h1>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 capitalize">
                {breeding.species}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                <Calendar size={14} className="mr-1" />
                {new Date(breeding.breedingDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                breeding.status === 'Confirmed' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {breeding.status === 'Confirmed' ? '✓ Confirmed' : '⏳ Not Confirmed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {(isOverdue || isDueSoon) && (
        <div className={`mb-6 p-4 rounded-lg border ${
          isOverdue 
            ? 'bg-red-50 border-red-200' 
            : 'bg-amber-50 border-amber-200'
        }`}>
          <div className="flex items-start">
            <AlertCircle 
              size={20} 
              className={isOverdue ? 'text-red-600 mt-0.5 mr-3' : 'text-amber-600 mt-0.5 mr-3'} 
            />
            <div className="flex-1">
              <h3 className={`font-semibold ${isOverdue ? 'text-red-900' : 'text-amber-900'}`}>
                {isOverdue ? 'Breeding Check Overdue' : 'Breeding Check Due Soon'}
              </h3>
              <p className={`text-sm ${isOverdue ? 'text-red-700' : 'text-amber-700'} mt-1`}>
                {isOverdue 
                  ? `The 3-month breeding check is overdue by ${Math.abs(daysUntilCheck)} days.`
                  : `The 3-month breeding check is due in ${daysUntilCheck} days.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* 3-Month Breeding Check */}
          <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">3-Month Breeding Check</h2>
              {isOverdue && (
                <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                  Overdue by {Math.abs(daysUntilCheck)} days
                </span>
              )}
              {isDueSoon && !isOverdue && (
                <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                  Due in {daysUntilCheck} days
                </span>
              )}
              {!isDueSoon && !isOverdue && (
                <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-full">
                  {daysUntilCheck} days remaining
                </span>
              )}
            </div>
            
            <div className="bg-white/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-slate-600 mb-1">Scheduled Check Date</p>
              <p className="text-lg font-semibold text-slate-900">
                {checkDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleConfirmPregnancy('pregnant')}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                <CheckCircle size={18} className="mr-2" />
                Confirm
              </button>
              <button 
                onClick={() => handleConfirmPregnancy('open')}
                className="px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                <AlertCircle size={18} className="mr-2" />
                Not Pregnant
              </button>
            </div>
          </div>

          {/* Breeding Details */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Breeding Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center text-slate-500 text-sm mb-2">
                  <Clock size={14} className="mr-1" />
                  Breeding Time
                </div>
                <p className="text-slate-900 font-medium">{breeding.breedingTime || 'Not recorded'}</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center text-slate-500 text-sm mb-2">
                  <Activity size={14} className="mr-1" />
                  Species
                </div>
                <p className="text-slate-900 font-medium capitalize">{breeding.species}</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center text-slate-500 text-sm mb-2">
                  <MapPin size={14} className="mr-1" />
                  Location
                </div>
                <p className="text-slate-900 font-medium">{breeding.breedingLocation || 'Not recorded'}</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center text-slate-500 text-sm mb-2">
                  <User size={14} className="mr-1" />
                  Handler
                </div>
                <p className="text-slate-900 font-medium">{breeding.handlerName || 'Not recorded'}</p>
              </div>
            </div>
          </div>

          {/* Dam Information */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-pink-900 mb-4">♀ Dam (Female) Information</h2>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <Link 
                to={`/livestock/${breeding.damId}`}
                className="text-xl font-bold text-primary-600 hover:text-primary-700 mb-1 block"
              >
                {breeding.damId}
              </Link>
              <p className="text-slate-600">{breeding.damName}</p>
              <p className="text-sm text-slate-500">{breeding.damBreed} • {breeding.damAge}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Health Status</p>
                <p className="font-medium text-slate-900">{breeding.damHealthStatus}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Body Condition</p>
                <p className="font-medium text-slate-900">{breeding.damBodyCondition}/5</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Heat Signs</p>
                <p className="font-medium text-slate-900 text-xs">{breeding.heatSignsObserved}</p>
              </div>
            </div>
          </div>

          {/* Sire Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">♂ Sire (Male) Information</h2>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <Link 
                to={`/livestock/${breeding.sireId}`}
                className="text-xl font-bold text-primary-600 hover:text-primary-700 mb-1 block"
              >
                {breeding.sireId}
              </Link>
              <p className="text-slate-600">{breeding.sireName}</p>
              <p className="text-sm text-slate-500">{breeding.sireBreed} • {breeding.sireAge}</p>
            </div>
          </div>

          {/* Notes */}
          {breeding.notes && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Notes & Observations</h2>
              <p className="text-slate-600">{breeding.notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          {/* Record Info */}
          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Record Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Recorded By</p>
                <p className="font-medium text-slate-900">{breeding.recordedBy}</p>
              </div>
              <div>
                <p className="text-slate-500">Breeding Method</p>
                <p className="font-medium text-slate-900">{breeding.method}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Pregnancy Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Confirm Pregnancy Status</h3>
            <p className="text-slate-600 mb-6">
              Has the breeding check been completed? Please confirm the pregnancy status of {breeding.damId}.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleConfirmPregnancy('pregnant')}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} className="mr-2" />
                    Confirm
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleConfirmPregnancy('open')}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                {isLoading ? 'Updating...' : 'Not Pregnant (Open)'}
              </button>
              
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white hover:bg-slate-50 disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-700 font-medium rounded-lg border border-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Success!</h3>
            <p className="text-slate-600">
              Livestock status updated successfully
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
