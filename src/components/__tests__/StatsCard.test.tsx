import { render, screen } from '@testing-library/react'
import StatsCard from '../StatsCard'

describe('StatsCard Component', () => {
  const defaultProps = {
    icon: '/icons/users-card.svg',
    label: 'Total Users',
    figure: '2,453',
    iconBgColor: '#DF18FF',
  }

  describe('Rendering', () => {
    it('should render all props correctly', () => {
      render(<StatsCard {...defaultProps} />)
      
      expect(screen.getByText('Total Users')).toBeInTheDocument()
      expect(screen.getByText('2,453')).toBeInTheDocument()
      
      const image = screen.getByRole('img', { name: 'Total Users' })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', defaultProps.icon)
    })

    it('should render with different props', () => {
      const customProps = {
        icon: '/icons/active-users-card.svg',
        label: 'Active Users',
        figure: '1,200',
        iconBgColor: '#5718FF',
      }
      
      render(<StatsCard {...customProps} />)
      
      expect(screen.getByText('Active Users')).toBeInTheDocument()
      expect(screen.getByText('1,200')).toBeInTheDocument()
      
      const image = screen.getByRole('img', { name: 'Active Users' })
      expect(image).toHaveAttribute('src', customProps.icon)
    })
  })

  describe('Styling', () => {
    it('should apply background color to icon container', () => {
      render(<StatsCard {...defaultProps} />)
      
      const iconContainer = document.querySelector('.stats-card__icon')
      expect(iconContainer).toBeInTheDocument()
      expect(iconContainer).toHaveStyle({ backgroundColor: '#DF18FF' })
    })

    it('should apply different background colors correctly', () => {
      const colorVariants = [
        { color: '#DF18FF', label: 'Purple' },
        { color: '#5718FF', label: 'Blue' },
        { color: '#F55F44', label: 'Red' },
        { color: '#FF33B9', label: 'Pink' },
      ]

      colorVariants.forEach(({ color, label }) => {
        const { unmount } = render(
          <StatsCard
            icon="/icons/test.svg"
            label={label}
            figure="100"
            iconBgColor={color}
          />
        )
        
        const iconContainer = document.querySelector('.stats-card__icon')
        expect(iconContainer).toHaveStyle({ backgroundColor: color })
        
        unmount()
      })
    })
  })

  describe('CSS Classes', () => {
    it('should have correct CSS classes', () => {
      render(<StatsCard {...defaultProps} />)
      
      const card = document.querySelector('.stats-card')
      expect(card).toBeInTheDocument()
      
      const icon = document.querySelector('.stats-card__icon')
      expect(icon).toBeInTheDocument()
      
      const content = document.querySelector('.stats-card__content')
      expect(content).toBeInTheDocument()
      
      const label = document.querySelector('.stats-card__label')
      expect(label).toBeInTheDocument()
      
      const figure = document.querySelector('.stats-card__figure')
      expect(figure).toBeInTheDocument()
    })
  })

  describe('Image Properties', () => {
    it('should render image with correct dimensions', () => {
      render(<StatsCard {...defaultProps} />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('width', '20')
      expect(image).toHaveAttribute('height', '20')
    })

    it('should use label as image alt text', () => {
      render(<StatsCard {...defaultProps} />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', defaultProps.label)
    })
  })
})

