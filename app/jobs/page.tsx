import React from 'react'
import JobCard from '@/components/jobcard'
import { jobs } from './jobs';

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job, index) => (
        <JobCard
          key={index}
          jobTitle={job.jobTitle}
          companyName={job.companyName}
          location={job.location}
          skills={job.skills}
          salary={job.salary}
          jobType={job.jobType}
          imageUrl={job.imageUrl}
          jobDescription={job.jobDescription}
        />
      ))}
    </div>
  )
}

