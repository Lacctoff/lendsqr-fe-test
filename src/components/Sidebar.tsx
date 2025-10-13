'use client'

import { Businesses, Customers, Dashboard, Organization, Settings } from '@/utils'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'
import NavHeaderCard from './shared/NavHeaderCard'

const Sidebar = () => {
  const pathname = usePathname()

  const isActive = (route: string) => {
    return pathname === route
  }
  return (
    <div className='sidebar-wrapper'>
      {/* Switch organization */}
      <div className="sidebar-header">
      <ul>
          {Organization.map((item, index) => (
            <li key={index}>
              <Link href={item.route}>
                <Image src={item.imgUrl} alt={item.label} width={16} height={16} />
                <span>{item.label}</span>
                <Image src={item.icon2} alt={item.label} width={14} height={14} />
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
                <Link href={item.route} className={isActive(item.route) ? 'active' : ''}>
                  <Image src={item.imgUrl} alt={item.label} width={16} height={16} />
                  <span>{item.label}</span>
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
                <Link href={item.route} className={isActive(item.route) ? 'active' : ''}>
                  <Image src={item.imgUrl} alt={item.label} width={16} height={16} />
                  <span>{item.label}</span>
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
                <Link href={item.route} className={isActive(item.route) ? 'active' : ''}>
                  <Image src={item.imgUrl} alt={item.label} width={16} height={16} />
                  <span>{item.label}</span>
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
                <Link href={item.route} className={isActive(item.route) ? 'active' : ''}>
                  <Image src={item.imgUrl} alt={item.label} width={16} height={16} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar