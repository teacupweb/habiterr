import React from 'react';
import Sidebar from './../components/sidebar';

function Layout({ children }: any) {
  return (
    <div className='flex  bg-gray-900'>
      <div>
        <Sidebar />
      </div>
      <div className='mx-auto'>{children}</div>
    </div>
  );
}

export default Layout;
