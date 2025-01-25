'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import InputField from '@/app/components/input/InputField'; // Assuming you have an InputField component
import Link from 'next/link';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        reset(); // Reset the form fields
        router.push('/auth/login'); // Redirect to login page
      } else {
        // Handle errors
        console.error(responseData.error || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-700 text-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-teal-500 text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name Field */}
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <InputField
                label="First Name"
                {...field}
                error={errors.firstName?.message}
                placeHolder="First Name"
                icon={<UserIcon className="h-5 w-5 text-teal-500" />}
              />
            )}
          />

          {/* Last Name Field */}
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field }) => (
              <InputField
                label="Last Name"
                {...field}
                error={errors.lastName?.message}
                placeHolder="Last Name"
                icon={<UserIcon className="h-5 w-5 text-teal-500" />}
              />
            )}
          />

          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email address is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email address' },
            }}
            render={({ field }) => (
              <InputField
                label="Email Address"
                {...field}
                error={errors.email?.message}
                placeHolder="Email Address"
                icon={<EnvelopeIcon className="h-5 w-5 text-teal-500" />}
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
                placeHolder="Password"
                icon={<LockClosedIcon className="h-5 w-5 text-teal-500" />} // Add the LockClosedIcon
              />
            )}
          />

          {/* Confirm Password Field */}
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: (value) =>
                value === control._formValues.password || 'Passwords do not match',
            }}
            render={({ field }) => (
              <InputField
                label="Confirm Password"
                type="password"
                {...field}
                error={errors.confirmPassword?.message}
                placeHolder="Confirm Password"
                icon={<LockClosedIcon className="h-5 w-5 text-teal-500" />} // Add the LockClosedIcon
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
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-300">
            Already have an account?
            <Link href="/auth/login" className="text-teal-500 hover:text-teal-700 ml-1 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
