import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentConvertToCreditMemoModal from '.'

jest.mock('../PaymentConvertToCreditMemoModalForm')
jest.mock('../../data', () => ({
  useConvertPaymentIntoCreditMemorandumMutation: () => [jest.fn()]
}))

const render = (
  props: ComponentProps<typeof PaymentConvertToCreditMemoModal>
) => renderComponent(<PaymentConvertToCreditMemoModal {...props} />)

describe('PaymentConvertToCreditMemoModal', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      options: {
        nodeId: fixtures.MockPayment.documentNumber.toString(),
        nodeType: 'payment'
      }
    })

    const form = queryByTestId('PaymentConvertToCreditMemoModalForm')

    expect(form).toContainHTML('"paymentId":"VjEtUGF5bWVudC0xMTA0NDI4"')
    expect(form).toContainHTML('"comment":""')
  })
})
