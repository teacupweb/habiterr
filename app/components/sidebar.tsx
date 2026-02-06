'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaFire, FaSignOutAlt, FaCoffee } from 'react-icons/fa';

function Sidebar() {
  const [activeTab, setActiveTab] = useState('');

  // Update active tab based on current path

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaHome className='h-5 w-5' />,
      href: '/dashboard',
    },
    {
      id: 'habits',
      label: 'Habits',
      icon: <FaFire className='h-5 w-5' />,
      href: '/dashboard/habits',
    },
  ];

  return (
    <div className='h-screen sticky top-0 z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700'>
      <aside className='flex flex-col items-center text-gray-50 shadow h-full border-r border-gray-700'>
        {/* Side Nav Bar*/}
        <div className='h-16 flex items-center w-full border-b border-gray-700'>
          {/* Logo Section */}
          <Link href='/' className='mx-auto'>
            <div className=''>
              <FaCoffee className='text-2xl text-blue-400' />
            </div>
          </Link>
        </div>
        <ul>
          {/* Map through menu items */}
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`hover:bg-gray-800/50 ${activeTab === item.id ? 'bg-blue-900/20 border-r-2 border-blue-500' : ''}`}
            >
              <Link
                href={item.href}
                className='h-16 px-6 flex justify-center items-center w-full focus:text-blue-500'
                onClick={() => handleTabClick(item.id)}
              >
                {item.icon}
              </Link>
            </li>
          ))}
        </ul>
        <div className='mt-auto h-16 flex items-center w-full border-t border-gray-700'>
          {/* Action Section */}
          <button
            className='h-16 w-full flex justify-center items-center hover:bg-red-900/20 focus:outline-none focus:text-red-500'
            onClick={() => {
              // Logout functionality
              console.log('Logout clicked');
            }}
          >
            <FaSignOutAlt className='h-5 w-5 text-red-500' />
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
