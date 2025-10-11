import React from 'react'
import FloatingInput from './ui/FloatingInput'
import Link from 'next/link'

const AuthForm = () => {
  return (
    <form className='auth-form-wrapper' >
      <FloatingInput label='Email' type='email' />
      <FloatingInput label='Password' type='password' />
      <Link href="#" className="forgot-password-link">FORGOT PASSWORD?</Link>
      <button type='submit' className="login-button">LOG IN</button>
    </form>
  )
}

export default AuthForm