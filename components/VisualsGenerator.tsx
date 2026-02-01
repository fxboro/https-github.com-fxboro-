
import React, { useState } from 'react';
import { generateTravelImage } from '../services/gemini';

const VisualsGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16">("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const res = await generateTravelImage(prompt, aspectRatio);
      setImage(res);
      setHistory(prev => [res, ...prev.slice(0, 5)]);
    } catch (err) {
      console.error(err);
      alert("Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Input Panel */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Travel Visual Studio</h2>
          <p className="text-sm text-gray-500 mb-8">Describe the vibe, destination, and elements for your AI travel photo.</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Image Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A luxury boutique hotel pool overlooking the Santorini caldera at sunset..."
                className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-travel-blue outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Aspect Ratio</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: '1:1', label: 'Square (IG)' },
                  { id: '9:16', label: 'Story (Reel)' },
                  { id: '16:9', label: 'Widescreen' },
                ].map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id as any)}
                    className={`py-3 rounded-xl border font-medium transition-all text-xs sm:text-sm ${
                      aspectRatio === ratio.id 
                        ? 'bg-travel-blue text-white border-travel-blue shadow-md' 
                        : 'bg-white text-gray-500 border-gray-200 hover:border-travel-blue/50'
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full bg-midnight-navy text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-travel-blue transition-all disabled:opacity-50 text-sm md:text-base"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Rendering...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Generate Visual
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center relative min-h-[350px] md:min-h-[400px]">
          {isGenerating ? (
            <div className="text-center space-y-4 px-4">
              <div className="w-12 h-12 border-4 border-travel-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-gray-500 font-medium">Painting your travel dreams...</p>
            </div>
          ) : image ? (
            <div className="w-full h-full flex flex-col">
              <img src={image} alt="Generated travel visual" className="flex-1 object-contain bg-black/5 max-h-[500px]" />
              <div className="p-4 bg-white flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-4">
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Visual ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-travel-blue" title="Download">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-ocean-teal" title="Upscale">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400 font-medium">Your generated visual will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {history.length > 0 && (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Recent Creations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
            {history.map((url, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:ring-4 ring-travel-blue/20 transition-all">
                <img src={url} alt="History item" className="w-full h-full object-cover" onClick={() => setImage(url)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualsGenerator;
