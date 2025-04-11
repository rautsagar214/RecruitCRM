"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { X } from 'lucide-react';

export default function ApplicantFormPage() {
  const router = useRouter();
  const params = useParams();
  const jobSlug = params.slug as string;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    applicationDate: new Date().toISOString().split('T')[0],
    resumeUrl: '',
    currentStage: 'Applied',
    notes: ''
  });

  // Format today's date as YYYY-MM-DD for the date input
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, applicationDate: today }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Demo: Add to local storage for demonstration purposes
    const applicants = JSON.parse(localStorage.getItem('applicants') || '[]');
    const newApplicant = {
      id: Date.now(),
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      appliedDate: new Date(formData.applicationDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      stage: formData.currentStage,
      resumeUrl: formData.resumeUrl,
      notes: formData.notes,
      job: jobSlug
    };
    
    applicants.push(newApplicant);
    localStorage.setItem('applicants', JSON.stringify(applicants));
    
    // Reset form and navigate back to job details
    handleCancel();
  };

  const handleCancel = () => {
    // Navigate back to the job details page
    if (jobSlug) {
      router.push(`/jobDetails/${jobSlug}`);
    } else {
      router.push('/');
    }
  };

  // Function to determine job title from slug
  const getJobTitle = () => {
    if (!jobSlug) return 'New Position';
    
    return jobSlug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">Add New Applicant</h2>
              <p className="text-gray-600">{getJobTitle()} • Engineering</p>
            </div>
            <button 
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Application Date*
                </label>
                <input
                  id="applicationDate"
                  name="applicationDate"
                  type="date"
                  required
                  value={formData.applicationDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Resume URL
                </label>
                <input
                  id="resumeUrl"
                  name="resumeUrl"
                  type="url"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  placeholder="Link to resume"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="currentStage" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Stage*
                </label>
                <select
                  id="currentStage"
                  name="currentStage"
                  required
                  value={formData.currentStage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Technical">Technical Assessment</option>
                  <option value="Offer">Offer</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              
              <div className="col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any notes about the applicant"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
              >
                Add Applicant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}