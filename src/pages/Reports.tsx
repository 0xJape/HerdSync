import React from 'react';
import { Download, Printer } from 'lucide-react';

// Mock livestock data matching the inventory format
const livestockInventory = {
  cattle: [
    { kind: 'BULL', avgWeight: 350, pricePerKg: 130, qty: 2, value: 91000 },
    { kind: 'YEARLING BULL', avgWeight: 180, pricePerKg: 130, qty: 1, value: 23400 },
    { kind: 'COW', avgWeight: 250, pricePerKg: 130, qty: 11, value: 357500 },
    { kind: 'HEIFER', avgWeight: 150, pricePerKg: 130, qty: 8, value: 156000 },
    { kind: 'CALF', avgWeight: 0, pricePerKg: 10000, qty: 3, value: 30000 }
  ],
  goat: [
    { kind: 'BUCK', avgWeight: 30, pricePerKg: 200, qty: 1, value: 6000 },
    { kind: 'BUCKLING', avgWeight: 15, pricePerKg: 200, qty: 0, value: 0 },
    { kind: 'DOE', avgWeight: 20, pricePerKg: 200, qty: 11, value: 44000 },
    { kind: 'MAIDEN DOE', avgWeight: 15, pricePerKg: 200, qty: 11, value: 33000 },
    { kind: 'KID', avgWeight: 0, pricePerKg: 0, qty: 3, value: 0 }
  ],
  sheep: [
    { kind: 'RAM', avgWeight: 30, pricePerKg: 200, qty: 1, value: 6000 },
    { kind: 'BUCKLING', avgWeight: 15, pricePerKg: 200, qty: 0, value: 0 },
    { kind: 'EWE', avgWeight: 20, pricePerKg: 200, qty: 8, value: 32000 },
    { kind: 'MAIDEN EWE', avgWeight: 15, pricePerKg: 200, qty: 3, value: 9000 },
    { kind: 'LAMB', avgWeight: 0, pricePerKg: 0, qty: 4, value: 0 }
  ]
};

