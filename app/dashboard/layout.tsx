import React from 'react';
import Sidebar from './../components/sidebar';
import Verify from './verify';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Verify />
      <div className='flex  bg-gray-900'>
        <div>
          <Sidebar />
        </div>
        <div className='mx-auto'>{children}</div>
      </div>
    </>
  );
}

export default Layout;
