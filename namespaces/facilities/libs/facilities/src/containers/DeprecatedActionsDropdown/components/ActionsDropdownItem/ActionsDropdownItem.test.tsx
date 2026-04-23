import React, { ReactElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Menu } from '@toptal/picasso'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MenuLink } from '@staff-portal/ui'
import { LazyOperationRenderProps, Operation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import ActionsDropdownItem from '.'
import {
  ActionItem,
  ActionItemLazyOperation,
  DropdownActionType
} from '../../utils'

jest.mock('@toptal/picasso', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso'),
  Menu: {
    Item: jest.fn()
  }
}))
jest.mock('@staff-portal/operations', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/operations'),
  Operation: jest.fn()
}))

const mockCheckOperation = jest.fn()
const mockLazyRender = jest.fn()
const mockLazyOperationClick = jest.fn()
const mockOperation = Operation as jest.Mock
const mockMenuItem = Menu.Item as jest.Mock

const arrangeTest = (item: ActionItem) => {
  const operationName = (item as ActionItemLazyOperation).operationVariables
    ?.operationName

  return render(
    <ActionsDropdownItem
      item={item}
      onLazyOperationClick={mockLazyOperationClick}
      renderLazyOperationsMap={
        operationName
          ? {
              [operationName]: mockLazyRender
            }
          : {}
      }
    />
  )
}

describe('ActionsDropdownItem', () => {
  beforeEach(() => {
    mockLazyRender.mockImplementation(
      (children: (renderProps: LazyOperationRenderProps) => ReactElement) => (
        <div>
          {children({
            loading: false,
            disabled: false,
            checkOperation: mockCheckOperation
          })}
        </div>
      )
    )
    mockOperation.mockImplementation(
      ({ render }: { render: () => ReactElement }) => (
        <div data-testid='Operation'>{render()}</div>
      )
    )
    mockMenuItem.mockImplementation(
      ({ children, ...props }: { children: ReactElement }) => (
        <a {...props}>{children}</a>
      )
    )
  })

  it('renders nothing if an item has no type', () => {
    const label = 'test'

    arrangeTest({
      label: label
    })

    expect(screen.queryByText(label)).toBeNull()
  })

  it('renders nothing if an item is not visible', () => {
    const label = 'test'

    arrangeTest({
      label: label,
      type: DropdownActionType.STATIC,
      action: jest.fn(),
      visible: false
    })

    expect(screen.queryByText(label)).toBeNull()
  })

  it('renders a static item with a specified key', () => {
    const key = 'testKey'
    const label = 'Test Label'
    const action = jest.fn()

    arrangeTest({
      key,
      label: label,
      type: DropdownActionType.STATIC,
      action
    })

    const element = screen.getByTestId(`actions-dropdown-item-${key}`)

    fireEvent.click(element)

    expect(element).toBeInTheDocument()
    expect(action).toHaveBeenCalledWith()
  })

  it('renders a static item without specified key', () => {
    const label = 'Test Label'
    const action = jest.fn()

    arrangeTest({
      label: label,
      type: DropdownActionType.STATIC,
      action
    })

    const element = screen.getByTestId('actions-dropdown-item-TestLabel')

    fireEvent.click(element)

    expect(element).toBeInTheDocument()
    expect(action).toHaveBeenCalledWith()
  })

  it('renders a link', () => {
    const label = 'Test Label'
    const url = 'foo'
    const disabled = true

    arrangeTest({
      label: label,
      url,
      disabled,
      type: DropdownActionType.LINK
    })

    const element = screen.getByTestId('actions-dropdown-link-TestLabel')

    expect(element).toBeInTheDocument()

    expect(mockMenuItem).toHaveBeenCalledWith(
      expect.objectContaining({
        as: MenuLink,
        disabled,
        href: url
      }),
      {}
    )
  })

  it('renders an operation item', () => {
    const label = 'Test Label'
    const action = jest.fn()
    const operation = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }

    arrangeTest({
      label: label,
      operation,
      type: DropdownActionType.OPERATION,
      action
    })

    const element = screen.getByTestId('actions-dropdown-operation-TestLabel')

    fireEvent.click(element)

    expect(screen.getByTestId('Operation')).toBeInTheDocument()
    expect(element).toBeInTheDocument()
    expect(action).toHaveBeenCalledWith()
    expect(mockOperation).toHaveBeenCalledWith(
      expect.objectContaining({
        operation
      }),
      {}
    )
  })

  it('renders a lazy operation item', () => {
    const label = 'Test Label'
    const action = jest.fn()

    arrangeTest({
      label: label,
      operationVariables: {
        nodeId: 'foo',
        nodeType: NodeType.ACTIVATION_STEP,
        operationName: 'assign'
      },
      type: DropdownActionType.LAZY_OPERATION,
      action
    })

    const element = screen.getByTestId(
      'actions-dropdown-lazy-operation-TestLabel'
    )

    fireEvent.click(element)

    expect(element).toBeInTheDocument()
    expect(mockLazyOperationClick).toHaveBeenCalledWith(mockCheckOperation)
    expect(mockLazyRender).toHaveBeenCalledTimes(1)
  })
})
