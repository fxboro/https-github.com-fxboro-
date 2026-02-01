
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Logo: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => (
  <div className={`flex items-center gap-5 group cursor-pointer transition-all duration-300 ${collapsed ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M4 6L11 20" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          className="transition-all duration-300 group-hover:stroke-sunset-coral"
        />
        <path 
          d="M15 12L20 4" 
          stroke="#1A73E8" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </svg>
    </div>
    {!collapsed && (
      <div className="flex items-baseline overflow-hidden">
        <h1 className="text-xl tracking-tighter text-white font-medium flex items-baseline">
          <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">travel</span>
          <span className="font-bold group-hover:text-sunset-coral transition-colors duration-300">script</span>
          <span className="text-travel-blue font-black tracking-widest ml-0.5 group-hover:scale-110 transition-transform duration-300">ai</span>
        </h1>
      </div>
    )}
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'generator', label: 'Content Gen', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: 'visuals', label: 'AI Visuals', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'calendar', label: 'Calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'settings', label: 'Brand Memory', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setSidebarOpen(!isSidebarOpen);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="flex h-screen bg-cloud-white selection:bg-travel-blue/10 selection:text-travel-blue font-sans overflow-hidden">
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-midnight-navy/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar (Desktop & Mobile) */}
      <aside className={`
        fixed inset-y-0 left-0 bg-midnight-navy text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 flex flex-col shadow-2xl
        ${isMobileMenuOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'}
        ${isSidebarOpen ? 'lg:w-72' : 'lg:w-24'}
      `}>
        {/* Sidebar Header */}
        <div className={`p-8 h-20 md:h-24 flex items-center justify-between overflow-hidden relative ${!isSidebarOpen && !isMobileMenuOpen ? 'px-0 justify-center' : ''}`}>
          {(isSidebarOpen || isMobileMenuOpen) ? (
            <div className={`transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'opacity-100'}`}>
              <Logo collapsed={false} />
            </div>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center mx-auto cursor-pointer hover:rotate-12 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <path d="M4 6L11 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                 <path d="M15 12L20 4" stroke="#1A73E8" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
          )}

          {/* Unified Toggle/Close Button */}
          <button 
            onClick={toggleSidebar}
            className={`p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 ${isSidebarOpen || isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute'}`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Collapse sidebar"}
          >
            <svg className={`w-5 h-5 transition-transform duration-500 ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
            </svg>
          </button>
        </div>

        <nav className="flex-1 mt-6 px-6 space-y-3 overflow-y-auto scrollbar-hide">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 transform ${
                activeTab === item.id 
                  ? 'bg-travel-blue text-white shadow-lg shadow-travel-blue/30 scale-[1.02]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex-shrink-0">
                <svg className={`w-6 h-6 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              {(isSidebarOpen || isMobileMenuOpen) && (
                <span className="font-semibold tracking-wide whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-300">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className={`p-6 mt-auto transition-all duration-500 ${isSidebarOpen || isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {(isSidebarOpen || isMobileMenuOpen) && (
            <div className="bg-white/5 rounded-2xl p-5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors group cursor-default">
               <div className="space-y-3">
                 <div className="flex justify-between items-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Workspace</p>
                    <span className="text-[10px] bg-sunset-coral/20 text-sunset-coral px-2 py-0.5 rounded-full font-bold">PRO</span>
                 </div>
                 <p className="text-sm font-semibold text-cloud-white">Team Explorer</p>
                 <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-gradient-to-r from-travel-blue to-ocean-teal h-full w-2/3 transition-all duration-1000"></div>
                 </div>
                 <div className="flex justify-between items-center">
                    <p className="text-[10px] text-gray-500 italic">240/500 credits</p>
                    <button className="text-[10px] text-travel-blue font-bold hover:text-white transition-colors">Top Up</button>
                 </div>
               </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      {/* 
        Important: Added dynamic padding (pl-72 or pl-24) on large screens 
        to ensure the fixed sidebar doesn't overlap the main content.
      */}
      <main className={`
        flex-1 flex flex-col overflow-hidden transition-all duration-500
        ${isSidebarOpen ? 'lg:pl-72' : 'lg:pl-24'}
      `}>
        <header className="h-20 md:h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-4 md:px-10 z-30">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Hamburger Button (Mobile only) */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-3 bg-cloud-white hover:bg-sand-beige transition-all active:scale-95 rounded-xl text-midnight-navy"
              aria-label="Open sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            
            {/* Desktop Expand Button (Shown only when collapsed) */}
            {!isSidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="hidden lg:block p-3 bg-cloud-white hover:bg-sand-beige transition-all active:scale-95 rounded-xl text-midnight-navy group"
                aria-label="Expand sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <div className="flex flex-col">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5 hidden sm:block">Platform</p>
              <h2 className="text-lg md:text-xl font-bold text-midnight-navy capitalize tracking-tight whitespace-nowrap animate-fadeIn">
                {activeTab.replace('-', ' ')}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex flex-col text-right">
              <p className="text-sm font-bold text-midnight-navy">James Davenport</p>
              <p className="text-[10px] text-gray-400 font-medium">Luxury Travel Agent</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-sand-beige to-white border border-gray-100 shadow-sm flex items-center justify-center text-midnight-navy font-bold relative group cursor-pointer hover:shadow-md transition-all active:scale-95 overflow-visible">
              JD
              <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-ocean-teal border-2 border-white rounded-full ring-2 ring-ocean-teal/20"></div>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform origin-top-right scale-95 group-hover:scale-100 z-50">
                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                  <p className="text-xs font-bold text-midnight-navy">Workspace: Amalfi</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-cloud-white transition-colors">Settings</button>
                <button className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-cloud-white transition-colors">Sign Out</button>
              </div>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-4 md:p-10 bg-[#fdfdfd] custom-scrollbar">
          <div className="max-w-6xl mx-auto h-full">
            {children}
          </div>
        </section>
      </main>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default Layout;
