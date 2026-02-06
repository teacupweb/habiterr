'use client';

import { useState } from 'react';
import {
  FaGithub,
  FaCoffee,
  FaArrowRight,
  FaCode,
  FaLockOpen,
  FaCalendarCheck,
  FaDownload,
  FaStar,
  FaUsers,
  FaHeart,
  FaCheckCircle,
  FaClock,
  FaFire,
  FaCalendar,
} from 'react-icons/fa';
import { SiJson } from 'react-icons/si';

export default function HomePage() {
  const [jsonInput, setJsonInput] = useState(`{
  "morning_routine": [
    {
      "habit": "Drink Water",
      "time": "7:00 AM",
      "streak": 14
    },
    {
      "habit": "Meditation",
      "time": "7:15 AM",
      "streak": 7
    }
  ],
  "evening_routine": [
    {
      "habit": "Read Book",
      "time": "9:00 PM",
      "streak": 21
    }
  ]
}`);

  const sampleHabits = [
    { name: 'Morning Meditation', streak: 14, completed: true },
    { name: 'Daily Exercise', streak: 21, completed: true },
    { name: 'Read 30 Pages', streak: 7, completed: false },
    { name: 'Water 2L', streak: 30, completed: true },
    { name: 'No Sugar', streak: 3, completed: true },
    { name: 'Journal', streak: 45, completed: false },
  ];

  return (
    <div className='min-h-screen bg-gray-900 text-gray-100 font-sans'>
      {/* Header */}
      <header className='sticky top-0 z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-blue-900/30 border border-blue-800/30'>
                <FaCoffee className='text-2xl text-blue-400' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text'>
                  Habiterr
                </h1>
                <p className='text-xs text-gray-400'>by teacup</p>
              </div>
            </div>

            <nav className='hidden md:flex items-center gap-8'>
              <a
                href='#features'
                className='hover:text-blue-300 transition-colors duration-200'
              >
                Features
              </a>
              <a
                href='#json'
                className='hover:text-blue-300 transition-colors duration-200'
              >
                JSON Setup
              </a>
              <a
                href='#opensource'
                className='hover:text-blue-300 transition-colors duration-200'
              >
                Open Source
              </a>
              <a
                href='#getstarted'
                className='hover:text-blue-300 transition-colors duration-200'
              >
                Get Started
              </a>
            </nav>

            <div className='flex items-center gap-4'>
              <a
                href='https://github.com'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-600 transition-colors duration-200'
              >
                <FaGithub className='text-blue-400' />
                <span className='hidden sm:inline'>Star on GitHub</span>
              </a>
              <button className='px-6 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 font-semibold transition-colors duration-200'>
                Try Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='py-16 md:py-24 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent'></div>
        <div className='container mx-auto px-4 relative'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50'>
              <FaCoffee className='text-blue-400' />
              <span className='text-sm text-gray-300'>
                Free & Open Source Habit Tracker
              </span>
            </div>

            <h1 className='text-4xl md:text-6xl font-bold mb-6'>
              Build Better Habits with
              <span className='block mt-2 text-transparent bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text'>
                Simple JSON Routines
              </span>
            </h1>

            <p className='text-xl text-gray-300 mb-10 max-w-2xl mx-auto'>
              Habiterr is a minimalist habit tracker that lets you define custom
              routines through JSON. Completely free, open source, and built
              with love by teacup.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='px-8 py-4 rounded-lg bg-blue-700 hover:bg-blue-600 font-semibold text-lg flex items-center justify-center gap-2 transition-colors duration-200'>
                Start Tracking Now <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section id='opensource' className='py-16 md:py-20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='inline-flex p-3 rounded-full bg-blue-900/30 border border-blue-800/30 mb-6'>
              <FaHeart className='text-3xl text-blue-400' />
            </div>
            <h2 className='text-3xl md:text-4xl font-bold mb-6 text-white'>
              Free &{' '}
              <span className='text-transparent bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text'>
                Open Source
              </span>
            </h2>

            <p className='text-xl text-gray-300 mb-10'>
              Habiterr is built on the principles of transparency and
              accessibility. No subscriptions, no hidden fees, and no vendor
              lock-in.
            </p>

            <div className='grid md:grid-cols-3 gap-8 mb-12'>
              <div className='p-6 rounded-2xl border border-gray-700 bg-gray-800'>
                <FaDownload className='text-3xl text-blue-400 mx-auto mb-4' />
                <h3 className='text-xl font-bold mb-3 text-white'>
                  Free Forever
                </h3>
                <p className='text-gray-400'>
                  No payments required. Use Habiterr completely free, forever.
                </p>
              </div>

              <div className='p-6 rounded-2xl border border-gray-700 bg-gray-800'>
                <FaGithub className='text-3xl text-blue-400 mx-auto mb-4' />
                <h3 className='text-xl font-bold mb-3 text-white'>
                  Open Source
                </h3>
                <p className='text-gray-400'>
                  View, modify, and contribute to the code on GitHub.
                </p>
              </div>

              <div className='p-6 rounded-2xl border border-gray-700 bg-gray-800'>
                <FaUsers className='text-3xl text-blue-400 mx-auto mb-4' />
                <h3 className='text-xl font-bold mb-3 text-white'>
                  Community Driven
                </h3>
                <p className='text-gray-400'>
                  Built with feedback from users like you.
                </p>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a
                href='https://github.com'
                target='_blank'
                rel='noopener noreferrer'
                className='px-8 py-4 rounded-lg border border-gray-700 hover:border-blue-600 font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-3'
              >
                <FaGithub className='text-blue-400' />
                Star on GitHub
                <FaStar className='text-yellow-500' />
              </a>
              <button className='px-8 py-4 rounded-lg bg-blue-700 hover:bg-blue-600 font-semibold text-lg transition-colors duration-200'>
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 border-t border-gray-800'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-blue-900/30 border border-blue-800/30'>
                <FaCoffee className='text-blue-400' />
              </div>
              <div>
                <div className='font-bold text-lg text-white'>Habiterr</div>
                <div className='text-sm text-gray-400'>by teacup • v1.0.0</div>
              </div>
            </div>

            <div className='text-gray-400 text-sm text-center md:text-right'>
              <p>
                © {new Date().getFullYear()} Habiterr. Free and open source.
              </p>
              <p className='mt-1'>
                Made for the community, by{' '}
                <a href='#' className='text-blue-600 hover:underline'>
                  Tahmid Jihan
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
