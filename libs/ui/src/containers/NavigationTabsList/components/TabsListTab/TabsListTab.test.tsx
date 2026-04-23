import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import Tabs from '@toptal/picasso/Tabs'

import TabsListTab from './TabsListTab'
import useTabsListContext from '../../services/use-tabs-list-context/use-tabs-list-context'

jest.mock('../../services/use-tabs-list-context/use-tabs-list-context')
jest.mock('@toptal/picasso/Tabs', () => {
  const TabsMock = jest.requireActual('@toptal/picasso/Tabs').default

  TabsMock.Tab = jest.fn()

  return TabsMock
})

const TabsTabMock = Tabs.Tab as unknown as jest.Mock
const useTabsListContextMock = useTabsListContext as jest.Mock

const renderComponent = (props?: Partial<ComponentProps<typeof TabsListTab>>) =>
  render(<TabsListTab value='value' label='some label' {...props} />)

describe('TabsListTab', () => {
  beforeEach(() => {
    TabsTabMock.mockReturnValue(null)
  })

  describe('when `value` exists in `tabValues`', () => {
    it('renders tab component', () => {
      const tabValues = { A: 'a', B: 'b' }

      useTabsListContextMock.mockReturnValue({ tabValues })

      renderComponent({ value: 'a' })

      expect(TabsTabMock).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'a' }),
        {}
      )
    })
  })

  describe('when `value` does not exist in `tabValues`', () => {
    it('throws an error', () => {
      const tabValues = { a: 'a', b: 'b' }

      useTabsListContextMock.mockReturnValue({ tabValues })

      expect(() => renderComponent({ value: 'c' })).toThrow(
        "Unknown value: 'c' for object values: [a, b]"
      )
    })
  })
})
