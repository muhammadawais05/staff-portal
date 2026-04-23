import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ItemsTable, { Props } from './ItemsTable'

const TEST_DATA = ['a', 'b']

const renderTestItemsTable = (props: Props<string>) => {
  const { data, renderHeader, renderRow, disabled } = props

  return render(
    <TestWrapper>
      <ItemsTable
        data={data}
        renderHeader={renderHeader}
        renderRow={renderRow}
        disabled={disabled}
      />
    </TestWrapper>
  )
}

const renderHeader = jest.fn()
const renderRow = jest.fn()

describe('ItemsTable', () => {
  afterEach(cleanup)

  const PROPS = {
    data: TEST_DATA,
    disabled: false,
    renderHeader,
    renderRow
  }

  it('renders', () => {
    const { getByTestId } = renderTestItemsTable(PROPS)

    expect(getByTestId('items-table')).toBeInTheDocument()
    expect(renderHeader).toHaveBeenCalledTimes(1)
    expect(renderRow).toHaveBeenCalledTimes(2)
  })
})
