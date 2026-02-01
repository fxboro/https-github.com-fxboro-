
import React from 'react';
import { BrandMemory } from '../types';

interface BrandMemorySettingsProps {
  memory: BrandMemory;
  setMemory: (memory: BrandMemory) => void;
}

const BrandMemorySettings: React.FC<BrandMemorySettingsProps> = ({ memory, setMemory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMemory({ ...memory, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn mb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold text-midnight-navy">Brand Memory</h2>
          <p className="text-sm text-gray-500 mt-1">Configure your brand core identity for consistent AI generations.</p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Primary Destination</label>
                <input 
                  type="text" 
                  name="destination"
                  value={memory.destination}
                  onChange={handleChange}
                  placeholder="e.g. Amalfi Coast, Italy"
                  className="w-full bg-cloud-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-travel-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tone of Voice</label>
                <input 
                  type="text" 
                  name="tone"
                  value={memory.tone}
                  onChange={handleChange}
                  placeholder="e.g. Inspiring, Adventurous"
                  className="w-full bg-cloud-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-travel-blue outline-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Target Audience</label>
                <input 
                  type="text" 
                  name="audience"
                  value={memory.audience}
                  onChange={handleChange}
                  placeholder="e.g. Luxury travelers"
                  className="w-full bg-cloud-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-travel-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Signature CTA</label>
                <input 
                  type="text" 
                  name="cta"
                  value={memory.cta}
                  onChange={handleChange}
                  placeholder="e.g. Book now!"
                  className="w-full bg-cloud-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-travel-blue outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-sand-beige/10 p-6 rounded-xl border border-sand-beige/30">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 bg-travel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-midnight-navy text-sm md:text-base">How Brand Memory Works</h4>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  We inject these settings into every AI prompt automatically. This ensures your social media strategy remains focused on your brand's unique voice.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-400 text-center sm:text-left">Settings automatically saved to your cloud profile.</p>
          <button className="w-full sm:w-auto bg-travel-blue text-white font-bold px-8 py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-travel-blue/20 text-sm">
            Sync Workspace
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandMemorySettings;
