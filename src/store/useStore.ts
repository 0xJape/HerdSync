import { create } from 'zustand';

interface Farm {
  id: string;
  name: string;
}

// Livestock category types by species
type GoatCategory = 'Buck' | 'Buckling' | 'Doe' | 'Maiden Doe' | 'Kid';
type SheepCategory = 'Ram' | 'Ewe' | 'Maiden Ewe' | 'Lamb';
type CattleCategory = 'Bull' | 'Yearling Bull' | 'Cow' | 'Heifer' | 'Calf';
type LivestockCategory = GoatCategory | SheepCategory | CattleCategory;

interface Livestock {
  id: string;
  livestockId: string;
  species: 'Cattle' | 'Goat' | 'Sheep';
  breed: string;
  category: LivestockCategory;
  sex: 'Male' | 'Female';
  dateOfBirth: string;
  birthWeight: number;
  currentWeight: number;
  colorMarkings?: string;
  status: 'Active' | 'Sold' | 'Culled' | 'Deceased';
  notes?: string;
  
  // New fields for categorization
  isNewborn: boolean;
  damId?: string; // Mother's livestock ID (for newborns)
  sireId?: string; // Father's livestock ID (for newborns)
  hasBred: boolean; // For females (determines Maiden vs Doe/Ewe/Cow)
  
  // Newborn-specific health assessment
  birthComplications?: string; // Birth complications (e.g., dystocia, weak, premature)
  newbornBodyConditionScore?: number; // BCS at birth
  newbornHealthAssessment?: string; // Initial health assessment notes for newborns
  
  // Purchase information
  isPurchased: boolean;
  sellerName?: string;
  sellerContact?: string;
  sellerAddress?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  
  // Physical assessment
  bodyConditionScore?: number;
  healthStatus?: string;
  assessmentNotes?: string;
}

interface StoreState {
  farms: Farm[];
  livestock: Livestock[];
  userRole: 'admin' | 'manager' | 'viewer' | null;
  userEmail: string | null;
  addFarm: (farm: Farm) => void;
  addLivestock: (livestock: Livestock) => void;
  setUserRole: (role: 'admin' | 'manager' | 'viewer', email: string) => void;
  clearUser: () => void;
}

