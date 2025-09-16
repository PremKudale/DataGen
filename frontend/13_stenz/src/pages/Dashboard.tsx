import React from 'react';
import { Plus, Download, Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const datasets = [
    { id: 1, name: 'E-commerce Data', status: 'Completed' },
    { id: 2, name: 'Healthcare Records', status: 'In Progress' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Link to="/dataset-config" className="bg-blue-500 text-white px-4 py-2 rounded inline-flex items-center mb-6">
        <Plus className="mr-2" /> Create New Dataset
      </Link>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Datasets</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((dataset) => (
              <tr key={dataset.id} className="border-b">
                <td className="py-2">{dataset.name}</td>
                <td className="py-2">{dataset.status}</td>
                <td className="py-2">
                  <button className="text-blue-500 mr-2"><Download size={18} /></button>
                  <button className="text-green-500 mr-2"><Eye size={18} /></button>
                  <button className="text-yellow-500"><Edit size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;