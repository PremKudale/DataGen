import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Database, Settings } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DatasetConfig from './pages/DatasetConfig';
import AdvancedConfig from './pages/AdvancedConfig';
import DataPreview from './pages/DataPreview';
import DataOutput from './pages/DataOutput';
import Reports from './pages/Reports';
import SettingsPage from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dataset-config" element={<DatasetConfig />} />
            <Route path="/advanced-config" element={<AdvancedConfig />} />
            <Route path="/data-preview" element={<DataPreview />} />
            <Route path="/data-output" element={<DataOutput />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;