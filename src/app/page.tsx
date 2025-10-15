'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LandingPage = () => {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/login')
  }, [router])
  return null
}

export default LandingPage

