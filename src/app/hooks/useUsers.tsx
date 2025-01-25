import { useState, useCallback } from 'react';
import axios from '@/lib/axiosConfig';
import { User } from '../api/interface/user';

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to handle errors
  const handleError = (errorMessage: string, error: unknown) => {
    setError(errorMessage);
    console.error(errorMessage, error);
  };

  // Helper to manage loading and error states
  const setLoadingState = (loadingState: boolean) => {
    setLoading(loadingState);
    if (!loadingState) {
      setError(null); // Clear error when loading ends
    }
  };

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    setLoadingState(true);
    try {
      const { data } = await axios.get<User[]>('/users/');
      setUsers(data);
    } catch (err: unknown) {
      handleError('Failed to fetch users', err);
    } finally {
      setLoadingState(false);
    }
  }, []);

  // Fetch a single user by ID (optimized to check cache)
  const fetchUser = useCallback(
    async (id: number): Promise<User | null> => {
      const cachedUser = users.find((user) => user.id === id);
      if (cachedUser) return cachedUser; // Return cached user if available

      setLoadingState(true);
      try {
        const { data } = await axios.get<User[]>(`/users/`, {
          params: { user_id: id },
        });
        return data.length > 0 ? data[0] : null;
      } catch (err: unknown) {
        handleError('Failed to fetch user', err);
        return null;
      } finally {
        setLoadingState(false);
      }
    },
    [users]
  );

  // Add a new user
  const addUser = async (userData: User) => {
    setError(null);
    try {
      const { data: newUser } = await axios.post<User>('/users/', userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (err: unknown) {
      handleError('Failed to add user', err);
    }
  };

  // Update an existing user
  const updateUser = async (id: number, updatedUserData: Partial<User>) => {
    setError(null);
    try {
      const { data: updatedUser } = await axios.put<User>(`/users/`, updatedUserData, {
        params: { user_id: id },
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );
    } catch (err: unknown) {
      handleError('Failed to update user', err);
    }
  };

  // Delete a user
  const deleteUser = async (id: number) => {
    setError(null);
    try {
      await axios.delete(`/users`, {
        params: { user_id: id },
      });
      await fetchUsers(); // Refresh the user list after deletion
    } catch (err: unknown) {
      handleError('Failed to delete user', err);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchUser,
    addUser,
    updateUser,
    deleteUser,
  };
}
