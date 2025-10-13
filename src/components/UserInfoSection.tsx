'use client'

import React from 'react'
import InfoField from './InfoField'

interface InfoFieldData {
  label: string
  value: string | number
}

interface UserInfoSectionProps {
  title: string
  fields: InfoFieldData[]
  className?: string
}

const UserInfoSection: React.FC<UserInfoSectionProps> = ({ title, fields, className = '' }) => {
  return (
    <div className={`user-info-section ${className}`}>
      <h3 className="section-title">{title}</h3>
      <div className="fields-grid">
        {fields.map((field, index) => (
          <InfoField
            key={index}
            label={field.label}
            value={field.value}
          />
        ))}
      </div>
    </div>
  )
}

export default UserInfoSection
