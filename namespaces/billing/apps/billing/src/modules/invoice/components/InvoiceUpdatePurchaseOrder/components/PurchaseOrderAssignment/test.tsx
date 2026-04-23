import { merge } from 'lodash-es'
import React, { ComponentProps } from 'react'
import { PurchaseOrder } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderAssignment from '.'

jest.mock('../PurchaseOrderAssignmentEditor')
jest.mock('@staff-portal/billing/src/components/LinkWrapper')
jest.mock('../../data/UpdateInvoicePurchaseOrder.graphql.types', () => ({
  useUpdateInvoicePurchaseOrderMutation: jest.fn(() => [
    'useinvoiceAssignPurchaseOrderMutation'
  ])
}))

const mockLabel = 'test label'
const mockPO = {
  id: 'testId',
  poNumber: 'testNumber'
} as PurchaseOrder
const mockPOWithoutId = {
  poNumber: 'testNumber'
} as PurchaseOrder

const render = (
  variables?: Partial<ComponentProps<typeof PurchaseOrderAssignment>>
) => {
  const props = merge(
    {},
    {
      invoiceId: 'invoiceId',
      isDisabled: true,
      purchaseOrders: []
    },
    variables || {}
  )

  return renderComponent(<PurchaseOrderAssignment {...props} />)
}

describe('PurchaseOrderAssignment', () => {
  it('default render', () => {
    const { container } = render()

    expect(container).toMatchSnapshot()
  })

  it('with NO purchase order - EDITABLE', () => {
    const { container, queryByTestId } = render({
      isDisabled: false
    })

    expect(queryByTestId('purchaseOrderEditorToggle')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('with a purchase order', () => {
    const { container, queryByTestId } = render({
      selectedPurchaseOrder: mockPO
    })

    expect(queryByTestId('purchaseOrderEditorToggle')).not.toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('with a purchase order - EDITABLE', () => {
    const { container } = render({
      isDisabled: false,
      selectedPurchaseOrder: mockPO
    })

    expect(container).toMatchSnapshot()
  })

  it('with a custom LABEL - EDITABLE', () => {
    const { container } = render({
      isDisabled: false,
      label: mockLabel
    })

    expect(container).toMatchSnapshot()
  })

  it('with a custom LABEL and a purchase order - EDITABLE', () => {
    const { container } = render({
      isDisabled: false,
      label: mockLabel,
      selectedPurchaseOrder: mockPO
    })

    expect(container).toMatchSnapshot()
  })

  it('with purchase orders and a selected purchase order', () => {
    const { container } = render({
      selectedPurchaseOrder: mockPO,
      purchaseOrders: [mockPO]
    })

    expect(container).toMatchSnapshot()
  })

  it('with a custom LABEL, purchase orders and a selected purchase order', () => {
    const { container } = render({
      label: mockLabel,
      selectedPurchaseOrder: mockPO,
      purchaseOrders: [mockPO]
    })

    expect(container).toMatchSnapshot()
  })

  it('with a custom LABEL and a selected purchase order - EDITABLE, showing EDITOR', () => {
    const { container, getByTestId } = render({
      isDisabled: false,
      label: mockLabel,
      selectedPurchaseOrder: mockPO
    })

    getByTestId('purchaseOrderEditorToggle').click()

    expect(getByTestId('purchaseOrderEditorForm')).not.toBeNull()
    expect(container).toMatchSnapshot()
  })

  it('with a custom LABEL and a selected purchase order without ID', () => {
    const { container, queryByTestId } = render({
      label: mockLabel,
      selectedPurchaseOrder: mockPOWithoutId
    })

    expect(
      queryByTestId('purchaseOrderPlaceholderLink')
    ).not.toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
