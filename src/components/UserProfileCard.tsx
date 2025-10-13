'use client'

import React from 'react'
import Image from 'next/image'
import { User } from '@/types/user'

interface UserProfileCardProps {
  user: User
  className?: string
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, className = '' }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const renderStars = (tier: number) => {
    const stars = []
    for (let i = 1; i <= 3; i++) {
      if (i <= tier) {
        stars.push(
          <Image
            key={i}
            src="/icons/star-filled.svg"
            alt="Filled star"
            width={16}
            height={16}
          />
        )
      } else {
        stars.push(
          <Image
            key={i}
            src="/icons/star-outline.svg"
            alt="Empty star"
            width={16}
            height={16}
          />
        )
      }
    }
    return stars
  }

  return (
    <div className={`user-profile-card ${className}`}>
      <div className="profile-section">
        <div className="user-avatar">
          <Image
            src="/icons/alternative-user-image.svg"
            alt="User avatar"
            width={30}
            height={30}
          />
        </div>
        <div className="user-info">
          <h2 className="user-name">{user.personalInfo.fullName}</h2>
          <p className="user-id">{user.id}</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="tier-section">
        <p className="tier-label">User's Tier</p>
        <div className="star-rating">
          {renderStars(user.userTier)}
        </div>
      </div>

      <div className="divider"></div>

      <div className="financial-section">
        <p className="amount">{formatCurrency(user.accountBalance)}</p>
        <p className="bank-details">{user.bankAccount}/{user.bankName}</p>
      </div>
    </div>
  )
}

export default UserProfileCard
