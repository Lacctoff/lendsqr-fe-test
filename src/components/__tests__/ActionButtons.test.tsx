import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ActionButtons from '../ActionButtons'

describe('ActionButtons Component', () => {
  const mockOnBlacklist = jest.fn()
  const mockOnActivate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render both action buttons', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const blacklistButton = screen.getByRole('button', { name: /blacklist user/i })
      const activateButton = screen.getByRole('button', { name: /activate user/i })
      
      expect(blacklistButton).toBeInTheDocument()
      expect(activateButton).toBeInTheDocument()
    })

    it('should render with correct button text', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      expect(screen.getByText('BLACKLIST USER')).toBeInTheDocument()
      expect(screen.getByText('ACTIVATE USER')).toBeInTheDocument()
    })
  })

  describe('Button Click Events', () => {
    it('should call onBlacklist when blacklist button is clicked', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const blacklistButton = screen.getByRole('button', { name: /blacklist user/i })
      fireEvent.click(blacklistButton)
      
      expect(mockOnBlacklist).toHaveBeenCalledTimes(1)
      expect(mockOnActivate).not.toHaveBeenCalled()
    })

    it('should call onActivate when activate button is clicked', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const activateButton = screen.getByRole('button', { name: /activate user/i })
      fireEvent.click(activateButton)
      
      expect(mockOnActivate).toHaveBeenCalledTimes(1)
      expect(mockOnBlacklist).not.toHaveBeenCalled()
    })

    it('should handle multiple clicks on blacklist button', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const blacklistButton = screen.getByRole('button', { name: /blacklist user/i })
      
      fireEvent.click(blacklistButton)
      fireEvent.click(blacklistButton)
      fireEvent.click(blacklistButton)
      
      expect(mockOnBlacklist).toHaveBeenCalledTimes(3)
    })

    it('should handle multiple clicks on activate button', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const activateButton = screen.getByRole('button', { name: /activate user/i })
      
      fireEvent.click(activateButton)
      fireEvent.click(activateButton)
      
      expect(mockOnActivate).toHaveBeenCalledTimes(2)
    })

    it('should handle clicks on both buttons independently', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const blacklistButton = screen.getByRole('button', { name: /blacklist user/i })
      const activateButton = screen.getByRole('button', { name: /activate user/i })
      
      fireEvent.click(blacklistButton)
      fireEvent.click(activateButton)
      fireEvent.click(blacklistButton)
      
      expect(mockOnBlacklist).toHaveBeenCalledTimes(2)
      expect(mockOnActivate).toHaveBeenCalledTimes(1)
    })
  })

  describe('User Interaction with userEvent', () => {
    it('should handle user click on blacklist button', async () => {
      const user = userEvent.setup()
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const blacklistButton = screen.getByRole('button', { name: /blacklist user/i })
      await user.click(blacklistButton)
      
      expect(mockOnBlacklist).toHaveBeenCalledTimes(1)
    })

    it('should handle user click on activate button', async () => {
      const user = userEvent.setup()
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const activateButton = screen.getByRole('button', { name: /activate user/i })
      await user.click(activateButton)
      
      expect(mockOnActivate).toHaveBeenCalledTimes(1)
    })
  })

  describe('CSS Classes', () => {
    it('should have correct default CSS classes', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const container = document.querySelector('.action-buttons')
      expect(container).toBeInTheDocument()
      
      const blacklistButton = document.querySelector('.blacklist-btn')
      expect(blacklistButton).toBeInTheDocument()
      
      const activateButton = document.querySelector('.activate-btn')
      expect(activateButton).toBeInTheDocument()
    })

    it('should apply custom className when provided', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
          className="custom-actions"
        />
      )
      
      const container = document.querySelector('.action-buttons.custom-actions')
      expect(container).toBeInTheDocument()
    })

    it('should handle empty className prop', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
          className=""
        />
      )
      
      const container = document.querySelector('.action-buttons')
      expect(container).toBeInTheDocument()
      expect(container?.className).toBe('action-buttons ')
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button roles', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const blacklistButton = screen.getByRole('button', { name: /blacklist user/i })
      
      blacklistButton.focus()
      expect(blacklistButton).toHaveFocus()
      
      await user.keyboard('{Enter}')
      expect(mockOnBlacklist).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge Cases', () => {
    it('should not throw error when handlers are called multiple times rapidly', () => {
      render(
        <ActionButtons
          onBlacklist={mockOnBlacklist}
          onActivate={mockOnActivate}
        />
      )
      
      const blacklistButton = screen.getByRole('button', { name: /blacklist user/i })
      
      expect(() => {
        for (let i = 0; i < 10; i++) {
          fireEvent.click(blacklistButton)
        }
      }).not.toThrow()
      
      expect(mockOnBlacklist).toHaveBeenCalledTimes(10)
    })

    it('should work correctly with arrow function handlers', () => {
      const handleBlacklist = jest.fn(() => console.log('blacklisted'))
      const handleActivate = jest.fn(() => console.log('activated'))
      
      render(
        <ActionButtons
          onBlacklist={handleBlacklist}
          onActivate={handleActivate}
        />
      )
      
      fireEvent.click(screen.getByRole('button', { name: /blacklist user/i }))
      fireEvent.click(screen.getByRole('button', { name: /activate user/i }))
      
      expect(handleBlacklist).toHaveBeenCalledTimes(1)
      expect(handleActivate).toHaveBeenCalledTimes(1)
    })
  })
})

