import React from 'react'
import './LoginPage.scss'

const page = () => {
  return (
    <div className="auth-form-content">
      <h1 className="font-avenir font-bold text-huge">Welcome!</h1>
      <p className="font-work-sans font-regular text-md">Enter details to login.</p>
      
      {/* Test different fonts */}
      <div className="font-test">
        <p className="font-avenir font-regular text-sm">Avenir Next - Primary font</p>
        <p className="font-work-sans font-medium text-sm">Work Sans - Secondary font</p>
        <p className="font-sf-compact font-heavy text-lg">2,453 - SF Compact for numbers</p>
        <p className="font-roboto font-regular text-sm">Roboto - Data font</p>
        <p className="font-inter font-medium text-sm">Inter - Modern UI font</p>
      </div>
    </div>
  );
}

export default page
