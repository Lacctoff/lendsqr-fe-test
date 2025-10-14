'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './landing.scss'

const LandingPage = () => {
  const router = useRouter()
  const [displayedName, setDisplayedName] = useState('')
  const [showOccupation, setShowOccupation] = useState(false)
  const fullName = 'Oluwatofunmi Lasisi D.'
  
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayedName(fullName.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setShowOccupation(true)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  const handleLoginClick = () => {
    router.push('/login')
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="text-content">
          <h1 className="name-text">
            {displayedName}
            <span className="cursor-blink">|</span>
          </h1>
          
          <p className={`occupation-text ${showOccupation ? 'fade-in' : ''}`}>
            FE Assessment test Submission
          </p>
        </div>

        <button 
          className={`landing-login-btn ${showOccupation ? 'slide-up' : ''}`}
          onClick={handleLoginClick}
        >
          Proceed
          <span className="button-arrow">→</span>
        </button>
      </div>

      {/* Decorative background elements */}
      <div className="background-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  )
}

export default LandingPage

