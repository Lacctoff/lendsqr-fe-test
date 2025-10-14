import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FloatingInput from '../FloatingInput'

describe('FloatingInput Component', () => {
  const defaultProps = {
    label: 'Email',
    type: 'text',
  }

  describe('Rendering', () => {
    it('should render input with label', () => {
      render(<FloatingInput {...defaultProps} />)
      
      const input = screen.getByLabelText('Email')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'text')
    })

    it('should generate id from label when id is not provided', () => {
      render(<FloatingInput label="Full Name" />)
      
      const input = screen.getByLabelText('Full Name')
      expect(input).toHaveAttribute('id', 'full-name')
    })

    it('should use provided id when available', () => {
      render(<FloatingInput label="Email" id="custom-email-id" />)
      
      const input = screen.getByLabelText('Email')
      expect(input).toHaveAttribute('id', 'custom-email-id')
    })

    it('should render with placeholder', () => {
      render(<FloatingInput {...defaultProps} placeholder="Enter your email" />)
      
      const input = screen.getByPlaceholderText('Enter your email')
      expect(input).toBeInTheDocument()
    })

    it('should render with default placeholder (space)', () => {
      render(<FloatingInput {...defaultProps} />)
      
      const input = screen.getByLabelText('Email')
      expect(input).toHaveAttribute('placeholder', ' ')
    })
  })

  describe('Input Types', () => {
    it('should render text input', () => {
      render(<FloatingInput label="Username" type="text" />)
      
      const input = screen.getByLabelText('Username')
      expect(input).toHaveAttribute('type', 'text')
    })

    it('should render email input', () => {
      render(<FloatingInput label="Email" type="email" />)
      
      const input = screen.getByLabelText('Email')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('should render password input initially hidden', () => {
      render(<FloatingInput label="Password" type="password" />)
      
      const input = screen.getByLabelText('Password')
      expect(input).toHaveAttribute('type', 'password')
    })
  })

  describe('Password Visibility Toggle', () => {
    it('should show password toggle button for password type', () => {
      render(<FloatingInput label="Password" type="password" />)
      
      const toggleButton = screen.getByRole('button', { name: /show/i })
      expect(toggleButton).toBeInTheDocument()
      expect(toggleButton).toHaveTextContent('SHOW')
    })

    it('should not show toggle button for non-password inputs', () => {
      render(<FloatingInput label="Email" type="email" />)
      
      const toggleButton = screen.queryByRole('button', { name: /show/i })
      expect(toggleButton).not.toBeInTheDocument()
    })

    it('should toggle password visibility when button is clicked', () => {
      render(<FloatingInput label="Password" type="password" />)
      
      const input = screen.getByLabelText('Password')
      const toggleButton = screen.getByRole('button', { name: /show/i })
      
      // Initially password is hidden
      expect(input).toHaveAttribute('type', 'password')
      expect(toggleButton).toHaveTextContent('SHOW')
      
      // Click to show password
      fireEvent.click(toggleButton)
      expect(input).toHaveAttribute('type', 'text')
      expect(toggleButton).toHaveTextContent('HIDE')
      
      // Click again to hide password
      fireEvent.click(toggleButton)
      expect(input).toHaveAttribute('type', 'password')
      expect(toggleButton).toHaveTextContent('SHOW')
    })

    it('should toggle password visibility multiple times', () => {
      render(<FloatingInput label="Password" type="password" />)
      
      const input = screen.getByLabelText('Password')
      const toggleButton = screen.getByRole('button', { name: /show/i })
      
      // Multiple toggles
      fireEvent.click(toggleButton) // Show
      expect(input).toHaveAttribute('type', 'text')
      
      fireEvent.click(toggleButton) // Hide
      expect(input).toHaveAttribute('type', 'password')
      
      fireEvent.click(toggleButton) // Show again
      expect(input).toHaveAttribute('type', 'text')
    })
  })

  describe('User Interaction', () => {
    it('should handle input change events', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      
      render(<FloatingInput label="Email" onChange={handleChange} />)
      
      const input = screen.getByLabelText('Email')
      await user.type(input, 'test@example.com')
      
      expect(handleChange).toHaveBeenCalled()
      expect(handleChange).toHaveBeenCalledTimes('test@example.com'.length)
    })

    it('should update value when typing', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn((e) => {
        input.value = e.target.value
      })
      
      render(<FloatingInput label="Username" onChange={handleChange} />)
      
      const input = screen.getByLabelText('Username') as HTMLInputElement
      await user.type(input, 'john_doe')
      
      expect(input.value).toBe('john_doe')
    })

    it('should display controlled value', () => {
      const { rerender } = render(
        <FloatingInput label="Email" value="test@example.com" />
      )
      
      const input = screen.getByLabelText('Email') as HTMLInputElement
      expect(input.value).toBe('test@example.com')
      
      rerender(<FloatingInput label="Email" value="new@example.com" />)
      expect(input.value).toBe('new@example.com')
    })
  })

  describe('Input States', () => {
    it('should render as required when required prop is true', () => {
      render(<FloatingInput label="Email" required />)
      
      const input = screen.getByLabelText('Email')
      expect(input).toBeRequired()
    })

    it('should render as disabled when disabled prop is true', () => {
      render(<FloatingInput label="Email" disabled />)
      
      const input = screen.getByLabelText('Email')
      expect(input).toBeDisabled()
    })

    it('should not accept input when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      
      render(<FloatingInput label="Email" disabled onChange={handleChange} />)
      
      const input = screen.getByLabelText('Email')
      await user.type(input, 'test')
      
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('HTML Attributes', () => {
    it('should have correct autocomplete attributes', () => {
      render(<FloatingInput label="Password" type="password" />)
      
      const input = screen.getByLabelText('Password')
      expect(input).toHaveAttribute('autoComplete', 'new-password')
      expect(input).toHaveAttribute('autoCorrect', 'off')
      expect(input).toHaveAttribute('autoCapitalize', 'off')
      expect(input).toHaveAttribute('spellCheck', 'false')
      expect(input).toHaveAttribute('data-form-type', 'other')
    })
  })

  describe('CSS Classes', () => {
    it('should have correct CSS classes', () => {
      render(<FloatingInput label="Email" />)
      
      const wrapper = document.querySelector('.floating-input-wrapper')
      expect(wrapper).toBeInTheDocument()
      
      const label = document.querySelector('.floating-label')
      expect(label).toBeInTheDocument()
      
      const input = document.querySelector('.floating-input')
      expect(input).toBeInTheDocument()
      
      const labelText = document.querySelector('.label-text')
      expect(labelText).toBeInTheDocument()
    })

    it('should have password toggle button with correct class', () => {
      render(<FloatingInput label="Password" type="password" />)
      
      const toggleButton = document.querySelector('.password-toggle-btn')
      expect(toggleButton).toBeInTheDocument()
      expect(toggleButton).toHaveAttribute('type', 'button')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty value', () => {
      render(<FloatingInput label="Email" value="" />)
      
      const input = screen.getByLabelText('Email') as HTMLInputElement
      expect(input.value).toBe('')
    })

    it('should handle undefined onChange', async () => {
      const user = userEvent.setup()
      render(<FloatingInput label="Email" />)
      
      const input = screen.getByLabelText('Email')
      
      // Should not throw error
      await expect(user.type(input, 'test')).resolves.not.toThrow()
    })
  })
})

