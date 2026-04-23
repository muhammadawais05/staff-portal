import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentSelectableListRow from '.'

jest.mock(
  '@staff-portal/billing-widgets/src/modules/payment/components/PaymentShortDescription'
)
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentAmountWithColorAndTooltip'
)
jest.mock('@staff-portal/billing/src/components/RowExpander')

const render = (props: ComponentProps<typeof PaymentSelectableListRow>) =>
  renderComponent(
    <Table>
      <Table.Body>
        <PaymentSelectableListRow {...props} />
      </Table.Body>
    </Table>
  )

describe('PaymentSelectableListRow', () => {
  it('default render', () => {
    const { container } = render({
      index: 1,
      payment: fixtures.MockPayment
    })

    expect(container).toMatchSnapshot()
  })
})
