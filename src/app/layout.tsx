'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';

import './styles/globals.css';
import 'nprogress/nprogress.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathName = usePathname();
  const isLoginOrSignup = pathName === '/auth/login' || pathName === '/auth/signup';

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Aspire Learn</title>
      </head>
      <body className="flex flex-col h-screen">
        {!isLoginOrSignup && <Header />}
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
