'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import InputField from '@/app/components/input/InputField';
import Link from 'next/link';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        router.push('/');
      } else {
        setError(responseData.error || 'An error occurred');
      }
    } catch {
      setError('An error occurred while logging in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-700 text-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-teal-500 text-center mb-6">Login</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <InputField
                label="email"
                {...field}
                error={errors.email?.message}
                placeHolder="Enter your email"
                icon={<UserIcon className="h-5 w-5 text-teal-500" />}
              />
            )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <InputField
                label="Password"
                type="password"
                {...field}
                error={errors.password?.message}
                placeHolder="Enter your password"
                icon={<LockClosedIcon className="h-5 w-5 text-teal-500" />}
              />
            )}
          />

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-300">
            Do not have an account?
            <Link href="/auth/signup" className="text-teal-500 hover:text-teal-700 ml-1 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
