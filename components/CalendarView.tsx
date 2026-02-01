
import React from 'react';

const CalendarView: React.FC = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2); // Sample calendar grid logic

  const posts = {
    4: { platform: 'IG', type: 'Reel', title: 'Sunset Magic' },
    7: { platform: 'TT', type: 'Vlog', title: 'Day 1 in Rome' },
    12: { platform: 'FB', type: 'Deal', title: 'Early Bird Sicily' },
    15: { platform: 'IG', type: 'Carousel', title: 'Packing Tips' },
    21: { platform: 'LI', type: 'Article', title: 'Sustainable Travel' },
  } as any;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn mb-10">
      <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-cloud-white gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Content Calendar</h2>
          <p className="text-xs md:text-sm text-gray-500 font-medium">March 2024</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-600 flex items-center justify-center transition-colors">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button className="flex-1 sm:flex-none p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-600 flex items-center justify-center transition-colors">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-7 border-b border-gray-100 bg-white">
            {days.map(day => (
              <div key={day} className="py-4 text-center text-[10px] font-bold text-gray-400 uppercase border-r border-gray-100 last:border-0">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 border-collapse">
            {dates.map((date, i) => (
              <div key={i} className={`min-h-[100px] md:min-h-[140px] p-3 md:p-4 border-r border-b border-gray-100 last:border-r-0 relative hover:bg-cloud-white transition-colors cursor-pointer group ${date < 1 || date > 31 ? 'bg-gray-50' : ''}`}>
                <span className={`text-xs md:text-sm font-bold ${date < 1 || date > 31 ? 'text-gray-200' : 'text-midnight-navy'}`}>
                  {date > 0 && date <= 31 ? date : ''}
                </span>
                
                {posts[date] && (
                  <div className={`mt-2 p-2 rounded-lg border text-[9px] md:text-[10px] space-y-1 ${
                    posts[date].platform === 'IG' ? 'bg-sunset-coral/5 border-sunset-coral/20 text-sunset-coral' :
                    posts[date].platform === 'TT' ? 'bg-midnight-navy/5 border-midnight-navy/20 text-midnight-navy' :
                    'bg-travel-blue/5 border-travel-blue/20 text-travel-blue'
                  }`}>
                    <div className="font-bold flex justify-between items-center">
                      <span className="truncate">{posts[date].platform} {posts[date].type}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 ml-1"></span>
                    </div>
                    <p className="truncate opacity-80">{posts[date].title}</p>
                  </div>
                )}

                <button className="absolute bottom-2 right-2 p-1 bg-travel-blue text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
