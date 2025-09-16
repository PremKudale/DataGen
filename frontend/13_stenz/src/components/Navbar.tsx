import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Database className="mr-2" />
          DataGeN
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Dashboard</Link>
          <Link to="/dataset-config" className="hover:text-blue-200">Dataset Config</Link>
          <Link to="/reports" className="hover:text-blue-200">Reports</Link>
          <Link to="/settings" className="hover:text-blue-200">
            <Settings className="inline-block" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;