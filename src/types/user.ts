// User Status Types
export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

// User Tier Types
export type UserTier = 1 | 2 | 3;

// Marital Status Types
export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed';

// Gender Types
export type Gender = 'Male' | 'Female' | 'Other';

// Education Level Types
export type EducationLevel = 'B.Sc' | 'M.Sc' | 'HND' | 'OND' | 'SSCE' | 'Primary' | 'PhD';

// Employment Status Types
export type EmploymentStatus = 'Employed' | 'Unemployed' | 'Self-employed' | 'Student' | 'Retired';

// Employment Sector Types
export type EmploymentSector = 'FinTech' | 'Banking' | 'Technology' | 'Healthcare' | 'Education' | 'Government' | 'Manufacturing' | 'Agriculture' | 'Real Estate' | 'Entertainment';

// Relationship Types
export type Relationship = 'Sister' | 'Brother' | 'Parent' | 'Spouse' | 'Friend' | 'Colleague' | 'Cousin' | 'Uncle' | 'Aunt';

// Residence Type Types
export type ResidenceType = "Parent's Apartment" | 'Own Apartment' | 'Rented Apartment' | 'Family House' | 'Hostel' | 'Office';

// Social Media Interface
export interface Socials {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

// Guarantor Interface
export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: Relationship;
}

// Main User Interface
export interface User {
  // Basic Information
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  
  // Profile Information
  profileImage?: string;
  userTier: UserTier;
  accountBalance: number;
  bankAccount: string;
  bankName: string;
  
  // Personal Information
  personalInfo: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    bvn: string;
    gender: Gender;
    maritalStatus: MaritalStatus;
    children: number;
    typeOfResidence: ResidenceType;
  };
  
  // Education and Employment
  educationAndEmployment: {
    levelOfEducation: EducationLevel;
    employmentStatus: EmploymentStatus;
    sectorOfEmployment: EmploymentSector;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: {
      min: number;
      max: number;
    };
    loanRepayment: number;
  };
  
  // Social Media
  socials: Socials;
  
  // Guarantor Information
  guarantor: Guarantor;
  
  // Additional Fields
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isBvnVerified: boolean;
}
