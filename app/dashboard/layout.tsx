import React from 'react';
import Sidebar from './../components/sidebar';

function Layout({ children }: any) {
  return (
    <div className='flex'>
      <div>
        <Sidebar />
      </div>
      {children}
    </div>
  );
}

export default Layout;
