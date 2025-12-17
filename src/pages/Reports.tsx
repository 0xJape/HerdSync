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
  ]
};

export default function Reports() {
  const selectedSpecies = 'cattle';
  const [showPrintPreview, setShowPrintPreview] = React.useState(false);
  const [pricePerKg, setPricePerKg] = React.useState(130);
  const [calfPrice, setCalfPrice] = React.useState(10000);
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Calculate values dynamically based on input prices
  const selectedData = livestockInventory.cattle.map(item => {
    const price = item.kind === 'CALF' ? calfPrice : pricePerKg;
    const value = item.avgWeight > 0 ? item.avgWeight * price * item.qty : item.qty * price;
    return { ...item, pricePerKg: price, value };
  });

  // Calculate totals for selected species
  const totalQty = selectedData.reduce((sum, item) => sum + item.qty, 0);
  const totalValue = selectedData.reduce((sum, item) => sum + item.value, 0);

  // Calculate grand totals
  const grandTotal = selectedData.reduce((sum, item) => sum + item.qty, 0);
  const grandTotalValue = selectedData.reduce((sum, item) => sum + item.value, 0);

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
            <h1 className="text-2xl font-semibold text-slate-900">Cattle Inventory Report</h1>
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

        {/* Price Configuration - No Print */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 no-print">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">💰 Price Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price per kg for Mature Cattle (₱)
              </label>
              <input
                type="number"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(Number(e.target.value) || 0)}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="130"
              />
              <p className="text-xs text-slate-500 mt-1">Used for Bulls, Cows, Heifers, Yearlings</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Fixed Price per Calf (₱)
              </label>
              <input
                type="number"
                value={calfPrice}
                onChange={(e) => setCalfPrice(Number(e.target.value) || 0)}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="10000"
              />
              <p className="text-xs text-slate-500 mt-1">Fixed price per calf regardless of weight</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-900">
              💡 <strong>Tip:</strong> Adjust these prices based on current market rates. Changes will automatically update all calculations and valuations in the report below.
            </p>
          </div>
        </div>

        {/* Population Trend Graph - No Print */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 no-print">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Cattle Population Trend</h2>
          <p className="text-sm text-slate-600 mb-6">Monthly changes in cattle count by category</p>
          
          {/* Statistics Card */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-blue-900">Total Cattle</span>
                <span className="text-xl">🐄</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{grandTotal}</p>
              <p className="text-xs text-blue-600 mt-1">+2 this month</p>
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

                  {/* Data points - Cattle */}
                  {[{x:0,y:195,val:20},{x:100,y:180,val:22},{x:200,y:165,val:24},{x:300,y:150,val:26},{x:400,y:120,val:30},{x:500,y:90,val:34},{x:600,y:97,val:25}].map((point, i) => (
                    <g key={`cattle-${i}`}>
                      <circle cx={point.x} cy={point.y} r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
                      <circle cx={point.x} cy={point.y} r="3" fill="#3b82f6" />
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
              <span className="text-sm font-medium text-slate-700">Cattle Population</span>
            </div>
          </div>
        </div>

        {/* Summary Statistics - No Print */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 no-print">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-900">Total Cattle</h3>
              <span className="text-2xl">🐾</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{grandTotal}</p>
            <p className="text-xs text-blue-700 mt-1">All cattle</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-emerald-900">Total Value</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-emerald-600">₱{grandTotalValue.toLocaleString()}</p>
            <p className="text-xs text-emerald-700 mt-1">Cattle inventory value</p>
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

          {/* Data Basis Section */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 mb-2 uppercase">Data Basis & Methodology</h4>
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-700">
              <div>
                <span className="font-semibold">Report Date:</span> {currentDate}
              </div>
              <div>
                <span className="font-semibold">Data Source:</span> HerdSync Management System
              </div>
              <div>
                <span className="font-semibold">Total Records:</span> {totalQty} cattle across {selectedData.length} categories
              </div>
              <div>
                <span className="font-semibold">Valuation Method:</span> Average weight × Price per kg
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Included Categories:</span> {selectedData.map(item => item.kind).join(', ')}
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Calculation Basis:</span> Physical inventory count with current market pricing (₱{selectedData[0]?.pricePerKg}/kg for mature cattle)
              </div>
            </div>
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
