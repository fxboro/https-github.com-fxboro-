
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ContentGenerator from './components/ContentGenerator';
import VisualsGenerator from './components/VisualsGenerator';
import BrandMemorySettings from './components/BrandMemorySettings';
import CalendarView from './components/CalendarView';
import { BrandMemory } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [brandMemory, setBrandMemory] = useState<BrandMemory>({
    tone: 'Inspiring, luxurious, and visually descriptive',
    audience: 'High-end luxury travelers and wellness enthusiasts',
    destination: 'Amalfi Coast, Italy',
    cta: 'Link in bio to book your luxury getaway'
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'generator':
        return <ContentGenerator brandMemory={brandMemory} />;
      case 'visuals':
        return <VisualsGenerator />;
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return <BrandMemorySettings memory={brandMemory} setMemory={setBrandMemory} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
