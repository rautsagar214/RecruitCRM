"use client";

import { useState } from 'react';
import { Filter, Plus, Search } from 'lucide-react';

const mockApplicants = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Frontend Developer',
    status: 'Screening',
    dateApplied: '2023-04-02',
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'UX Designer',
    status: 'Interview',
    dateApplied: '2023-04-05',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    role: 'Project Manager',
    status: 'Offer',
    dateApplied: '2023-03-28',
  },
  {
    id: '4',
    name: 'Emily Davis',
    role: 'Backend Developer',
    status: 'New',
    dateApplied: '2023-04-08',
  },
  {
    id: '5',
    name: 'Michael Brown',
    role: 'DevOps Engineer',
    status: 'Rejected',
    dateApplied: '2023-03-15',
  },
];

export default function ApplicantTracker() {
  const [activeTab, setActiveTab] = useState('All Applicants');
  const [searchQuery, setSearchQuery] = useState('');
  
  const tabs = ['All Applicants', 'New', 'Screening', 'Interview', 'Offer', 'Rejected'];
  
  const filteredApplicants = mockApplicants.filter(applicant => {
    // Filter by status tab
    if (activeTab !== 'All Applicants' && applicant.status !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        applicant.name.toLowerCase().includes(query) ||
        applicant.role.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const getStatusColors = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Screening': return 'bg-yellow-100 text-yellow-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      case 'Offer': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applicants</h1>
          <p className="text-gray-600">Manage and track job applicants</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Applicant
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search applicants..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center text-gray-700 font-medium">
          <Filter className="h-5 w-5 mr-2" />
          Filter
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NAME
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ROLE
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATE APPLIED
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplicants.map((applicant) => (
              <tr key={applicant.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{applicant.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {applicant.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColors(applicant.status)}`}>
                    {applicant.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {applicant.dateApplied}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}