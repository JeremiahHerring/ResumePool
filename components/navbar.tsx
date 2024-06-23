'use client'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Nav() {
  const { user, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <nav className="flex items-center justify-between p-6 lg:px-8 h-20 border-0" aria-label='Global'>
        <div className="flex lg:flex-1 justify-start items-center">
          <a href="/" className="-m-1.5 p-1.5 flex items-center">
            <img src="/ResumePool.svg" alt="ResumePool Logo" className="h-8 w-auto"/>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isMenuOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
            </svg>
          </button>
        </div>
        <div className={`flex-1 justify-center space-x-4 ${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto`}>
          {isLoaded && user ? (
            <>
              <Link href="/resumes" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white">Uploaded Resumes</Link>
              <Link href="/jobs" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white">Job Postings</Link>
              <Link href="/results" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white">Competition Results</Link>
            </>
          ) : (
            <SignInButton className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white" />
          )}
        </div>
        <div className="flex lg:flex-1 justify-end">
          {isLoaded && user && <UserButton afterSignOutUrl='/' />}
        </div>
      </nav>
    </header>
  );
}
