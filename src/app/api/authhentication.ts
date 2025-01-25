import Cookies from 'js-cookie';
import axios from '@/lib/axiosConfig';

export const login = async (email: string, password: string) => {
    const response = await axios.post('/auth/login', { email, password });
    const { token } = response.data;
    Cookies.set('authToken', token, { expires: 7 });
    return response.data;
};

export const logout = () => {
    Cookies.remove('authToken');
};
