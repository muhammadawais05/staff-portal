import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderCreateModalForm from '.'

jest.mock('../CompanyAutocomplete')
jest.mock('@staff-portal/forms', () => ({
  ...jest.requireActual('@staff-portal/forms'),
  FormDatePickerWrapper: (props: { 'data-testid': string }) => (
    <div data-testid={props['data-testid']} />
  )
}))

const render = (props: ComponentProps<typeof PurchaseOrderCreateModalForm>) =>
  renderComponent(<PurchaseOrderCreateModalForm {...props} />)

describe('PurchaseOrderCreateModalForm', () => {
  it('default render', () => {
    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      poLinesEnabled: false
    })

    expect(getByTestId('purchaseOrderModal-title')).toHaveTextContent(
      'New Purchase Order'
    )

    expect(getByTestId('CompanyAutocomplete')).toBeInTheDocument()
    expect(
      getByTestId('PurchaseOrderCreateModalForm-number')
    ).toBeInTheDocument()
    expect(
      getByTestId('PurchaseOrderCreateModalForm-threshold')
    ).toBeInTheDocument()
    expect(
      getByTestId('PurchaseOrderCreateModalForm-expiryDate')
    ).toBeInTheDocument()
  })
  describe('when poLinesEnabled is true', () => {
    it('displays PO lines controls', () => {
      const { getByTestId } = render({
        handleOnSubmit: jest.fn(),
        poLinesEnabled: true
      })

      expect(getByTestId('purchaseOrderModal-title')).toHaveTextContent(
        'New Purchase Order'
      )

      expect(getByTestId('CompanyAutocomplete')).toBeInTheDocument()
      expect(
        getByTestId('purchase-order-line-field-number.0')
      ).toBeInTheDocument()
      expect(
        getByTestId('purchase-order-line-field-threshold.0')
      ).toBeInTheDocument()
      expect(
        getByTestId('purchase-order-line-field-expiryDate.0')
      ).toBeInTheDocument()
    })
  })
})
