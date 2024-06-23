"use client";

import React, { useState, useEffect } from 'react';

interface Skill {
  name: string;
  color: string;
}

interface JobDescription {
  responsibilities: string[];
  qualifications: string[];
}

interface JobCardProps {
  jobId: string; // Add jobId to fetch time
  jobTitle: string;
  companyName: string;
  location: string;
  skills: Skill[];
  salary: string;
  jobType: string;
  imageUrl: string;
  jobDescription: JobDescription;
  userApplied: boolean; // Add a prop to check if user has applied
}

const JobCard: React.FC<JobCardProps> = ({ jobId, jobTitle, companyName, location, skills, salary, jobType, imageUrl, jobDescription, userApplied }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [hasApplied, setHasApplied] = useState(userApplied);

  useEffect(() => {
    const fetchRemainingTime = async () => {
      try {
        // Mock value for remaining time in seconds (e.g., 3600 seconds = 1 hour)
        const mockRemainingTime = 3600;
        setRemainingTime(mockRemainingTime);

        // Uncomment this and remove the above mock value when you have an actual API endpoint
        // const response = await fetch(`/api/getRemainingTime?jobId=${jobId}`);
        // const data = await response.json();
        // setRemainingTime(data.remainingTime);
      } catch (error) {
        console.error('Error fetching remaining time:', error);
      }
    };

    fetchRemainingTime();
  }, [jobId]);

  useEffect(() => {
    if (remainingTime === null) return;

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleApply = () => {
    // Handle the application logic here, e.g., upload the resume, etc.
    // After successfully applying, update the state to reflect that the user has applied.
    setHasApplied(true);
    handleClose();
  };

  return (
    <div>
      <div className="group bg-gray-900 p-4 transition-all duration-300 hover:rotate-1 lg:p-8 rounded-lg shadow-lg">
        <div className="flex items-center gap-x-2">
          <img className="aspect-[2/2] w-16" src={imageUrl} alt={`${companyName} logo`} />
          <div>
            <h3 className="text-xl font-bold text-gray-50">{companyName}</h3>
            <span className="text-xs text-gray-300">{location}</span>
          </div>
        </div>
        <div className="my-4">
          <h3 className="text-2xl font-medium text-gray-200">{jobTitle}</h3>
          <div className="text-sm font-medium">
            {skills.map((skill, index) => (
              <span key={index} className={`m-1 ml-0 inline-block text-${skill.color}-500`}>{skill.name}</span>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-400">{salary}</div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-50">{jobType}</span>
          {hasApplied ? (
            <span className="font-medium text-green-500">
              <svg
                className="inline h-5 w-5 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Applied
            </span>
          ) : (
            <a onClick={handleClickOpen} className="font-medium text-blue-500 transition-all duration-300 group-hover:text-blue-500/80 cursor-pointer">Apply Now</a>
          )}
        </div>
        {remainingTime !== null && (
          <div className="text-sm font-medium text-gray-50">Time Remaining: {formatTime(remainingTime)}</div>
        )}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative p-8 bg-gray-900 text-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
            <span className="absolute top-0 right-0 p-4">
              <button onClick={handleClose}>
                <svg
                  className="h-6 w-6 text-gray-400 hover:text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
            <h2 className="text-2xl mb-4">{jobTitle}</h2>
            <h3 className="text-xl font-semibold">Responsibilities</h3>
            <ul className="list-disc list-inside mb-4 text-gray-400">
              {jobDescription.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold">Qualifications</h3>
            <ul className="list-disc list-inside mb-4 text-gray-400">
              {jobDescription.qualifications.map((qualification, index) => (
                <li key={index}>{qualification}</li>
              ))}
            </ul>
            <div className="max-w-sm">
              <form>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    className="block w-full text-sm text-gray-500
                      file:me-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-600 file:text-white
                      hover:file:bg-blue-700
                      file:disabled:opacity-50 file:disabled:pointer-events-none
                      dark:text-neutral-500
                      dark:file:bg-blue-500
                      dark:hover:file:bg-blue-400"
                    onChange={handleFileChange}
                  />
                </label>
                <button 
                  type="button" 
                  className={`mt-4 w-full py-2 px-4 rounded-lg text-sm font-semibold ${
                    file ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-500 text-gray-200 cursor-not-allowed'
                  }`}
                  disabled={!file}
                  onClick={handleApply}
                >
                  Upload Resume
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
