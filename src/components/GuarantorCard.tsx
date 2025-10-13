'use client'

import React from 'react'
import { Guarantor } from '@/types/user'
import InfoField from './InfoField'

interface GuarantorCardProps {
  guarantor: Guarantor
  className?: string
}

const GuarantorCard: React.FC<GuarantorCardProps> = ({ guarantor, className = '' }) => {
  return (
    <div className={`guarantor-card ${className}`}>
      <div className="fields-grid">
        <InfoField
          label="FULL NAME"
          value={guarantor.fullName}
        />
        <InfoField
          label="PHONE NUMBER"
          value={guarantor.phoneNumber}
        />
        <InfoField
          label="EMAIL ADDRESS"
          value={guarantor.emailAddress}
        />
        <InfoField
          label="RELATIONSHIP"
          value={guarantor.relationship}
        />
      </div>
    </div>
  )
}

export default GuarantorCard
