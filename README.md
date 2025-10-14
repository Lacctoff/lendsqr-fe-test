# Lendsqr Admin Dashboard

> A production-grade, fully responsive admin dashboard built with Next.js, TypeScript, and modern SCSS architecture. Showcasing advanced component composition, responsive design patterns, and comprehensive test coverage.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-Modern-pink?logo=sass)](https://sass-lang.com/)
[![Jest](https://img.shields.io/badge/Jest-29.7-C21325?logo=jest)](https://jestjs.io/)

---

## Project Overview

This project is a comprehensive fintech admin dashboard designed for Lendsqr, featuring advanced user management capabilities, dynamic data visualization, and a meticulously crafted responsive design system. Built as a technical assessment, it demonstrates proficiency in modern React patterns, TypeScript best practices, and production-ready frontend architecture.

**Live Demo:** [Deployed on Vercel](https://oluwatofunmi-lasisi-lendsqr-fe-test.vercel.app)

---

## Tech Stack

### Core Technologies
- **React 19.1.0** - Latest stable release with modern hooks and concurrent features
- **Next.js 15.5.4** - App Router architecture with Turbopack for blazing-fast builds
- **TypeScript 5.0** - Full type safety across components, utilities, and data models
- **SCSS with Modern Module System** - Scoped styling using `@use` and `@forward` directives

### Build & Development Tools
- **Turbopack** - Next-generation bundler (2x faster than Webpack)
- **ESLint 9** - Code quality enforcement with Next.js recommended rules
- **Sass 1.93.2** - Advanced CSS preprocessing with nested rules and mixins

### Testing Infrastructure
- **Jest 29.7.0** - Comprehensive unit and integration testing framework
- **React Testing Library 14.1.2** - Component testing with user-centric queries
- **@testing-library/user-event 14.5.1** - Advanced user interaction simulation
- **@testing-library/jest-dom 6.1.5** - Custom Jest matchers for DOM assertions

### Typography & Design System
- **Google Fonts Integration** - Work Sans, Roboto, and Inter via `next/font`
- **Custom Font Loading** - Avenir Next and SF Compact Text for brand consistency
- **Design Tokens** - Centralized SCSS variables for colors, spacing, and typography

---

## Features Showcase

###  Dashboard & User Management
- **Comprehensive User Dashboard** with real-time statistics cards showing:
  - Total Users
  - Active Users
  - Users with Loans
  - Users with Savings
- **Advanced User List View** featuring:
  - Sortable, filterable data table with 500+ mock user records
  - Multi-criteria filtering (Organization, Username, Email, Phone, Status, Date)
  - Custom pagination controls with configurable items-per-page (10, 20, 50, 100)
  - Status badge system (Active, Inactive, Pending, Blacklisted)

###  User Profile Management
- **Detailed User Profile View** with tabbed navigation system:
  - Personal Information (Full Name, Phone, Email, BVN, Gender, Marital Status, Children, Residence Type)
  - Education & Employment (Level of Education, Employment Status, Sector, Duration, Office Email, Monthly Income, Loan Repayment)
  - Social Media Profiles (Twitter, Facebook, Instagram)
  - Guarantor Information (Full details with relationship context)
  - Bank Details, Loans, Savings, and System Information (placeholder tabs for future implementation)

###  Interactive User Actions
- **Contextual Action Menu** with dropdown controls:
  - View Detailed User Profile
  - Blacklist User (with confirmation flow)
  - Activate User (with status update)
- **User Tier Rating System** - Visual 3-star rating display
- **Financial Overview Cards** - Account balance and bank account details

###  Advanced UI Components
- **Smart Search Bar** - Integrated search functionality with form submission
- **Floating Label Inputs** - Modern input fields with animated labels and password visibility toggle
- **Loading States** - Custom loader component with size variants (small, medium, large)
- **Responsive Navigation** - Context-aware sidebar with active route highlighting

---

##  Component Architecture

### Modular Component Strategy

This project employs a **highly modular, reusable component architecture** designed for scalability and maintainability. Components are organized by feature domain and complexity level:

#### Core Layout Components
- **`Header`** - Adaptive navigation bar with search, notifications, and user profile dropdown
- **`Sidebar`** - Multi-state navigation system with collapsible menu and tooltips
- **`DashboardLayout`** - Container component orchestrating header and sidebar positioning

#### Feature Components
- **`UserTable`** - Complex data table with built-in filtering, pagination, and action menus
- **`UserProfileCard`** - Composite card displaying user avatar, tier rating, and financial summary
- **`StatsGrid`** - Responsive grid container for statistics cards
- **`TabNavigation`** - Generic tab switching component with active state management

#### Reusable UI Components
- **`StatsCard`** - Configurable statistics card with icon, label, and figure
- **`InfoField`** - Label-value pair component for structured data display
- **`UserInfoSection`** - Section wrapper with title and flexible field grid
- **`GuarantorCard`** - Specialized card for guarantor information display
- **`ActionButtons`** - Pair of action buttons (Blacklist/Activate) with distinct styling
- **`FloatingInput`** - Advanced input field with floating label animation and password toggle
- **`SearchBar`** - Search form component with submit handling
- **`Loader`** - Loading spinner with size variants and optional text

#### Shared Components
- **`TitleHeader`** - Page title component with consistent typography
- **`NavHeaderCard`** - Section header for sidebar navigation groups
- **`MenuCard`** - Reusable card component for menu items

### State Management Approach

The application uses **React's built-in hooks** for efficient, localized state management:

- **`useState`** - Component-level state for forms, UI toggles, and data mutations
- **`useEffect`** - Side effects for data fetching, event listeners, and cleanup
- **`useMemo`** - Performance optimization for filtered/computed data in tables
- **`useRouter`** (Next.js) - Programmatic navigation and route parameter access
- **`useParams`** (Next.js) - Dynamic route parameter extraction
- **`usePathname`** (Next.js) - Active route detection for navigation highlighting

### TypeScript Integration

**Full type safety** is enforced across the application:

```typescript
// Comprehensive type definitions
interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  accountBalance: number;
  personalInfo: PersonalInfo;
  educationAndEmployment: EducationAndEmployment;
  socials: Socials;
  guarantor: Guarantor;
  // ... and more
}

// Type-safe component props
interface UserProfileCardProps {
  user: User;
  className?: string;
}
```

---

## Responsive Design & UX Highlights

> **This section demonstrates advanced responsive design expertise and production-ready UX patterns.**

### 🎯 Adaptive Header Component

The header showcases **context-aware responsive behavior** across all breakpoints:

#### Desktop (>768px)
- Full Lendsqr logo displayed prominently
- Expanded search bar (400px width, scales to 350px at 1024px)
- Visible "Docs" link and notification bell
- Full user profile with avatar, username, and dropdown chevron

#### Tablet & Mobile (≤768px)
- **Logo-to-Hamburger Transition** - Logo replaced with hamburger menu icon for space optimization
- **Flexible Search Bar** - Expands to fill available space (flex: 1)
- **Dropdown Menu Integration** - "Docs" and notification options accessible via user profile dropdown
- **Scaled UI Elements** - Progressive sizing reduction (profile image: 48px → 36px → 28px)

#### Ultra-Mobile (≤480px)
- Compact header (padding: 0.875rem)
- Minimized profile elements (username: 10px font-size)
- Touch-optimized dropdown menu (180px min-width)

---

### 🗂️ Three-State Sidebar Navigation System

The sidebar implements a **sophisticated multi-state responsive pattern** rarely seen in standard dashboards:

#### State 1: Expanded Sidebar (Default, >1024px)
- **Full Width:** 283px with complete menu labels
- **Active Route Highlighting:** Left border accent (4px teal) with background tint
- **Hover Effects:** Subtle background color change with smooth transitions
- **Version Display:** App version shown at bottom (v1.2.0)

#### State 2: Collapsed Icon-Only Mode (769px - 1024px)
- **Condensed Width:** 88px with icon-only display
- **Smart Tooltip System:** 
  - Tooltips appear on hover with smooth fade-in animation
  - Positioned to the right of icons with arrow pointer
  - Dark background (#2d3748) with white text for contrast
  - Includes navigation labels for accessibility
- **Preserved Active States:** Left border accent remains visible
- **Hidden Elements:** Menu section headers and organization dropdown arrow removed
- **Centered Icons:** All navigation icons centered vertically

#### State 3: Mobile Slide-Out (≤768px)
- **Off-Canvas Pattern:** Sidebar positioned off-screen with `transform: translateX(-100%)`
- **Smooth Animation:** 0.3s ease-in-out slide transition
- **Dark Overlay:** Semi-transparent backdrop (rgba(0,0,0,0.5)) with fade-in animation
- **Lendsqr Logo Display:** Logo shown at top of mobile sidebar for branding
- **Triple Close Mechanism:**
  1. **Overlay Click** - Tap outside sidebar to close
  2. **Link Navigation** - Any menu item click triggers close
  3. **Hamburger Toggle** - Header button toggles open/closed state
- **Z-Index Management:** Sidebar (z-index: 1000) above overlay (z-index: 998)

---

### Intelligent Data Table Responsiveness

The user table implements a **progressive column-hiding strategy** to maintain data integrity on small screens:

#### Desktop Display (>1024px)
- **All 6 Columns Visible:**
  - Organization (18%), Username (16%), Email (22%), Phone Number (18%), Date Joined (22%), Status (14%)
- **Horizontal Scroll:** `overflow-x: auto` for tables exceeding viewport
- **Fixed Layout:** `table-layout: fixed` for consistent column widths

#### Tablet Mode (≤1024px)
- **Phone Number Column Hidden** - Most expendable data point
- **Redistributed Widths:** 
  - Organization: 20%, Username: 18%, Email: 26%, Date Joined: 26%, Status: 16%
- **Maintained Functionality:** Filter dropdown and actions still fully accessible

#### Mobile Mode (≤768px)
- **Email & Date Joined Hidden** - Keeps critical identification (Organization, Username) and Status
- **Optimized Widths:**
  - Organization: 28%, Username: 25%, Status: 23%, Actions: 6%
- **Vertical Pagination Stack:** Pagination controls stack vertically with increased gap

#### Ultra-Mobile (≤480px)
- **Username Column Hidden** - Minimal display with Organization, Status, and Actions
- **Final Widths:** Organization: 35%, Status: 35%, Actions: 10%
- **Compact Filter Dropdown:** Stacked single-column layout (280px width)
- **Touch-Optimized Actions:** Enlarged touch targets for dropdown menu

#### Table Container Strategy
- **Desktop:** Full width with 30px padding
- **Tablet:** 95% width, centered with `margin: auto`, 20px padding
- **Mobile:** Further reduced padding (15px → 10px) for maximum content space
- **Horizontal Scroll:** Enabled at all breakpoints as fallback for overflow scenarios

---

###  Flexible Data Grid System (Flexbox Refactor)

User profile information sections use a **responsive flexbox grid** for optimal readability:

#### Implementation Strategy
```scss
.fields-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem;
  
  .info-field {
    flex: 1 1 200px;
    min-width: 200px;
  }
}
```

#### Responsive Behavior
- **Desktop (>768px):** 
  - 3-5 fields per row depending on available space
  - Fields dynamically wrap based on content length
  - Maintains 200px minimum width for readability

- **Mobile (≤768px):**
  - **Stable 2-Column Layout:** `flex: 1 1 calc(50% - 0.5rem)`
  - Minimum width: 150px (allows slight compression on very small screens)
  - Reduced gap: 1rem for space efficiency

- **Ultra-Mobile (≤480px):**
  - Maintains 2-column layout (does not collapse to single column)
  - Font size reduction: Labels 0.563rem, Values 0.75rem
  - Ensures all data remains scannable without excessive scrolling

#### Typography Scaling
- **Labels:** `font-size: 12px` (desktop) → `10px` (mobile) → `9px` (ultra-mobile)
- **Values:** `font-size: 16px` (desktop) → `13px` (mobile) → `12px` (ultra-mobile)
- **Line Breaking:** `word-wrap: break-word` prevents overflow on long email addresses

---

###  User Profile Card Responsive Adaptation

The profile card demonstrates **adaptive layout restructuring** rather than simple scaling:

#### Desktop Layout (>768px)
- **Horizontal Flexbox:** Profile, Tier, and Financial sections in a row
- **Dividers:** Vertical 1px borders (80px height) between sections
- **Avatar Size:** 100px circular image
- **Typography:** User name (22px), Bank details (12px)

#### Mobile Layout (≤768px)
- **Flex Wrap Enabled:** Financial section wraps to new row when space is constrained
- **Divider Logic:** Divider between Tier and Financial sections hidden on wrap
- **Reduced Avatar:** 70px → 60px for compact display
- **Left-Aligned Financial Data:** Inherits left alignment from profile section (not centered)
- **Padding Adjustment:** `padding-left: 80px` to align with avatar offset

---

### 🔄 Tab Navigation Responsive Reflow

The profile tabs implement **intelligent wrapping and sizing** for mobile devices:

#### Desktop Tabs (>768px)
- **Horizontal Row:** All 6 tabs in single line
- **Padding:** 1rem vertical, 1.5rem horizontal
- **Font Size:** 16px
- **Active Indicator:** 4px bottom border in teal

#### Mobile Tabs (≤768px)
- **Flex Wrap:** Tabs reflow to multiple rows
- **Three-Per-Row Layout:** 
  - `min-width: calc(33.333% - 0.6rem)`
  - `max-width: calc(33.333% - 0.6rem)`
- **Centered Display:** `justify-content: center`
- **Reduced Font:** 12px → 11px for space efficiency
- **Maintained Touch Targets:** 0.8rem padding ensures tappable area

---

### Design Token System

Centralized SCSS variables ensure **consistent theming** across all breakpoints:

```scss
// Color Palette
$color-brand-primary: #213f7d;
$color-brand-secondary: #39cdcc;
$color-success: #39cd62;
$color-error: #e4033b;

// Typography Scale
$font-size-xxs: 12px;
$font-size-xs: 14px;
$font-size-sm: 16px;
$font-size-xl: 24px;

// Breakpoints
$auth-mobile-breakpoint: 768px;
```

---

## 🧪 Testing Infrastructure

This project includes a **comprehensive test suite** with 247+ test cases covering all major components:

### Test Coverage

#### Component Tests (7 Components)
-  **Loader** - Size variants, text customization, rendering states
-  **StatsCard** - Props rendering, styling variants, image handling
-  **ActionButtons** - Click handlers, keyboard accessibility, multiple interactions
-  **TabNavigation** - Tab switching, active states, dynamic updates, keyboard navigation
-  **AuthForm** - Form submission, navigation, password toggle, validation

#### UI Component Tests
-  **FloatingInput** - Input types, password visibility, validation states, user input
-  **SearchBar** - Search functionality, form submission, callback handling

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (recommended for development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Testing Best Practices Implemented
- **Semantic Queries:** Uses `getByRole`, `getByLabelText` for accessibility-first testing
- **User Event Simulation:** `@testing-library/user-event` for realistic interactions
- **Behavior Testing:** Focuses on user-facing behavior, not implementation details
- **Mock Integration:** Next.js router and Image components properly mocked

For detailed testing documentation, see [TESTING.md](./TESTING.md) and [RUN_TESTS.md](./RUN_TESTS.md).

---

##  Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm equivalent)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lacctoff/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   > **Note:** The project uses `legacy-peer-deps` resolution for React 19 compatibility with testing libraries.

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
# Development
npm run dev        
npm run build        
npm start            
npm run lint         

# Testing
npm test             
npm run test:watch   
npm run test:coverage 
```

### Project Structure

```
lendsqr-fe-test/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication routes (layout group)
│   │   │   ├── login/         # Login page
│   │   │   └── layout.tsx     # Auth layout with illustration
│   │   ├── (dashboard)/       # Dashboard routes (layout group)
│   │   │   ├── users/         # User management pages
│   │   │   │   └── user-details/[id]/  # Dynamic user profile
│   │   │   └── layout.tsx     # Dashboard layout with sidebar
│   │   ├── page.tsx           # Landing page
│   │   └── layout.tsx         # Root layout with fonts
│   ├── components/            # React components
│   │   ├── __tests__/         # Component tests
│   │   ├── shared/            # Shared/reusable components
│   │   └── ui/                # UI primitives
│   ├── styles/                # SCSS modules and variables
│   │   ├── _variables.scss    # Design tokens
│   │   ├── _typography.scss   # Typography system
│   │   ├── _dashboard.scss    # Dashboard-specific styles
│   │   └── main.scss          # Global styles
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions and helpers
│   ├── lib/                   # API and external integrations
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
│   ├── icons/                 # SVG icons
│   └── images/                # Images and illustrations
├── jest.config.js             # Jest configuration
├── jest.setup.js              # Jest setup and mocks
└── tsconfig.json              # TypeScript configuration
```

### Environment Setup

This project works out of the box with no environment variables required for local development. Mock data is used for demonstration purposes.

---

## 📈 Performance Optimizations

-  **Next.js Image Optimization** - Automatic image optimization with lazy loading
-  **Turbopack Build System** - 2x faster builds compared to Webpack
-  **Component Code Splitting** - Automatic code splitting per route
-  **SCSS Module System** - Scoped styles prevent CSS bloat
-  **React.useMemo** - Memoized computed values in data tables
-  **Font Optimization** - Google Fonts loaded via `next/font` with automatic subsetting

---

## Key Learning Outcomes

This project demonstrates proficiency in:

1. **Advanced React Patterns** - Compound components, render props, controlled components
2. **TypeScript Mastery** - Complex type definitions, generics, type guards
3. **Responsive Design** - Mobile-first approach with progressive enhancement
4. **Component Architecture** - Atomic design principles and component composition
5. **Modern CSS** - SCSS with `@use`/`@forward`, CSS Grid, Flexbox
6. **Testing Strategy** - Unit tests, integration tests, accessibility testing
7. **Next.js App Router** - Route groups, layouts, dynamic routes, metadata API
8. **UX Best Practices** - Loading states, error handling, keyboard navigation

---

## 🔗 Links

- **Live Demo:** [https://oluwatofunmi-lasisi-lendsqr-fe-test.vercel.app](https://oluwatofunmi-lasisi-lendsqr-fe-test.vercel.app)
- **Design Reference:** [Lendsqr Figma Design](https://www.figma.com/design/ZKIubNni2wwBhxYxTPXOSy/Frontend)
- **Testing Documentation:** [TESTING.md](./TESTING.md)
- **Test Execution Guide:** [RUN_TESTS.md](./RUN_TESTS.md)

---

## 👨 Author

**Oluwatofunmi Lasisi**

Built as part of the Lendsqr Frontend Engineering Assessment.

---

## 📄 License

This project is created for assessment purposes and is not licensed for commercial use.
