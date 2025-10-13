import React from 'react'
import StatsCard from './StatsCard'
import { DashboardStats } from '@/utils'

const StatsGrid: React.FC = () => {
  return (
    <div className="stats-grid">
      {DashboardStats.map((stat, index) => (
        <StatsCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          figure={stat.figure}
          iconBgColor={stat.iconBgColor}
        />
      ))}
    </div>
  )
}

export default StatsGrid
