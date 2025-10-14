"use client"

import { Businesses, Customers, Dashboard, Logout, Organization, Settings } from '@/utils'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'
import NavHeaderCard from './shared/NavHeaderCard'

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const pathname = usePathname()

  const isActive = (route: string) => {
    // Handle exact matches
    if (pathname === route) {
      return true
    }
    
    // Handle nested routes (e.g., /users should be active for /users/user-details/123)
    if (route !== '#' && pathname.startsWith(route + '/')) {
      return true
    }
    
    return false
  }

  const handleLinkClick = () => {
    // Close sidebar when any link is clicked (mobile behavior)
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className='sidebar-overlay' onClick={onClose} aria-hidden="true" />
      )}
      
      <div className={`sidebar-wrapper ${isOpen ? 'sidebar-open' : ''}`}>
      
      {/* Lendsqr Logo for Mobile */}
      <div className="sidebar-logo-mobile">
        <Image src="/images/logo.svg" alt='lendsqr logo' width={145} height={30} />
      </div>

      {/* Switch organization */}
      <div className="sidebar-header">
      <ul>
          {Organization.map((item, index) => (
            <li key={index}>
              <Link href={item.route} onClick={handleLinkClick} className="nav-link-with-tooltip">
                <Image src={item.imgUrl} alt={item.label} width={16} height={16} />
                <span className="nav-text">{item.label}</span>
                <Image src={item.icon2} alt={item.label} width={14} height={14} />
                <span className="nav-tooltip">{item.label}</span>
              </Link>
            </li>
          ))}
      </ul>
      </div>

      {/* sidebar menu */}
      <nav>
        <div className='dashboard-menu'>
          <ul>
            {Dashboard.map((item, index) => (
              <li key={index}>
                <Link href={item.route} className={`nav-link-with-tooltip ${isActive(item.route) ? 'active' : ''}`} onClick={handleLinkClick}>
                  <Image src={item.imgUrl} alt={item.label} width={16} height={16} />
                  <span className="nav-text">{item.label}</span>
                  <span className="nav-tooltip">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <NavHeaderCard title="Customers" />

        {/* customers menu */}
        <div className='customers-menu'>
          <ul>
            {Customers.map((item, index) => (
              <li key={index}>
                <Link href={item.route} className={`nav-link-with-tooltip ${isActive(item.route) ? 'active' : ''}`} onClick={handleLinkClick}>
                  <Image src={item.imgUrl} alt={item.label} width={16} height={16} />
                  <span className="nav-text">{item.label}</span>
                  <span className="nav-tooltip">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <NavHeaderCard title="Business" />

        {/* business menu */}
        <div className='business-menu'>
          <ul>
            {Businesses.map((item, index) => (
              <li key={index}>
                <Link href={item.route} className={`nav-link-with-tooltip ${isActive(item.route) ? 'active' : ''}`} onClick={handleLinkClick}>
                  <Image src={item.imgUrl} alt={item.label} width={16} height={16} />
                  <span className="nav-text">{item.label}</span>
                  <span className="nav-tooltip">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <NavHeaderCard title="Settings" />
        {/* settings menu */}
        <div className='settings-menu'>
          <ul>
            {Settings.map((item, index) => (
              <li key={index}>
                <Link href={item.route} className={`nav-link-with-tooltip ${isActive(item.route) ? 'active' : ''}`} onClick={handleLinkClick}>
                  <Image src={item.imgUrl} alt={item.label} width={16} height={16} />
                  <span className="nav-text">{item.label}</span>
                  <span className="nav-tooltip">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* log out */}
        <div className='logout-menu'>
          <ul>
            <li>
              <Link href={Logout.route} className={`nav-link-with-tooltip ${isActive(Logout.route) ? 'active' : ''}`} onClick={handleLinkClick}>
                <Image src={Logout.imgUrl} alt={Logout.label} width={16} height={16} />
                <span className="nav-text">{Logout.label}</span>
                <span className="nav-tooltip">{Logout.label}</span>
              </Link>
            </li>
          </ul>

          <span className='version-number nav-text'>v1.2.0</span>
        </div>
      </nav>
    </div>
    </>
  )
}

export default Sidebar