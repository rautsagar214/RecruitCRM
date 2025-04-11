"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Edit, Trash2, User, MapPin, Calendar, Plus, ChevronDown, Check } from 'lucide-react';
import Link from 'next/link'; 

interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  appliedDate: string;
  stage: string;
  resumeUrl: string;
  notes: string;
  job: string;
}

const JobDetailsPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const deslugify = (slug: string) => {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const [viewMode, setViewMode] = useState('list');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<{[key: number]: boolean}>({});

  // Available stages
  const stages = ["Applied", "Phone Screen", "Interview", "Offer", "Hired", "Rejected"];

  // Load applicants from localStorage
  useEffect(() => {
    const storedApplicants = localStorage.getItem('applicants');
    if (storedApplicants) {
      try {
        const parsedApplicants = JSON.parse(storedApplicants);
        const filteredApplicants = parsedApplicants.filter((applicant: any) => applicant.job === slug);
        setApplicants(filteredApplicants);
      } catch (error) {
        console.error('Error parsing applicants from localStorage:', error);
      }
    }
  }, [slug]);

  // Toggle dropdown for a specific applicant
  const toggleDropdown = (applicantId: number) => {
    setDropdownOpen(prev => ({
      ...prev,
      [applicantId]: !prev[applicantId]
    }));
  };

  // Update applicant stage
  const updateApplicantStage = (applicantId: number, newStage: string) => {
    // First update the local state
    const updatedApplicants = applicants.map(applicant => 
      applicant.id === applicantId ? {...applicant, stage: newStage} : applicant
    );
    setApplicants(updatedApplicants);
    
    // Then update localStorage
    const storedApplicants = localStorage.getItem('applicants');
    if (storedApplicants) {
      try {
        let allApplicants = JSON.parse(storedApplicants);
        allApplicants = allApplicants.map((applicant: Applicant) => 
          applicant.id === applicantId ? {...applicant, stage: newStage} : applicant
        );
        localStorage.setItem('applicants', JSON.stringify(allApplicants));
      } catch (error) {
        console.error('Error updating applicants in localStorage:', error);
      }
    }
    
    // Close the dropdown
    setDropdownOpen(prev => ({
      ...prev,
      [applicantId]: false
    }));
  };

  // Get CSS class for stage badge
  const getStageClass = (stage: string) => {
    switch(stage) {
      case 'Applied':
        return 'bg-blue-100 text-blue-600';
      case 'Phone Screen':
        return 'bg-purple-100 text-purple-600';
      case 'Interview':
        return 'bg-yellow-100 text-yellow-600';
      case 'Offer':
        return 'bg-green-100 text-green-600';
      case 'Hired':
        return 'bg-teal-100 text-teal-600';
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Job Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">{deslugify(slug)}</h2>
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
            <h2 className="text-lg font-semibold">Applicants ({applicants.length})</h2>
            <div className="flex items-center gap-2">
              <Link href={`/applicantForm/${slug}`}>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <Plus size={15} />
                  <span>Add Applicant</span>
                </button>
              </Link>
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
                        <div className="relative inline-block text-left">
                          <button 
                            onClick={() => toggleDropdown(applicant.id)}
                            className={`px-3 py-1 text-xs font-medium rounded-md  relatie flex items-center ${getStageClass(applicant.stage)}`}
                          >
                            {applicant.stage}
                            <ChevronDown size={14} className="ml-1" />
                          </button>
                          
                          {dropdownOpen[applicant.id] && (
                            <div className="origin-top-left    absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                              <div className="py-1  ">
                                {stages.map((stage) => (
                                  <button
                                    key={stage}
                                    onClick={() => updateApplicantStage(applicant.id, stage)}
                                    className="text-left w-full  absolute  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    {stage === applicant.stage && (
                                      <Check size={14} className="mr-2" />
                                    )}
                                    {stage}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
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