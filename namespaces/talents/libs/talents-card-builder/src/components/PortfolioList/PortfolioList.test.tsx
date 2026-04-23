import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import PortfolioList, { PortfolioListProps } from './PortfolioList'

const data = [
  {
    id: 'item1',
    title: 'This is item 1',
    coverImage: null
  },
  {
    id: 'item2',
    title: 'This is item 2',
    coverImage: null
  }
]

const renderComponent = (
  props: Pick<PortfolioListProps, 'data' | 'toggleItem'>
) =>
  render(
    <TestWrapper>
      <PortfolioList title='Portfolio' value={[]} {...props} />
    </TestWrapper>
  )

describe('PortfolioList', () => {
  it('renders the section', () => {
    renderComponent({ data, toggleItem: jest.fn() })

    expect(screen.getByText('Portfolio')).toBeInTheDocument()
  })

  it('renders nothing if data is empty', () => {
    renderComponent({ data: [], toggleItem: jest.fn() })

    expect(screen.queryByText('Portfolio')).not.toBeInTheDocument()
  })

  it('renders the list of items', () => {
    renderComponent({ data, toggleItem: jest.fn() })

    expect(screen.getByText('This is item 1')).toBeInTheDocument()
    expect(screen.getByText('This is item 2')).toBeInTheDocument()
  })

  it('dispatches an action on item click', () => {
    const toggleItem = jest.fn()

    renderComponent({ data, toggleItem })

    fireEvent.click(screen.getByText('This is item 1'))

    expect(toggleItem).toHaveBeenCalledWith('item1')
  })
})
