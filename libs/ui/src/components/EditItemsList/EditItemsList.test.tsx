import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import EditItemsList from './EditItemsList'
import EditItems from './components/EditItems'

jest.mock('./components/EditItems', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockedEditItems = EditItems as jest.Mock

const renderComponent = (
  props: Partial<ComponentProps<typeof EditItemsList>> = {}
) =>
  render(
    <TestWrapper>
      <EditItemsList {...(props as ComponentProps<typeof EditItemsList>)} />
    </TestWrapper>
  )

describe('EditItemsList', () => {
  beforeEach(() => {
    mockedEditItems.mockReturnValue(null)
  })

  describe('when there are no items', () => {
    it('shows the default not found message', () => {
      const { getByText } = renderComponent()

      expect(getByText('Not Found')).toBeInTheDocument()
      expect(mockedEditItems).not.toHaveBeenCalled()
    })

    it('shows string type not found message', () => {
      const { getByText } = renderComponent({ notFoundMessage: 'No Items' })

      expect(getByText('No Items')).toBeInTheDocument()
      expect(mockedEditItems).not.toHaveBeenCalled()
    })
  })

  describe('when items are passed', () => {
    it('shows the edit items', () => {
      const defaultKeys = ['defaultKeys']
      const items = [{ id: '1', name: 'Item Name' }]
      const renderItem = jest.fn()
      const getItemKey = jest.fn()
      const onActionClick = jest.fn()

      renderComponent({
        items,
        defaultKeys,
        getItemKey,
        renderItem,
        onActionClick
      })

      expect(mockedEditItems).toHaveBeenCalledWith(
        {
          defaultKeys,
          getItemKey,
          items,
          onActionClick,
          renderItem
        },
        {}
      )
    })
  })
})
