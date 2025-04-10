"use client";
import { useState, useEffect } from 'react';
import { Search, MapPin, User, Calendar, Plus, X } from 'lucide-react';

// Define the Job interface
interface Job {
  id: number;
  title: string;
  recruiter: string;
  location: string;
  date: string;
  category: string;
  applicants: number;
  status: string;
  description?: string;
  requirements?: string[];
}

// Form data interface
interface FormData {
  title: string;
  department: string;
  hiringManager: string;
  location: string;
  description: string;
  requirements: string;
  postedDate: string;
  closingDate: string;
  isActive: boolean;
}

export default function JobBoard() {
  // Sample initial job data
  const initialJobs: Job[] = [
    {
      id: 1,
      title: "Frontend Developer",
      recruiter: "Jane Smith",
      location: "Remote",
      date: "Apr 1, 2024",
      category: "Engineering",
      applicants: 3,
      status: "Active"
    },
    {
      id: 2,
      title: "UX Designer",
      recruiter: "Robert Chen",
      location: "Chicago, IL",
      date: "Apr 2, 2024",
      category: "Design",
      applicants: 2,
      status: "Active"
    },
    {
      id: 3,
      title: "Product Manager",
      recruiter: "Alice Johnson",
      location: "San Francisco, CA",
      date: "Apr 5, 2024",
      category: "Product",
      applicants: 2,
      status: "Active"
    },
    {
      id: 4,
      title: "Python DEV",
      recruiter: "Mike Wilson",
      location: "Austin, TX",
      date: "Apr 7, 2024",
      category: "Engineering",
      applicants: 0,
      status: "Active"
    }
  ];

  // State for jobs and form
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All Jobs");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    title: "",
    department: "",
    hiringManager: "",
    location: "",
    description: "",
    requirements: "",
    postedDate: formatDate(new Date()),
    closingDate: "",
    isActive: true
  });

  // Load jobs from localStorage on initial render with client-side safety check
  useEffect(() => {
    const loadJobs = () => {
      setIsLoading(true);
      try {
        if (typeof window !== 'undefined') {
          const savedJobs = localStorage.getItem('jobListings');
          console.log("Retrieved from localStorage:", savedJobs);
          
          if (savedJobs) {
            const parsedJobs = JSON.parse(savedJobs);
            console.log("Parsed jobs:", parsedJobs);
            
            // Validate job data
            const validJobs = parsedJobs.filter((job:Job) => 
              job && job.id && job.title && job.status
            );
            
            if (validJobs.length > 0) {
              setJobs(validJobs);
              console.log("Set valid jobs:", validJobs);
            } else {
              console.log("No valid jobs found, using initial jobs");
              setJobs(initialJobs);
              localStorage.setItem('jobListings', JSON.stringify(initialJobs));
            }
          } else {
            console.log("No saved jobs, using initial jobs");
            setJobs(initialJobs);
            localStorage.setItem('jobListings', JSON.stringify(initialJobs));
          }
        }
      } catch (error) {
        console.error("Error loading jobs:", error);
        setJobs(initialJobs);
        if (typeof window !== 'undefined') {
          localStorage.setItem('jobListings', JSON.stringify(initialJobs));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Format date for the form input
  function formatDate(date: Date | string | number): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Filter jobs based on status and search term
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "All Jobs") {
      return matchesSearch;
    } else if (filter === "Active") {
      return job.status === "Active" && matchesSearch;
    } else if (filter === "Closed") {
      return job.status === "Closed" && matchesSearch;
    }
    return matchesSearch;
  });

  // Count jobs by status
  const activeCount = jobs.filter(job => job.status === "Active").length;
  const closedCount = jobs.filter(job => job.status === "Closed").length;
  const totalCount = jobs.length;

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJob: Job = {
      id: Date.now(),
      title: formData.title,
      recruiter: formData.hiringManager,
      location: formData.location,
      date: new Date(formData.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      category: formData.department,
      applicants: 0,
      status: formData.isActive ? "Active" : "Closed",
      description: formData.description,
      requirements: formData.requirements.split('\n').filter(req => req.trim() !== '')
    };
    
    console.log("Creating new job:", newJob);
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    
    // Save to localStorage (with safety check for SSR)
    if (typeof window !== 'undefined') {
      localStorage.setItem('jobListings', JSON.stringify(updatedJobs));
    }
    
    // Reset form and close modal
    setFormData({
      title: "",
      department: "",
      hiringManager: "",
      location: "",
      description: "",
      requirements: "",
      postedDate: formatDate(new Date()),
      closingDate: "",
      isActive: true
    });
    setShowModal(false);
  };

  // Cancel form and close modal
  const handleCancel = () => {
    setShowModal(false);
  };

  // Reset localStorage for debugging purposes
  const handleResetData = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jobListings', JSON.stringify(initialJobs));
      setJobs(initialJobs);
      console.log("Reset to initial jobs data");
    }
  };

  const slugify = (str: string) =>{
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Search and Create */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Job
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-sm"
            onClick={handleResetData}
          >
            Reset Data
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <div className="flex">
          <button 
            className={`px-4 py-2 ${filter === "All Jobs" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
            onClick={() => setFilter("All Jobs")}
          >
            All Jobs ({totalCount})
          </button>
          <button 
            className={`px-4 py-2 ${filter === "Active" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
            onClick={() => setFilter("Active")}
          >
            Active ({activeCount})
          </button>
          <button 
            className={`px-4 py-2 ${filter === "Closed" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
            onClick={() => setFilter("Closed")}
          >
            Closed ({closedCount})
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        /* Job Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">{job.title}</h3>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  job.status === "Active" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                }`}>
                  {job.status}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{job.recruiter || "No recruiter assigned"}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{job.location || "No location specified"}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">Posted: {job.date || "No date"}</span>
                </div>
              </div>
              
              {job.category && (
                <div className="inline-block bg-gray-50 px-3 py-1 rounded text-sm text-gray-700 mb-4">
                  {job.category}
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {job.applicants} {job.applicants === 1 ? "applicant" : "applicants"}
                </span>
              <a href={`/jobDetails/${slugify(job.title)}`}> <button    className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button></a> 
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && filteredJobs.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No jobs match your search criteria.</p>
        </div>
      )}

      {/* Create Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create New Job</h2>
                <button 
                  onClick={handleCancel} 
                  className="text-gray-500 hover:text-gray-700"
                  type="button"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="e.g., Frontend Developer"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      Department<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      placeholder="e.g., Engineering"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hiringManager" className="block text-sm font-medium text-gray-700 mb-1">
                      Hiring Manager<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="hiringManager"
                      name="hiringManager"
                      placeholder="e.g., John Smith"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.hiringManager}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="e.g., Remote, New York, NY"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe the job role, responsibilities, etc."
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Requirements (one per line)
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    placeholder="e.g., 3+ years of React experience"
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.requirements}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="postedDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Posted Date<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="postedDate"
                      name="postedDate"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.postedDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="closingDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Closing Date (optional)
                    </label>
                    <input
                      type="date"
                      id="closingDate"
                      name="closingDate"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.closingDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                      Job is actively accepting applications
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}