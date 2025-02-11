import { useState, useCallback, useMemo } from 'react';
import UserRepository from '@/app/api/repositories/UserRepository';
import { IUser } from '@/app/api/interface/IUser';

export default function useUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
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
      setError(null);
    }
  };

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    setLoadingState(true);
    try {
      const data = await UserRepository.getUsers();
      setUsers(data);
      return data;
    } catch (err: unknown) {
      handleError('Failed to fetch users', err);
      return [];
    } finally {
      setLoadingState(false);
    }
  }, []);

  // Fetch a single user by ID
  const fetchUser = useCallback(
    async (id: number): Promise<IUser | null> => {
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
    () => (id: number): IUser | null => users.find((user) => user.id === id) || null,
    [users]
  );

  // Add a new user
  const addUser = async (userData: Omit<IUser, 'id'>) => {
    setError(null);
    try {
      const newUser = await UserRepository.createUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (err: unknown) {
      handleError('Failed to add user', err);
    }
  };

  // Update an existing user
  const updateUser = async (id: number, updatedUserData: Partial<IUser>) => {
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
      await fetchUsers();
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
