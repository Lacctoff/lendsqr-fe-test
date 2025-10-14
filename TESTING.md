# Testing Guide for Lendsqr Frontend Test

This project uses **Jest** and **React Testing Library** for unit testing React components.

## 📦 Installation

First, install all the necessary testing dependencies:

```bash
npm install
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (recommended during development)
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

## 📁 Test Files

All test files are located in `__tests__` directories alongside their respective components:

- `src/components/__tests__/` - Component tests
- `src/components/ui/__tests__/` - UI component tests

### Test Coverage

The following components have comprehensive test coverage:

#### Simple Components
- ✅ **Loader** - Loading spinner with different sizes and text
- ✅ **StatsCard** - Statistics card with icon and figures

#### Input Components
- ✅ **FloatingInput** - Floating label input with password visibility toggle
- ✅ **SearchBar** - Search input with form submission

#### Interactive Components
- ✅ **ActionButtons** - Blacklist and Activate user buttons
- ✅ **TabNavigation** - Tab switching navigation
- ✅ **AuthForm** - Login form with navigation

## 🎯 What's Tested

Each component test suite covers:

### 1. **Rendering Tests**
- Components render without crashing
- All expected elements are present
- Props are correctly applied
- Different variants and states render correctly

### 2. **User Interaction Tests**
- Button clicks trigger correct callbacks
- Form inputs accept user input
- Form submissions work correctly
- Keyboard navigation functions properly

### 3. **Positive & Negative Scenarios**
- Valid input handling
- Empty/missing props
- Edge cases (special characters, long inputs, etc.)
- Multiple rapid interactions

### 4. **State Management**
- Component state updates correctly
- Controlled vs uncontrolled inputs
- Dynamic prop updates

### 5. **Accessibility**
- Proper ARIA roles
- Accessible names and labels
- Keyboard navigation support

## 📊 Coverage Report

After running `npm run test:coverage`, you'll see a coverage report showing:

- **Statements**: Percentage of statements executed
- **Branches**: Percentage of conditional branches tested
- **Functions**: Percentage of functions called
- **Lines**: Percentage of lines executed

Coverage reports are generated in the `coverage/` directory (gitignored).

## 🔧 Test Configuration

### Jest Configuration (`jest.config.js`)
- Uses Next.js Jest configuration
- Sets up jsdom test environment
- Configures module path aliases (`@/`)
- Defines coverage collection patterns

### Jest Setup (`jest.setup.js`)
- Imports `@testing-library/jest-dom` matchers
- Mocks Next.js `Image` component
- Mocks Next.js navigation hooks (`useRouter`, etc.)

## 💡 Writing New Tests

When adding new components, follow this structure:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import YourComponent from '../YourComponent'

describe('YourComponent', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<YourComponent />)
      // assertions...
    })
  })

  describe('User Interaction', () => {
    it('should handle button click', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      
      render(<YourComponent onClick={handleClick} />)
      
      await user.click(screen.getByRole('button'))
      
      expect(handleClick).toHaveBeenCalled()
    })
  })
})
```

## 🎨 Best Practices

1. **Use semantic queries**: Prefer `getByRole`, `getByLabelText`, `getByText` over `getByTestId`
2. **Use userEvent over fireEvent**: `userEvent` more closely simulates real user interactions
3. **Test behavior, not implementation**: Focus on what the user sees and does
4. **Keep tests simple and readable**: Each test should test one thing
5. **Use descriptive test names**: Test names should clearly state what they're testing
6. **Mock external dependencies**: Mock Next.js router, API calls, etc.

## 🐛 Troubleshooting

### Tests fail with "Cannot find module"
- Make sure all dependencies are installed: `npm install`
- Check that path aliases in `jest.config.js` match your `tsconfig.json`

### Tests fail with "useRouter is not a function"
- The Next.js router is mocked in `jest.setup.js`
- If you need custom router behavior, override the mock in your test file

### Coverage is lower than expected
- Check if all test files are in `__tests__` directories or use `.test.tsx` extension
- Ensure components are imported and rendered in tests
- Add tests for edge cases and error scenarios

## 📚 Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

Happy Testing! 🚀

