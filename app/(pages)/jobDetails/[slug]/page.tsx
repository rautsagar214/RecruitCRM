"use client"

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Edit, Trash2, User, MapPin, Calendar, Plus, ChevronDown } from 'lucide-react';

const JobDetailsPage = () => {

  const params = useParams();
  const slug = params.slug as string;

  const deslugify = (slug: string) => {
  return slug
    .replace(/-/g, ' ')                     // replace dashes with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize first letter of each word
};

  console.log(deslugify(slug))
  const [viewMode, setViewMode] = useState('list');
  const [applicants] = useState([
    {
      id: 1,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '555-123-4567',
      appliedDate: 'Apr 2, 2024',
      stage: 'Applied'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '555-987-6543',
      appliedDate: 'Apr 3, 2024',
      stage: 'Interview'
    }
  ]);

  return (
    <div className="bg-white min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Job Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">Frontend Developer</h2>
                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-md">Active</span>
              </div>
              <div className="text-gray-600 text-sm">Engineering • Remote</div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                <Edit size={15} />
                <span>Edit</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-red-500 hover:bg-red-50">
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Job Content */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-2">Job Description</h3>
              <p className="text-gray-700 text-sm">We're looking for a skilled Frontend Developer to join our team...</p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-2">Requirements</h3>
              <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                <li>3+ years of React experience</li>
                <li>TypeScript proficiency</li>
                <li>UI/UX sensibility</li>
              </ul>
            </div>
          </div>

          <div className="col-span-1">
            <div className="border rounded-lg p-5">
              <h3 className="text-base font-semibold mb-3 flex items-center justify-between">
                Job Details
                <button className="text-gray-400">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                    <path d="M7.5 1.5C4.185 1.5 1.5 4.185 1.5 7.5C1.5 10.815 4.185 13.5 7.5 13.5C10.815 13.5 13.5 10.815 13.5 7.5C13.5 4.185 10.815 1.5 7.5 1.5ZM8.25 10.5H6.75V6H8.25V10.5ZM7.5 5.25C6.9675 5.25 6.525 4.8075 6.525 4.275C6.525 3.7425 6.9675 3.3 7.5 3.3C8.0325 3.3 8.475 3.7425 8.475 4.275C8.475 4.8075 8.0325 5.25 7.5 5.25Z" fill="currentColor" />
                  </svg>
                </button>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <div className="text-xs text-gray-500">Hiring Manager</div>
                    <div className="text-sm font-medium">Jane Smith</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="text-sm font-medium">Remote</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <div className="text-xs text-gray-500">Posted Date</div>
                    <div className="text-sm font-medium">Apr 1, 2024</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Application Status</div>
                  <div className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-md">
                    Accepting Applications
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applicants Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Applicants (2)</h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                <Plus size={15} />
                <span>Add Applicant</span>
              </button>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button 
                  className={`px-4 py-1.5 text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
                <button
                  className={`px-4 py-1.5 text-sm ${viewMode === 'board' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setViewMode('board')}
                >
                  Board
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'list' && (
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{applicant.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{applicant.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{applicant.appliedDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`
                            px-3 py-1 text-xs font-medium rounded-md flex items-center
                            ${applicant.stage === 'Applied' ? 'bg-blue-100 text-blue-600' : ''}
                            ${applicant.stage === 'Interview' ? 'bg-yellow-100 text-yellow-600' : ''}
                          `}>
                            {applicant.stage}
                            <ChevronDown size={14} className="ml-1" />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;