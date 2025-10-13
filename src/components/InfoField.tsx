'use client'

import React from 'react'

interface InfoFieldProps {
  label: string
  value: string | number
  className?: string
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, className = '' }) => {
  return (
    <div className={`info-field ${className}`}>
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  )
}

export default InfoField
