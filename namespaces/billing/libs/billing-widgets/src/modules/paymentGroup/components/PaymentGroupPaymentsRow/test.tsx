import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import PaymentGroupPaymentsRow from '.'

jest.mock('../PaymentGroupPaymentsActions')
jest.mock('../../../payment/components/PaymentShortDescription')
jest.mock('../../../commercialDocument/components/CommercialDocumentStatus')
jest.mock(
  '../../../commercialDocument/components/CommercialDocumentAmountWithColorAndTooltip'
)
jest.mock('@staff-portal/billing/src/components/WebResourceLinkWrapper')

const render = (props: ComponentProps<typeof PaymentGroupPaymentsRow>) =>
  renderComponent(
    <Table>
      <Table.Body>
        <PaymentGroupPaymentsRow {...props} />
      </Table.Body>
    </Table>
  )

const MockPayment =
  fixtures.MockPaymentGroupDetails.payments.groups[0].payments[0]

describe('PaymentGroupPaymentsRow', () => {
  it(`will render all data`, () => {
    const { getByTestId } = render({
      payment: MockPayment
    })

    expect(getByTestId('PaymentGroupPaymentsRow-payment-id')).toHaveTextContent(
      '#1266319'
    )
    expect(getByTestId('CommercialDocumentStatus')).toHaveTextContent('OVERDUE')
    expect(
      getByTestId('CommercialDocumentAmountWithColorAndTooltip')
    ).toHaveTextContent('10.16')
    expect(
      getByTestId('PaymentGroupPaymentsRow-created-on-date')
    ).toHaveTextContent('Feb 1, 2021')
    expect(getByTestId('PaymentShortDescription')).toBeInTheDocument()
    expect(getByTestId('PaymentGroupPaymentsActions')).toBeInTheDocument()
  })
})
