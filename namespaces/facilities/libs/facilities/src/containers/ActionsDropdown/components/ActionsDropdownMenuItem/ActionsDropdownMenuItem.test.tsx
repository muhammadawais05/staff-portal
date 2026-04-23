import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OperationActionItem } from '@staff-portal/operations'

import ActionsDropdownTooltipWrapper from '../ActionsDropdownTooltipWrapper/ActionsDropdownTooltipWrapper'
import ActionsDropdownMenuItem from './ActionsDropdownMenuItem'

jest.mock(
  '../ActionsDropdownTooltipWrapper/ActionsDropdownTooltipWrapper',
  () => ({
    __esModule: true,
    default: jest.fn()
  })
)
jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  OperationActionItem: jest.fn()
}))

const OperationActionItemMock = OperationActionItem as jest.Mock
const ActionsDropdownTooltipWrapperMock =
  ActionsDropdownTooltipWrapper as jest.Mock

const PROPS = {
  children: Symbol('children'),
  operation: Symbol('operation'),
  dataTestId: Symbol('dataTestId')
} as unknown as ComponentProps<typeof ActionsDropdownMenuItem>

const onClickMock = () => {}

describe('ActionsDropdownMenuItem', () => {
  beforeEach(() => {
    ActionsDropdownTooltipWrapperMock.mockImplementation(({ children }) => (
      <>{children}</>
    ))
    OperationActionItemMock.mockReturnValue(null)
  })

  it('returns `OperationActionItem` with the expected props', () => {
    const props: ComponentProps<typeof ActionsDropdownMenuItem> = {
      ...PROPS,
      onClick: onClickMock
    }

    render(<ActionsDropdownMenuItem {...props} />)

    expect(OperationActionItemMock).toHaveBeenCalledTimes(1)
    expect(OperationActionItemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        children: props.children,
        componentType: 'menu-item',
        operation: props.operation,
        'data-testid': props.dataTestId,
        onClick: onClickMock
      }),
      {}
    )
  })
})
