import React, { ComponentProps } from 'react'
import { useMutation } from '@apollo/client'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderPropertyEditor from './'

jest.mock('@apollo/client')

useMutation.mockImplementation(() => [jest.fn()])

const render = (props: ComponentProps<typeof PurchaseOrderPropertyEditor>) =>
  renderComponent(<PurchaseOrderPropertyEditor {...props} />)

describe('PurchaseOrderPropertyEditor', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      isToggled: false,
      name: 'amount',
      operation: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      onClose: () => null,
      onToggle: () => null,
      purchaseOrderId: '1234',
      successMessage: 'success',
      type: 'amount',
      value: '1234.0'
    })

    expect(
      queryByTestId('PurchaseOrderPropertyEditor-amount')
    ).toBeInTheDocument()
    expect(
      queryByTestId('PurchaseOrderPropertyEditor-amount-input')
    ).not.toBeInTheDocument()
  })

  it('successfully displays the editor', () => {
    const { queryByTestId } = render({
      isToggled: true,
      name: 'amount',
      operation: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      onClose: () => null,
      onToggle: () => null,
      purchaseOrderId: '1234',
      successMessage: 'success',
      type: 'amount',
      value: '1234.0'
    })

    expect(
      queryByTestId('PurchaseOrderPropertyEditor-amount')
    ).not.toBeInTheDocument()
    expect(
      queryByTestId('PurchaseOrderPropertyEditor-amount-input')
    ).toBeInTheDocument()
  })

  it('displays the editor with a disabled edit button', () => {
    const { getByTestId } = render({
      disabled: true,
      isToggled: false,
      name: 'threshold',
      operation: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      onClose: () => null,
      onToggle: () => null,
      purchaseOrderId: '1234',
      successMessage: 'success',
      type: 'percentage',
      value: '75.0'
    })

    expect(
      getByTestId('PurchaseOrderPropertyEditor-threshold-toggle')
    ).toBeDisabled()
  })

  it('displays the editor with a tooltip', () => {
    const { getByTestId } = render({
      disabled: true,
      isToggled: false,
      tooltipMessage: 'example enabled tooltip',
      name: 'threshold',
      operation: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      onClose: () => null,
      onToggle: () => null,
      purchaseOrderId: '1234',
      successMessage: 'success',
      type: 'percentage',
      value: '75.0'
    })

    expect(getByTestId('Tooltip')).toBeInTheDocument()
    expect(getByTestId('Tooltip-placement')).toContainHTML('bottom')
    expect(getByTestId('Tooltip-content')).toContainHTML(
      'example enabled tooltip'
    )
  })
})
