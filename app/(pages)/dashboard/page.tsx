"use client";
import React, { useState, useEffect } from "react";
import { Search, ArrowRight, Plus, X } from "lucide-react";

interface JobListing {
  id: string;
  title: string;
  department: string;
  hiringManager: string;
  postedDate: string;
  applicants: number;
}

const JobListingsDashboard: React.FC = () => {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    hiringManager: "",
  });

  // Load job listings from localStorage on component mount
  useEffect(() => {
    const savedJobs = localStorage.getItem("jobListings");
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      setJobListings(parsedJobs);
      setFilteredJobs(parsedJobs);
    } else {
      // Initialize with default data if no saved jobs
      const defaultJobs: JobListing[] = [
        {
          id: "1",
          title: "Frontend Developer",
          department: "Engineering",
          hiringManager: "Sarah Johnson",
          postedDate: "Mar 20, 2025",
          applicants: 3,
        },
        {
          id: "2",
          title: "UX Designer",
          department: "Design",
          hiringManager: "Alex Chen",
          postedDate: "Mar 25, 2025",
          applicants: 2,
        },
        {
          id: "3",
          title: "Product Manager",
          department: "Product",
          hiringManager: "Linda Martinez",
          postedDate: "Mar 28, 2025",
          applicants: 2,
        },
      ];
      setJobListings(defaultJobs);
      setFilteredJobs(defaultJobs);
      localStorage.setItem("jobListings", JSON.stringify(defaultJobs));
    }
  }, []);

  // Filter jobs based on search query
  useEffect(() => {
    const filtered = jobListings.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.hiringManager.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchQuery, jobListings]);

  const handleAddJobClick = () => {
    setIsAddJobModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddJobModalOpen(false);
    setNewJob({
      title: "",
      department: "",
      hiringManager: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.department || !newJob.hiringManager) {
      alert("Please fill in all required fields");
      return;
    }

    const today = new Date();
    const formattedDate = `Mar ${today.getDate()}, ${today.getFullYear()}`;

    const newJobListing: JobListing = {
      id: `${Date.now()}`,
      title: newJob.title,
      department: newJob.department,
      hiringManager: newJob.hiringManager,
      postedDate: formattedDate,
      applicants: 0,
    };

    const updatedJobs = [...jobListings, newJobListing];
    setJobListings(updatedJobs);
    setFilteredJobs(updatedJobs);
    localStorage.setItem("jobListings", JSON.stringify(updatedJobs));
    handleCloseModal();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Job Listings</h1>
          <p className="text-gray-600">Browse and manage job postings</p>
        </div>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={handleAddJobClick}
        >
          <Plus size={20} /> Add New Job
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Search jobs by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
            <p className="text-gray-600 mb-4">{job.department}</p>

            <div className="space-y-2 mb-6">
              <p className="text-gray-700">
                <span className="font-medium">Hiring Manager:</span>{" "}
                {job.hiringManager}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Posted:</span> {job.postedDate}
              </p>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-gray-500 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
                <span className="text-gray-700">{job.applicants} Applicants</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              View Details <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">
              No job listings found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      )}

      {/* Modal */}
      {isAddJobModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-transparent z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Post New Job</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Job Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g. Frontend Developer"
                    value={newJob.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Department<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g. Engineering"
                    value={newJob.department}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Hiring Manager<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="hiringManager"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g. John Smith"
                    value={newJob.hiringManager}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListingsDashboard;
