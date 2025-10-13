import { User, UserStatus, UserTier, MaritalStatus, Gender, EducationLevel, EmploymentStatus, EmploymentSector, Relationship, ResidenceType } from '@/types/user';

// Nigerian Organizations
const organizations = [
  'Lendsqr', 'Irorun', 'Lendstar', 'Paystack', 'Flutterwave', 'Interswitch', 
  'Kuda', 'Carbon', 'Fairmoney', 'Branch', 'Renmoney', 'Aella', 'Palmcredit',
  'Quickfund', 'Migo', 'Kiakia', 'Payhippo', 'C24', 'Lidya', 'Credpal'
];

// Nigerian First Names
const firstNames = [
  'Adedeji', 'Grace', 'Tosin', 'Debby', 'Chinedu', 'Fatima', 'Emmanuel', 'Blessing',
  'Oluwaseun', 'Aisha', 'Ibrahim', 'Chioma', 'Kemi', 'Tunde', 'Funmi', 'Segun',
  'Ngozi', 'Yusuf', 'Bimbo', 'Femi', 'Kemi', 'Tolu', 'Wale', 'Bisi', 'Kunle',
  'Folake', 'Gbenga', 'Tope', 'Lola', 'Seun', 'Bukola', 'Dayo', 'Temi', 'Yemi',
  'Sade', 'Bola', 'Kemi', 'Tayo', 'Wumi', 'Bimpe', 'Tunde', 'Funke', 'Seun',
  'Bukky', 'Tope', 'Lola', 'Gbemi', 'Tolu', 'Kemi', 'Wale', 'Bisi', 'Kunle',
  'Folake', 'Gbenga', 'Tope', 'Lola', 'Seun', 'Bukola', 'Dayo', 'Temi'
];

// Nigerian Last Names
const lastNames = [
  'Effiom', 'Ogana', 'Dokunmu', 'Adebayo', 'Okafor', 'Ibrahim', 'Okonkwo', 'Adebisi',
  'Ogunleye', 'Adeyemi', 'Oluwaseun', 'Chukwu', 'Adeleke', 'Okafor', 'Ibrahim', 'Okonkwo',
  'Adebisi', 'Ogunleye', 'Adeyemi', 'Oluwaseun', 'Chukwu', 'Adeleke', 'Okafor', 'Ibrahim',
  'Okonkwo', 'Adebisi', 'Ogunleye', 'Adeyemi', 'Oluwaseun', 'Chukwu', 'Adeleke', 'Okafor',
  'Ibrahim', 'Okonkwo', 'Adebisi', 'Ogunleye', 'Adeyemi', 'Oluwaseun', 'Chukwu', 'Adeleke',
  'Okafor', 'Ibrahim', 'Okonkwo', 'Adebisi', 'Ogunleye', 'Adeyemi', 'Oluwaseun', 'Chukwu'
];

// Nigerian Banks
const banks = [
  'Providus Bank', 'Access Bank', 'GTBank', 'First Bank', 'Zenith Bank', 'UBA',
  'Stanbic IBTC', 'Fidelity Bank', 'Union Bank', 'Wema Bank', 'Polaris Bank',
  'Sterling Bank', 'FCMB', 'Heritage Bank', 'Jaiz Bank', 'Keystone Bank'
];

// Nigerian Email Domains
const emailDomains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'lendsqr.com',
  'irorun.com', 'lendstar.com', 'paystack.com', 'flutterwave.com'
];

// Social Media Handles
const socialHandles = [
  'grace_effiom', 'tosin_dokunmu', 'debby_ogana', 'chinedu_adebayo',
  'fatima_ibrahim', 'emmanuel_okonkwo', 'blessing_adebisi', 'oluwaseun_adeyemi',
  'aisha_chukwu', 'ibrahim_adeleke', 'chioma_okafor', 'kemi_ogunleye',
  'tunde_adeyemi', 'funmi_oluwaseun', 'segun_chukwu', 'ngozi_adeleke'
];

// Seeded Random Number Generator for consistent results across server and client
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(max: number): number {
    return Math.floor(this.next() * max);
  }
}

// Helper Functions with seeded random
const getRandomItem = <T>(array: T[], rng: SeededRandom): T => array[rng.nextInt(array.length)];

