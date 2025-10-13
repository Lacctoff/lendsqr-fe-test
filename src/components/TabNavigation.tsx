'use client'

import React from 'react'

interface Tab {
  id: string
  label: string
  isActive?: boolean
}

interface TabNavigationProps {
  tabs: Tab[]
  onTabClick: (tabId: string) => void
  className?: string
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, onTabClick, className = '' }) => {
  return (
    <div className={`tab-navigation ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${tab.isActive ? 'active' : ''}`}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default TabNavigation
