import { GalleryVerticalEnd } from 'lucide-react';

import  AuthForm  from '@/components/login-form';

export default function SignupPage() {
  return (
    <div className='min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <a href='#' className='flex items-center gap-2 self-center font-medium text-gray-100'>
       
          Habiterr
        </a>
        <AuthForm variant="signup" />
      </div>
    </div>
  );
}
