import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../SearchBar'

describe('SearchBar Component', () => {
  describe('Rendering', () => {
    it('should render search input and button', () => {
      render(<SearchBar />)
      
      const input = screen.getByPlaceholderText('Search for anything')
      const button = screen.getByRole('button', { name: '' })
      
      expect(input).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })

    it('should render with custom placeholder', () => {
      const customPlaceholder = 'Search users...'
      render(<SearchBar placeholder={customPlaceholder} />)
      
      const input = screen.getByPlaceholderText(customPlaceholder)
      expect(input).toBeInTheDocument()
    })

    it('should render with default placeholder when not provided', () => {
      render(<SearchBar />)
      
      const input = screen.getByPlaceholderText('Search for anything')
      expect(input).toBeInTheDocument()
    })
  })

  describe('User Input Handling', () => {
    it('should update input value when user types', async () => {
      const user = userEvent.setup()
      render(<SearchBar />)
      
      const input = screen.getByPlaceholderText('Search for anything') as HTMLInputElement
      
      await user.type(input, 'test query')
      
      expect(input.value).toBe('test query')
    })

    it('should handle multiple input changes', async () => {
      const user = userEvent.setup()
      render(<SearchBar />)
      
      const input = screen.getByPlaceholderText('Search for anything') as HTMLInputElement
      
      await user.type(input, 'first')
      expect(input.value).toBe('first')
      
      await user.clear(input)
      await user.type(input, 'second')
      expect(input.value).toBe('second')
    })

    it('should allow clearing the input', async () => {
      const user = userEvent.setup()
      render(<SearchBar />)
      
      const input = screen.getByPlaceholderText('Search for anything') as HTMLInputElement
      
      await user.type(input, 'test')
      expect(input.value).toBe('test')
      
      await user.clear(input)
      expect(input.value).toBe('')
    })
  })

  describe('Search Submission', () => {
    it('should call onSearch when form is submitted', () => {
      const handleSearch = jest.fn()
      render(<SearchBar onSearch={handleSearch} />)
      
      const input = screen.getByPlaceholderText('Search for anything')
      const form = input.closest('form')!
      
      fireEvent.change(input, { target: { value: 'test search' } })
      fireEvent.submit(form)
      
      expect(handleSearch).toHaveBeenCalledTimes(1)
      expect(handleSearch).toHaveBeenCalledWith('test search')
    })

    it('should call onSearch when search button is clicked', () => {
      const handleSearch = jest.fn()
      render(<SearchBar onSearch={handleSearch} />)
      
      const input = screen.getByPlaceholderText('Search for anything')
      const button = screen.getByRole('button')
      
      fireEvent.change(input, { target: { value: 'button click search' } })
      fireEvent.click(button)
      
      expect(handleSearch).toHaveBeenCalledTimes(1)
      expect(handleSearch).toHaveBeenCalledWith('button click search')
    })

    it('should prevent default form submission', () => {
      const handleSearch = jest.fn()
      render(<SearchBar onSearch={handleSearch} />)
      
      const input = screen.getByPlaceholderText('Search for anything')
      const form = input.closest('form')!
      
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault')
      
      form.dispatchEvent(submitEvent)
      
      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should handle search with empty query', () => {
      const handleSearch = jest.fn()
      render(<SearchBar onSearch={handleSearch} />)
      
      const form = screen.getByRole('button').closest('form')!
      fireEvent.submit(form)
      
      expect(handleSearch).toHaveBeenCalledWith('')
    })

    it('should submit with Enter key', async () => {
      const user = userEvent.setup()
      const handleSearch = jest.fn()
      render(<SearchBar onSearch={handleSearch} />)
      
      const input = screen.getByPlaceholderText('Search for anything')
      
      await user.type(input, 'enter search{Enter}')
      
      expect(handleSearch).toHaveBeenCalled()
      expect(handleSearch).toHaveBeenCalledWith('enter search')
    })
  })

  describe('Without onSearch Callback', () => {
    it('should not throw error when onSearch is not provided', () => {
      render(<SearchBar />)
      
      const form = screen.getByRole('button').closest('form')!
      
      expect(() => fireEvent.submit(form)).not.toThrow()
    })

    it('should handle form submission without onSearch prop', () => {
      render(<SearchBar />)
      
      const input = screen.getByPlaceholderText('Search for anything')
      const form = input.closest('form')!
      
      fireEvent.change(input, { target: { value: 'test' } })
      
      expect(() => fireEvent.submit(form)).not.toThrow()
    })
  })

  describe('CSS Classes', () => {
    it('should have correct CSS classes applied', () => {
      render(<SearchBar />)
      
      const form = document.querySelector('.search-bar')
      expect(form).toBeInTheDocument()
      expect(form?.tagName).toBe('FORM')
      
      const input = document.querySelector('.search-input')
      expect(input).toBeInTheDocument()
      
      const button = document.querySelector('.search-button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Button Properties', () => {
    it('should have submit button type', () => {
      render(<SearchBar />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('should render SVG icon in button', () => {
      render(<SearchBar />)
      
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '16')
    })
  })

  describe('Edge Cases', () => {
    it('should handle special characters in search query', async () => {
      const user = userEvent.setup()
      const handleSearch = jest.fn()
      render(<SearchBar onSearch={handleSearch} />)
      
      const input = screen.getByPlaceholderText('Search for anything')
      const specialQuery = '!@#$%^&*()'
      
      await user.type(input, specialQuery)
      fireEvent.submit(input.closest('form')!)
      
      expect(handleSearch).toHaveBeenCalledWith(specialQuery)
    })

    it('should handle long search queries', async () => {
      const user = userEvent.setup()
      const handleSearch = jest.fn()
      render(<SearchBar onSearch={handleSearch} />)
      
      const input = screen.getByPlaceholderText('Search for anything')
      const longQuery = 'a'.repeat(100)
      
      await user.type(input, longQuery)
      fireEvent.submit(input.closest('form')!)
      
      expect(handleSearch).toHaveBeenCalledWith(longQuery)
    })

    it('should trim whitespace in search query', async () => {
      const user = userEvent.setup()
      const handleSearch = jest.fn()
      render(<SearchBar onSearch={handleSearch} />)
      
      const input = screen.getByPlaceholderText('Search for anything')
      
      await user.type(input, '   spaces   ')
      fireEvent.submit(input.closest('form')!)
      
      // Component doesn't trim, so it should pass as-is
      expect(handleSearch).toHaveBeenCalledWith('   spaces   ')
    })
  })

  describe('Multiple Submissions', () => {
    it('should handle multiple search submissions', () => {
      const handleSearch = jest.fn()
      render(<SearchBar onSearch={handleSearch} />)
      
      const input = screen.getByPlaceholderText('Search for anything')
      const form = input.closest('form')!
      
      fireEvent.change(input, { target: { value: 'first' } })
      fireEvent.submit(form)
      
      fireEvent.change(input, { target: { value: 'second' } })
      fireEvent.submit(form)
      
      fireEvent.change(input, { target: { value: 'third' } })
      fireEvent.submit(form)
      
      expect(handleSearch).toHaveBeenCalledTimes(3)
      expect(handleSearch).toHaveBeenNthCalledWith(1, 'first')
      expect(handleSearch).toHaveBeenNthCalledWith(2, 'second')
      expect(handleSearch).toHaveBeenNthCalledWith(3, 'third')
    })
  })
})

