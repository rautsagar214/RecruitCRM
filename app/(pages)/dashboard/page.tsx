"use client";
// pages/index.tsx
import React from 'react';
import { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import {  FaUser, FaCalendarAlt, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import Link from 'next/link';

ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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


const HomePage = () => {

   const [jobs, setJobs] = useState<Job[]>([]);
  // const [isLoading,setIsLoading] = React.useState(true);
  

  // Data for applicants by stage donut chart
  const applicantStageData = {
    labels: ['Applied', 'Phone Screen', 'Interview', 'Offer', 'Hired'],
    datasets: [
      {
        data: [3, 1, 1, 1, 1],
        backgroundColor: [
          '#60a5fa', // Applied - blue
          '#a855f7', // Phone Screen - purple
          '#eab308', // Interview - yellow
          '#5eead4', // Offer - teal
          '#4ade80', // Hired - green
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };


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



  useEffect(() => {

    const loadJobs = () => {
      // setIsLoading(true);
      try {
        if (typeof window !== 'undefined') {
          const savedJobs = localStorage.getItem('jobListings');
          console.log("Retrieved from localStorage:", savedJobs);
          
          if (savedJobs) {
            const parsedJobs = JSON.parse(savedJobs);
            console.log("Parsed jobs:", parsedJobs);
            
            // Validate job data
            const validJobs = parsedJobs.filter((job: Job) => 
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
        // setIsLoading(false);
      }
    };

    loadJobs()
  }, []);





  // Data for top jobs by applicants bar chart
  const jobsData = {
    labels: ['Frontend Developer', 'Backend Engineer', 'Product Manager'],
    datasets: [
      {
        label: 'Applicants',
        data: [2, 2, 1],
        backgroundColor: '#60a5fa',
      },
      {
        label: 'Open',
        data: [1, 1, 1],
        backgroundColor: '#4ade80',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    cutout: '65%',
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Active Jobs Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-medium text-gray-800">Active Jobs</h2>
              <div className="text-blue-600">
                <FaBriefcase size={20} />
              </div>
            </div>
            <div>
              <p className="text-4xl font-bold">3</p>
              <p className="text-sm text-gray-500 mt-1">Out of 3 total jobs</p>
            </div>
          </div>

          {/* Total Applicants Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-medium text-gray-800">Total Applicants</h2>
              <div className="text-blue-600">
                <FaUser size={20} />
              </div>
            </div>
            <div>
              <p className="text-4xl font-bold">5</p>
              <p className="text-sm text-gray-500 mt-1">Across all job positions</p>
            </div>
          </div>

          {/* Applications This Month Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-medium text-gray-800">Applications This Month</h2>
              <div className="text-blue-600">
                <FaCalendarAlt size={20} />
              </div>
            </div>
            <div>
              <p className="text-4xl font-bold">0</p>
              <p className="text-sm text-green-500 mt-1">+25% from last month</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Top Jobs by Applicants Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Top Jobs by Applicants</h2>
            <div className="h-64">
              <Bar data={jobsData} options={options} />
            </div>
          </div>

          {/* Applicants by Stage Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Applicants by Stage</h2>
            <div className="h-64">
              <Doughnut data={applicantStageData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Recently Posted Jobs */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-800">Recently Posted Jobs</h2>
            <a href="/jobListing" className="text-blue-600 hover:underline flex items-center">
              View All
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {jobs.slice(-3).map((job,index)=>(
              
                <div  key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                    {job.status}
                  </span>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaUser className="mr-2" />
                    <span>{job.recruiter}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    <span>Posted:{job.date}</span>
                  </div>
                </div>
                <div className="font-medium text-sm">{job.category}</div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{job.applicants} applicants</span>
                  <Link href="/jobDetails" className="text-blue-600 hover:underline text-sm">View Details</Link>
                </div>
              </div>
            </div>
              
            ))}
      
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;