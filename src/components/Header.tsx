"use client"

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './ui/SearchBar';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className='nav-bar-fixed'>
      <div className='navbar-container'>
        <div className="header-left">
          {isMobile ? (
            <button className="hamburger-menu-btn" aria-label="Menu" onClick={onMenuClick}>
              <Image src="/icons/hamburger.svg" alt='menu' width={24} height={24} className='hamburger-icon'/>
            </button>
          ) : (
            <Image src="/images/logo.svg" alt='lendsqr logo' width={145} height={30} className='logo'/>
          )}
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="header-right">
          <Link href="#" className="docs-link desktop-only">Docs</Link>
          
          <button className="notifications-btn desktop-only">
            <Image src="/icons/notification-bell.svg" alt='notification' width={26} height={26} className='notification-icon'/>
          </button>

          <div className="user-profile-wrapper" ref={dropdownRef}>
            <div className="user-profile" onClick={toggleDropdown}>
              <Image
                src="/images/profile-image.png"
                alt="User Profile"
                width={48}
                height={48}
                className="profile-image"
              />
              <span className="username">Adedeji</span>
              <Image src="/icons/arrow-drop-down.svg" alt='chevron down' width={8} height={5} className='chevron-down-icon'/>
            </div>

            {isDropdownOpen && (
              <div className="user-dropdown">
                <Link href="#" className="dropdown-item docs-item">
                  <span>Docs</span>
                </Link>
                
                <button className="dropdown-item notification-item">
                  <Image src="/icons/notification-bell.svg" alt='notification' width={20} height={20} className='dropdown-notification-icon'/>
                  <span>Notifications</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;