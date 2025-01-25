"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useAuthGuard = () => {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('authToken');
        console.log('middleware');
        if (!token) {
            // router.push('auth/login');
        }
    }, [router]);
};

export default useAuthGuard;
