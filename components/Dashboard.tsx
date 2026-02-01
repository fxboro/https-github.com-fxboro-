
import React from 'react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Posts Generated', value: '128', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'text-travel-blue', bg: 'bg-travel-blue/10' },
    { label: 'Visuals Created', value: '45', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-sunset-coral', bg: 'bg-sunset-coral/10' },
    { label: 'Engagement Rate', value: '4.8%', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z', color: 'text-ocean-teal', bg: 'bg-ocean-teal/10' },
    { label: 'Avg. ROI', value: '$2.4k', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-sand-beige', bg: 'bg-sand-beige/20' },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-midnight-navy text-center md:text-left">Welcome back, Traveler! ✈️</h1>
          <p className="text-gray-500 mt-2 text-center md:text-left text-sm md:text-base">Here's how your travel brand is performing this week.</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Current Destination Focus</p>
          <p className="text-base md:text-lg font-bold text-travel-blue accent-font italic">Amalfi Coast, Italy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
              </svg>
            </div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold text-midnight-navy mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-6">Recent Content Generations</h3>
          <div className="space-y-4">
            {[
              { platform: 'Instagram', title: 'Top 5 Hidden Gems in Ravello', date: '2 hours ago', status: 'Scheduled' },
              { platform: 'TikTok', title: 'POV: Waking up in Positano', date: '5 hours ago', status: 'Draft' },
              { platform: 'LinkedIn', title: 'Why Luxury Travel is Rebounding', date: 'Yesterday', status: 'Published' },
              { platform: 'Facebook', title: 'Travel Deal: Summer in Sicily', date: '2 days ago', status: 'Published' },
            ].map((post, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-cloud-white rounded-xl hover:bg-gray-100 transition-colors cursor-pointer gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-midnight-navy font-bold shadow-sm">
                    {post.platform[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm truncate max-w-[200px] md:max-w-xs">{post.title}</p>
                    <p className="text-xs text-gray-400">{post.platform} • {post.date}</p>
                  </div>
                </div>
                <span className={`self-start sm:self-center text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  post.status === 'Published' ? 'bg-ocean-teal/10 text-ocean-teal' :
                  post.status === 'Scheduled' ? 'bg-travel-blue/10 text-travel-blue' :
                  'bg-sunset-coral/10 text-sunset-coral'
                }`}>
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-midnight-navy rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-4">Travel Trend Alert 🚨</h3>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
              "Quiet Luxury" and "Hidden Destination" tags are trending in the EU travel sector. Consider generating content for smaller Italian villages.
            </p>
          </div>
          <button className="relative z-10 w-full bg-sunset-coral text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all">
            Generate Now
          </button>
          {/* Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-travel-blue/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
