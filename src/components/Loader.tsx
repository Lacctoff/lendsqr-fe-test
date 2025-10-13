'use client'

import React from 'react'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium', 
    large: 'spinner-large'
  }

  return (
    <div className="loader-container">
      <div className={`spinner ${sizeClasses[size]}`}></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  )
}

export default Loader
