'use client';

import React from 'react';
import DashLearnLayout from '@/app/components/DashLearnLayout';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import InputField from '@/app/components/input/InputField';
import SelectField from '@/app/components/input/SelectField';
import FileInputField from '@/app/components/input/FileInputField';

interface UserFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'Admin' | 'User' | 'Instructor' | 'Student';
  profilePicture: File | null;
}

const UserForm: React.FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'User',
      profilePicture: null,
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);

    try {
      console.log('User data submitted:', data);
      reset(); // Reset the form fields
      router.push('/users'); // Redirect to users page
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashLearnLayout>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="max-w-7xl w-full p-8 bg-white shadow-xl rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New User</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Full name is required' }}
              render={({ field }) => (
                <InputField
                  label="Full Name"
                  {...field}
                  error={errors.name?.message}
                  placeHolder="Full Name"
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
                />
              )}
            />

            {/* Role Field */}
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Role"
                  {...field}
                  onChange={(value) => field.onChange(value)} // Pass the selected value to the form state
                  options={['Instructor', 'Student', 'Admin']}
                  error={errors.role?.message}
                  placeholder="Select Role"
                />
              )}
            />

            {/* Profile Picture Field */}
            <Controller
              name="profilePicture"
              control={control}
              render={({ field }) => (
                <FileInputField
                  label="Profile Picture"
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                  error={errors.profilePicture?.message}
                  placeholder="Choose a file"
                  accept="image/*"
                />
              )}
            />

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Submitting...' : 'Add User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashLearnLayout>
  );
};

export default UserForm;
