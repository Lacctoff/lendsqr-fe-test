"use client"

import Image from 'next/image';
import React from 'react';
import SearchBar from './ui/SearchBar';
import Link from 'next/link';

const Header = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <header className='nav-bar-fixed'>
      <div className='navbar-container'>
        <div className="header-left">
          <Image src="/images/logo.svg" alt='lendsqr logo' width={145} height={30} className='logo'/>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="header-right">
          <Link href="#" className="docs-link">Docs</Link>
          
          <button className="notifications-btn">
            <Image src="/icons/notification-bell.svg" alt='notification' width={26} height={26} className='notification-icon'/>
          </button>

          <div className="user-profile">
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
        </div>
      </div>
    </header>
  );
};

export default Header;