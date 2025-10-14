'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { User } from '@/types/user'
import { mockUsers } from '@/utils/mockData'
import TitleHeader from '@/components/shared/TitleHeader'
import UserProfileCard from '@/components/UserProfileCard'
import TabNavigation from '@/components/TabNavigation'
import UserInfoSection from '@/components/UserInfoSection'
import GuarantorCard from '@/components/GuarantorCard'
import ActionButtons from '@/components/ActionButtons'
import Loader from '@/components/Loader'

const UserDetails = () => {
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState('general')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundUser = mockUsers.find(u => u.id === params.id)
      setUser(foundUser || null)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  const handleBlacklist = () => {
    console.log('Blacklist user:', user?.id)
  }

  const handleActivate = () => {
    console.log('Activate user:', user?.id)
  }

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
  }

  if (isLoading) {
    return <Loader size="large" text="Loading user details..." />
  }

  if (!user) {
    return (
      <div className="user-details-page">
        <div className="error-state">
          <h2>User not found</h2>
          <p>The user you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/users" className="back-link">
            <Image src="/icons/back-dash-icon.svg" alt="Back" width={16} height={16} />
            <span>Back to Users</span>
          </Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'general', label: 'General Details', isActive: activeTab === 'general' },
    { id: 'documents', label: 'Documents', isActive: activeTab === 'documents' },
    { id: 'bank', label: 'Bank Details', isActive: activeTab === 'bank' },
    { id: 'loans', label: 'Loans', isActive: activeTab === 'loans' },
    { id: 'savings', label: 'Savings', isActive: activeTab === 'savings' },
    { id: 'app', label: 'App and System', isActive: activeTab === 'app' },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="user-details-page">
      <Link href="/users" className="back-navigation">
        <Image src="/icons/back-dash-icon.svg" alt="Back" width={16} height={16} />
        <span>Back to Users</span>
      </Link>

      <div className="page-header">
        <TitleHeader title="User Details" />
        <ActionButtons onBlacklist={handleBlacklist} onActivate={handleActivate} />
      </div>

      <div className="user-profile-container">
        <UserProfileCard user={user} />
        <TabNavigation tabs={tabs} onTabClick={handleTabClick} />
      </div>

      <div className="tab-content">
        <div className={`tab-panel ${activeTab === 'general' ? 'active' : ''}`}>
          {activeTab === 'general' && (
            <div className="general-details">
            <UserInfoSection
              title="Personal Information"
              fields={[
                { label: 'FULL NAME', value: user.personalInfo.fullName },
                { label: 'PHONE NUMBER', value: user.personalInfo.phoneNumber },
                { label: 'EMAIL ADDRESS', value: user.personalInfo.emailAddress },
                { label: 'BVN', value: user.personalInfo.bvn },
                { label: 'GENDER', value: user.personalInfo.gender },
                { label: 'MARITAL STATUS', value: user.personalInfo.maritalStatus },
                { label: 'CHILDREN', value: user.personalInfo.children === 0 ? 'None' : user.personalInfo.children },
                { label: 'TYPE OF RESIDENCE', value: user.personalInfo.typeOfResidence },
              ]}
            />

            <UserInfoSection
              title="Education and Employment"
              fields={[
                { label: 'LEVEL OF EDUCATION', value: user.educationAndEmployment.levelOfEducation },
                { label: 'EMPLOYMENT STATUS', value: user.educationAndEmployment.employmentStatus },
                { label: 'SECTOR OF EMPLOYMENT', value: user.educationAndEmployment.sectorOfEmployment },
                { label: 'DURATION OF EMPLOYMENT', value: user.educationAndEmployment.durationOfEmployment },
                { label: 'OFFICE EMAIL', value: user.educationAndEmployment.officeEmail },
                { label: 'MONTHLY INCOME', value: `${formatCurrency(user.educationAndEmployment.monthlyIncome.min)}-${formatCurrency(user.educationAndEmployment.monthlyIncome.max)}` },
                { label: 'LOAN REPAYMENT', value: formatCurrency(user.educationAndEmployment.loanRepayment) },
              ]}
            />

            <UserInfoSection
              title="Socials"
              fields={[
                { label: 'TWITTER', value: user.socials.twitter || 'N/A' },
                { label: 'FACEBOOK', value: user.socials.facebook || 'N/A' },
                { label: 'INSTAGRAM', value: user.socials.instagram || 'N/A' },
              ]}
            />

            <div className="guarantor-section">
              <h3 className="section-title">Guarantor</h3>
              <GuarantorCard guarantor={user.guarantor} />
            </div>
          </div>
          )}
        </div>

        <div className={`tab-panel ${activeTab === 'documents' ? 'active' : ''}`}>
          {activeTab === 'documents' && (
            <div className="documents-tab">
              <p>Documents content will be implemented here.</p>
            </div>
          )}
        </div>

        <div className={`tab-panel ${activeTab === 'bank' ? 'active' : ''}`}>
          {activeTab === 'bank' && (
            <div className="bank-tab">
              <p>Bank details content will be implemented here.</p>
            </div>
          )}
        </div>

        <div className={`tab-panel ${activeTab === 'loans' ? 'active' : ''}`}>
          {activeTab === 'loans' && (
            <div className="loans-tab">
              <p>Loans content will be implemented here.</p>
            </div>
          )}
        </div>

        <div className={`tab-panel ${activeTab === 'savings' ? 'active' : ''}`}>
          {activeTab === 'savings' && (
            <div className="savings-tab">
              <p>Savings content will be implemented here.</p>
            </div>
          )}
        </div>

        <div className={`tab-panel ${activeTab === 'app' ? 'active' : ''}`}>
          {activeTab === 'app' && (
            <div className="app-tab">
              <p>App and System content will be implemented here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDetails