import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Beef, 
  HeartPulse, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle, 
  Plus,
  Edit,
  Trash2,
  Activity,
  Clock,
  User,
  Eye,
  type LucideIcon, 
  FileExclamationPoint, 
  AlertOctagon
} from 'lucide-react';
import { useStore } from '../store/useStore';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtitle?: string;
  icon?: LucideIcon;
  iconBg?: string;
}

function StatCard({ title, value, change, changeType = 'neutral', subtitle, icon: Icon, iconBg = 'bg-slate-100' }: StatCardProps) {
  const changeColors = {
    positive: 'text-emerald-600 bg-emerald-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-slate-500 bg-slate-50',
  };

  return (
    <div className="group p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
        {Icon && (
          <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
            <Icon size={24} className="text-slate-700" />
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        {change && (
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${changeColors[changeType]}`}>
              {changeType === 'positive' && '↑ '}
              {changeType === 'negative' && '↓ '}
              {change}
            </span>
            <span className="text-xs text-slate-500 font-medium">vs last month</span>
          </div>
        )}
        {subtitle && !change && <span className="text-xs text-slate-500 font-medium">{subtitle}</span>}
      </div>
    </div>
  );
}

interface AlertProps {
  type: 'warning' | 'info' | 'success' | 'critical';
  message: string;
  timestamp: string;
  animalId?: string;
}

function AlertItem({ type, message, timestamp, animalId }: AlertProps) {
  const config = {
    warning: { Icon: AlertTriangle, text: 'text-amber-700', bg: 'bg-amber-50' },
    info: { Icon: Info, text: 'text-blue-700', bg: 'bg-blue-50' },
    success: { Icon: CheckCircle, text: 'text-emerald-700', bg: 'bg-emerald-50' },
    critical: { Icon: AlertCircle, text: 'text-red-700', bg: 'bg-red-50' },
  };

  const { Icon, text, bg } = config[type];

  const content = (
    <>
      <div className={`flex-shrink-0 ${bg} w-6 h-6 rounded flex items-center justify-center mt-0.5`}>
        <Icon size={14} className={text} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900">{message}</p>
        <p className="text-xs text-slate-500 mt-0.5">{timestamp}</p>
      </div>
      {animalId && (
        <span className="flex-shrink-0 text-xs font-medium text-slate-600 group-hover:text-slate-900">
          →
        </span>
      )}
    </>
  );

  if (animalId) {
    return (
      <Link
        to={`/livestock/${animalId}`}
        className="group flex items-start space-x-3 p-4 hover:bg-slate-50 rounded-lg transition-all cursor-pointer border-l-2 border-transparent hover:border-primary-400"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="group flex items-start space-x-3 p-4 hover:bg-slate-50 rounded-lg transition-all border-l-2 border-transparent">
      {content}
    </div>
  );
}

interface TaskProps {
  task: string;
  dueDate: string;
  completed?: boolean;
  onToggle?: () => void;
  priority?: 'high' | 'medium' | 'low';
}

function TaskItem({ task, dueDate, completed = false, onToggle, priority = 'medium' }: TaskProps) {
  const priorityColors = {
    high: 'border-red-200',
    medium: 'border-slate-200',
    low: 'border-slate-200',
  };

  return (
    <div className="group flex items-center space-x-3 p-4 border-l-3 ${priorityColors[priority]} hover:bg-slate-50 rounded-lg transition-all">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="h-5 w-5 text-primary-600 rounded border-slate-300 focus:ring-2 focus:ring-primary-400 cursor-pointer"
      />
      <div className="flex-1 min-w-0 flex items-center justify-between">
        <p className={`text-sm font-medium ${completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
          {task}
        </p>
        <span className="text-xs text-slate-600 font-semibold ml-3">{dueDate}</span>
      </div>
    </div>
  );
}

interface ActivityLogProps {
  action: 'added' | 'edited' | 'deleted' | 'health_check' | 'vaccination' | 'breeding';
  description: string;
  user: string;
  timestamp: string;
  entityType?: 'livestock' | 'health' | 'breeding' | 'system';
  entityId?: string;
}

function ActivityLogItem({ action, description, user, timestamp, entityType, entityId }: ActivityLogProps) {
  const actionConfig = {
    added: { Icon: Plus, text: 'text-emerald-700', bg: 'bg-emerald-50', label: 'Added' },
    edited: { Icon: Edit, text: 'text-blue-700', bg: 'bg-blue-50', label: 'Edited' },
    deleted: { Icon: Trash2, text: 'text-red-700', bg: 'bg-red-50', label: 'Deleted' },
    health_check: { Icon: HeartPulse, text: 'text-teal-700', bg: 'bg-teal-50', label: 'Health' },
    vaccination: { Icon: CheckCircle, text: 'text-teal-700', bg: 'bg-teal-50', label: 'Vaccine' },
    breeding: { Icon: Users, text: 'text-amber-700', bg: 'bg-amber-50', label: 'Breeding' },
  };

  const { Icon, text, bg, label } = actionConfig[action];

  return (
    <div className="group flex items-start space-x-3 p-4 hover:bg-slate-50 rounded-lg transition-all border-l-2 border-transparent hover:border-slate-300">
      <div className={`flex-shrink-0 ${bg} w-10 h-10 rounded-lg flex items-center justify-center shadow-sm`}>
        <Icon size={18} className={text} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`text-xs font-bold ${text}`}>{label}</span>
              {entityType && (
                <span className="text-xs text-slate-400">•</span>
              )}
              {entityType && (
                <span className="text-xs text-slate-500 font-semibold capitalize">{entityType}</span>
              )}
            </div>
            <p className="text-sm font-medium text-slate-900">{description}</p>
            <div className="flex items-center space-x-3 mt-2">
              <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                <User size={13} />
                <span className="font-medium">{user}</span>
              </div>
              <span className="text-xs text-slate-400">•</span>
              <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                <Clock size={13} />
                <span className="font-medium">{timestamp}</span>
              </div>
            </div>
          </div>
          {entityId && entityType === 'livestock' && (
            <Link
              to={`/livestock/${entityId}`}
              className="flex-shrink-0 text-xs font-bold text-primary-600 hover:text-primary-700 ml-2"
            >
              View →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { userRole } = useStore();
  const isViewer = userRole === 'viewer';
  
  const [tasks, setTasks] = React.useState([
    { id: 1, task: 'Vaccinate 12 calves', dueDate: 'Nov 21', completed: false, priority: 'high' as const },
    { id: 2, task: 'Health checkup: Herd B', dueDate: 'Nov 22', completed: false, priority: 'medium' as const },
    { id: 3, task: 'Pregnancy scan: 15 cows', dueDate: 'Nov 23', completed: false, priority: 'high' as const },
    { id: 4, task: 'Feed inventory restock', dueDate: 'Nov 24', completed: false, priority: 'low' as const },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Mock activity logs data
  const activityLogs: ActivityLogProps[] = [
    {
      action: 'added',
      description: 'New cattle added to herd - ID: C-026',
      user: 'Laiza Limpin',
      timestamp: '10 minutes ago',
      entityType: 'livestock',
      entityId: 'C-026'
    },
    {
      action: 'edited',
      description: 'Updated weight record for cattle C-015 (545.2kg → 547.8kg)',
      user: 'Marlo Gel Alkuino',
      timestamp: '2 hours ago',
      entityType: 'livestock',
      entityId: 'C-015'
    },
    {
      action: 'vaccination',
      description: 'FMD vaccine administered to 12 cattle',
      user: 'Kyle Stephen Silaya',
      timestamp: '3 hours ago',
      entityType: 'health'
    },
    {
      action: 'breeding',
      description: 'Breeding record created for cow C-011 with bull C-002',
      user: 'Laiza Limpin',
      timestamp: '5 hours ago',
      entityType: 'breeding',
      entityId: 'C-011'
    },
    {
      action: 'edited',
      description: 'Updated pregnancy status for cattle C-011 to "Pregnant"',
      user: 'Marlo Gel Alkuino',
      timestamp: '8 hours ago',
      entityType: 'breeding',
      entityId: 'C-011'
    },
    {
      action: 'edited',
      description: 'Body condition score updated for cattle C-002 (3.5 → 4.0)',
      user: 'Jalel Prince Gayo',
      timestamp: '1 day ago',
      entityType: 'livestock',
      entityId: 'C-002'
    }
  ];

  return (
    <div className="space-y-5">
      {/* View-Only Mode Banner */}
      {isViewer && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900">View-Only Mode</h3>
              <p className="text-xs text-blue-700 mt-0.5">
                You are logged in as a viewer. You can view all data but cannot make any modifications.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Cattle"
          value="67"
          change="10.2%"
          changeType="positive"
          icon={Beef}
          iconBg="bg-primary-50"  
        />
        <StatCard
          title="Healthy Cattle"
          value="60"
          change="1.8%"
          changeType="positive"
          icon={HeartPulse}
          iconBg="bg-emerald-100"
        />
        <StatCard
          title="Activities this Week"
          value="18"
          change="12.5%"
          changeType="positive"
          icon={AlertOctagon}
          iconBg="bg-amber-100"
        />
        <StatCard
          title="Active Breeding"
          value="8"
          change="20%"
          changeType="positive"
          icon={Users}
          iconBg="bg-blue-100"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left Column - Quick Actions and Chart */}
        <div className="xl:col-span-1 space-y-5">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-2">
              <Link
                to="/livestock/add"
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-bold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg"
              >
                <Plus size={18} />
                <span>Add Cattle</span>
              </Link>
              <Link
                to="/vaccination"
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <HeartPulse size={18} />
                <span>Health Check</span>
              </Link>
              <Link
                to="/reports"
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <TrendingUp size={18} />
                <span>View Reports</span>
              </Link>
              <Link
                to="/livestock"
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <Beef size={18} />
                <span>View Cattle Herd</span>
              </Link>
            </div>
          </div>

          {/* Cattle Distribution Chart */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 bg-white/70 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-slate-900">Cattle Distribution</h3>
            </div>
            <div className="p-4">
              {/* Circular Chart */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative w-32 h-32 rounded-full flex items-center justify-center drop-shadow-md mb-2">
                  {/* Multi-color ring showing distribution */}
                  <svg className="absolute inset-0 w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                    {/* Bulls - Blue - 3/25 = 12% = 43.2deg */}
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="16"
                      strokeDasharray="43.2 316.8"
                      strokeDashoffset="0"
                    />
                    {/* Cows - Emerald - 11/25 = 44% = 158.4deg */}
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="16"
                      strokeDasharray="158.4 201.6"
                      strokeDashoffset="-43.2"
                    />
                    {/* Heifers - Amber - 8/25 = 32% = 115.2deg */}
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="16"
                      strokeDasharray="115.2 244.8"
                      strokeDashoffset="-201.6"
                    />
                    {/* Calves - Purple - 3/25 = 12% = 43.2deg */}
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="16"
                      strokeDasharray="43.2 316.8"
                      strokeDashoffset="-316.8"
                    />
                  </svg>
                  <div className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center z-10">
                    <div className="text-2xl font-bold text-slate-900">25</div>
                    <div className="text-xs text-slate-500">Total</div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium">Total Cattle</p>
              </div>

              {/* Category Breakdown */}
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-2.5 border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-medium text-slate-600">Bulls</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">3</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-2.5 border border-emerald-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-medium text-slate-600">Cows</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">11</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-2.5 border border-amber-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                      <span className="text-xs font-medium text-slate-600">Heifers</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">8</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-2.5 border border-teal-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-500"></div>
                      <span className="text-xs font-medium text-slate-600">Calves</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts - Takes 2 columns */}
        {/* Recent Alerts - Takes 2 columns */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <AlertCircle size={20} className="text-slate-700" />
                  <span>Priority Alerts</span>
                </h3>
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full shadow-sm">
                  4 pending
                </span>
              </div>
            </div>
            <div className="p-3 space-y-1">
              <Link
                to="/pregnancy"
                className="group flex items-start space-x-3 p-4 hover:bg-slate-50 rounded-lg transition-all cursor-pointer border-l-2 border-transparent hover:border-primary-400"
              >
                <div className="flex-shrink-0 bg-amber-50 w-6 h-6 rounded flex items-center justify-center mt-0.5">
                  <AlertTriangle size={14} className="text-amber-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">3-Month Pregnancy Check: Cow C-011 bred on Sep 15 - Check due by Dec 15</p>
                  <p className="text-xs text-slate-500 mt-0.5">23 days</p>
                </div>
                <span className="flex-shrink-0 text-xs font-medium text-slate-600 group-hover:text-slate-900">
                  →
                </span>
              </Link>
              <Link
                to="/pregnancy"
                className="group flex items-start space-x-3 p-4 hover:bg-slate-50 rounded-lg transition-all cursor-pointer border-l-2 border-transparent hover:border-primary-400"
              >
                <div className="flex-shrink-0 bg-amber-50 w-6 h-6 rounded flex items-center justify-center mt-0.5">
                  <AlertTriangle size={14} className="text-amber-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">3-Month Pregnancy Check: Cow C-023 bred on Oct 5 - Check overdue</p>
                  <p className="text-xs text-slate-500 mt-0.5">Overdue</p>
                </div>
                <span className="flex-shrink-0 text-xs font-medium text-slate-600 group-hover:text-slate-900">
                  →
                </span>
              </Link>
              <AlertItem
                type="warning"
                message="Antibiotic withdrawal period ends for Brahman Bull C-007 on Dec 20"
                timestamp="2 days"
                animalId="C-007"
              />
              <AlertItem
                type="critical"
                message="FMD vaccine overdue for Angus Cow C-019"
                timestamp="3 days overdue"
                animalId="C-019"
              />
              <AlertItem
                type="success"
                message="Withdrawal period ends today: Brahman Bull C-008 can be cleared for sale"
                timestamp="Today"
                animalId="C-008"
              />
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <Link
                to="/alerts"
                className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center space-x-2 group"
              >
                <span>View all alerts</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Livestock Population Trend Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-slate-700" />
              <h3 className="text-base font-bold text-slate-900">Livestock Population Trend</h3>
            </div>
            <select className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-primary-400 font-medium">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
        </div>
        <div className="p-6">
          {/* Line Chart */}
          <div className="relative h-64">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500 font-medium pr-2">
              <span>70</span>
              <span>60</span>
              <span>50</span>
              <span>40</span>
              <span>30</span>
              <span>20</span>
            </div>
            
            {/* Chart area */}
            <div className="ml-8 h-full relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border-t border-slate-100"></div>
                ))}
              </div>
              
              {/* SVG Chart */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Area fill - Gradient */}
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                
                {/* Area under line */}
                <path
                  d="M 0,256 L 0,157 L 16.67,143 L 33.33,136 L 50,121 L 66.67,114 L 83.33,43 L 100,29 V 256 H 0 Z"
                  fill="url(#areaGradient)"
                />
                
                {/* Main line - Total */}
                <path
                  d="M 0,157 L 16.67,143 L 33.33,136 L 50,121 L 66.67,114 L 83.33,43 L 100,29"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                
                {/* Data points - Jul:52, Aug:55, Sep:57, Oct:60, Nov:62, Dec:67, Jan:67 */}
                <circle cx="0%" cy="61%" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="16.67%" cy="56%" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="33.33%" cy="53%" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="50%" cy="47%" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="66.67%" cy="45%" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="83.33%" cy="17%" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="100%" cy="11%" r="5" fill="#3b82f6" stroke="white" strokeWidth="2" />
              </svg>
              
              {/* X-axis labels */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-slate-500 font-medium">
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span className="font-bold text-primary-600">Jan</span>
              </div>
            </div>
          </div>
          
          {/* Legend and Stats */}
          <div className="mt-10 pt-5 border-t border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-medium text-slate-600">Total Cattle</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">67</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">↑ 10.2% growth</p>
              </div>
              
              <div className="text-center">
                <p className="text-xs font-medium text-slate-600 mb-1">New Births</p>
                <p className="text-2xl font-bold text-slate-900">8</p>
                <p className="text-xs text-slate-500 mt-1">This month</p>
              </div>
              
              <div className="text-center">
                <p className="text-xs font-medium text-slate-600 mb-1">Purchases</p>
                <p className="text-2xl font-bold text-slate-900">3</p>
                <p className="text-xs text-slate-500 mt-1">This month</p>
              </div>
              
              <div className="text-center">
                <p className="text-xs font-medium text-slate-600 mb-1">Sales/Deaths</p>
                <p className="text-2xl font-bold text-slate-900">2</p>
                <p className="text-xs text-slate-500 mt-1">This month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-700" />
              <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full shadow-sm">
              {activityLogs.length} events
            </span>
          </div>
        </div>
        <div className="p-3 space-y-1 max-h-[500px] overflow-y-auto">
          {activityLogs.map((log, index) => (
            <ActivityLogItem key={index} {...log} />
          ))}
        </div>
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <Link
            to="/activity"
            className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center space-x-2 group"
          >
            <span>View complete activity log</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
