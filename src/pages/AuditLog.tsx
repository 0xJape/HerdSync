import React from 'react';
import { Search, Filter, Download, Calendar, User, FileText, AlertCircle } from 'lucide-react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'error';
}

// Mock audit log data
const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'AL-001',
    timestamp: '2024-12-08 14:32:15',
    user: 'Doc Alexis',
    userRole: 'Manager',
    action: 'CREATE',
    entity: 'Livestock',
    entityId: 'C-025',
    details: 'Added new cattle (Brahman Bull)',
    ipAddress: '192.168.1.105',
    status: 'success'
  },
  {
    id: 'AL-002',
    timestamp: '2024-12-08 13:45:22',
    user: 'Maria Santos',
    userRole: 'Manager',
    action: 'UPDATE',
    entity: 'Vaccination',
    entityId: 'G-012',
    details: 'Updated Rabies vaccine record',
    ipAddress: '192.168.1.108',
    status: 'success'
  },
  {
    id: 'AL-003',
    timestamp: '2024-12-08 12:18:40',
    user: 'Juan Cruz',
    userRole: 'Viewer',
    action: 'VIEW',
    entity: 'Report',
    entityId: 'RPT-2024-12',
    details: 'Viewed monthly livestock report',
    ipAddress: '192.168.1.112',
    status: 'success'
  },
  {
    id: 'AL-004',
    timestamp: '2024-12-08 11:05:33',
    user: 'Doc Alexis',
    userRole: 'Manager',
    action: 'UPDATE',
    entity: 'Breeding',
    entityId: 'BR-045',
    details: 'Updated breeding record - pregnancy confirmed',
    ipAddress: '192.168.1.105',
    status: 'success'
  },
  {
    id: 'AL-005',
    timestamp: '2024-12-08 10:22:17',
    user: 'Admin User',
    userRole: 'Admin',
    action: 'CREATE',
    entity: 'User',
    entityId: 'USR-008',
    details: 'Created new user account (Viewer role)',
    ipAddress: '192.168.1.100',
    status: 'success'
  },
  {
    id: 'AL-006',
    timestamp: '2024-12-07 15:15:44',
    user: 'Doc Alexis',
    userRole: 'Manager',
    action: 'EXPORT',
    entity: 'Report',
    entityId: 'RPT-2024-11',
    details: 'Exported livestock inventory report',
    ipAddress: '192.168.1.105',
    status: 'success'
  },
  {
    id: 'AL-007',
    timestamp: '2024-12-07 14:22:09',
    user: 'Admin User',
    userRole: 'Admin',
    action: 'UPDATE',
    entity: 'User',
    entityId: 'USR-005',
    details: 'Changed user role from Viewer to Manager',
    ipAddress: '192.168.1.100',
    status: 'success'
  },
  {
    id: 'AL-008',
    timestamp: '2024-12-07 13:05:31',
    user: 'Maria Santos',
    userRole: 'Manager',
    action: 'CREATE',
    entity: 'Vaccination',
    entityId: 'C-023',
    details: 'Administered CDT vaccine',
    ipAddress: '192.168.1.108',
    status: 'success'
  },
];

export default function AuditLog() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [actionFilter, setActionFilter] = React.useState<string>('all');
  const [entityFilter, setEntityFilter] = React.useState<string>('all');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [showFilters, setShowFilters] = React.useState(false);

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesEntity = entityFilter === 'all' || log.entity === entityFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;

    return matchesSearch && matchesAction && matchesEntity && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'error': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'bg-blue-100 text-blue-700';
      case 'UPDATE': return 'bg-purple-100 text-purple-700';
      case 'VIEW': return 'bg-slate-100 text-slate-700';
      case 'EXPORT': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleExport = () => {
    // Export audit logs to CSV
    const csvContent = [
      ['Timestamp', 'User', 'Role', 'Action', 'Entity', 'Entity ID', 'Details', 'Status'],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.user,
        log.userRole,
        log.action,
        log.entity,
        log.entityId,
        log.details,
        log.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_log_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Log</h1>
          <p className="text-sm text-slate-600 mt-1">Track all system activities and user actions</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Download size={16} />
          <span>Export Logs</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="search"
              placeholder="Search by user, action, entity, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all"
            />
            <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
          >
            <Filter size={16} />
            <span>Filters</span>
            {(actionFilter !== 'all' || entityFilter !== 'all' || statusFilter !== 'all') && (
              <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Action</label>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="all">All Actions</option>
                <option value="CREATE">Create</option>
                <option value="UPDATE">Update</option>
                <option value="VIEW">View</option>
                <option value="EXPORT">Export</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Entity</label>
              <select
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="all">All Entities</option>
                <option value="Livestock">Livestock</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Breeding">Breeding</option>
                <option value="Report">Report</option>
                <option value="User">User</option>
                <option value="Authentication">Authentication</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-500 uppercase">Total Actions</p>
            <FileText size={16} className="text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{filteredLogs.length}</p>
        </div>
        <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-emerald-600 uppercase">Success</p>
            <FileText size={16} className="text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-900">
            {filteredLogs.filter(log => log.status === 'success').length}
          </p>
        </div>
        <div className="bg-amber-50 rounded-lg border border-amber-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-amber-600 uppercase">This Week</p>
            <Calendar size={16} className="text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-900">
            {filteredLogs.filter(log => log.timestamp.includes('2024-12')).length}
          </p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Entity
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-900 whitespace-nowrap">
                    <div className="flex items-center space-x-1.5">
                      <Calendar size={14} className="text-slate-400" />
                      <span>{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User size={14} className="text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{log.user}</p>
                        <p className="text-xs text-slate-500">{log.userRole}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-900">
                    <div>
                      <p className="font-medium">{log.entity}</p>
                      <p className="text-xs text-slate-500">{log.entityId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 max-w-xs truncate">
                    {log.details}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(log.status)}`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-900">No audit logs found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
