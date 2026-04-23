import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Menu } from '@toptal/picasso'
import { MenuLink } from '@staff-portal/ui'

import ActionsDropdownTooltipWrapper from '../ActionsDropdownTooltipWrapper/ActionsDropdownTooltipWrapper'
import ActionsDropdownLinkItem from './ActionsDropdownLinkItem'

jest.mock(
  '../ActionsDropdownTooltipWrapper/ActionsDropdownTooltipWrapper',
  () => ({
    __esModule: true,
    default: jest.fn()
  })
)
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Menu: {
    Item: jest.fn()
  }
}))

const ActionsDropdownTooltipWrapperMock =
  ActionsDropdownTooltipWrapper as jest.Mock
const MenuItemMock = Menu.Item as jest.Mock

const PROPS = {
  children: Symbol('children'),
  href: Symbol('href'),
  newWindow: Symbol('newWindow'),
  disabled: Symbol('disabled'),
  disabledText: Symbol('disabledText'),
  dataTestId: Symbol('dataTestId')
} as unknown as ComponentProps<typeof ActionsDropdownLinkItem>

describe('ActionsDropdownLinkItem', () => {
  beforeEach(() => {
    ActionsDropdownTooltipWrapperMock.mockImplementation(
      ({ children }) => children
    )
    MenuItemMock.mockReturnValue(null)
  })

  describe('when missing both `href` and `disabledText` props', () => {
    it('renders nothing', () => {
      const props: ComponentProps<typeof ActionsDropdownLinkItem> = {
        ...PROPS,
        href: undefined,
        disabledText: undefined
      }

      render(<ActionsDropdownLinkItem {...props} />)

      expect(ActionsDropdownTooltipWrapperMock).toHaveBeenCalledTimes(0)
      expect(MenuItemMock).toHaveBeenCalledTimes(0)
    })
  })

  describe.each([
    ['by default', PROPS],
    [
      'when `href` prop is passed but `disabledText` is missing',
      { ...PROPS, disabledText: undefined }
    ],
    [
      'when `disabledText` prop is passed but `href` is missing',
      { ...PROPS, href: undefined }
    ],
    ['when `newWindow` prop passed', { ...PROPS, newWindow: true }]
  ])('%s', (_description, props) => {
    it('renders menu item with tooltip', () => {
      render(<ActionsDropdownLinkItem {...props} />)

      expect(ActionsDropdownTooltipWrapperMock).toHaveBeenCalledTimes(1)
      expect(ActionsDropdownTooltipWrapperMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: props.disabled,
          disabledText: props.disabledText
        }),
        {}
      )

      expect(MenuItemMock).toHaveBeenCalledTimes(1)
      expect(MenuItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          as: MenuLink,
          href: props.href,
          disabled: props.disabled,
          'data-testid': props.dataTestId,
          children: props.children
        }),
        {}
      )
    })
  })
})