export const useStore = create<StoreState>((set) => ({
  farms: [],
  userRole: (localStorage.getItem('userRole') as 'admin' | 'manager' | 'viewer' | null) || null,
  userEmail: localStorage.getItem('userEmail') || null,
  livestock: [
    // Sample Cattle
    {
      id: 'C-001',
      livestockId: 'C-001',
      species: 'Cattle',
      breed: 'Brahman',
      category: 'Bull',
      sex: 'Male',
      dateOfBirth: '2021-03-15',
      birthWeight: 35,
      currentWeight: 650,
      colorMarkings: 'Red with white face',
      status: 'Active',
      isNewborn: false,
      hasBred: true,
      isPurchased: false,
      bodyConditionScore: 4,
      healthStatus: 'Healthy',
    },
    {
      id: 'C-002',
      livestockId: 'C-002',
      species: 'Cattle',
      breed: 'Native/Carabao',
      category: 'Cow',
      sex: 'Female',
      dateOfBirth: '2020-07-22',
      birthWeight: 30,
      currentWeight: 520,
      colorMarkings: 'Black',
      status: 'Active',
      isNewborn: false,
      hasBred: true,
      isPurchased: false,
      bodyConditionScore: 3.5,
      healthStatus: 'Healthy',
    },
    {
      id: 'C-003',
      livestockId: 'C-003',
      species: 'Cattle',
      breed: 'Crossbreed',
      category: 'Heifer',
      sex: 'Female',
      dateOfBirth: '2023-05-10',
      birthWeight: 32,
      currentWeight: 380,
      colorMarkings: 'Brown and white patches',
      status: 'Active',
      isNewborn: false,
      hasBred: false,
      isPurchased: false,
      bodyConditionScore: 3,
      healthStatus: 'Healthy',
    },
    // Sample Goats
    {
      id: 'G-001',
      livestockId: 'G-001',
      species: 'Goat',
      breed: 'Anglo-Nubian',
      category: 'Buck',
      sex: 'Male',
      dateOfBirth: '2022-01-18',
      birthWeight: 3.5,
      currentWeight: 75,
      colorMarkings: 'Brown with white spots',
      status: 'Active',
      isNewborn: false,
      hasBred: true,
      isPurchased: false,
      bodyConditionScore: 4,
      healthStatus: 'Healthy',
    },
    {
      id: 'G-002',
      livestockId: 'G-002',
      species: 'Goat',
      breed: 'Native/Philippine Native',
      category: 'Doe',
      sex: 'Female',
      dateOfBirth: '2021-09-05',
      birthWeight: 3,
      currentWeight: 45,
      colorMarkings: 'White with brown ears',
      status: 'Active',
      isNewborn: false,
      hasBred: true,
      isPurchased: false,
      bodyConditionScore: 3.5,
      healthStatus: 'Healthy',
    },
    {
      id: 'G-003',
      livestockId: 'G-003',
      species: 'Goat',
      breed: 'Crossbreed',
      category: 'Maiden Doe',
      sex: 'Female',
      dateOfBirth: '2024-02-14',
      birthWeight: 3.2,
      currentWeight: 35,
      colorMarkings: 'Black with white stripe',
      status: 'Active',
      isNewborn: false,
      hasBred: false,
      isPurchased: false,
      bodyConditionScore: 3,
      healthStatus: 'Healthy',
    },
    // Sample Sheep
    {
      id: 'S-001',
      livestockId: 'S-001',
      species: 'Sheep',
      breed: 'Barbados Blackbelly',
      category: 'Ram',
      sex: 'Male',
      dateOfBirth: '2021-11-20',
      birthWeight: 4,
      currentWeight: 85,
      colorMarkings: 'Black belly with tan sides',
      status: 'Active',
      isNewborn: false,
      hasBred: true,
      isPurchased: false,
      bodyConditionScore: 4,
      healthStatus: 'Healthy',
    },
    {
      id: 'S-002',
      livestockId: 'S-002',
      species: 'Sheep',
      breed: 'Native/Philippine Native',
      category: 'Ewe',
      sex: 'Female',
      dateOfBirth: '2022-04-08',
      birthWeight: 3.8,
      currentWeight: 55,
      colorMarkings: 'White with brown face',
      status: 'Active',
      isNewborn: false,
      hasBred: true,
      isPurchased: false,
      bodyConditionScore: 3.5,
      healthStatus: 'Healthy',
    },
    {
      id: 'S-003',
      livestockId: 'S-003',
      species: 'Sheep',
      breed: 'Crossbreed',
      category: 'Maiden Ewe',
      sex: 'Female',
      dateOfBirth: '2024-01-25',
      birthWeight: 3.5,
      currentWeight: 40,
      colorMarkings: 'Gray with white legs',
      status: 'Active',
      isNewborn: false,
      hasBred: false,
      isPurchased: false,
      bodyConditionScore: 3,
      healthStatus: 'Healthy',
    },
    // Offspring examples with parent relationships
    {
      id: 'C-004',
      livestockId: 'C-004',
      species: 'Cattle',
      breed: 'Brahman',
      category: 'Calf',
      sex: 'Male',
      dateOfBirth: '2024-10-15',
      birthWeight: 38,
      currentWeight: 95,
      colorMarkings: 'Red with white face',
      status: 'Active',
      isNewborn: true,
      damId: 'C-002', // Mother
      sireId: 'C-001', // Father
      hasBred: false,
      isPurchased: false,
      bodyConditionScore: 3,
      healthStatus: 'Healthy',
    },
    // Offspring for A-001 (the mock profile)
    {
      id: 'A-002',
      livestockId: 'A-002',
      species: 'Cattle',
      breed: 'Holstein',
      category: 'Calf',
      sex: 'Female',
      dateOfBirth: '2024-10-22',
      birthWeight: 38.5,
      currentWeight: 92,
      colorMarkings: 'Black and white spots',
      status: 'Active',
      isNewborn: true,
      damId: 'A-001', // Mother is A-001
      sireId: 'B-045',
      hasBred: false,
      isPurchased: false,
      bodyConditionScore: 3,
      healthStatus: 'Healthy',
    },
    {
      id: 'A-003',
      livestockId: 'A-003',
      species: 'Cattle',
      breed: 'Holstein',
      category: 'Calf',
      sex: 'Male',
      dateOfBirth: '2023-09-10',
      birthWeight: 40,
      currentWeight: 285,
      colorMarkings: 'Black and white patches',
      status: 'Active',
      isNewborn: false,
      damId: 'A-001', // Mother is A-001
      sireId: 'B-032',
      hasBred: false,
      isPurchased: false,
      bodyConditionScore: 3.5,
      healthStatus: 'Healthy',
    },
    {
      id: 'G-004',
      livestockId: 'G-004',
      species: 'Goat',
      breed: 'Anglo-Nubian',
      category: 'Kid',
      sex: 'Female',
      dateOfBirth: '2024-09-20',
      birthWeight: 3.2,
      currentWeight: 18,
      colorMarkings: 'Brown with white markings',
      status: 'Active',
      isNewborn: true,
      damId: 'G-002', // Mother
      sireId: 'G-001', // Father
      hasBred: false,
      isPurchased: false,
      bodyConditionScore: 3,
      healthStatus: 'Healthy',
    },
    {
      id: 'G-005',
      livestockId: 'G-005',
      species: 'Goat',
      breed: 'Native/Philippine Native',
      category: 'Kid',
      sex: 'Male',
      dateOfBirth: '2024-09-20',
      birthWeight: 3.0,
      currentWeight: 16,
      colorMarkings: 'White with brown patches',
      status: 'Active',
      isNewborn: true,
      damId: 'G-002', // Mother (same mother, twin)
      sireId: 'G-001', // Father
      hasBred: false,
      isPurchased: false,
      bodyConditionScore: 3,
      healthStatus: 'Healthy',
    },
    {
      id: 'S-004',
      livestockId: 'S-004',
      species: 'Sheep',
      breed: 'Barbados Blackbelly',
      category: 'Lamb',
      sex: 'Female',
      dateOfBirth: '2024-08-10',
      birthWeight: 3.8,
      currentWeight: 28,
      colorMarkings: 'Black belly with tan markings',
      status: 'Active',
      isNewborn: true,
      damId: 'S-002', // Mother
      sireId: 'S-001', // Father
      hasBred: false,
      isPurchased: false,
      bodyConditionScore: 3,
      healthStatus: 'Healthy',
    },
  ],
  addFarm: (farm) => set((state) => ({ farms: [...state.farms, farm] })),
  addLivestock: (livestock) => set((state) => ({ livestock: [...state.livestock, livestock] })),
  setUserRole: (role, email) => {
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    set({ userRole: role, userEmail: email });
  },
  clearUser: () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    set({ userRole: null, userEmail: null });
  },
}));
