'use client';
import React from 'react';
import { useSession } from '../lib/auth-client';
import { redirect } from 'next/navigation';

interface Props {}

function Verify(props: Props) {
  const {} = props;
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className='min-h-screen absolute inset-0 z-999 bg-gray-900 flex items-center justify-center'>
        <div className='text-gray-100'>Loading...</div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/login');
    return null;
  }
  return <></>;
}

export default Verify;
