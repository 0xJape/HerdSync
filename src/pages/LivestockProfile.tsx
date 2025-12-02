import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Weight, 
  Activity,
  Heart,
  Syringe,
  Baby,
  FileText,
  Edit,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  User,
  Phone,
  Home,
  DollarSign,
  Save,
  Plus,
  Download,
  Eye
} from 'lucide-react';
import { useStore } from '../store/useStore';

// Mock data - only A-001 for UI/UX demonstration
const mockAnimalData = {
  'A-001': {
    // Basic Information
    livestockId: 'A-001',
    species: 'Cattle',
    category: 'Cow',
    breed: 'Holstein',
    sex: 'Female',
    dateOfBirth: '2022-03-15',
    age: '3y 2m',
    birthType: 'Single',
    initialWeight: 35.5,
    currentWeight: 450.0,
    colorMarkings: 'Black and white spots',
    status: 'Sick',
    notes: 'Under antibiotic treatment - requires monitoring',
    
    // Antibiotic Treatment Tracking
    onAntibiotics: true,
    antibioticStartDate: '2024-11-25',
    lastCheckupDate: '2024-11-28',
    nextCheckupDate: '2024-12-01',
    checkupCount: 1,
    antibioticName: 'Oxytetracycline',
    treatmentReason: 'Respiratory infection',
    
    // Purchase Information
    isPurchased: true,
    sellerName: 'Juan dela Cruz',
    sellerContact: '0912-345-6789',
    sellerAddress: 'Brgy. Tambler, General Santos City',
    purchaseDate: '2022-03-20',
    purchasePrice: 25000.00,
    
    // Physical Condition & Assessment
    calfVigor: 'Strong',
    calvingProblem: 'None',
    bodyConditionScore: 3.5,
    pregnancyEligibility: 'Open (Ready for Breeding)',
    weaningDate: '2022-09-15',
    managementDecision: 'Keep',
    
    // Breeding Status Tracking
    isOnHeat: false,
    lastHeatDate: '2024-11-10',
    expectedNextHeat: '2024-12-01',
    breedingStatus: 'Open',
    lastBreedingCheck: '2024-11-15',
    
    // Breeding History Records
    breedingHistory: [
      {
        breedingDate: '2024-01-15',
        breedingMethod: 'Artificial Insemination',
        bullId: 'B-045',
        bullBreed: 'Brahman',
        calvingDate: '2024-10-22',
        calvingResult: 'Success',
        numberOfCalves: 1,
        calves: [
          {
            calfId: 'C-003',
            sex: 'Male',
            birthWeight: 38.5,
            calfVigor: 'Strong',
            calvingProblem: 'None',
            status: 'Active'
          }
        ],
        bodyConditionScore: 3.5,
        notes: 'Normal calving, no complications. Calf nursing well.'
      },
      {
        breedingDate: '2023-02-10',
        breedingMethod: 'Natural Breeding',
        bullId: 'B-032',
        bullBreed: 'Native/Carabao',
        calvingDate: '2023-11-18',
        calvingResult: 'Success',
        numberOfCalves: 1,
        calves: [
          {
            calfId: 'C-001',
            sex: 'Female',
            birthWeight: 35.0,
            calfVigor: 'Strong',
            calvingProblem: 'None',
            status: 'Active'
          }
        ],
        bodyConditionScore: 3.0,
        notes: 'First calving, healthy calf.'
      },
      {
        breedingDate: '2022-03-05',
        breedingMethod: 'Artificial Insemination',
        bullId: 'B-028',
        bullBreed: 'Holstein',
        calvingDate: '2022-12-10',
        calvingResult: 'Complications',
        numberOfCalves: 1,
        calves: [
          {
            calfId: 'C-002',
            sex: 'Male',
            birthWeight: 42.0,
            calfVigor: 'Weak',
            calvingProblem: 'Difficult Birth - Required Assistance',
            status: 'Deceased'
          }
        ],
        bodyConditionScore: 2.5,
        notes: 'Difficult calving due to large calf size. Calf survived 3 days.'
      }
    ],
    
    // Health Records
    lastCheckup: '2 days ago',
    healthStatus: 'Healthy',
    vaccinations: [
      { name: 'FMD Vaccine', type: 'Vaccine', date: '2024-10-15', nextDue: '2025-04-15', administeredBy: 'Dr. Santos' },
      { name: 'Brucellosis Vaccine', type: 'Vaccine', date: '2024-09-20', nextDue: '2025-09-20', administeredBy: 'Dr. Cruz' },
      { name: 'B-Complex', type: 'Vitamins', date: '2024-11-10', administeredBy: 'Dr. Santos' },
      { name: 'Oxytetracycline', type: 'Antibiotics', date: '2024-10-25', dosage: '20ml', withdrawalPeriod: '21 days', administeredBy: 'Dr. Cruz' },
      { name: 'Ivermectin', type: 'Dewormer', date: '2024-11-01', dosage: '10ml', administeredBy: 'Dr. Santos' },
    ],
    
    // Activity History
    activities: [
      { type: 'Weight Check', date: '2024-11-15', description: 'Weight recorded: 450kg (Previous: 445kg, Gain: +5kg over 30 days)', by: 'Farm Staff - Marlo Gel' },
      { type: 'Vitamin Supplement', date: '2024-11-10', description: 'B-Complex vitamins administered - Dose: 15ml intramuscular, to boost immunity and energy levels', by: 'Dr. Santos' },
      { type: 'Deworming', date: '2024-11-01', description: 'Ivermectin administered - Dose: 10ml subcutaneous, withdrawal period: 28 days, Next scheduled: November 29, 2025', by: 'Dr. Cruz' },
      { type: 'Antibiotic Treatment', date: '2024-10-25', description: 'Oxytetracycline administered for respiratory infection - Dose: 20ml intramuscular, withdrawal period: 21 days, Checkup scheduled every 3 days', by: 'Dr. Cruz' },
      { type: 'Breeding Check', date: '2024-10-01', description: 'Reproductive examination - Confirmed ready for breeding, body condition score adequate (3.5), estrus cycle normal', by: 'Dr. Cruz' },
      { type: 'Deworming', date: '2024-09-15', description: 'Levamisole dewormer administered - Dose: 8ml oral, broad spectrum parasite control', by: 'Farm Staff - Kyle' },
      { type: 'Hoof Trimming', date: '2024-09-10', description: 'Hoof trimming performed - All hooves in good condition, no signs of lameness or infection', by: 'Farm Staff - Kyle' },
      { type: 'Weight Check', date: '2024-08-15', description: 'Weight recorded: 445kg (Previous: 438kg, Gain: +7kg over 30 days)', by: 'Farm Staff - Marlo Gel' },
    ]
  }
};

