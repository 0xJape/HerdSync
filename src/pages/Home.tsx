import React from 'react';
import { Link } from 'react-router-dom';
import { Beef, HeartPulse, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/msu_logo.png" 
              alt="MSU Logo" 
              className="h-10 object-contain"
            />
            <div className="border-l border-slate-300 h-10 mx-2"></div>
            <img 
              src="/images/main_logo.png" 
              alt="HerdSync Logo" 
              className="h-10 object-contain"
            />
            <span className="text-base font-semibold text-slate-900">HerdSync</span>
          </div>
          <Link
            to="/login"
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
              Mindanao State University - General Santos
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4 leading-tight">
              Livestock Management<br /> Information System
          </h1>
          <p className="text-base text-slate-600 max-w-3xl mx-auto mb-3">
            College of Agriculture Animal Science Farm
          </p>
          <p className="text-sm text-slate-500 max-w-3xl mx-auto mb-10">
            A digital platform for recording, monitoring, and organizing livestock health, breeding, and farm management data for cattle, goats, and sheep at MSU-GenSan.
          </p>
          <div className="flex items-center justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Sign In to Dashboard
            </Link>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Access restricted to authorized faculty and staff. Contact your administrator for credentials.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="p-6 bg-white border border-slate-200 rounded-lg hover:border-primary-200 transition-colors">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
              <Beef size={20} className="text-primary-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Livestock Information Management</h3>
            <p className="text-sm text-slate-600">
              Record and update livestock identification details including species, breed, sex, age, origin, and health status for cattle, goats, and sheep.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-lg hover:border-primary-200 transition-colors">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
              <HeartPulse size={20} className="text-primary-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Health Activities Documentation</h3>
            <p className="text-sm text-slate-600">
              Track vaccination, vitamin supplementation, deworming, and medical treatments with proper antibiotic withdrawal period monitoring.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-lg hover:border-primary-200 transition-colors">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 size={20} className="text-primary-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Breeding & Reporting</h3>
            <p className="text-sm text-slate-600">
              Monitor breeding activities, pregnancy information, and generate comprehensive reports for informed decision-making and planning.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mt-20 p-8 bg-primary-50 border border-primary-100 rounded-lg">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Current Farm Statistics</h3>
            <p className="text-sm text-slate-600">Animal Science Farm - MSU General Santos City</p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-3xl font-semibold text-primary-700 mb-1">25</p>
              <p className="text-sm text-slate-600">Cattle</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-emerald-600 mb-1">26</p>
              <p className="text-sm text-slate-600">Goats</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-teal-600 mb-1">16</p>
              <p className="text-sm text-slate-600">Sheep</p>
            </div>
          </div>
        </div>

        {/* Research Project Info */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-white border border-slate-200 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">Capstone Project</h3>
          <p className="text-sm text-slate-600 text-center mb-4">
            An Undergraduate Capstone Project presented to the Faculty of IT & Physics Department,<br />
            College of Natural Science and Mathematics, Mindanao State University – General Santos
          </p>
          <div className="text-center text-sm text-slate-500">
            <p className="mb-2"><strong>Proponents:</strong></p>
            <p>Alkuino, Marlo Gel S. • Gayo, Jalel Prince G. • Silaya, Kyle Stephen A.</p>
            <p className="mt-3"><strong>Adviser:</strong> Dr. Laiza Limpin</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-600 text-sm font-medium mb-2">
            HerdSync: Development of a Web-Based Livestock Information Management System
          </p>
          <p className="text-slate-500 text-xs">
            College of Agriculture Animal Science Farm • Mindanao State University – General Santos City
          </p>
          <p className="text-slate-400 text-xs mt-3">
            © 2025 HerdSync. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
