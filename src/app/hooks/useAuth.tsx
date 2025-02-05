import { useState, useMemo } from 'react';
import Cookies from 'js-cookie';
import AuthenticationRepository from '@/app/api/repositories/AuthenticationRepository';
import { AuthData, AuthLoginPostData } from '@/app/api/repositories/AuthenticationRepository';
import { User } from '@/app/api/interface/user';

export default function useAuth() {
  const [authData, setAuthData] = useState<AuthData | null>(() => {
    const savedAuthData = Cookies.get('authData');
    return savedAuthData && savedAuthData !== 'undefined' ? JSON.parse(savedAuthData) : null;
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = Cookies.get('user');
    return savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null;
  });

  const getUserData = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  const getUserAuthData = useMemo(() => {
    return authData ? { ...authData } : null;
  }, [authData]);

  const login = async (email: string, password: string) => {
    try {
      const loginPostData: AuthLoginPostData = { email, password };
      const data = await AuthenticationRepository.authLogin(loginPostData);

      const { access_token, refresh_token, user } = data;
      const authData = JSON.stringify({ access_token, refresh_token });
      const userData = JSON.stringify(user);
      
      Cookies.set('authData', authData, { expires: 7 });
      Cookies.set('user', userData, { expires: 7 });

      setAuthData({ access_token, refresh_token, user });
      setUser(user);

      return { access_token, refresh_token, user };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthenticationRepository.authLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }

    Cookies.remove('authData');
    Cookies.remove('user');

    setAuthData(null);
    setUser(null);
  };

  return {
    authData,
    user,
    getUserData,
    getUserAuthData,
    login,
    logout,
  };
}