export default function LivestockProfile() {
  const { id } = useParams<{ id: string }>();
  const { userRole } = useStore();
  const isViewer = userRole === 'viewer';
  const animal = mockAnimalData[id as keyof typeof mockAnimalData];
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showAddBreed, setShowAddBreed] = React.useState(false);
  const [newBreedName, setNewBreedName] = React.useState('');
  const [isWeightModalOpen, setIsWeightModalOpen] = React.useState(false);
  const [showAllTreatments, setShowAllTreatments] = React.useState(false);
  const [showAllActivities, setShowAllActivities] = React.useState(false);
  const [isCheckupModalOpen, setIsCheckupModalOpen] = React.useState(false);
  const [showCheckupSuccessModal, setShowCheckupSuccessModal] = React.useState(false);
  const [checkupSuccessMessage, setCheckupSuccessMessage] = React.useState({ title: '', message: '' });
  const [checkupFormData, setCheckupFormData] = React.useState({
    checkupDate: new Date().toISOString().split('T')[0],
    isRecovered: '',
    notes: ''
  });
  const [isBreedingModalOpen, setIsBreedingModalOpen] = React.useState(false);
  const [isBreedingHistoryModalOpen, setIsBreedingHistoryModalOpen] = React.useState(false);
  const [breedingFormData, setBreedingFormData] = React.useState({
    checkupDate: new Date().toISOString().split('T')[0],
    isOnHeat: false,
    notes: ''
  });
  const [weightFormData, setWeightFormData] = React.useState({
    weight: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isDeceasedModalOpen, setIsDeceasedModalOpen] = React.useState(false);
  const [deceasedFormData, setDeceasedFormData] = React.useState({
    dateOfDeath: new Date().toISOString().split('T')[0],
    causeOfDeath: '',
    notes: '',
    imageFile: null as File | null,
    imagePreview: ''
  });
  const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState(animal?.status || 'Active');
  const [isSoldModalOpen, setIsSoldModalOpen] = React.useState(false);
  const [soldFormData, setSoldFormData] = React.useState({
    soldDate: new Date().toISOString().split('T')[0],
    buyerName: '',
    buyerContact: '',
    buyerAddress: '',
    sellingPrice: '',
    notes: ''
  });
  
  // Breed data - Common Philippine breeds organized by species
  const [breedsBySpecies, setBreedsBySpecies] = React.useState({
    Cattle: ['Brahman', 'Native/Carabao', 'Crossbreed'],
    Goat: ['Anglo-Nubian', 'Native/Philippine Native', 'Crossbreed'],
    Sheep: ['Barbados Blackbelly', 'Native/Philippine Native', 'Crossbreed']
  });
  
  const [editFormData, setEditFormData] = React.useState({
    livestockId: '',
    species: '',
    category: '',
    breed: '',
    sex: '',
    dateOfBirth: '',
    birthType: '',
    currentWeight: '',
    colorMarkings: '',
    status: '',
    notes: '',
    bodyConditionScore: '',
    healthStatus: '',
    dateOfDeath: '',
    causeOfDeath: '',
    deathNotes: '',
    deathImage: ''
  });

  // Initialize form data when animal is loaded or modal opens
  React.useEffect(() => {
    if (animal && isEditModalOpen) {
      setEditFormData({
        livestockId: animal.livestockId,
        species: animal.species,
        category: animal.category,
        breed: animal.breed,
        sex: animal.sex,
        dateOfBirth: animal.dateOfBirth,
        birthType: animal.birthType,
        currentWeight: animal.currentWeight.toString(),
        colorMarkings: animal.colorMarkings,
        status: animal.status,
        notes: animal.notes,
        bodyConditionScore: animal.bodyConditionScore.toString(),
        healthStatus: animal.healthStatus,
      });
    }
  }, [animal, isEditModalOpen]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setShowAddBreed(false);
    setNewBreedName('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Reset breed when species changes
    if (name === 'species') {
      setEditFormData({
        ...editFormData,
        [name]: value,
        breed: '' // Clear breed selection when species changes
      });
    } else if (name === 'status' && value === 'Deceased') {
      // Open deceased modal when status changed to Deceased
      setEditFormData({
        ...editFormData,
        [name]: value
      });
      setIsDeceasedModalOpen(true);
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value
      });
    }
  };

  const handleDeceasedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update edit form with death details
    setEditFormData({
      ...editFormData,
      dateOfDeath: deceasedFormData.dateOfDeath,
      causeOfDeath: deceasedFormData.causeOfDeath,
      deathNotes: deceasedFormData.notes,
      deathImage: deceasedFormData.imagePreview
    });
    
    // Log death record
    console.log('Death Record:', {
      livestockId: animal?.livestockId,
      dateOfDeath: deceasedFormData.dateOfDeath,
      causeOfDeath: deceasedFormData.causeOfDeath,
      notes: deceasedFormData.notes,
      hasImage: !!deceasedFormData.imageFile,
      recordedBy: 'Current User',
      timestamp: new Date().toISOString()
    });
    
    setIsDeceasedModalOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDeceasedFormData({
        ...deceasedFormData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleAddNewBreed = () => {
    if (newBreedName.trim() && editFormData.species) {
      setBreedsBySpecies({
        ...breedsBySpecies,
        [editFormData.species]: [...breedsBySpecies[editFormData.species as keyof typeof breedsBySpecies], newBreedName.trim()]
      });
      setEditFormData({
        ...editFormData,
        breed: newBreedName.trim()
      });
      setNewBreedName('');
      setShowAddBreed(false);
    }
  };

  // Get available breeds based on selected species
  const availableBreeds = editFormData.species ? breedsBySpecies[editFormData.species as keyof typeof breedsBySpecies] || [] : [];

  const handleExportProfile = () => {
    if (!animal) return;
    
    // Create printable HTML content focused on vaccination history
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Livestock Vaccination Record - ${animal.livestockId}</title>
        <style>
          @page { margin: 2cm; }
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #059669;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #059669;
            margin: 0 0 5px 0;
            font-size: 24px;
          }
          .header p {
            margin: 5px 0;
            color: #666;
            font-size: 12px;
          }
          .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .section-title {
            background: #059669;
            color: white;
            padding: 10px 15px;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 20px;
          }
          .info-item {
            padding: 8px;
            background: #f9fafb;
            border-left: 3px solid #059669;
          }
          .info-label {
            font-weight: bold;
            color: #059669;
            font-size: 12px;
            text-transform: uppercase;
          }
          .info-value {
            color: #333;
            font-size: 14px;
          }
          .vaccine-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .vaccine-table th {
            background: #059669;
            color: white;
            padding: 12px;
            text-align: left;
            font-size: 13px;
          }
          .vaccine-table td {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 13px;
          }
          .vaccine-table tr:nth-child(even) {
            background: #f9fafb;
          }
          .vaccine-detail {
            background: white;
            border: 1px solid #e5e7eb;
            padding: 15px;
            margin-bottom: 15px;
            page-break-inside: avoid;
          }
          .vaccine-detail h3 {
            color: #059669;
            margin: 0 0 10px 0;
            font-size: 16px;
            border-bottom: 2px solid #059669;
            padding-bottom: 5px;
          }
          .vaccine-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .vaccine-info-item {
            font-size: 13px;
          }
          .vaccine-info-item strong {
            color: #059669;
            display: block;
            margin-bottom: 3px;
          }
          .activity-item {
            padding: 12px;
            border-left: 3px solid #059669;
            background: #f9fafb;
            margin-bottom: 10px;
            page-break-inside: avoid;
          }
          .activity-date {
            color: #059669;
            font-weight: bold;
            font-size: 13px;
          }
          .activity-type {
            font-weight: bold;
            color: #333;
            font-size: 14px;
            margin: 5px 0;
          }
          .activity-desc {
            color: #666;
            font-size: 13px;
            margin: 5px 0;
          }
          .activity-by {
            color: #666;
            font-size: 12px;
            font-style: italic;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #666;
            font-size: 11px;
          }
          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
          }
          .status-healthy {
            background: #d1fae5;
            color: #065f46;
          }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>LIVESTOCK VACCINATION & HEALTH RECORD</h1>
          <p><strong>Livestock ID:</strong> ${animal.livestockId}</p>
          <p>Generated on ${new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>

        <div class="section">
          <div class="section-title">Basic Information</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Species</div>
              <div class="info-value">${animal.species}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Breed</div>
              <div class="info-value">${animal.breed}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Sex</div>
              <div class="info-value">${animal.sex}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Date of Birth</div>
              <div class="info-value">${animal.dateOfBirth} (${animal.age})</div>
            </div>
            <div class="info-item">
              <div class="info-label">Current Weight</div>
              <div class="info-value">${animal.currentWeight} kg</div>
            </div>
            <div class="info-item">
              <div class="info-label">Health Status</div>
              <div class="info-value">
                <span class="status-badge status-healthy">${animal.healthStatus}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Vaccination History</div>
          ${animal.vaccinations.map((vacc, i) => `
            <div class="vaccine-detail">
              <h3>${i + 1}. ${vacc.name}</h3>
              <div class="vaccine-info">
                <div class="vaccine-info-item">
                  <strong>Date Administered</strong>
                  ${vacc.date}
                </div>
                <div class="vaccine-info-item">
                  <strong>Next Due Date</strong>
                  ${vacc.nextDue}
                </div>
                <div class="vaccine-info-item">
                  <strong>Administered By</strong>
                  ${vacc.administeredBy}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Medication History</div>
          <table class="vaccine-table">
            <thead>
              <tr>
                <th>Medication</th>
                <th>Date</th>
                <th>Dosage</th>
                <th>Withdrawal Period</th>
              </tr>
            </thead>
            <tbody>
              ${animal.medications.map(med => `
                <tr>
                  <td><strong>${med.name}</strong></td>
                  <td>${med.date}</td>
                  <td>${med.dosage}</td>
                  <td>${med.withdrawalPeriod}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">Health & Vaccination Activity Log</div>
          ${animal.activities
            .filter(activity => 
              activity.type === 'Vaccination' || 
              activity.type === 'Deworming' || 
              activity.type === 'Health Check' ||
              activity.type === 'Breeding Check'
            )
            .map(activity => `
              <div class="activity-item">
                <div class="activity-date">${activity.date}</div>
                <div class="activity-type">${activity.type}</div>
                <div class="activity-desc">${activity.description}</div>
                <div class="activity-by">Performed by: ${activity.by}</div>
              </div>
            `).join('')}
        </div>

        <div class="footer">
          <p><strong>DigiFarm Livestock Management System</strong></p>
          <p>This is an official livestock health and vaccination record</p>
        </div>
      </body>
      </html>
    `;

    // Open print dialog
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      
      // Wait for content to load then trigger print dialog
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 250);
      };
    }
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic here
    console.log('Saving changes:', editFormData);
    
    // Log activity
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    console.log('Activity Log:', {
      type: 'Livestock Information Updated',
      livestockId: editFormData.livestockId,
      timestamp: timestamp,
      changes: editFormData,
      performedBy: 'Current User'
    });
    
    setIsEditModalOpen(false);
    setShowSuccessModal(true);
    
    // Auto-hide success modal after 3 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
    // In a real app, you would update the animal data here
  };

  const handleWeightUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const previousWeight = animal?.currentWeight || 0;
    const newWeight = parseFloat(weightFormData.weight);
    const weightChange = newWeight - previousWeight;
    const changeType = weightChange > 0 ? 'Gain' : 'Loss';
    
    // Log activity
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    console.log('Weight Update Activity Log:', {
      type: 'Weight Check',
      livestockId: animal?.livestockId,
      date: weightFormData.date,
      timestamp: timestamp,
      previousWeight: `${previousWeight} kg`,
      newWeight: `${newWeight} kg`,
      weightChange: `${changeType}: ${Math.abs(weightChange).toFixed(1)} kg`,
      notes: weightFormData.notes,
      description: `Weight recorded: ${newWeight}kg (Previous: ${previousWeight}kg, ${changeType}: ${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)}kg)${weightFormData.notes ? ` - Notes: ${weightFormData.notes}` : ''}`,
      performedBy: 'Current User'
    });
    
    // Reset form and close modal
    setWeightFormData({
      weight: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setIsWeightModalOpen(false);
    setShowSuccessModal(true);
    
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  if (!animal) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle size={48} className="text-slate-400 mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Animal Not Found</h2>
        <p className="text-slate-600 mb-6">The livestock record you're looking for doesn't exist.</p>
        <Link
          to="/livestock"
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Livestock</span>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Monitor': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Sick': return 'bg-red-50 text-red-700 border-red-200';
      case 'Active': return 'bg-primary-50 text-primary-700 border-primary-200';
      case 'Sold': return 'bg-slate-50 text-slate-700 border-slate-200';
      case 'Deceased': return 'bg-red-100 text-red-900 border-red-500 border-2 font-bold';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Healthy':
      case 'Active':
        return CheckCircle;
      case 'Monitor':
      case 'Sick':
      case 'Deceased':
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  const StatusIcon = getStatusIcon(animal.healthStatus);

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
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">ID: <span className="text-primary-600">{animal.livestockId}</span></h1>
              <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(animal.status)}`}>
                <StatusIcon size={12} />
                <span>{animal.status}</span>
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Breed:</span>
                <span className="text-lg font-bold text-emerald-700">{animal.breed}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Type:</span>
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold bg-primary-100 text-primary-800 border border-primary-200">
                  {animal.species}
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-sm text-slate-600">{animal.sex}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleExportProfile}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <Download size={16} />
            <span>Export Profile</span>
          </button>
          {!isViewer && (
            <button 
              onClick={handleEditClick}
              className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Edit size={16} />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>

      {/* View-Only Banner for Viewers */}
      {isViewer && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-medium text-blue-900">View-Only Mode - You can view livestock details but cannot edit or add records</p>
          </div>
        </div>
      )}
      
      {/* AMR Warning Banner */}
      {animal.onAntibiotics && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm mb-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle size={16} className="text-red-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-bold text-red-900">🦠 AMR Warning</h3>
                <span className="px-2 py-0.5 bg-red-200 text-red-900 text-xs font-bold rounded">CRITICAL</span>
              </div>
              <p className="text-sm text-red-900">
                On <span className="font-semibold">{animal.antibioticName}</span> for {animal.treatmentReason}. Complete full course to prevent resistance.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Health Checkup Alert Banner */}
      {animal.onAntibiotics && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm mb-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart size={16} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-blue-900">🏥 Checkup Due</h3>
                  <span className="text-xs text-blue-700">
                    {new Date(animal.nextCheckupDate).toLocaleDateString()} ({Math.ceil((new Date(animal.nextCheckupDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}d)
                  </span>
                </div>
                {!isViewer && (
                  <button 
                    onClick={() => setIsCheckupModalOpen(true)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition-colors"
                  >
                    Record Checkup
                  </button>
                )}
              </div>
              <p className="text-xs text-blue-700">
                Last: {new Date(animal.lastCheckupDate).toLocaleDateString()} • Checkup #{animal.checkupCount}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="md:col-span-2 p-4 bg-gradient-to-r from-primary-50 to-emerald-50 rounded-lg border-2 border-primary-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Livestock ID</p>
                <p className="text-2xl font-bold text-primary-700 font-mono">{animal.livestockId}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Species</p>
                <p className="text-base font-bold text-blue-800">{animal.species}</p>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Category</p>
                <p className="text-base font-bold text-primary-800">{animal.category}</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Breed</p>
                <p className="text-base font-bold text-emerald-800">{animal.breed}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Sex</p>
                <p className="text-sm text-slate-900">{animal.sex}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Date of Birth</p>
                <p className="text-sm text-slate-900">{new Date(animal.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Age</p>
                <p className="text-sm text-slate-900">{animal.age}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Birth Type</p>
                <p className="text-sm text-slate-900">{animal.birthType}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Initial Weight</p>
                <p className="text-sm text-slate-900">{animal.initialWeight} kg</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Current Weight</p>
                <p className="text-sm font-semibold text-slate-900">{animal.currentWeight} kg</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Color / Markings</p>
                <p className="text-sm text-slate-900">{animal.colorMarkings}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Status</p>
                <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(animal.status)}`}>
                  <StatusIcon size={14} />
                  <span>{animal.status}</span>
                </span>
              </div>
              {animal.notes && (
                <div className="col-span-2">
                  <p className="text-xs font-medium text-slate-500 mb-1">Notes</p>
                  <p className="text-sm text-slate-700">{animal.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Purchase Information Card (if applicable) */}
          {animal.isPurchased && (
            <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <DollarSign size={20} className="text-amber-600" />
                <span>Purchase Information</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1 flex items-center space-x-1">
                    <User size={12} />
                    <span>Seller Name</span>
                  </p>
                  <p className="text-sm text-slate-900">{animal.sellerName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1 flex items-center space-x-1">
                    <Phone size={12} />
                    <span>Contact Number</span>
                  </p>
                  <p className="text-sm text-slate-900">{animal.sellerContact}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-medium text-slate-500 mb-1 flex items-center space-x-1">
                    <Home size={12} />
                    <span>Address</span>
                  </p>
                  <p className="text-sm text-slate-900">{animal.sellerAddress}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Purchase Date</p>
                  <p className="text-sm text-slate-900">{new Date(animal.purchaseDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Purchase Price</p>
                  <p className="text-sm font-semibold text-slate-900">₱{animal.purchasePrice.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            </div>
          )}

          {/* Physical Condition & Assessment Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Physical Condition & Assessment</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Calf Vigor</p>
                <p className="text-sm text-slate-900">{animal.calfVigor}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Calving Problem</p>
                <p className="text-sm text-slate-900">{animal.calvingProblem}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Body Condition Score</p>
                <p className="text-sm font-semibold text-slate-900">{animal.bodyConditionScore} / 6</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Pregnancy Status</p>
                <p className="text-sm text-slate-900">{animal.pregnancyEligibility}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Weaning Date</p>
                <p className="text-sm text-slate-900">{new Date(animal.weaningDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Management Decision</p>
                <p className="text-sm font-medium text-primary-600">{animal.managementDecision}</p>
              </div>
            </div>
          </div>

          {/* Health Records / Treatment History Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                <Syringe size={20} className="text-red-500" />
                <span>Treatment History</span>
              </h2>
              <button
                onClick={() => setShowAllTreatments(!showAllTreatments)}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
              >
                <span>{showAllTreatments ? 'Show Less' : 'View All Logs'}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showAllTreatments ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {/* Vaccines */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Vaccines</span>
              </h3>
              <div className="space-y-3">
                {animal.vaccinations.filter(vac => vac.type === 'Vaccine').slice(0, showAllTreatments ? undefined : 2).map((vac, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{vac.name}</p>
                        <p className="text-xs text-slate-600 mt-1">
                          Administered: {new Date(vac.date).toLocaleDateString()} by {vac.administeredBy}
                        </p>
                      </div>
                      {vac.nextDue && (
                        <span className="text-xs font-medium text-primary-600">
                          Next: {new Date(vac.nextDue).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {!showAllTreatments && animal.vaccinations.filter(vac => vac.type === 'Vaccine').length > 2 && (
                  <p className="text-xs text-slate-500 italic">+{animal.vaccinations.filter(vac => vac.type === 'Vaccine').length - 2} more records</p>
                )}
                {animal.vaccinations.filter(vac => vac.type === 'Vaccine').length === 0 && (
                  <p className="text-sm text-slate-500 italic">No vaccine records</p>
                )}
              </div>
            </div>

            {showAllTreatments && (
              <>
            {/* Vitamins */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Vitamins</span>
              </h3>
              <div className="space-y-3">
                {animal.vaccinations.filter(vac => vac.type === 'Vitamins').map((vac, index) => (
                  <div key={index} className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-sm font-medium text-slate-900">{vac.name}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      Administered: {new Date(vac.date).toLocaleDateString()} by {vac.administeredBy}
                    </p>
                  </div>
                ))}
                {animal.vaccinations.filter(vac => vac.type === 'Vitamins').length === 0 && (
                  <p className="text-sm text-slate-500 italic">No vitamin records</p>
                )}
              </div>
            </div>

            {/* Antibiotics */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Antibiotics</span>
              </h3>
              <div className="space-y-3">
                {animal.vaccinations.filter(vac => vac.type === 'Antibiotics').map((vac, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm font-medium text-slate-900">{vac.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-slate-600">
                        Date: {new Date(vac.date).toLocaleDateString()} • Dosage: {vac.dosage}
                      </p>
                      {vac.withdrawalPeriod && (
                        <span className="text-xs font-medium text-amber-600">
                          Withdrawal: {vac.withdrawalPeriod}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {animal.vaccinations.filter(vac => vac.type === 'Antibiotics').length === 0 && (
                  <p className="text-sm text-slate-500 italic">No antibiotic records</p>
                )}
              </div>
            </div>

            {/* Anti-Inflammatory */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Anti-Inflammatory</span>
              </h3>
              <div className="space-y-3">
                {animal.vaccinations.filter(vac => vac.type === 'Anti-Inflammatory').map((vac, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm font-medium text-slate-900">{vac.name}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      Date: {new Date(vac.date).toLocaleDateString()} • Dosage: {vac.dosage}
                    </p>
                  </div>
                ))}
                {animal.vaccinations.filter(vac => vac.type === 'Anti-Inflammatory').length === 0 && (
                  <p className="text-sm text-slate-500 italic">No anti-inflammatory records</p>
                )}
              </div>
            </div>

            {/* Dewormer */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span>Dewormer</span>
              </h3>
              <div className="space-y-3">
                {animal.vaccinations.filter(vac => vac.type === 'Dewormer').map((vac, index) => (
                  <div key={index} className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm font-medium text-slate-900">{vac.name}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      Date: {new Date(vac.date).toLocaleDateString()} • Dosage: {vac.dosage}
                    </p>
                  </div>
                ))}
                {animal.vaccinations.filter(vac => vac.type === 'Dewormer').length === 0 && (
                  <p className="text-sm text-slate-500 italic">No dewormer records</p>
                )}
              </div>
            </div>
              </>
            )}
          </div>

          {/* Activity History Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                <Activity size={20} className="text-primary-600" />
                <span>Activity History</span>
              </h2>
              <button
                onClick={() => setShowAllActivities(!showAllActivities)}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
              >
                <span>{showAllActivities ? 'Show Less' : 'View All Logs'}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showAllActivities ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {animal.activities.slice(0, showAllActivities ? undefined : 3).map((activity, index) => {
                const getActivityColor = (type: string) => {
                  switch(type) {
                    case 'Vaccination': return { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100', iconColor: 'text-blue-600', badge: 'bg-blue-200 text-blue-900' };
                    case 'Antibiotic Treatment': return { bg: 'bg-red-50', border: 'border-red-200', icon: 'bg-red-100', iconColor: 'text-red-600', badge: 'bg-red-200 text-red-900' };
                    case 'Deworming': return { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'bg-amber-100', iconColor: 'text-amber-600', badge: 'bg-amber-200 text-amber-900' };
                    case 'Vitamin Supplement': return { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'bg-emerald-100', iconColor: 'text-emerald-600', badge: 'bg-emerald-200 text-emerald-900' };
                    default: return { bg: 'bg-slate-50', border: 'border-slate-200', icon: 'bg-slate-100', iconColor: 'text-slate-600', badge: 'bg-slate-200 text-slate-900' };
                  }
                };
                const colors = getActivityColor(activity.type);
                
                return (
                  <div key={index} className={`p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 ${colors.icon} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Syringe size={14} className={colors.iconColor} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-semibold text-slate-900">{activity.type}</p>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${colors.badge}`}>
                              {activity.type === 'Vaccination' && 'VACCINE'}
                              {activity.type === 'Antibiotic Treatment' && 'ANTIBIOTIC'}
                              {activity.type === 'Deworming' && 'DEWORMER'}
                              {activity.type === 'Vitamin Supplement' && 'VITAMIN'}
                              {!['Vaccination', 'Antibiotic Treatment', 'Deworming', 'Vitamin Supplement'].includes(activity.type) && 'CARE'}
                            </span>
                          </div>
                          <span className="text-xs text-slate-600 whitespace-nowrap">
                            {new Date(activity.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700">{activity.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-slate-600">By {activity.by}</p>
                          {activity.type === 'Antibiotic Treatment' && animal.onAntibiotics && (
                            <button
                              onClick={() => setIsCheckupModalOpen(true)}
                              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded transition-colors"
                            >
                              
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {!showAllActivities && animal.activities.length > 3 && (
                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500 italic">+{animal.activities.length - 3} more activities</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <CheckCircle size={20} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Health Status</p>
                  <p className="text-sm font-semibold text-slate-900">{animal.healthStatus}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Weight size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Current Weight</p>
                  <p className="text-sm font-semibold text-slate-900">{animal.currentWeight} kg</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                  <TrendingUp size={20} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Weight Gain</p>
                  <p className="text-sm font-semibold text-slate-900">
                    +{(animal.currentWeight - animal.initialWeight).toFixed(1)} kg
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Calendar size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Last Checkup</p>
                  <p className="text-sm font-semibold text-slate-900">{animal.lastCheckup}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {!isViewer && (
                <>
                  <Link
                    to={`/vaccination?livestockId=${animal.livestockId}`}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <Syringe size={16} />
                    <span>Add Vaccination</span>
                  </Link>
                  {animal.sex === 'Female' && (
                    <button 
                      onClick={() => setIsBreedingModalOpen(true)}
                      className="w-full flex items-center justify-between px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <Baby size={16} />
                        <span>Breeding Status</span>
                      </div>
                      {animal.isOnHeat && (
                        <span className="px-2 py-0.5 bg-white text-purple-600 text-xs font-semibold rounded">
                          OPEN
                        </span>
                      )}
                    </button>
                  )}
                </>
              )}
              {!isViewer && (
                <>
                  <button 
                    onClick={() => setIsStatusModalOpen(true)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle size={16} />
                      <span>Update Status</span>
                    </div>
                    <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(animal.status)}`}>
                      <StatusIcon size={10} />
                      <span>{animal.status}</span>
                    </span>
                  </button>
                  <button 
                    onClick={() => setIsWeightModalOpen(true)}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
                  >
                    <Weight size={16} />
                    <span>Update Weight</span>
                  </button>
                  <button
                    onClick={() => setIsBreedingHistoryModalOpen(true)}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors"
                  >
                    <FileText size={16} />
                    <span>Breeding History</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Weight Progress Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Weight Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-600">Initial</span>
                  <span className="text-xs font-medium text-slate-900">{animal.initialWeight} kg</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-300 rounded-full"
                    style={{ width: '10%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-600">Current</span>
                  <span className="text-xs font-medium text-primary-600">{animal.currentWeight} kg</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-600 rounded-full"
                    style={{ width: '90%' }}
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-500">Growth Rate</p>
                <p className="text-lg font-semibold text-slate-900 mt-1">
                  {((animal.currentWeight - animal.initialWeight) / animal.initialWeight * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Edit Livestock Information</h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveChanges} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Livestock ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="livestockId"
                      value={editFormData.livestockId}
                      onChange={handleInputChange}
                      required
                      disabled
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-500 mt-1">Livestock ID cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Species <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="species"
                      value={editFormData.species}
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
                      Category <span className="text-red-500">*</span>
                    </label>
                    {!editFormData.species ? (
                      <div className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-400 text-sm">
                        Please select a species first
                      </div>
                    ) : (
                      <select
                        name="category"
                        value={editFormData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        {editFormData.species === 'Cattle' && (
                          <>
                            <option value="Bull">Bull (Adult Male)</option>
                            <option value="Cow">Cow (Adult Female)</option>
                            <option value="Heifer">Heifer (Young Female)</option>
                            <option value="Steer">Steer (Castrated Male)</option>
                            <option value="Calf">Calf (Young)</option>
                          </>
                        )}
                        {editFormData.species === 'Goat' && (
                          <>
                            <option value="Buck">Buck (Adult Male)</option>
                            <option value="Doe">Doe (Adult Female)</option>
                            <option value="Maiden Doe">Maiden Doe (Young Female)</option>
                            <option value="Wether">Wether (Castrated Male)</option>
                            <option value="Kid">Kid (Young)</option>
                          </>
                        )}
                        {editFormData.species === 'Sheep' && (
                          <>
                            <option value="Ram">Ram (Adult Male)</option>
                            <option value="Ewe">Ewe (Adult Female)</option>
                            <option value="Maiden Ewe">Maiden Ewe (Young Female)</option>
                            <option value="Wether">Wether (Castrated Male)</option>
                            <option value="Lamb">Lamb (Young)</option>
                          </>
                        )}
                      </select>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Breed
                    </label>
                    {!editFormData.species ? (
                      <div className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-400 text-sm">
                        Please select a species first
                      </div>
                    ) : !showAddBreed ? (
                      <div className="flex space-x-2">
                        <select
                          name="breed"
                          value={editFormData.breed}
                          onChange={handleInputChange}
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
                      value={editFormData.sex}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editFormData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Birth Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="birthType"
                      value={editFormData.birthType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select birth type</option>
                      <option value="Single">Single</option>
                      <option value="Twin">Twin</option>
                      <option value="Triplet">Triplet</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Current Weight (kg) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="currentWeight"
                      value={editFormData.currentWeight}
                      onChange={handleInputChange}
                      step="0.1"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Color & Markings
                    </label>
                    <input
                      type="text"
                      name="colorMarkings"
                      value={editFormData.colorMarkings}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Physical Assessment */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Physical Assessment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Body Condition Score (1-5)
                    </label>
                    <input
                      type="number"
                      name="bodyConditionScore"
                      value={editFormData.bodyConditionScore}
                      onChange={handleInputChange}
                      step="0.5"
                      min="1"
                      max="5"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Health Status
                    </label>
                    <select
                      name="healthStatus"
                      value={editFormData.healthStatus}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="Healthy">Healthy</option>
                      <option value="Monitor">Monitor</option>
                      <option value="Sick">Sick</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={editFormData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Any additional notes or observations..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Weight Update Modal */}
      {isWeightModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Weight size={20} className="text-primary-600" />
                <h2 className="text-xl font-semibold text-slate-900">Update Weight</h2>
              </div>
              <button
                onClick={() => setIsWeightModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleWeightUpdate} className="p-6 space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600 mb-1">Current Weight</p>
                <p className="text-2xl font-bold text-slate-900">{animal?.currentWeight} kg</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  New Weight (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={weightFormData.weight}
                  onChange={(e) => setWeightFormData({ ...weightFormData, weight: e.target.value })}
                  step="0.1"
                  min="0"
                  required
                  placeholder="Enter new weight"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={weightFormData.date}
                  onChange={(e) => setWeightFormData({ ...weightFormData, date: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={weightFormData.notes}
                  onChange={(e) => setWeightFormData({ ...weightFormData, notes: e.target.value })}
                  rows={3}
                  placeholder="Any observations or additional notes..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {weightFormData.weight && (
                <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <p className="text-xs text-primary-700 font-medium mb-1">Weight Change Preview</p>
                  <p className="text-lg font-bold text-primary-900">
                    {parseFloat(weightFormData.weight) > (animal?.currentWeight || 0) ? (
                      <span className="text-emerald-700">
                        +{(parseFloat(weightFormData.weight) - (animal?.currentWeight || 0)).toFixed(1)} kg ↑
                      </span>
                    ) : (
                      <span className="text-red-700">
                        {(parseFloat(weightFormData.weight) - (animal?.currentWeight || 0)).toFixed(1)} kg ↓
                      </span>
                    )}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsWeightModalOpen(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <Save size={16} />
                  <span>Save Weight</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deceased Information Modal */}
      {isDeceasedModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="sticky top-0 bg-red-50 border-b border-red-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle size={20} className="text-red-600" />
                <h2 className="text-xl font-semibold text-red-900">Record Death Information</h2>
              </div>
              <button
                onClick={() => {
                  setIsDeceasedModalOpen(false);
                  setEditFormData({ ...editFormData, status: animal?.status || 'Active' });
                }}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleDeceasedSubmit} className="p-6 space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-900 font-medium">
                  ⚠️ You are about to mark <span className="font-bold">{animal?.livestockId}</span> as deceased. 
                  This record will remain in the database for historical purposes.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date of Death <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={deceasedFormData.dateOfDeath}
                  onChange={(e) => setDeceasedFormData({ ...deceasedFormData, dateOfDeath: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Cause of Death <span className="text-red-500">*</span>
                </label>
                <select
                  value={deceasedFormData.causeOfDeath}
                  onChange={(e) => setDeceasedFormData({ ...deceasedFormData, causeOfDeath: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select cause of death</option>
                  <option value="Disease">Disease</option>
                  <option value="Injury">Injury</option>
                  <option value="Old Age">Old Age</option>
                  <option value="Birth Complications">Birth Complications</option>
                  <option value="Predator Attack">Predator Attack</option>
                  <option value="Accident">Accident</option>
                  <option value="Unknown">Unknown</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Additional Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={deceasedFormData.notes}
                  onChange={(e) => setDeceasedFormData({ ...deceasedFormData, notes: e.target.value })}
                  rows={4}
                  required
                  placeholder="Describe the circumstances, symptoms, or any relevant details..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Upload Photo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {deceasedFormData.imagePreview && (
                  <div className="mt-3">
                    <img 
                      src={deceasedFormData.imagePreview} 
                      alt="Death record" 
                      className="w-full h-48 object-cover rounded-lg border-2 border-slate-200"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsDeceasedModalOpen(false);
                    setEditFormData({ ...editFormData, status: animal?.status || 'Active' });
                  }}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Save size={16} />
                  <span>Confirm Death Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Health Checkup Modal */}
      {isCheckupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="sticky top-0 bg-blue-50 border-b border-blue-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Heart size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-900">Record Health Checkup</h2>
              </div>
              <button
                onClick={() => setIsCheckupModalOpen(false)}
                className="text-blue-400 hover:text-blue-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              console.log('Health Checkup Recorded:', {
                livestockId: animal.livestockId,
                checkupDate: checkupFormData.checkupDate,
                isRecovered: checkupFormData.isRecovered,
                notes: checkupFormData.notes,
                checkupNumber: animal.checkupCount + 1,
                antibioticTreatment: animal.antibioticName,
                treatmentStartDate: animal.antibioticStartDate
              });
              
              if (checkupFormData.isRecovered === 'yes') {
                setCheckupSuccessMessage({
                  title: '✅ Animal Recovered Successfully!',
                  message: `${animal.livestockId} has recovered from ${animal.treatmentReason}. Antibiotic treatment completed. Remember to observe withdrawal period before processing for consumption.`
                });
              } else {
                const nextCheckup = new Date(checkupFormData.checkupDate);
                nextCheckup.setDate(nextCheckup.getDate() + 3);
                setCheckupSuccessMessage({
                  title: '📅 Next Checkup Scheduled',
                  message: `Checkup recorded. Next checkup scheduled for ${nextCheckup.toLocaleDateString()} (3 days from now). Continue ${animal.antibioticName} treatment as prescribed.`
                });
              }
              
              setIsCheckupModalOpen(false);
              setShowCheckupSuccessModal(true);
              setCheckupFormData({
                checkupDate: new Date().toISOString().split('T')[0],
                isRecovered: '',
                notes: ''
              });
            }} className="p-6 space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900 font-medium">
                  🩺 Checkup #{animal.checkupCount + 1} for <span className="font-bold">{animal.livestockId}</span>
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Treatment: {animal.antibioticName} • Started: {new Date(animal.antibioticStartDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Checkup Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={checkupFormData.checkupDate}
                  onChange={(e) => setCheckupFormData({ ...checkupFormData, checkupDate: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Has the animal recovered? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-emerald-50 hover:border-emerald-500 transition-colors">
                    <input
                      type="radio"
                      name="isRecovered"
                      value="yes"
                      checked={checkupFormData.isRecovered === 'yes'}
                      onChange={(e) => setCheckupFormData({ ...checkupFormData, isRecovered: e.target.value })}
                      required
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-3 text-sm font-medium text-slate-900">✅ Yes, animal has recovered and is healthy</span>
                  </label>
                  <label className="flex items-center p-3 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-amber-50 hover:border-amber-500 transition-colors">
                    <input
                      type="radio"
                      name="isRecovered"
                      value="no"
                      checked={checkupFormData.isRecovered === 'no'}
                      onChange={(e) => setCheckupFormData({ ...checkupFormData, isRecovered: e.target.value })}
                      required
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="ml-3 text-sm font-medium text-slate-900">⚠️ No, still showing symptoms - continue treatment</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Checkup Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={checkupFormData.notes}
                  onChange={(e) => setCheckupFormData({ ...checkupFormData, notes: e.target.value })}
                  rows={4}
                  required
                  placeholder="Describe current health status, symptoms improvement, appetite, behavior, etc..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {checkupFormData.isRecovered === 'no' && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-900 font-medium">
                    📅 Next checkup will be automatically scheduled for 3 days from the checkup date.
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Continue administering {animal.antibioticName} as prescribed. Complete the full course even if symptoms improve.
                  </p>
                </div>
              )}

              {checkupFormData.isRecovered === 'yes' && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-sm text-emerald-900 font-medium">
                    ✅ Treatment completion recorded. Remember to observe withdrawal period before processing.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCheckupModalOpen(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Save size={16} />
                  <span>Save Checkup</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Breeding History Modal */}
      {isBreedingHistoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText size={20} className="text-purple-600" />
                <h2 className="text-xl font-semibold text-purple-900">Breeding History - {animal.livestockId}</h2>
                <span className="px-2 py-1 bg-purple-200 text-purple-900 text-xs font-bold rounded">
                  {animal.breedingHistory.length} Records
                </span>
              </div>
              <button
                onClick={() => setIsBreedingHistoryModalOpen(false)}
                className="text-purple-400 hover:text-purple-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-xs text-purple-700 font-medium mb-1">Total Breedings</p>
                    <p className="text-2xl font-bold text-purple-900">{animal.breedingHistory.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-700 font-medium mb-1">Total Calves</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {animal.breedingHistory.reduce((sum, record) => sum + record.numberOfCalves, 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-700 font-medium mb-1">Successful Calvings</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {animal.breedingHistory.filter(r => r.calvingResult === 'Success').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-700 font-medium mb-1">Current Status</p>
                    <p className="text-sm font-bold text-purple-900">{animal.breedingStatus}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {animal.breedingHistory.map((record, index) => (
                  <div key={index} className="bg-white border-2 border-slate-200 rounded-lg p-5 hover:border-purple-300 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Baby size={20} className="text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            Breeding #{animal.breedingHistory.length - index}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {new Date(record.breedingDate).toLocaleDateString()} • {record.breedingMethod}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        record.calvingResult === 'Success' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {record.calvingResult}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">Bull/Sire</p>
                        <Link 
                          to={`/livestock/${record.bullId}`}
                          className="text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline block"
                        >
                          {record.bullId}
                        </Link>
                        <p className="text-xs text-slate-600">{record.bullBreed}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">Calving Date</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {new Date(record.calvingDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-600">
                          ({Math.round((new Date(record.calvingDate).getTime() - new Date(record.breedingDate).getTime()) / (1000 * 60 * 60 * 24))} days)
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">Body Condition Score</p>
                        <p className="text-sm font-semibold text-slate-900">{record.bodyConditionScore}/5</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                      <h4 className="text-sm font-semibold text-slate-900 mb-3">
                        Offspring ({record.numberOfCalves} {record.numberOfCalves === 1 ? 'Calf' : 'Calves'})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {record.calves.map((calf, calfIndex) => (
                          <div key={calfIndex} className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold text-blue-900">{calf.calfId}</span>
                                <span className="px-2 py-0.5 bg-blue-200 text-blue-900 text-xs font-semibold rounded">
                                  {calf.sex}
                                </span>
                              </div>
                              <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                                calf.status === 'Active' 
                                  ? 'bg-emerald-200 text-emerald-900'
                                  : 'bg-red-200 text-red-900'
                              }`}>
                                {calf.status}
                              </span>
                            </div>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Birth Weight:</span>
                                <span className="font-semibold text-slate-900">{calf.birthWeight} kg</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Calf Vigor:</span>
                                <span className={`font-semibold ${
                                  calf.calfVigor === 'Strong' ? 'text-emerald-700' : 'text-amber-700'
                                }`}>
                                  {calf.calfVigor}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Calving Problem:</span>
                                <span className={`font-semibold ${
                                  calf.calvingProblem === 'None' ? 'text-emerald-700' : 'text-red-700'
                                }`}>
                                  {calf.calvingProblem}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {record.notes && (
                      <div className="mt-4 p-3 bg-slate-50 rounded-lg border-l-4 border-slate-300">
                        <p className="text-xs font-semibold text-slate-700 mb-1">Notes</p>
                        <p className="text-sm text-slate-600">{record.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => setIsBreedingHistoryModalOpen(false)}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breeding Status Modal */}
      {isBreedingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="sticky top-0 bg-purple-50 border-b border-purple-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Baby size={20} className="text-purple-600" />
                <h2 className="text-xl font-semibold text-purple-900">Breeding Status Checkup</h2>
              </div>
              <button
                onClick={() => setIsBreedingModalOpen(false)}
                className="text-purple-400 hover:text-purple-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              console.log('Breeding Status Recorded:', {
                livestockId: animal.livestockId,
                checkupDate: breedingFormData.checkupDate,
                isOnHeat: breedingFormData.isOnHeat,
                notes: breedingFormData.notes,
                previousHeatDate: animal.lastHeatDate
              });
              
              if (breedingFormData.isOnHeat) {
                alert(`🔥 Heat cycle detected for ${animal.livestockId}! Optimal breeding window is now. Consider artificial insemination or natural breeding within the next 12-24 hours for best results.`);
              } else {
                alert(`✅ Breeding status updated. Continue monitoring for heat signs. Next expected heat cycle: ${animal.expectedNextHeat}`);
              }
              
              setIsBreedingModalOpen(false);
              setBreedingFormData({
                checkupDate: new Date().toISOString().split('T')[0],
                isOnHeat: false,
                notes: ''
              });
            }} className="p-6 space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-sm text-slate-700">
                  Breeding status update for <span className="font-semibold text-slate-900">{animal.livestockId}</span>
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Last heat observation: {new Date(animal.lastHeatDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Observation Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={breedingFormData.checkupDate}
                  onChange={(e) => setBreedingFormData({ ...breedingFormData, checkupDate: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Breeding Readiness Status <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Open for Breeding</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {breedingFormData.isOnHeat ? 'Animal is currently in heat and ready for breeding' : 'Animal is not currently in heat'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={breedingFormData.isOnHeat}
                      onChange={(e) => setBreedingFormData({ ...breedingFormData, isOnHeat: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                
                {breedingFormData.isOnHeat && (
                  <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-xs text-purple-900">
                      Optimal breeding window is within 12-24 hours of heat detection. Consider artificial insemination or natural breeding during this period.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Observation Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={breedingFormData.notes}
                  onChange={(e) => setBreedingFormData({ ...breedingFormData, notes: e.target.value })}
                  rows={4}
                  required
                  placeholder="Record behavioral observations, physical signs, and any relevant breeding readiness indicators..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsBreedingModalOpen(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Save size={16} />
                  <span>Save Status</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Checkup Success Modal */}
      {showCheckupSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center animate-fade-in">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {checkupSuccessMessage.title}
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              {checkupSuccessMessage.message}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCheckupSuccessModal(false)}
                className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle size={20} className="text-primary-600" />
                <h2 className="text-xl font-semibold text-slate-900">Update Status</h2>
              </div>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              console.log('Status Updated:', {
                livestockId: animal.livestockId,
                oldStatus: animal.status,
                newStatus: selectedStatus,
                timestamp: new Date().toISOString()
              });
              
              if (selectedStatus === 'Deceased') {
                setIsStatusModalOpen(false);
                setIsDeceasedModalOpen(true);
              } else if (selectedStatus === 'Sold') {
                setIsStatusModalOpen(false);
                setIsSoldModalOpen(true);
              } else {
                setShowSuccessModal(true);
                setIsStatusModalOpen(false);
                setTimeout(() => {
                  setShowSuccessModal(false);
                }, 3000);
              }
            }} className="p-6 space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600 mb-1">Current Status</p>
                <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(animal.status)}`}>
                  <StatusIcon size={14} />
                  <span>{animal.status}</span>
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Status <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Active', 'Sold', 'Deceased'].map((status) => (
                    <label key={status} className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedStatus === status 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={selectedStatus === status}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-4 h-4 text-primary-600 focus:ring-2 focus:ring-primary-500"
                      />
                      <span className={`ml-3 text-sm font-medium ${
                        selectedStatus === status ? 'text-primary-900' : 'text-slate-700'
                      }`}>
                        {status}
                      </span>
                      {status === 'Deceased' && (
                        <span className="ml-auto text-xs text-red-600 font-medium">Requires Details</span>
                      )}
                      {status === 'Sold' && (
                        <span className="ml-auto text-xs text-blue-600 font-medium">Requires Details</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {selectedStatus === 'Deceased' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-900">
                    ⚠️ Selecting "Deceased" will open a form to record death details.
                  </p>
                </div>
              )}

              {selectedStatus === 'Sold' && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-900">
                    💰 Selecting "Sold" will open a form to record buyer and selling details.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsStatusModalOpen(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <Save size={16} />
                  <span>Update Status</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sold Information Modal */}
      {isSoldModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="sticky top-0 bg-blue-50 border-b border-blue-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center space-x-2">
                <DollarSign size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-900">Record Selling Information</h2>
              </div>
              <button
                onClick={() => {
                  setIsSoldModalOpen(false);
                  setSelectedStatus(animal?.status || 'Active');
                }}
                className="text-blue-400 hover:text-blue-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              console.log('Sold Record:', {
                livestockId: animal.livestockId,
                soldDate: soldFormData.soldDate,
                buyerName: soldFormData.buyerName,
                buyerContact: soldFormData.buyerContact,
                buyerAddress: soldFormData.buyerAddress,
                sellingPrice: soldFormData.sellingPrice,
                notes: soldFormData.notes,
                recordedBy: 'Current User',
                timestamp: new Date().toISOString()
              });
              
              setIsSoldModalOpen(false);
              setShowSuccessModal(true);
              setTimeout(() => {
                setShowSuccessModal(false);
              }, 3000);
            }} className="p-6 space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900 font-medium">
                  💰 You are marking <span className="font-bold">{animal?.livestockId}</span> as sold. 
                  Please record the buyer and transaction details.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date of Sale <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={soldFormData.soldDate}
                  onChange={(e) => setSoldFormData({ ...soldFormData, soldDate: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Buyer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={soldFormData.buyerName}
                    onChange={(e) => setSoldFormData({ ...soldFormData, buyerName: e.target.value })}
                    required
                    placeholder="Juan dela Cruz"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Buyer Contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={soldFormData.buyerContact}
                    onChange={(e) => setSoldFormData({ ...soldFormData, buyerContact: e.target.value })}
                    required
                    placeholder="0912-345-6789"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Buyer Address
                </label>
                <input
                  type="text"
                  value={soldFormData.buyerAddress}
                  onChange={(e) => setSoldFormData({ ...soldFormData, buyerAddress: e.target.value })}
                  placeholder="Brgy. Tambler, General Santos City"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Selling Price (PHP ₱) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={soldFormData.sellingPrice}
                  onChange={(e) => setSoldFormData({ ...soldFormData, sellingPrice: e.target.value })}
                  required
                  placeholder="25000.00"
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={soldFormData.notes}
                  onChange={(e) => setSoldFormData({ ...soldFormData, notes: e.target.value })}
                  rows={3}
                  placeholder="Payment method, transaction details, or any relevant notes..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsSoldModalOpen(false);
                    setSelectedStatus(animal?.status || 'Active');
                  }}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Save size={16} />
                  <span>Confirm Sale Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center animate-fade-in">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Changes Saved Successfully!
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Livestock information has been updated and activity has been logged.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
