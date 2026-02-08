'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/app/lib/auth-client';

interface AuthFormProps {
  variant: 'login' | 'signup';
  className?: string;
}
type Inputs = {
  name?: string;
  email: string;
  password: string;
};

export default function AuthForm({
  variant,
  className,
  ...props
}: AuthFormProps) {
  const isLogin = variant === 'login';
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: isLogin
      ? { email: '', password: '' }
      : { name: '', email: '', password: '' },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      if (isLogin) {
        const result = await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

        if (result.error) {
          setError('root', {
            message: result.error.message || 'Invalid email or password',
          });
        } else {
          // Successful login - redirect to dashboard
          router.push('/dashboard');
        }
      } else {
        const result = await authClient.signUp.email({
          email: data.email,
          password: data.password,
          name: data.name,
        });

        if (result.error) {
          setError('root', {
            message: result.error.message || 'Failed to create account',
          });
        } else {
          // Successful signup - redirect to dashboard
          router.push('/dashboard');
        }
      }
    } catch (error) {
      // Handle unexpected errors
      setError('root', {
        message: isLogin
          ? 'Invalid email or password'
          : 'Failed to create account',
      });
    } finally {
      setIsLoading(false);
    }
  };
  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='bg-gray-800 border-gray-700 text-gray-100'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl text-white'>
            {isLogin ? 'Welcome back' : 'Create your account'}
          </CardTitle>
          <CardDescription className='text-gray-400'>
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Create a new account to start tracking your habits'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            // onSubmit={handleSubmit(onSubmit)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FieldGroup>
              {!isLogin && (
                <Field>
                  <FieldLabel htmlFor='name' className='text-gray-200'>
                    Full Name
                  </FieldLabel>
                  <Input
                    id='name'
                    type='text'
                    placeholder='John Doe'
                    {...register('name')}
                    className='bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                  />
                  {errors.name && (
                    <p className='text-red-400 text-sm mt-1'>
                      {typeof errors.name === 'string'
                        ? errors.name
                        : errors.name?.message}
                    </p>
                  )}
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor='email' className='text-gray-200'>
                  Email
                </FieldLabel>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  {...register('email')}
                  className='bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                />
                {errors.email && (
                  <p className='text-red-400 text-sm mt-1'>
                    {typeof errors.email === 'string'
                      ? errors.email
                      : errors.email?.message}
                  </p>
                )}
              </Field>
              <Field>
                <div className='flex items-center'>
                  <FieldLabel htmlFor='password' className='text-gray-200'>
                    Password
                  </FieldLabel>
                  {isLogin && (
                    <a
                      href='#'
                      className='ml-auto text-sm text-blue-400 underline-offset-4 hover:underline'
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id='password'
                  type='password'
                  {...register('password')}
                  className='bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                />
                {errors.password && (
                  <p className='text-red-400 text-sm mt-1'>
                    {typeof errors.password === 'string'
                      ? errors.password
                      : errors.password?.message}
                  </p>
                )}
              </Field>
              <Field>
                <Button
                  type='submit'
                  className='bg-blue-700 hover:bg-blue-600 text-white font-semibold w-full'
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
                </Button>
                {errors.root && (
                  <p className='text-red-400 text-sm mt-2 text-center'>
                    {typeof errors.root === 'string'
                      ? errors.root
                      : errors.root?.message}
                  </p>
                )}
                <FieldDescription className='text-center text-gray-400'>
                  {isLogin ? (
                    <>
                      Don&apos;t have an account?{' '}
                      <a
                        href='/auth/signup'
                        className='text-blue-400 hover:underline'
                      >
                        Sign up
                      </a>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <a
                        href='/auth/login'
                        className='text-blue-400 hover:underline'
                      >
                        Log in
                      </a>
                    </>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className='px-6 text-center text-gray-400'>
        By clicking continue, you agree to our{' '}
        <a href='#' className='text-blue-400 hover:underline'>
          Terms of Service
        </a>{' '}
        and{' '}
        <a href='#' className='text-blue-400 hover:underline'>
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
