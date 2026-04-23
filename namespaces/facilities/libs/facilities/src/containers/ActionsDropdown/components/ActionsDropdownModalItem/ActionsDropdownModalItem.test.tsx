import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { ModalActionItem } from '@staff-portal/modals-service'

import ActionsDropdownTooltipWrapper from '../ActionsDropdownTooltipWrapper/ActionsDropdownTooltipWrapper'
import ActionsDropdownModalItem from './ActionsDropdownModalItem'

jest.mock(
  '../ActionsDropdownTooltipWrapper/ActionsDropdownTooltipWrapper',
  () => ({
    __esModule: true,
    default: jest.fn()
  })
)
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  ModalActionItem: jest.fn()
}))

const ModalActionItemMock = ModalActionItem as jest.Mock
const ActionsDropdownTooltipWrapperMock =
  ActionsDropdownTooltipWrapper as jest.Mock

const PROPS = {
  children: Symbol('children'),
  operation: Symbol('operation'),
  dataTestId: Symbol('dataTestId')
} as unknown as ComponentProps<typeof ActionsDropdownModalItem>

const modalMock = () => <div data-testid='modal' />

describe('ActionsDropdownModalItem', () => {
  beforeEach(() => {
    ActionsDropdownTooltipWrapperMock.mockImplementation(({ children }) => (
      <>{children}</>
    ))
    ModalActionItemMock.mockReturnValue(null)
  })

  it('returns `ModalActionItem` with the expected props', () => {
    const props: ComponentProps<typeof ActionsDropdownModalItem> = {
      ...PROPS,
      modal: modalMock,
      modalProps: { talentId: '123' }
    }

    render(<ActionsDropdownModalItem {...props} />)

    expect(ModalActionItemMock).toHaveBeenCalledTimes(1)
    expect(ModalActionItemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        children: props.children,
        modal: modalMock,
        modalProps: { talentId: '123' },
        componentType: 'menu-item',
        operation: props.operation
      }),
      {}
    )
  })
})
