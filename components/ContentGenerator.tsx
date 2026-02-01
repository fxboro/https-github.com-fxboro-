
import React, { useState } from 'react';
import { Platform, BrandMemory } from '../types';
import { generateTravelContent } from '../services/gemini';

interface ContentGeneratorProps {
  brandMemory: BrandMemory;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ brandMemory }) => {
  const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (shouldClearOutput: boolean = false) => {
    if (shouldClearOutput) {
      setOutput('');
    }
    setIsGenerating(true);
    setIsEditing(false);
    try {
      const result = await generateTravelContent(platform, brandMemory);
      setOutput(result);
    } catch (err) {
      setOutput("Error generating content. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Create New Content</h2>
        <p className="text-sm md:text-base text-gray-500 mb-8">Select a platform and let AI craft the perfect travel story.</p>

        {/* Scrollable Platform Menu on Mobile */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-1 scrollbar-hide gap-2 sm:flex-wrap">
          {Object.values(Platform).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex-shrink-0 px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap text-sm ${
                platform === p 
                  ? 'bg-travel-blue text-white' 
                  : 'bg-cloud-white text-gray-500 hover:bg-sand-beige/50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Destination</label>
              <input 
                type="text" 
                value={brandMemory.destination}
                disabled
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none opacity-60"
              />
              <p className="text-[10px] text-gray-400 mt-1 italic">Pulling from Brand Memory...</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tone & Voice</label>
              <input 
                type="text" 
                value={brandMemory.tone}
                disabled
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none opacity-60"
              />
            </div>
          </div>
          <div className="bg-sand-beige/20 p-6 rounded-xl border border-sand-beige/30 flex flex-col justify-center">
            <p className="text-sm font-medium text-midnight-navy mb-6 italic text-center md:text-left">
               "Our AI targets <span className="text-travel-blue">{brandMemory.audience}</span> with specialized travel storytelling."
            </p>
            <button 
              onClick={() => handleGenerate(false)}
              disabled={isGenerating}
              className="w-full bg-travel-blue text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate {platform} Script
                </>
              )}
            </button>
          </div>
        </div>

        {output && (
          <div className="bg-midnight-navy rounded-xl p-6 text-white animate-slideUp">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Generated {platform} Result</h3>
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleEdit}
                  className={`text-xs flex items-center gap-1 transition-colors ${isEditing ? 'text-ocean-teal' : 'hover:text-sunset-coral'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isEditing ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    )}
                  </svg>
                  {isEditing ? 'Save Changes' : 'Edit Script'}
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="text-xs flex items-center gap-1 hover:text-sunset-coral transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              {isEditing ? (
                <textarea
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4 text-sm md:text-lg font-light text-gray-100 outline-none focus:ring-1 focus:ring-travel-blue resize-none leading-relaxed"
                  autoFocus
                />
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-lg font-light text-gray-100 min-h-[16rem]">
                  {output}
                </p>
              )}
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-3">
              <button 
                onClick={() => handleGenerate(true)}
                className="w-full sm:w-auto px-6 py-2.5 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
              >
                Regenerate
              </button>
              <button className="w-full sm:w-auto px-6 py-2.5 bg-travel-blue rounded-lg text-sm font-bold hover:bg-opacity-90 transition-colors">
                Schedule
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentGenerator;
