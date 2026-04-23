import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import Tabs from '@toptal/picasso/Tabs'

import { NavigationTabsList } from './NavigationTabsList'
import useTabsListContext from '../NavigationTabsList/services/use-tabs-list-context/use-tabs-list-context'
import useHashTabs from './services/use-hash-tabs/use-hash-tabs'
import { NavigationTabsProvider } from '../NavigationTabsProvider/NavigationTabsProvider'

jest.mock('@toptal/picasso/Tabs', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock(
  '../NavigationTabsList/services/use-tabs-list-context/use-tabs-list-context'
)
jest.mock('./services/use-hash-tabs/use-hash-tabs')

const useHashTabsMock = useHashTabs as jest.Mock
const useTabsListContextMock = useTabsListContext as jest.Mock
const TabsMock = Tabs as unknown as jest.Mock

const renderComponent = ({
  children,
  tabValues,
  ...restProps
}: ComponentProps<typeof NavigationTabsList> & {
  tabValues: Record<string, string>
}) =>
  render(
    <TestWrapper>
      <NavigationTabsProvider tabValues={tabValues}>
        <NavigationTabsList {...restProps}>{children}</NavigationTabsList>
      </NavigationTabsProvider>
    </TestWrapper>
  )

describe('NavigationTabsList', () => {
  beforeEach(() => {
    TabsMock.mockReturnValue(null)
  })

  describe('when `loading` is `false`', () => {
    it('renders filtered children', () => {
      const onChange = jest.fn()
      const activeTabValue = 'foo'

      useHashTabsMock.mockReturnValue({
        onChange
      })
      useTabsListContextMock.mockReturnValue({ activeTabValue })

      const children = [
        <NavigationTabsList.Tab key='1' label='' value='foo' hidden />,
        <NavigationTabsList.Tab key='2' label='' value='bar' />,
        <NavigationTabsList.Tab key='3' label='' value='baz' />
      ]

      renderComponent({
        children,
        loading: false,
        tabValues: { foo: 'foo', bar: 'bar', baz: 'baz' }
      })

      expect(TabsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          value: activeTabValue,
          onChange,
          children: expect.arrayContaining([
            expect.objectContaining({
              type: NavigationTabsList.Tab,
              props: expect.objectContaining({
                value: 'bar'
              })
            }),
            expect.objectContaining({
              type: NavigationTabsList.Tab,
              props: expect.objectContaining({
                value: 'baz'
              })
            })
          ])
        }),
        {}
      )
    })
  })

  describe('when `loading` is `true`', () => {
    it('renders `null` as children', () => {
      const onChange = jest.fn()
      const activeTabValue = 'foo'

      useHashTabsMock.mockReturnValue({ onChange })
      useTabsListContextMock.mockReturnValue({ activeTabValue })

      renderComponent({
        children: [<NavigationTabsList.Tab key='1' label='' value='foo' />],
        loading: true,
        tabValues: { foo: 'foo' }
      })

      expect(TabsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          value: activeTabValue,
          onChange,
          children: null
        }),
        {}
      )
    })
  })
})
