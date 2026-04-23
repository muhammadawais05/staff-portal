import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Pagination from '../Pagination'

describe('Pagination', () => {
  it('renders pagination if items number and page limit are provided', () => {
    render(
      <TestWrapper>
        <Pagination itemCount={50} limit={10} onPageChange={jest.fn()} />
      </TestWrapper>
    )

    expect(screen.getByText('Prev')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.queryByText('6')).not.toBeInTheDocument()
  })

  it('allows handling page change', () => {
    const onPageChange = jest.fn()

    render(
      <TestWrapper>
        <Pagination itemCount={50} limit={10} onPageChange={onPageChange} />
      </TestWrapper>
    )

    fireEvent.click(screen.getByText('Next'))
    expect(onPageChange).toHaveBeenCalledWith(2)

    fireEvent.click(screen.getByText('5'))
    expect(onPageChange).toHaveBeenCalledWith(5)
  })

  it('renders NOTHING if items number or page limit is not provided', () => {
    const { container } = render(<Pagination onPageChange={jest.fn()} />)

    expect(container.firstChild).toBeNull()
  })
})
