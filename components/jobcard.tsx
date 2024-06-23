"use client";

import React, { useState } from 'react';

interface Skill {
  name: string;
  color: string;
}

interface JobDescription {
  responsibilities: string[];
  qualifications: string[];
}

interface JobCardProps {
  jobTitle: string;
  companyName: string;
  location: string;
  skills: Skill[];
  salary: string;
  jobType: string;
  imageUrl: string;
  jobDescription: JobDescription;
}

const JobCard: React.FC<JobCardProps> = ({ jobTitle, companyName, location, skills, salary, jobType, imageUrl, jobDescription }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="group bg-gray-900 p-4 transition-all duration-300 hover:rotate-1 lg:p-8 rounded-lg shadow-lg">
        <div className="mb-3 text-right">
          <button className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>
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
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-50">{jobType}</span>
          <a onClick={handleClickOpen} className="font-medium text-blue-500 transition-all duration-300 group-hover:text-blue-500/80 cursor-pointer">Apply Now</a>
        </div>
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
                  <input type="file" className="block w-full text-sm text-gray-500
                    file:me-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-600 file:text-white
                    hover:file:bg-blue-700
                    file:disabled:opacity-50 file:disabled:pointer-events-none
                    dark:text-neutral-500
                    dark:file:bg-blue-500
                    dark:hover:file:bg-blue-400
                  ">
                  </input>
                </label>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
