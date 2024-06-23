"use client";

import React from 'react';
import JobCard from '@/components/jobcard'

const jobData = [
  {
    jobId: '1',
    jobTitle: 'Software Engineer',
    companyName: 'TechCorp',
    location: 'New York, NY',
    skills: [{ name: 'JavaScript', color: 'yellow' }, { name: 'React', color: 'blue' }],
    salary: '$120,000/year',
    jobType: 'Full-Time',
    imageUrl: '/path/to/company-logo.png',
    jobDescription: {
      responsibilities: ['Develop new features', 'Maintain existing codebase'],
      qualifications: ['Bachelor\'s degree in CS', '3+ years of experience']
    },
    userApplied: true,
    userPlacement: 3,
    totalApplicants: 100
  },
  // Add more job data objects as needed
];

const ResultsPage: React.FC = () => {
  return (
    <div className="p-6 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {jobData.map((job) => (
          <JobCard
            key={job.jobId}
            jobId={job.jobId}
            jobTitle={job.jobTitle}
            companyName={job.companyName}
            location={job.location}
            skills={job.skills}
            salary={job.salary}
            jobType={job.jobType}
            imageUrl={job.imageUrl}
            jobDescription={job.jobDescription}
            userApplied={job.userApplied}
            userPlacement={job.userPlacement}
            totalApplicants={job.totalApplicants}
            showRemainingTime={false}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
