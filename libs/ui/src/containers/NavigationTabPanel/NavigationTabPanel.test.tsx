import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Container } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import { NavigationTabPanel } from './NavigationTabPanel'
import useTabsListContext from '../NavigationTabsList/services/use-tabs-list-context/use-tabs-list-context'

jest.mock(
  '../NavigationTabsList/services/use-tabs-list-context/use-tabs-list-context'
)
jest.mock('@toptal/picasso', () => ({
  Container: jest.fn()
}))

const useTabsListContextMock = useTabsListContext as jest.Mock
const ContainerMock = Container as jest.Mock

const NavigationTabPanelMock = (
  props?: Partial<ComponentProps<typeof NavigationTabPanel>>
) => (
  <TestWrapper>
    <NavigationTabPanel value='value' {...props}>
      <span data-testid='navigation-tab-panel-children' />
    </NavigationTabPanel>
  </TestWrapper>
)

const renderComponent = (
  props?: Partial<ComponentProps<typeof NavigationTabPanel>>
) => render(<NavigationTabPanelMock {...props} />)

describe('NavigationTabPanel', () => {
  beforeEach(() => {
    ContainerMock.mockReturnValue(null)
  })

  describe('when `options` prop is not defined', () => {
    describe('when `activeTabValue` equals `value`', () => {
      it('renders children', () => {
        useTabsListContextMock.mockReturnValue({
          activeTabValue: 'foo',
          options: {}
        })
        renderComponent({ value: 'foo' })

        expect(
          screen.getByTestId('navigation-tab-panel-children')
        ).toBeInTheDocument()
      })
    })

    describe('when `activeTabValue` does not equal `value`', () => {
      it('renders nothing', () => {
        useTabsListContextMock.mockReturnValue({
          activeTabValue: 'foo',
          options: {}
        })
        renderComponent({ value: 'bar' })

        expect(
          screen.queryByTestId('navigation-tab-panel-children')
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('when `options` prop is defined', () => {
    describe('when `activeTabValue` equals `value` & `cacheTabs` is `true`', () => {
      it('renders tab component', () => {
        useTabsListContextMock.mockReturnValue({
          activeTabValue: 'foo',
          options: { keepMounted: true }
        })
        const props = { value: 'foo' }
        const { rerender } = renderComponent(props)

        expect(ContainerMock).toHaveBeenCalledWith(
          expect.objectContaining({
            style: expect.objectContaining({ display: '' })
          }),
          {}
        )

        useTabsListContextMock.mockReturnValue({
          activeTabValue: 'bar',
          options: { keepMounted: true }
        })
        rerender(<NavigationTabPanelMock {...props} />)

        expect(ContainerMock).toHaveBeenCalledWith(
          expect.objectContaining({
            style: expect.objectContaining({ display: 'none' })
          }),
          {}
        )
      })
    })

    describe('when `activeTabValue` does not equal `value` & `cacheTabs` is `true`', () => {
      it('renders nothing', () => {
        useTabsListContextMock.mockReturnValue({
          activeTabValue: 'foo',
          options: { keepMounted: true }
        })
        const props = { value: 'bar' }
        const { rerender } = renderComponent(props)

        expect(ContainerMock).not.toHaveBeenCalled()

        rerender(<NavigationTabPanelMock {...props} />)

        expect(ContainerMock).not.toHaveBeenCalled()
      })
    })
  })
})
