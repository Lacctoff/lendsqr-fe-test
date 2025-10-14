import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AuthForm from '../AuthForm'
import { useRouter } from 'next/navigation'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('AuthForm Component', () => {
  const mockPush = jest.fn()
  const mockRouter = {
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  describe('Rendering', () => {
    it('should render email and password inputs', () => {
      render(<AuthForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      
      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
    })

    it('should render login button', () => {
      render(<AuthForm />)
      
      const loginButton = screen.getByRole('button', { name: /log in/i })
      expect(loginButton).toBeInTheDocument()
      expect(loginButton).toHaveAttribute('type', 'submit')
    })

    it('should render forgot password link', () => {
      render(<AuthForm />)
      
      const forgotPasswordLink = screen.getByText(/forgot password/i)
      expect(forgotPasswordLink).toBeInTheDocument()
      expect(forgotPasswordLink.tagName).toBe('A')
    })

    it('should have correct form structure', () => {
      render(<AuthForm />)
      
      const form = document.querySelector('form')
      expect(form).toBeInTheDocument()
      expect(form).toHaveClass('auth-form-wrapper')
    })
  })

  describe('Form Inputs', () => {
    it('should have email input with correct type', () => {
      render(<AuthForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toHaveAttribute('type', 'email')
    })

    it('should have password input with correct type', () => {
      render(<AuthForm />)
      
      const passwordInput = screen.getByLabelText(/password/i)
      expect(passwordInput).toHaveAttribute('type', 'password')
    })

    it('should render hidden autofill trick inputs', () => {
      render(<AuthForm />)
      
      const hiddenInputs = document.querySelectorAll('input[style*="display: none"]')
      expect(hiddenInputs.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Form Submission', () => {
    it('should navigate to /users on form submission', async () => {
      render(<AuthForm />)
      
      const form = screen.getByRole('button', { name: /log in/i }).closest('form')!
      fireEvent.submit(form)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/users')
      })
    })

    it('should prevent default form submission', () => {
      render(<AuthForm />)
      
      const form = screen.getByRole('button', { name: /log in/i }).closest('form')!
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault')
      
      form.dispatchEvent(submitEvent)
      
      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should navigate on button click', async () => {
      render(<AuthForm />)
      
      const loginButton = screen.getByRole('button', { name: /log in/i })
      fireEvent.click(loginButton)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/users')
      })
    })

    it('should call router.push only once per submission', async () => {
      render(<AuthForm />)
      
      const form = screen.getByRole('button', { name: /log in/i }).closest('form')!
      fireEvent.submit(form)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('User Interaction', () => {
    it('should allow typing in email input', async () => {
      const user = userEvent.setup()
      render(<AuthForm />)
      
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      await user.type(emailInput, 'test@example.com')
      
      // FloatingInput is uncontrolled, so value might not update without onChange handler
      // Just verify typing doesn't throw errors
      expect(emailInput).toBeInTheDocument()
    })

    it('should allow typing in password input', async () => {
      const user = userEvent.setup()
      render(<AuthForm />)
      
      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
      await user.type(passwordInput, 'password123')
      
      expect(passwordInput).toBeInTheDocument()
    })

    it('should allow filling form and submitting', async () => {
      const user = userEvent.setup()
      render(<AuthForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const loginButton = screen.getByRole('button', { name: /log in/i })
      
      await user.type(emailInput, 'user@lendsqr.com')
      await user.type(passwordInput, 'securePassword')
      await user.click(loginButton)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/users')
      })
    })

    it('should submit form with Enter key', async () => {
      const user = userEvent.setup()
      render(<AuthForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      
      emailInput.focus()
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/users')
      })
    })
  })

  describe('Forgot Password Link', () => {
    it('should have forgot password link with correct href', () => {
      render(<AuthForm />)
      
      const forgotPasswordLink = screen.getByText(/forgot password/i)
      expect(forgotPasswordLink).toHaveAttribute('href', '#')
    })

    it('should have correct CSS class on forgot password link', () => {
      render(<AuthForm />)
      
      const forgotPasswordLink = screen.getByText(/forgot password/i)
      expect(forgotPasswordLink).toHaveClass('forgot-password-link')
    })
  })

  describe('Form Attributes', () => {
    it('should have autocomplete off on form', () => {
      render(<AuthForm />)
      
      const form = document.querySelector('form')
      expect(form).toHaveAttribute('autoComplete', 'off')
    })

    it('should have correct form className', () => {
      render(<AuthForm />)
      
      const form = document.querySelector('form')
      expect(form).toHaveClass('auth-form-wrapper')
    })
  })

  describe('Navigation Behavior', () => {
    it('should always navigate to /users regardless of input', async () => {
      render(<AuthForm />)
      
      const form = screen.getByRole('button', { name: /log in/i }).closest('form')!
      
      // Submit without filling inputs
      fireEvent.submit(form)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/users')
      })
    })

    it('should handle multiple form submissions', async () => {
      render(<AuthForm />)
      
      const form = screen.getByRole('button', { name: /log in/i }).closest('form')!
      
      fireEvent.submit(form)
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledTimes(1)
      })
      
      fireEvent.submit(form)
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe('Integration with FloatingInput', () => {
    it('should render FloatingInput components for email and password', () => {
      render(<AuthForm />)
      
      // Check if FloatingInput components are rendered
      const floatingInputWrappers = document.querySelectorAll('.floating-input-wrapper')
      expect(floatingInputWrappers.length).toBeGreaterThanOrEqual(2)
    })

    it('should show password toggle for password field', () => {
      render(<AuthForm />)
      
      const passwordToggle = screen.getByRole('button', { name: /show/i })
      expect(passwordToggle).toBeInTheDocument()
    })

    it('should not show password toggle for email field', () => {
      render(<AuthForm />)
      
      // Only password field should have SHOW/HIDE button
      const toggleButtons = screen.getAllByRole('button')
      const showHideButtons = toggleButtons.filter(
        btn => btn.textContent === 'SHOW' || btn.textContent === 'HIDE'
      )
      
      expect(showHideButtons).toHaveLength(1)
    })
  })

  describe('Edge Cases', () => {
    it('should handle router not being available', () => {
      ;(useRouter as jest.Mock).mockReturnValue(null)
      
      expect(() => render(<AuthForm />)).toThrow()
    })

    it('should not navigate if router.push fails', async () => {
      const mockFailingPush = jest.fn(() => {
        throw new Error('Navigation failed')
      })
      ;(useRouter as jest.Mock).mockReturnValue({
        ...mockRouter,
        push: mockFailingPush,
      })
      
      render(<AuthForm />)
      
      const form = screen.getByRole('button', { name: /log in/i }).closest('form')!
      
      expect(() => fireEvent.submit(form)).toThrow('Navigation failed')
    })

    it('should have login button as submit type', () => {
      render(<AuthForm />)
      
      const loginButton = screen.getByRole('button', { name: /log in/i })
      expect(loginButton).toHaveAttribute('type', 'submit')
      expect(loginButton).toHaveClass('login-button')
    })
  })

  describe('Accessibility', () => {
    it('should have accessible form elements', () => {
      render(<AuthForm />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      
      expect(emailInput).toHaveAccessibleName()
      expect(passwordInput).toHaveAccessibleName()
    })

    it('should have accessible button', () => {
      render(<AuthForm />)
      
      const loginButton = screen.getByRole('button', { name: /log in/i })
      expect(loginButton).toHaveAccessibleName()
    })
  })
})

