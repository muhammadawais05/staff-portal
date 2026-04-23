import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { Button, Menu } from '@toptal/picasso'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import OperationActionItem, { Props } from './OperationActionItem'
import Operation from '../Operation'
import { isOperationDisabled } from '../../utils'

jest.mock('@toptal/picasso', () => ({
  Button: jest.fn(),
  Menu: {
    Item: jest.fn()
  }
}))
jest.mock('../Operation', () => ({
  __esModule: true,
  default: jest.fn()
}))

const OperationMock = Operation as jest.Mock
const ButtonMock = Button as unknown as jest.Mock
const MenuItemMock = Menu.Item as unknown as jest.Mock

const arrangeTest = (props: Props) => {
  OperationMock.mockImplementation(({ render: renderChildren }) => (
    <div data-testid='operation'>
      {renderChildren(isOperationDisabled(props.operation))}
    </div>
  ))
  ButtonMock.mockImplementation(({ onClick }) => (
    <div data-testid='button' onClick={onClick} />
  ))
  MenuItemMock.mockImplementation(({ onClick }) => (
    <div data-testid='menu-item' onClick={onClick} />
  ))

  return render(
    <TestWrapper>
      <OperationActionItem {...props} />
    </TestWrapper>
  )
}

describe('OperationActionItem', () => {
  const baseProps = {
    children: null,
    operation: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    onClick: jest.fn()
  }

  describe('when `componentType` is `button`', () => {
    it('renders `Button` component', async () => {
      arrangeTest({
        ...baseProps,
        componentType: 'button'
      })

      expect(screen.getByTestId('button')).toBeInTheDocument()
      expect(screen.queryByTestId('menu-item')).not.toBeInTheDocument()

      expect(OperationMock).toHaveBeenCalledTimes(1)
      expect(OperationMock).toHaveBeenCalledWith(
        expect.objectContaining({
          inline: true
        }),
        {}
      )
    })
  })

  describe('when `componentType` is `menu-item`', () => {
    it('renders `Menu.Item` component', async () => {
      arrangeTest({
        ...baseProps,
        componentType: 'menu-item'
      })

      expect(screen.getByTestId('menu-item')).toBeInTheDocument()
      expect(screen.queryByTestId('button')).not.toBeInTheDocument()

      expect(OperationMock).toHaveBeenCalledTimes(1)
      expect(OperationMock).not.toHaveBeenCalledWith(
        expect.objectContaining({
          inline: true
        }),
        {}
      )
    })
  })

  describe('when `skipOperationCheck` is set', () => {
    it('renders `Button` component without `Operation` wrapper', async () => {
      arrangeTest({
        ...baseProps,
        componentType: 'button',
        skipOperationCheck: true
      })

      expect(screen.getByTestId('button')).toBeInTheDocument()
      expect(OperationMock).toHaveBeenCalledTimes(0)
    })
  })

  describe.each([
    {
      operation: OperationCallableTypes.DISABLED,
      disabled: false,
      buttonDisabled: true
    },
    {
      operation: OperationCallableTypes.DISABLED,
      disabled: true,
      buttonDisabled: true
    },
    {
      operation: OperationCallableTypes.ENABLED,
      disabled: false,
      buttonDisabled: false
    },
    {
      operation: OperationCallableTypes.ENABLED,
      disabled: true,
      buttonDisabled: true
    },
    {
      operation: OperationCallableTypes.DISABLED,
      disabled: undefined,
      buttonDisabled: true
    },
    {
      operation: OperationCallableTypes.ENABLED,
      disabled: undefined,
      buttonDisabled: false
    }
  ])(
    'when operation and external `disabled` flag has values: operation: $operation, disabled: $disabled',
    ({ operation, disabled, buttonDisabled }) => {
      it('renders `Button` component in valid `disabled` state', async () => {
        arrangeTest({
          ...baseProps,
          componentType: 'button',
          operation: {
            callable: operation,
            messages: ['foo']
          },
          disabled
        })

        expect(ButtonMock).toHaveBeenCalledWith(
          expect.objectContaining({ disabled: buttonDisabled }),
          {}
        )
      })
    }
  )

  describe('when clicking on action item', () => {
    it('calls `onClick` handler', async () => {
      const onClickMock = jest.fn()

      arrangeTest({
        ...baseProps,
        componentType: 'button',
        onClick: onClickMock
      })

      fireEvent.click(screen.getByTestId('button'))

      expect(onClickMock).toHaveBeenCalledWith()
    })
  })
})