export default function Reports() {
  const [selectedSpecies, setSelectedSpecies] = React.useState<'cattle' | 'goat' | 'sheep'>('cattle');
  const [showPrintPreview, setShowPrintPreview] = React.useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Calculate totals for selected species
  const selectedData = livestockInventory[selectedSpecies];
  const totalQty = selectedData.reduce((sum, item) => sum + item.qty, 0);
  const totalValue = selectedData.reduce((sum, item) => sum + item.value, 0);

  // Calculate grand totals
  const cattleTotal = livestockInventory.cattle.reduce((sum, item) => sum + item.qty, 0);
  const goatTotal = livestockInventory.goat.reduce((sum, item) => sum + item.qty, 0);
  const sheepTotal = livestockInventory.sheep.reduce((sum, item) => sum + item.qty, 0);
  const grandTotal = cattleTotal + goatTotal + sheepTotal;

  const cattleTotalValue = livestockInventory.cattle.reduce((sum, item) => sum + item.value, 0);
  const goatTotalValue = livestockInventory.goat.reduce((sum, item) => sum + item.value, 0);
  const sheepTotalValue = livestockInventory.sheep.reduce((sum, item) => sum + item.value, 0);
  const grandTotalValue = cattleTotalValue + goatTotalValue + sheepTotalValue;

  // Export to CSV in the inventory format
  const handleExportCSV = () => {
    const speciesName = selectedSpecies.toUpperCase();
    const headers = ['KIND/TYPE', 'Average weight per Head (kg)', 'Price per kg. (Php P)', 'BALANCE ON HAND QTY.', 'BALANCE ON HAND VALUE', 'REMARKS'];
    
    const csvContent = [
      `MSU GSC - College of Agriculture`,
      `${speciesName} PROJECT`,
      `REPORT OF INVENTORY`,
      `AS OF ${currentDate}`,
      '',
      headers.join(','),
      ...selectedData.map(item => 
        [item.kind, item.avgWeight || '', item.pricePerKg || '', item.qty, item.value || '-', ''].join(',')
      ),
      `TOTAL,,,${totalQty},${totalValue},`,
      '',
      '',
      'PREPARED BY:,,,NOTED BY:,,,CERTIFIED CORRECT BY:',
      '',
      '',
      'DEXTER A. VILLA,,,FRYAN ALLEN S. SUBONG,,,DONNA RIA JOSUE-CANACAN PhD.',
      'Agricultural Technician 1,,,Chairman Animal Science/Agri Extension. Dept,,,Dean College of Agriculture'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedSpecies}_inventory_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Export to PDF using print dialog
  const handleExportPDF = () => {
    setShowPrintPreview(true);
    setTimeout(() => {
      window.print();
      setShowPrintPreview(false);
    }, 100);
  };

  return (
    <>
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 40px;
          }
          .no-print {
            display: none !important;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          .signature-section {
            margin-top: 60px;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="space-y-6">
        {/* Header - No Print */}
        <div className="flex items-center justify-between no-print">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Livestock Inventory Report</h1>
            <p className="text-sm text-slate-600 mt-1">Generate and export inventory reports</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download size={16} />
              <span>Export PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <Printer size={16} />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Species Selection - No Print */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 no-print">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Select Species</h2>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedSpecies('cattle')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSpecies === 'cattle'
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🐄 Cattle
            </button>
            <button
              onClick={() => setSelectedSpecies('goat')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSpecies === 'goat'
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🐐 Goats
            </button>
            <button
              onClick={() => setSelectedSpecies('sheep')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSpecies === 'sheep'
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🐑 Sheep
            </button>
          </div>
        </div>

        {/* Population Trend Graph - No Print */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 no-print">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Livestock Population Trend</h2>
          <p className="text-sm text-slate-600 mb-6">Monthly changes in livestock count by species</p>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-blue-900">Cattle</span>
                <span className="text-xl">🐄</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{cattleTotal}</p>
              <p className="text-xs text-blue-600 mt-1">+2 this month</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-purple-900">Goats</span>
                <span className="text-xl">🐐</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{goatTotal}</p>
              <p className="text-xs text-purple-600 mt-1">+4 this month</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-pink-900">Sheep</span>
                <span className="text-xl">🐑</span>
              </div>
              <p className="text-2xl font-bold text-pink-600">{sheepTotal}</p>
              <p className="text-xs text-pink-600 mt-1">+1 this month</p>
            </div>
          </div>
          
          {/* Enhanced Line Graph */}
          <div className="relative h-80 bg-gradient-to-br from-slate-50 to-white rounded-lg p-4 border border-slate-200">
            {/* Y-axis labels */}
            <div className="absolute left-2 top-4 bottom-16 w-10 flex flex-col justify-between text-xs text-slate-600 font-medium">
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            {/* Graph area */}
            <div className="ml-12 mr-4 h-full">
              <div className="relative h-full">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pb-12">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-full border-t border-slate-200" />
                  ))}
                </div>

                {/* SVG for lines with gradients */}
                <svg className="absolute inset-0 w-full h-full pb-12" viewBox="0 0 700 300" preserveAspectRatio="none">
                  <defs>
                    {/* Gradient for Cattle */}
                    <linearGradient id="cattleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                    </linearGradient>
                    {/* Gradient for Goats */}
                    <linearGradient id="goatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
                    </linearGradient>
                    {/* Gradient for Sheep */}
                    <linearGradient id="sheepGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Cattle area and line */}
                  <path
                    d="M0,195 L100,180 L200,165 L300,150 L400,120 L500,90 L600,97 L600,300 L0,300 Z"
                    fill="url(#cattleGradient)"
                  />
                  <path
                    d="M0,195 L100,180 L200,165 L300,150 L400,120 L500,90 L600,97"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Goats area and line */}
                  <path
                    d="M0,225 L100,210 L200,195 L300,180 L400,165 L500,150 L600,143 L600,300 L0,300 Z"
                    fill="url(#goatGradient)"
                  />
                  <path
                    d="M0,225 L100,210 L200,195 L300,180 L400,165 L500,150 L600,143"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Sheep area and line */}
                  <path
                    d="M0,240 L100,237 L200,234 L300,225 L400,220 L500,210 L600,207 L600,300 L0,300 Z"
                    fill="url(#sheepGradient)"
                  />
                  <path
                    d="M0,240 L100,237 L200,234 L300,225 L400,220 L500,210 L600,207"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points - Cattle */}
                  {[{x:0,y:195,val:20},{x:100,y:180,val:22},{x:200,y:165,val:24},{x:300,y:150,val:26},{x:400,y:120,val:30},{x:500,y:90,val:34},{x:600,y:97,val:26}].map((point, i) => (
                    <g key={`cattle-${i}`}>
                      <circle cx={point.x} cy={point.y} r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
                      <circle cx={point.x} cy={point.y} r="3" fill="#3b82f6" />
                    </g>
                  ))}
                  {/* Data points - Goats */}
                  {[{x:0,y:225,val:18},{x:100,y:210,val:20},{x:200,y:195,val:22},{x:300,y:180,val:24},{x:400,y:165,val:26},{x:500,y:150,val:28},{x:600,y:143,val:28}].map((point, i) => (
                    <g key={`goat-${i}`}>
                      <circle cx={point.x} cy={point.y} r="5" fill="white" stroke="#a855f7" strokeWidth="2" />
                      <circle cx={point.x} cy={point.y} r="3" fill="#a855f7" />
                    </g>
                  ))}
                  {/* Data points - Sheep */}
                  {[{x:0,y:240,val:15},{x:100,y:237,val:15},{x:200,y:234,val:16},{x:300,y:225,val:17},{x:400,y:220,val:17},{x:500,y:210,val:18},{x:600,y:207,val:17}].map((point, i) => (
                    <g key={`sheep-${i}`}>
                      <circle cx={point.x} cy={point.y} r="5" fill="white" stroke="#ec4899" strokeWidth="2" />
                      <circle cx={point.x} cy={point.y} r="3" fill="#ec4899" />
                    </g>
                  ))}
                </svg>

                {/* X-axis labels */}
                <div className="absolute -bottom-1 left-0 right-0 flex justify-between text-xs text-slate-600 font-medium">
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700">Cattle</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700">Goats</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700">Sheep</span>
            </div>
          </div>
        </div>

        {/* Summary Statistics - No Print */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 no-print">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-900">Total Livestock</h3>
              <span className="text-2xl">🐾</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{grandTotal}</p>
            <p className="text-xs text-blue-700 mt-1">All animals</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-emerald-900">Cattle</h3>
              <span className="text-2xl">🐄</span>
            </div>
            <p className="text-3xl font-bold text-emerald-600">{cattleTotal}</p>
            <p className="text-xs text-emerald-700 mt-1">₱{cattleTotalValue.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-purple-900">Goats</h3>
              <span className="text-2xl">🐐</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">{goatTotal}</p>
            <p className="text-xs text-purple-700 mt-1">₱{goatTotalValue.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-pink-900">Sheep</h3>
              <span className="text-2xl">🐑</span>
            </div>
            <p className="text-3xl font-bold text-pink-600">{sheepTotal}</p>
            <p className="text-xs text-pink-700 mt-1">₱{sheepTotalValue.toLocaleString()}</p>
          </div>
        </div>

        {/* Print Area - Formal Report */}
        <div className="print-area bg-white rounded-lg border border-slate-200">
          {/* Report Header */}
          <div className="text-center py-6 border-b-2 border-slate-900">
            <h1 className="text-xl font-bold text-slate-900">MSU GSC - College of Agriculture</h1>
            <h2 className="text-lg font-bold text-slate-900 mt-4 uppercase">
              {selectedSpecies} PROJECT
            </h2>
            <h3 className="text-base font-semibold text-slate-900 mt-2">REPORT OF INVENTORY</h3>
            <p className="text-sm text-slate-900 mt-2">AS OF {currentDate}</p>
          </div>

          {/* Inventory Table */}
          <div className="p-6">
            <table className="w-full border-collapse border-2 border-slate-900">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border-2 border-slate-900 px-4 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                    KIND / TYPE
                  </th>
                  <th className="border-2 border-slate-900 px-4 py-3 text-center text-xs font-bold text-slate-900 uppercase">
                    Average weight<br/>per Head (kg)
                  </th>
                  <th className="border-2 border-slate-900 px-4 py-3 text-center text-xs font-bold text-slate-900 uppercase">
                    Price per kg.<br/>(Php P)
                  </th>
                  <th className="border-2 border-slate-900 px-4 py-3 text-center text-xs font-bold text-slate-900 uppercase">
                    BALANCE ON HAND<br/>QTY.
                  </th>
                  <th className="border-2 border-slate-900 px-4 py-3 text-center text-xs font-bold text-slate-900 uppercase">
                    BALANCE ON HAND<br/>VALUE
                  </th>
                  <th className="border-2 border-slate-900 px-4 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                    REMARKS
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedData.map((item, index) => (
                  <tr key={index}>
                    <td className="border-2 border-slate-900 px-4 py-3 text-sm font-medium text-slate-900">
                      {item.kind}
                    </td>
                    <td className="border-2 border-slate-900 px-4 py-3 text-sm text-slate-900 text-center">
                      {item.avgWeight || ''}
                    </td>
                    <td className="border-2 border-slate-900 px-4 py-3 text-sm text-slate-900 text-center">
                      {item.pricePerKg || ''}
                    </td>
                    <td className="border-2 border-slate-900 px-4 py-3 text-sm font-semibold text-slate-900 text-center">
                      {item.qty}
                    </td>
                    <td className="border-2 border-slate-900 px-4 py-3 text-sm font-semibold text-slate-900 text-center">
                      {item.value > 0 ? item.value.toLocaleString() : '-'}
                    </td>
                    <td className="border-2 border-slate-900 px-4 py-3 text-sm text-slate-900">
                      
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-100">
                  <td className="border-2 border-slate-900 px-4 py-3 text-sm font-bold text-slate-900" colSpan={3}>
                    TOTAL
                  </td>
                  <td className="border-2 border-slate-900 px-4 py-3 text-sm font-bold text-slate-900 text-center">
                    {totalQty}
                  </td>
                  <td className="border-2 border-slate-900 px-4 py-3 text-sm font-bold text-slate-900 text-center">
                    {totalValue.toLocaleString()}
                  </td>
                  <td className="border-2 border-slate-900 px-4 py-3"></td>
                </tr>
              </tbody>
            </table>

            {/* Signature Section */}
            <div className="signature-section mt-16 grid grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900 mb-1">PREPARED BY:</p>
                <div className="mt-12 pt-1 border-t-2 border-slate-900">
                  <p className="text-sm font-bold text-slate-900">DEXTER A. VILLA</p>
                  <p className="text-xs text-slate-700">Agricultural Technician 1</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900 mb-1">NOTED BY:</p>
                <div className="mt-12 pt-1 border-t-2 border-slate-900">
                  <p className="text-sm font-bold text-slate-900">FRYAN ALLEN S. SUBONG</p>
                  <p className="text-xs text-slate-700">Chairman, Animal Science/Agri Extension. Dept</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900 mb-1">CERTIFIED CORRECT BY:</p>
                <div className="mt-12 pt-1 border-t-2 border-slate-900">
                  <p className="text-sm font-bold text-slate-900">DONNA RIA JOSUE-CANACAN, PhD.</p>
                  <p className="text-xs text-slate-700">Dean, College of Agriculture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
