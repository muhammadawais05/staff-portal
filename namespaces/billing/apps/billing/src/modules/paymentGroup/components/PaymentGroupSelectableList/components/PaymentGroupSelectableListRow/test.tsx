import { Form } from '@toptal/picasso-forms'
import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupSelectableListRow from '.'

jest.mock(
  '@staff-portal/billing-widgets/src/modules/payment/components/PaymentShortDescription'
)
jest.mock('@staff-portal/billing/src/components/RowExpander')

const render = (props: ComponentProps<typeof PaymentGroupSelectableListRow>) =>
  renderComponent(
    <Form onSubmit={jest.fn()}>
      <Table>
        <Table.Body>
          <PaymentGroupSelectableListRow {...props} />
        </Table.Body>
      </Table>
    </Form>
  )

describe('PaymentGroupSelectableListRow', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      index: 1,
      paymentGroup: fixtures.MockPaymentGroup,
      selectionEnabled: true
    })

    const CheckBoxComponent = queryByTestId(
      'PaymentGroupSelectableListRow-checkbox'
    )
    const LinkComponent = queryByTestId(
      'PaymentGroupSelectableListRow-paymentGroup-id'
    )
    const RecipientComponent = queryByTestId(
      'PaymentGroupSelectableListRow-recipient'
    )
    const AmountComponent = queryByTestId(
      'PaymentGroupSelectableListRow-amount'
    )
    const DateComponent = queryByTestId(
      'PaymentGroupSelectableListRow-created-on-date'
    )

    expect(CheckBoxComponent).toBeInTheDocument()
    expect(LinkComponent).toHaveTextContent('#186344')
    expect(RecipientComponent).toHaveTextContent('Annamaria Strosin')
    expect(AmountComponent).toHaveTextContent('$1,800.00')
    expect(DateComponent).toHaveTextContent('Jan 29, 2021')
  })

  it('does not render the checkbox cell if selectionEnabled is `false`', () => {
    const { queryByTestId } = render({
      index: 1,
      paymentGroup: fixtures.MockPaymentGroup,
      selectionEnabled: false
    })

    const CheckBoxComponent = queryByTestId(
      'PaymentGroupSelectableListRow-checkbox'
    )

    expect(CheckBoxComponent).toBeNull()
  })
})
