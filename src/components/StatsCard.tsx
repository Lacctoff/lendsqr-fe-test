import React from 'react'
import Image from 'next/image'

interface StatsCardProps {
  icon: string
  label: string
  figure: string
  iconBgColor: string
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, figure, iconBgColor }) => {
  return (
    <div className="stats-card">
      <div className="stats-card__icon" style={{ backgroundColor: iconBgColor }}>
        <Image src={icon} alt={label} width={20} height={20} style={{ objectFit: 'contain' }}/>
      </div>
      <div className="stats-card__content">
        <h3 className="stats-card__label">{label}</h3>
        <p className="stats-card__figure">{figure}</p>
      </div>
    </div>
  )
}

export default StatsCard
