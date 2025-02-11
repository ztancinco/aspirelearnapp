'use client';

import React from 'react';
import DashLearnLayout from '@/app/components/DashLearnLayout';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import InputField from '@/app/components/input/InputField';
import SelectField from '@/app/components/input/SelectField';
import UserRepository from '@/app/api/repositories/UserRepository';

interface UserFormData {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'Admin' | 'Instructor' | 'Student';
  is_active?: boolean;
  date_joined?: string;
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
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Instructor',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('firstname', data.firstname);
      formData.append('lastname', data.lastname);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('role', data.role);

      await UserRepository.createUser({
        username: data.username,
        first_name: data.firstname,
        last_name: data.lastname,
        email: data.email,
        password: data.password,
        role: data.role.trim().toLowerCase(),
        is_active: true,
        date_joined: new Date().toISOString(),
      });

      reset();
      router.push('/admin/users');
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashLearnLayout>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-full p-8 bg-white shadow-xl rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New User</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            <Controller
              name="username"
              control={control}
              rules={{ required: 'Username is required' }}
              render={({ field }) => (
                <InputField label="Username" {...field} error={errors.username?.message} placeHolder="Username" />
              )}
            />

            {/* First Name Field */}
            <Controller
              name="firstname"
              control={control}
              rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <InputField label="First Name" {...field} error={errors.firstname?.message} placeHolder="First Name" />
              )}
            />

            {/* Last Name Field */}
            <Controller
              name="lastname"
              control={control}
              rules={{ required: 'Last name is required' }}
              render={({ field }) => (
                <InputField label="Last Name" {...field} error={errors.lastname?.message} placeHolder="Last Name" />
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
                <InputField label="Email Address" {...field} error={errors.email?.message} placeHolder="Email Address" />
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <InputField label="Password" type="password" {...field} error={errors.password?.message} placeHolder="Password" />
              )}
            />

            {/* Confirm Password Field */}
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: 'Confirm Password is required',
                validate: (value) => value === control._formValues.password || 'Passwords do not match',
              }}
              render={({ field }) => (
                <InputField label="Confirm Password" type="password" {...field} error={errors.confirmPassword?.message} placeHolder="Confirm Password" />
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
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  options={['Instructor', 'Student', 'Admin']}
                  error={errors.role?.message}
                  placeholder="Select Role"
                />
              )}
            />
            {/* Profile Picture Field */}
            {/* <Controller
              name="profilePicture"
              control={control}
              render={({ field }) => (
                <FileInputField label="Profile Picture" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} error={errors.profilePicture?.message} placeholder="Choose a file" accept="image/*" />
              )}
            /> */}

            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
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
