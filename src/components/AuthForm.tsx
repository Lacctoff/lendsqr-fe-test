'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import FloatingInput from './ui/FloatingInput'
import Link from 'next/link'

const AuthForm = () => {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/users')
  }

  return (
    <form className='auth-form-wrapper' autoComplete="off" onSubmit={handleSubmit}>
      {/* Hidden inputs to trick browser autofill - browsers will ignore this LOL */}
      <input type="text" style={{ display: 'none' }} autoComplete="username" />
      <input type="password" style={{ display: 'none' }} autoComplete="current-password" />
      
      <FloatingInput label='Email' type='email' />
      <FloatingInput label='Password' type='password' />
      <Link href="#" className="forgot-password-link">FORGOT PASSWORD?</Link>
      <button type='submit' className="login-button">LOG IN</button>
    </form>
  )
}

export default AuthForm