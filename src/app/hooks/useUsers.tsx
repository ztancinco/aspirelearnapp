import { useState, useCallback, useMemo } from 'react';
import UserRepository from '@/app/api/repositories/UserRepository';
import { User } from '@/app/api/interface/User';

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
      const data = await UserRepository.getUsers();
      setUsers(data);
    } catch (err: unknown) {
      handleError('Failed to fetch users', err);
    } finally {
      setLoadingState(false);
    }
  }, []);

  // Fetch a single user by ID
  const fetchUser = useCallback(
    async (id: number): Promise<User | null> => {
      const cachedUser = users.find((user) => user.id === id);
      if (cachedUser) return cachedUser;
      setLoadingState(true);
      try {
        return await UserRepository.getUser(id);
      } catch (err: unknown) {
        handleError('Failed to fetch user', err);
        return null;
      } finally {
        setLoadingState(false);
      }
    },
    [users]
  );

  const getUsers = useMemo(() => users, [users]);
  const getUser = useMemo(
    () => (id: number): User | null => users.find((user) => user.id === id) || null,
    [users]
  );

  // Add a new user
  const addUser = async (userData: Omit<User, 'id'>) => {
    setError(null);
    try {
      const newUser = await UserRepository.createUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (err: unknown) {
      handleError('Failed to add user', err);
    }
  };

  // Update an existing user
  const updateUser = async (id: number, updatedUserData: Partial<User>) => {
    setError(null);
    try {
      const updatedUser = await UserRepository.updateUser(id, updatedUserData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
      );
    } catch (err: unknown) {
      handleError('Failed to update user', err);
    }
  };

  // Delete a user
  const deleteUser = async (id: number) => {
    setError(null);
    try {
      await UserRepository.deleteUser(id);
      await fetchUsers(); // Refresh the user list after deletion
    } catch (err: unknown) {
      handleError('Failed to delete user', err);
    }
  };

  return {
    users: getUsers,
    loading,
    error,
    fetchUsers,
    fetchUser,
    getUser,
    addUser,
    updateUser,
    deleteUser,
  };
}