const getRandomDate = (start: Date, end: Date, rng: SeededRandom): string => {
  const date = new Date(start.getTime() + rng.next() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const generatePhoneNumber = (rng: SeededRandom): string => {
  const prefixes = ['080', '081', '070', '090', '091'];
  const prefix = getRandomItem(prefixes, rng);
  const number = rng.nextInt(100000000).toString().padStart(8, '0');
  return prefix + number;
};

const generateBVN = (rng: SeededRandom): string => {
  return rng.nextInt(10000000000).toString().padStart(10, '0');
};

const generateAccountNumber = (rng: SeededRandom): string => {
  return rng.nextInt(10000000000).toString().padStart(10, '0');
};

const generateSocialHandle = (firstName: string, lastName: string, rng: SeededRandom): string => {
  const handle = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
  return rng.next() > 0.5 ? handle : getRandomItem(socialHandles, rng);
};

// Generate Mock User Data
export const generateMockUsers = (count: number = 500, seed: number = 12345): User[] => {
  const users: User[] = [];
  const startDate = new Date('2020-01-01');
  const endDate = new Date();
  const rng = new SeededRandom(seed);

  for (let i = 0; i < count; i++) {
    const firstName = getRandomItem(firstNames, rng);
    const lastName = getRandomItem(lastNames, rng);
    const organization = getRandomItem(organizations, rng);
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}@${getRandomItem(emailDomains, rng)}`;
    const phoneNumber = generatePhoneNumber(rng);
    const bvn = generateBVN(rng);
    const bankAccount = generateAccountNumber(rng);
    const bankName = getRandomItem(banks, rng);
    const dateJoined = getRandomDate(startDate, endDate, rng);
    const status = getRandomItem(['Active', 'Inactive', 'Pending', 'Blacklisted'] as UserStatus[], rng);
    const userTier = getRandomItem([1, 2, 3] as UserTier[], rng);
    const gender = getRandomItem(['Male', 'Female'] as Gender[], rng);
    const maritalStatus = getRandomItem(['Single', 'Married', 'Divorced', 'Widowed'] as MaritalStatus[], rng);
    const educationLevel = getRandomItem(['B.Sc', 'M.Sc', 'HND', 'OND', 'SSCE', 'Primary', 'PhD'] as EducationLevel[], rng);
    const employmentStatus = getRandomItem(['Employed', 'Unemployed', 'Self-employed', 'Student', 'Retired'] as EmploymentStatus[], rng);
    const sectorOfEmployment = getRandomItem(['FinTech', 'Banking', 'Technology', 'Healthcare', 'Education', 'Government', 'Manufacturing', 'Agriculture', 'Real Estate', 'Entertainment'] as EmploymentSector[], rng);
    const relationship = getRandomItem(['Sister', 'Brother', 'Parent', 'Spouse', 'Friend', 'Colleague', 'Cousin', 'Uncle', 'Aunt'] as Relationship[], rng);
    const residenceType = getRandomItem(["Parent's Apartment", 'Own Apartment', 'Rented Apartment', 'Family House', 'Hostel', 'Office'] as ResidenceType[], rng);
    
    // Generate guarantor with different name
    const guarantorFirstName = getRandomItem(firstNames, rng);
    const guarantorLastName = getRandomItem(lastNames, rng);
    const guarantorFullName = `${guarantorFirstName} ${guarantorLastName}`;
    const guarantorEmail = `${guarantorFirstName.toLowerCase()}@${getRandomItem(emailDomains, rng)}`;
    const guarantorPhone = generatePhoneNumber(rng);

    const user: User = {
      id: `LSQFf${i.toString().padStart(9, '0')}`,
      organization,
      username: fullName,
      email,
      phoneNumber,
      dateJoined,
      status,
      userTier,
      accountBalance: rng.nextInt(1000000) + 50000,
      bankAccount,
      bankName,
      personalInfo: {
        fullName,
        phoneNumber,
        emailAddress: email,
        bvn,
        gender,
        maritalStatus,
        children: rng.nextInt(5),
        typeOfResidence: residenceType,
      },
      educationAndEmployment: {
        levelOfEducation: educationLevel,
        employmentStatus,
        sectorOfEmployment,
        durationOfEmployment: `${rng.nextInt(10) + 1} years`,
        officeEmail: `${firstName.toLowerCase()}@${organization.toLowerCase()}.com`,
        monthlyIncome: {
          min: rng.nextInt(200000) + 50000,
          max: rng.nextInt(500000) + 200000,
        },
        loanRepayment: rng.nextInt(100000) + 10000,
      },
      socials: {
        twitter: `@${generateSocialHandle(firstName, lastName, rng)}`,
        facebook: fullName,
        instagram: `@${generateSocialHandle(firstName, lastName, rng)}`,
        linkedin: fullName,
      },
      guarantor: {
        fullName: guarantorFullName,
        phoneNumber: guarantorPhone,
        emailAddress: guarantorEmail,
        relationship,
      },
      createdAt: dateJoined,
      updatedAt: getRandomDate(new Date(dateJoined), endDate, rng),
      lastLogin: rng.next() > 0.3 ? getRandomDate(new Date(dateJoined), endDate, rng) : undefined,
      isEmailVerified: rng.next() > 0.1,
      isPhoneVerified: rng.next() > 0.15,
      isBvnVerified: rng.next() > 0.2,
    };

    users.push(user);
  }

  return users;
};

// Export the generated users
export const mockUsers = generateMockUsers(500);
