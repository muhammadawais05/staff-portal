import React from 'react'
import { render, screen } from '@testing-library/react'
import { within } from '@testing-library/dom'
import { TestWrapper } from '@staff-portal/test-utils'
import { DetailedListItems } from '@staff-portal/ui'

import TaskCardLayoutContent from './TaskCardLayoutContent'

const createItems = (numberOfItems: number): DetailedListItems =>
  new Array(numberOfItems).fill({}).map((_, index) => ({
    key: index,
    label: `item-${index}`,
    value: ''
  }))

const arrangeTest = ({
  oneColumn,
  items
}: {
  items: DetailedListItems
  oneColumn?: boolean
}) =>
  render(
    <TestWrapper>
      <TaskCardLayoutContent oneColumn={oneColumn} items={items} />
    </TestWrapper>
  )

describe('TaskCardLayoutContent', () => {
  it('renders in 2 columns', async () => {
    const NUMBER_OF_ITEMS = 6
    const items = createItems(NUMBER_OF_ITEMS)

    arrangeTest({ items })

    const rows = screen.getAllByTestId('row-item')

    expect(
      within(rows[0]).getByTestId('item-field: item-0')
    ).toBeInTheDocument()
    expect(
      within(rows[0]).getByTestId('item-field: item-3')
    ).toBeInTheDocument()
    expect(screen.getAllByTestId('row-item')).toHaveLength(
      Math.ceil(NUMBER_OF_ITEMS / 2)
    )
  })

  it('renders in 1 column', () => {
    const NUMBER_OF_ITEMS = 5

    arrangeTest({ oneColumn: true, items: createItems(NUMBER_OF_ITEMS) })

    expect(screen.getByTestId('item-field: item-0')).toBeInTheDocument()
    expect(screen.queryByTestId('item-field: item-5')).not.toBeInTheDocument()
    expect(screen.getAllByTestId('row-item')).toHaveLength(NUMBER_OF_ITEMS)
  })
})
