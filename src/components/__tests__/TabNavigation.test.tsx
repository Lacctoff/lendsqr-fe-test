import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TabNavigation from '../TabNavigation'

describe('TabNavigation Component', () => {
  const mockTabs = [
    { id: 'general', label: 'General Details', isActive: true },
    { id: 'documents', label: 'Documents', isActive: false },
    { id: 'bank', label: 'Bank Details', isActive: false },
    { id: 'loans', label: 'Loans', isActive: false },
    { id: 'savings', label: 'Savings', isActive: false },
  ]

  const mockOnTabClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render all tabs', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      expect(screen.getByText('General Details')).toBeInTheDocument()
      expect(screen.getByText('Documents')).toBeInTheDocument()
      expect(screen.getByText('Bank Details')).toBeInTheDocument()
      expect(screen.getByText('Loans')).toBeInTheDocument()
      expect(screen.getByText('Savings')).toBeInTheDocument()
    })

    it('should render correct number of tabs', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      const tabs = screen.getAllByRole('button')
      expect(tabs).toHaveLength(5)
    })

    it('should render with empty tabs array', () => {
      render(<TabNavigation tabs={[]} onTabClick={mockOnTabClick} />)
      
      const tabs = screen.queryAllByRole('button')
      expect(tabs).toHaveLength(0)
    })

    it('should render single tab', () => {
      const singleTab = [{ id: 'single', label: 'Single Tab', isActive: true }]
      render(<TabNavigation tabs={singleTab} onTabClick={mockOnTabClick} />)
      
      expect(screen.getByText('Single Tab')).toBeInTheDocument()
    })
  })

  describe('Active State', () => {
    it('should apply active class to active tab', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      const activeTab = screen.getByText('General Details').closest('button')
      expect(activeTab).toHaveClass('active')
    })

    it('should not apply active class to inactive tabs', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      const inactiveTab = screen.getByText('Documents').closest('button')
      expect(inactiveTab).not.toHaveClass('active')
    })

    it('should handle multiple active tabs', () => {
      const multipleTabs = [
        { id: 'tab1', label: 'Tab 1', isActive: true },
        { id: 'tab2', label: 'Tab 2', isActive: true },
        { id: 'tab3', label: 'Tab 3', isActive: false },
      ]
      
      render(<TabNavigation tabs={multipleTabs} onTabClick={mockOnTabClick} />)
      
      expect(screen.getByText('Tab 1').closest('button')).toHaveClass('active')
      expect(screen.getByText('Tab 2').closest('button')).toHaveClass('active')
      expect(screen.getByText('Tab 3').closest('button')).not.toHaveClass('active')
    })

    it('should handle all inactive tabs', () => {
      const inactiveTabs = mockTabs.map(tab => ({ ...tab, isActive: false }))
      render(<TabNavigation tabs={inactiveTabs} onTabClick={mockOnTabClick} />)
      
      const tabs = screen.getAllByRole('button')
      tabs.forEach(tab => {
        expect(tab).not.toHaveClass('active')
      })
    })
  })

  describe('Tab Click Events', () => {
    it('should call onTabClick with correct tab id when clicked', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      const documentsTab = screen.getByText('Documents')
      fireEvent.click(documentsTab)
      
      expect(mockOnTabClick).toHaveBeenCalledTimes(1)
      expect(mockOnTabClick).toHaveBeenCalledWith('documents')
    })

    it('should call onTabClick for each tab independently', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      fireEvent.click(screen.getByText('General Details'))
      expect(mockOnTabClick).toHaveBeenLastCalledWith('general')
      
      fireEvent.click(screen.getByText('Bank Details'))
      expect(mockOnTabClick).toHaveBeenLastCalledWith('bank')
      
      fireEvent.click(screen.getByText('Loans'))
      expect(mockOnTabClick).toHaveBeenLastCalledWith('loans')
      
      expect(mockOnTabClick).toHaveBeenCalledTimes(3)
    })

    it('should handle clicking the same tab multiple times', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      const generalTab = screen.getByText('General Details')
      
      fireEvent.click(generalTab)
      fireEvent.click(generalTab)
      fireEvent.click(generalTab)
      
      expect(mockOnTabClick).toHaveBeenCalledTimes(3)
      expect(mockOnTabClick).toHaveBeenCalledWith('general')
    })

    it('should handle clicking active tab', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      const activeTab = screen.getByText('General Details')
      fireEvent.click(activeTab)
      
      expect(mockOnTabClick).toHaveBeenCalledWith('general')
    })
  })

  describe('User Interaction with userEvent', () => {
    it('should handle user click events', async () => {
      const user = userEvent.setup()
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      await user.click(screen.getByText('Documents'))
      
      expect(mockOnTabClick).toHaveBeenCalledWith('documents')
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      const documentsTab = screen.getByText('Documents')
      documentsTab.focus()
      
      await user.keyboard('{Enter}')
      expect(mockOnTabClick).toHaveBeenCalledWith('documents')
    })
  })

  describe('CSS Classes', () => {
    it('should have correct default CSS classes', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      const container = document.querySelector('.tab-navigation')
      expect(container).toBeInTheDocument()
      
      const buttons = document.querySelectorAll('.tab-button')
      expect(buttons.length).toBe(5)
    })

    it('should apply custom className when provided', () => {
      render(
        <TabNavigation
          tabs={mockTabs}
          onTabClick={mockOnTabClick}
          className="custom-tabs"
        />
      )
      
      const container = document.querySelector('.tab-navigation.custom-tabs')
      expect(container).toBeInTheDocument()
    })

    it('should handle empty className prop', () => {
      render(
        <TabNavigation
          tabs={mockTabs}
          onTabClick={mockOnTabClick}
          className=""
        />
      )
      
      const container = document.querySelector('.tab-navigation')
      expect(container).toBeInTheDocument()
    })

    it('should apply both tab-button and active classes correctly', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      const activeTab = screen.getByText('General Details').closest('button')
      expect(activeTab).toHaveClass('tab-button')
      expect(activeTab).toHaveClass('active')
      expect(activeTab?.className).toContain('tab-button active')
    })
  })

  describe('Dynamic Tab Updates', () => {
    it('should update when tabs change', () => {
      const { rerender } = render(
        <TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />
      )
      
      expect(screen.getByText('General Details').closest('button')).toHaveClass('active')
      
      const updatedTabs = mockTabs.map(tab => ({
        ...tab,
        isActive: tab.id === 'documents'
      }))
      
      rerender(<TabNavigation tabs={updatedTabs} onTabClick={mockOnTabClick} />)
      
      expect(screen.getByText('General Details').closest('button')).not.toHaveClass('active')
      expect(screen.getByText('Documents').closest('button')).toHaveClass('active')
    })

    it('should handle adding new tabs', () => {
      const initialTabs = mockTabs.slice(0, 3)
      const { rerender } = render(
        <TabNavigation tabs={initialTabs} onTabClick={mockOnTabClick} />
      )
      
      expect(screen.getAllByRole('button')).toHaveLength(3)
      
      rerender(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      expect(screen.getAllByRole('button')).toHaveLength(5)
      expect(screen.getByText('Loans')).toBeInTheDocument()
      expect(screen.getByText('Savings')).toBeInTheDocument()
    })

    it('should handle removing tabs', () => {
      const { rerender } = render(
        <TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />
      )
      
      expect(screen.getAllByRole('button')).toHaveLength(5)
      
      const reducedTabs = mockTabs.slice(0, 2)
      rerender(<TabNavigation tabs={reducedTabs} onTabClick={mockOnTabClick} />)
      
      expect(screen.getAllByRole('button')).toHaveLength(2)
      expect(screen.queryByText('Bank Details')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button roles', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(5)
    })

    it('should render buttons with correct text content', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      mockTabs.forEach(tab => {
        const button = screen.getByRole('button', { name: tab.label })
        expect(button).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle tabs without isActive property', () => {
      const tabsWithoutActive = [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
      ]
      
      render(<TabNavigation tabs={tabsWithoutActive} onTabClick={mockOnTabClick} />)
      
      const tabs = screen.getAllByRole('button')
      tabs.forEach(tab => {
        expect(tab).not.toHaveClass('active')
      })
    })

    it('should handle special characters in tab labels', () => {
      const specialTabs = [
        { id: 'special1', label: 'Tab & Spaces', isActive: true },
        { id: 'special2', label: 'Tab-with-dashes', isActive: false },
        { id: 'special3', label: "Tab's Apostrophe", isActive: false },
      ]
      
      render(<TabNavigation tabs={specialTabs} onTabClick={mockOnTabClick} />)
      
      expect(screen.getByText('Tab & Spaces')).toBeInTheDocument()
      expect(screen.getByText('Tab-with-dashes')).toBeInTheDocument()
      expect(screen.getByText("Tab's Apostrophe")).toBeInTheDocument()
    })

    it('should handle rapid tab switching', () => {
      render(<TabNavigation tabs={mockTabs} onTabClick={mockOnTabClick} />)
      
      const tabs = screen.getAllByRole('button')
      
      tabs.forEach(tab => fireEvent.click(tab))
      
      expect(mockOnTabClick).toHaveBeenCalledTimes(5)
    })
  })
})

