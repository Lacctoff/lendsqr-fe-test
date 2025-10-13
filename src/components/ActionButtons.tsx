'use client'

import React from 'react'

interface ActionButtonsProps {
  onBlacklist: () => void
  onActivate: () => void
  className?: string
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onBlacklist, onActivate, className = '' }) => {
  return (
    <div className={`action-buttons ${className}`}>
      <button
        className="blacklist-btn"
        onClick={onBlacklist}
      >
        BLACKLIST USER
      </button>
      <button
        className="activate-btn"
        onClick={onActivate}
      >
        ACTIVATE USER
      </button>
    </div>
  )
}

export default ActionButtons
