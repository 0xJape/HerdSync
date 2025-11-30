import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getCategory, calculateAgeInMonths, getCategoriesBySpecies } from '../utils/categoryHelper';

export default function AddLivestock() {
  const navigate = useNavigate();
  const { livestock, addLivestock } = useStore();
  const [isPurchased, setIsPurchased] = React.useState(false);
  const [showAddBreed, setShowAddBreed] = React.useState(false);
  const [newBreedName, setNewBreedName] = React.useState('');
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [isNewborn, setIsNewborn] = React.useState(false);
  const [hasBred, setHasBred] = React.useState(false);
  const [calculatedCategory, setCalculatedCategory] = React.useState<string>('');
  const [showParentDetails, setShowParentDetails] = React.useState(true); // Toggle for parent details
  
  // Breed data - Common Philippine breeds organized by species
  const [breedsBySpecies, setBreedsBySpecies] = React.useState({
    Cattle: [
      'Brahman',
      'Native/Carabao',
      'Crossbreed'
    ],
    Goat: [
      'Anglo-Nubian',
      'Native/Philippine Native',
      'Crossbreed'
    ],
    Sheep: [
      'Barbados Blackbelly',
      'Native/Philippine Native',
      'Crossbreed'
    ]
  });

  const [formData, setFormData] = React.useState({
    // Basic Registration Information
    livestockId: '',
    species: '',
    breed: '',
    category: '',
    sex: '',
    dateOfBirth: '',
    birthWeight: '',
    currentWeight: '',
    colorMarkings: '',
    status: 'Active',
    notes: '',
    // New categorization fields
    isNewborn: false,
    damId: '',
    sireId: '',
    hasBred: false,
    // Purchase Information (if bought from others)
    isPurchased: false,
    sellerName: '',
    sellerContact: '',
    sellerAddress: '',
    purchaseDate: '',
    purchasePrice: '',
    // Physical Assessment (applicable for all)
    bodyConditionScore: '',
    healthStatus: '',
    assessmentNotes: '',
    // Newborn-specific health assessment
    birthComplications: '',
    newbornBodyConditionScore: '',
    newbornHealthAssessment: '',
    // Vaccination History
    previousVaccines: '', // Vaccines from previous owner
    treatmentVaccines: '' // Vaccines given during treatment if sick
  });

  // Auto-calculate category when species, gender, birthdate, or hasBred changes
  React.useEffect(() => {
    if (formData.species && formData.sex && formData.dateOfBirth) {
      const ageInMonths = calculateAgeInMonths(formData.dateOfBirth);
      const category = getCategory(
        formData.species as 'Cattle' | 'Goat' | 'Sheep',
        formData.sex as 'Male' | 'Female',
        ageInMonths,
        hasBred,
        isNewborn
      );
      setCalculatedCategory(category);
      setFormData(prev => ({ ...prev, category }));
    }
  }, [formData.species, formData.sex, formData.dateOfBirth, hasBred, isNewborn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Reset breed when species changes
    if (name === 'species') {
      setFormData({
        ...formData,
        [name]: value,
        breed: '', // Clear breed selection when species changes
        damId: '', // Clear dam/sire when species changes
        sireId: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleNewbornToggle = () => {
    const newIsNewborn = !isNewborn;
    setIsNewborn(newIsNewborn);
    
    // If toggling to newborn, set birthdate to today
    if (newIsNewborn) {
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        ...formData,
        isNewborn: newIsNewborn,
        dateOfBirth: today
      });
    } else {
      setFormData({
        ...formData,
        isNewborn: newIsNewborn,
        damId: '',
        sireId: ''
      });
    }
  };

  const handleAddNewBreed = () => {
    if (newBreedName.trim() && formData.species) {
      setBreedsBySpecies({
        ...breedsBySpecies,
        [formData.species]: [...breedsBySpecies[formData.species as keyof typeof breedsBySpecies], newBreedName.trim()]
      });
      setFormData({
        ...formData,
        breed: newBreedName.trim()
      });
      setNewBreedName('');
      setShowAddBreed(false);
    }
  };

  // Get available breeds based on selected species
  const availableBreeds = formData.species ? breedsBySpecies[formData.species as keyof typeof breedsBySpecies] || [] : [];

  const handlePurchaseToggle = () => {
    setIsPurchased(!isPurchased);
    setFormData({
      ...formData,
      isPurchased: !isPurchased
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create livestock object with proper types
    const newLivestock = {
      id: Date.now().toString(),
      livestockId: formData.livestockId,
      species: formData.species as 'Cattle' | 'Goat' | 'Sheep',
      breed: formData.breed,
      category: formData.category as any, // Category union type
      sex: formData.sex as 'Male' | 'Female',
      dateOfBirth: formData.dateOfBirth,
      birthWeight: parseFloat(formData.birthWeight),
      currentWeight: parseFloat(formData.currentWeight),
      colorMarkings: formData.colorMarkings,
      status: formData.status as 'Active' | 'Sold' | 'Culled' | 'Deceased',
      notes: formData.notes,
      isNewborn,
      damId: formData.damId || undefined,
      sireId: formData.sireId || undefined,
      hasBred,
      birthComplications: formData.birthComplications || undefined,
      newbornBodyConditionScore: formData.newbornBodyConditionScore ? parseFloat(formData.newbornBodyConditionScore) : undefined,
      newbornHealthAssessment: formData.newbornHealthAssessment || undefined,
      isPurchased,
      sellerName: formData.sellerName || undefined,
      sellerContact: formData.sellerContact || undefined,
      sellerAddress: formData.sellerAddress || undefined,
      purchaseDate: formData.purchaseDate || undefined,
      purchasePrice: formData.purchasePrice ? parseFloat(formData.purchasePrice) : undefined,
      bodyConditionScore: formData.bodyConditionScore ? parseFloat(formData.bodyConditionScore) : undefined,
      healthStatus: formData.healthStatus || undefined,
      assessmentNotes: formData.assessmentNotes || undefined
    };
    
    // Save to store
    addLivestock(newLivestock);
    
    console.log('Livestock added:', newLivestock);
    
    setShowSuccessModal(true);
    
    // Auto-navigate after 2 seconds
    setTimeout(() => {
      navigate('/livestock');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/livestock"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Add New Livestock</h1>
            <p className="text-sm text-slate-600 mt-1">Enter the details of the new animal</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Newborn Toggle - Prominent Card */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200 p-5">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="newbornToggle"
              checked={isNewborn}
              onChange={handleNewbornToggle}
              className="w-5 h-5 mt-0.5 text-emerald-600 border-emerald-300 rounded focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex-1">
              <label htmlFor="newbornToggle" className="cursor-pointer">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-semibold text-emerald-900">This is a newborn</span>
                  {isNewborn && (
                    <span className="px-2 py-0.5 bg-emerald-600 text-white text-xs font-medium rounded-full">Active</span>
                  )}
                </div>
                <p className="text-sm text-emerald-700 mt-1">
                  {isNewborn 
                    ? 'Newborn mode: Enter dam/sire info, birth date, and health assessment' 
                    : 'Check this box if registering a newborn kid/lamb/calf (will auto-assign category)'}
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Section 1: Livestock Basic Information */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>
            <p className="text-xs text-slate-600 mt-0.5">Essential details for livestock registration</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Livestock ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="livestockId"
                  value={formData.livestockId}
                  onChange={handleInputChange}
                  placeholder="A-001"
                  required
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
                <option value="">Select species</option>
                <option value="Cattle">Cattle</option>
                <option value="Goat">Goat</option>
                <option value="Sheep">Sheep</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Breed <span className="text-red-500">*</span>
              </label>
              {!formData.species ? (
                <div className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-400 text-sm">
                  Please select a species first
                </div>
              ) : !showAddBreed ? (
                <div className="flex space-x-2">
                  <select
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    required
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select breed</option>
                    {availableBreeds.map((breed) => (
                      <option key={breed} value={breed}>{breed}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowAddBreed(true)}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newBreedName}
                    onChange={(e) => setNewBreedName(e.target.value)}
                    placeholder="Enter new breed name"
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddNewBreed())}
                  />
                  <button
                    type="button"
                    onClick={handleAddNewBreed}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddBreed(false);
                      setNewBreedName('');
                    }}
                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Sex <span className="text-red-500">*</span>
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Conditional fields based on newborn status */}
            {isNewborn ? (
              <div className="md:col-span-2 space-y-6">
                {/* Parents Section */}
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-blue-900 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Parent Information
                    </h3>
                    <label className="flex items-center space-x-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-blue-300">
                      <input
                        type="checkbox"
                        checked={showParentDetails}
                        onChange={(e) => setShowParentDetails(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-xs font-medium text-blue-900">Show Details</span>
                    </label>
                  </div>
                  {showParentDetails ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dam (Mother) Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mother (Dam) <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="damId"
                    value={formData.damId}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.species}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">{formData.species ? 'Select mother' : 'Select species first'}</option>
                    {livestock
                      .filter(l => l.species === formData.species && l.sex === 'Female' && l.status === 'Active')
                      .map(l => (
                        <option key={l.id} value={l.id}>
                          {l.livestockId} - {l.breed} ({l.category})
                        </option>
                      ))}
                  </select>
                </div>

                {/* Sire (Father) Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Father (Sire) <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="sireId"
                    value={formData.sireId}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.species}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">{formData.species ? 'Select father' : 'Select species first'}</option>
                    {livestock
                      .filter(l => l.species === formData.species && l.sex === 'Male' && l.status === 'Active')
                      .map(l => (
                        <option key={l.id} value={l.id}>
                          {l.livestockId} - {l.breed} ({l.category})
                        </option>
                      ))}
                  </select>
                </div>

                {/* Birth Date (editable for newborns) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Birth Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-xs text-slate-500 mt-1">Select the birth date (defaults to today)</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">Parent details hidden. Toggle "Show Details" above to enter mother and father information.</p>
              </div>
            )}
            </div>

            {/* Newborn Health Assessment */}
            <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
              <h3 className="text-sm font-semibold text-amber-900 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Health Assessment at Birth
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Birth Complications
                      </label>
                      <select
                        name="birthComplications"
                        value={formData.birthComplications}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">None - Normal birth</option>
                        <option value="Dystocia">Dystocia (difficult birth)</option>
                        <option value="Weak">Weak at birth</option>
                        <option value="Premature">Premature</option>
                        <option value="Hypothermia">Hypothermia</option>
                        <option value="Low birth weight">Low birth weight</option>
                        <option value="Respiratory distress">Respiratory distress</option>
                        <option value="Other">Other complications</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Body Condition Score at Birth (1-6)
                      </label>
                      <input
                        type="number"
                        name="newbornBodyConditionScore"
                        value={formData.newbornBodyConditionScore}
                        onChange={handleInputChange}
                        placeholder="3.0"
                        min="1"
                        max="6"
                        step="0.5"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <p className="text-xs text-slate-500 mt-1">1=Very Thin, 3=Average, 6=Very Fat</p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Initial Health Assessment
                      </label>
                      <textarea
                        name="newbornHealthAssessment"
                        value={formData.newbornHealthAssessment}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Overall health status, nursing ability, alertness, mobility, colostrum intake, visible abnormalities..."
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Regular Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Has Bred (for females only) */}
                {formData.sex === 'Female' && formData.species && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Breeding History
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasBred}
                        onChange={(e) => setHasBred(e.target.checked)}
                        className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                      />
                      <span className="text-sm text-slate-700">
                        Has bred before (determines Maiden vs {formData.species === 'Goat' ? 'Doe' : formData.species === 'Sheep' ? 'Ewe' : 'Cow'})
                      </span>
                    </label>
                  </div>
                )}
              </>
            )}

            {/* Weight Section - Grouped */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-200">Weight Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Birth Weight (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="birthWeight"
                    value={formData.birthWeight}
                    onChange={handleInputChange}
                    placeholder="35.5"
                    step="0.1"
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Current Weight (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="currentWeight"
                    value={formData.currentWeight}
                    onChange={handleInputChange}
                    placeholder="450.0"
                    step="0.1"
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-200">Additional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Color/Markings
                  </label>
                  <input
                    type="text"
                    name="colorMarkings"
                    value={formData.colorMarkings}
                    onChange={handleInputChange}
                    placeholder="Black and white spots"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Sold">Sold</option>
                    <option value="Culled">Culled</option>
                    <option value="Deceased">Deceased</option>
                  </select>
                </div>

                {/* Calculated Category Display - Always visible */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Auto-Calculated Category
                  </label>
                  {calculatedCategory ? (
                    <div className="px-4 py-3 border-2 border-emerald-300 bg-emerald-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-emerald-800 font-bold text-lg">{calculatedCategory}</span>
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-xs text-emerald-700">
                        Based on {formData.species} • {formData.sex} • {isNewborn ? 'Newborn' : `${calculateAgeInMonths(formData.dateOfBirth)} months old`}{formData.sex === 'Female' && !isNewborn ? ` • ${hasBred ? 'Has bred' : 'Never bred'}` : ''}
                      </p>
                    </div>
                  ) : (
                    <div className="px-4 py-3 border-2 border-slate-200 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-500 italic">
                        Category will be calculated automatically when you fill in Species, Sex, and Birth Date
                      </p>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Additional information about the animal..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1.5: Purchase Information */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Purchase Information</h2>
              <p className="text-xs text-slate-600 mt-0.5">Only if purchased from external seller</p>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-slate-200">
              <input
                type="checkbox"
                checked={isPurchased}
                onChange={handlePurchaseToggle}
                className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-slate-700">Purchased from seller</span>
            </label>
          </div>
        </div>
        <div className="p-6">
          {isPurchased ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Seller Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleInputChange}
                  placeholder="Juan dela Cruz"
                  required={isPurchased}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Seller Contact <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="sellerContact"
                  value={formData.sellerContact}
                  onChange={handleInputChange}
                  placeholder="0912-345-6789"
                  required={isPurchased}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Seller Address
                </label>
                <input
                  type="text"
                  name="sellerAddress"
                  value={formData.sellerAddress}
                  onChange={handleInputChange}
                  placeholder="Brgy. Tambler, General Santos City"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Purchase Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  required={isPurchased}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Purchase Price (PHP ₱)
                </label>
                <input
                  type="number"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleInputChange}
                  placeholder="25000.00"
                  step="0.01"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">
              Check the box above if this animal was purchased from an external seller
            </p>
          )}
        </div>
      </div>

      {/* Section 1.6: Vaccination History */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Vaccination History</h2>
          <p className="text-xs text-slate-600 mt-0.5">Record any vaccines administered before or during treatment</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {isPurchased && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Vaccines from Previous Owner
                </label>
                <textarea
                  name="previousVaccines"
                  value={formData.previousVaccines}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="List vaccines administered by previous owner (e.g., FMD vaccine - Jan 2025, Anthrax vaccine - Dec 2024)..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-500 mt-1">Include vaccine name, date administered, and any additional notes</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Treatment Vaccines (If Sick)
              </label>
              <textarea
                name="treatmentVaccines"
                value={formData.treatmentVaccines}
                onChange={handleInputChange}
                rows={3}
                placeholder="List vaccines administered during treatment (e.g., Hemorrhagic Septicemia vaccine - Nov 2025, Antibiotic treatment - Nov 2025)..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">Include vaccine/medication name, date administered, dosage, and treatment outcome</p>
            </div>
          </div>
        </div>
      </div>

      {/* Physical Assessment (applicable for all animals) - Hidden for newborns */}
      {!isNewborn && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Physical Assessment</h2>
            <p className="text-xs text-slate-600 mt-0.5">Current health and body condition</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Body Condition Score (1-6)
              </label>
              <input
                type="number"
                name="bodyConditionScore"
                value={formData.bodyConditionScore}
                onChange={handleInputChange}
                placeholder="3.5"
                min="1"
                max="6"
                step="0.5"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">1=Very Thin, 3=Average, 6=Very Fat</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                General Health Status
              </label>
              <select
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select health status</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Physical Assessment Notes
              </label>
              <textarea
                name="assessmentNotes"
                value={formData.assessmentNotes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any notable physical characteristics, visible health conditions, or observations..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        </div>
      )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pb-6">
          <Link
            to="/livestock"
            className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
          >
            <Save size={18} />
            <span>Save Livestock</span>
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center animate-fade-in">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Livestock Added Successfully!
            </h3>
            <p className="text-sm text-slate-600 mb-1">
              <span className="font-semibold">{formData.livestockId}</span> has been registered
            </p>
            <p className="text-sm text-slate-600 mb-4">
              Activity has been logged and you will be redirected shortly.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/livestock')}
                className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
              >
                Go to Livestock List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
