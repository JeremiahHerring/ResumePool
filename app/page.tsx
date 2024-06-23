import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="text-center py-20">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to ResumePool</h1>
        <p className="text-lg text-gray-200 mb-8">See how your resume stacks up against others by applying to zero-stakes mock jobs.</p>
        <Link href="/jobs">
          <button className="bg-blue-600 text-white px-6 py-3 font-semibold rounded hover:bg-blue-700 transition duration-300">See Job Postings</button>
        </Link>
      </section>
  )
}
