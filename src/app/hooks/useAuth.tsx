import { useState, useMemo } from 'react';
import Cookies from 'js-cookie';
import AuthenticationRepository from '@/app/api/repositories/AuthenticationRepository';
import { AuthData, AuthLoginPostData } from '@/app/api/repositories/AuthenticationRepository';
import { IUser } from '@/app/api/interface/IUser';

export default function useAuth() {
  const [authData, setAuthData] = useState<AuthData | null>(() => {
    const savedAuthData = Cookies.get('authData');
    return savedAuthData && savedAuthData !== 'undefined' ? JSON.parse(savedAuthData) : null;
  });

  const [user, setUser] = useState<IUser | null>(() => {
    const savedUser = Cookies.get('userData');
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
      const loginPostData: AuthLoginPostData = { email, password: btoa(password) };
      const data = await AuthenticationRepository.authLogin(loginPostData);

      const { access_token, refresh_token, user } = data;
      const authData = JSON.stringify({ access_token, refresh_token });
      const userData = JSON.stringify(user);

      Cookies.set('authData', authData, { expires: 7 });
      Cookies.set('userData', userData, { expires: 7 });

      setAuthData({ access_token, refresh_token, user });
      setUser(user);

      return { access_token, refresh_token, user };
    } catch (error) {
      throw error;
    }
  };

  const logout = async (refreshToken: string) => {
    try {
      if (!refreshToken) throw Error('No refresh token');
      await AuthenticationRepository.authLogout(refreshToken);
      Cookies.remove('authData');
      Cookies.remove('userData');

      setAuthData(null);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
