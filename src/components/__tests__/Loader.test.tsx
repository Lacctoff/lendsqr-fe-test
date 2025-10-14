import { render, screen } from '@testing-library/react'
import Loader from '../Loader'

describe('Loader Component', () => {
  describe('Rendering', () => {
    it('should render the loader with default props', () => {
      render(<Loader />)
      
      const loaderText = screen.getByText('Loading...')
      expect(loaderText).toBeInTheDocument()
      
      const spinner = document.querySelector('.spinner')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass('spinner-medium')
    })

    it('should render with custom text', () => {
      const customText = 'Please wait...'
      render(<Loader text={customText} />)
      
      expect(screen.getByText(customText)).toBeInTheDocument()
    })

    it('should render without text when text prop is empty', () => {
      render(<Loader text="" />)
      
      const spinner = document.querySelector('.spinner')
      expect(spinner).toBeInTheDocument()
      
      // Text should not be rendered
      const loaderText = screen.queryByText('Loading...')
      expect(loaderText).not.toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    it('should render with small size', () => {
      render(<Loader size="small" />)
      
      const spinner = document.querySelector('.spinner')
      expect(spinner).toHaveClass('spinner-small')
    })

    it('should render with medium size (default)', () => {
      render(<Loader size="medium" />)
      
      const spinner = document.querySelector('.spinner')
      expect(spinner).toHaveClass('spinner-medium')
    })

    it('should render with large size', () => {
      render(<Loader size="large" />)
      
      const spinner = document.querySelector('.spinner')
      expect(spinner).toHaveClass('spinner-large')
    })
  })

  describe('CSS Classes', () => {
    it('should have correct CSS classes applied', () => {
      render(<Loader />)
      
      const container = document.querySelector('.loader-container')
      expect(container).toBeInTheDocument()
      
      const spinner = document.querySelector('.spinner')
      expect(spinner).toBeInTheDocument()
      
      const text = screen.getByText('Loading...')
      expect(text).toHaveClass('loader-text')
    })
  })
})

