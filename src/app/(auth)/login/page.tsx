import React from 'react'
import './LoginPage.scss'
import Image from 'next/image';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="auth-form-content">
      {/* logo to be displayed on mobile devices only */}
      <Image src="/images/auth-mobile-logo.svg" alt="Lendsqr Logo" width={176} height={36} className='auth-form-logo' />

      <h1 className="font-bold text-huge">Welcome!</h1>
      <p className="font-regular text-md">Enter details to login.</p>
      
      {/* Form Component */}
      <div className="auth-form-container">
        <AuthForm />  
      </div>
    </div>
  );
}

export default LoginPage
