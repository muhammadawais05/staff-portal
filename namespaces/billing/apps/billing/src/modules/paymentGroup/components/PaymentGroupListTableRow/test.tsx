import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import PaymentGroupListTableRow from '.'

jest.mock('../PaymentGroupStatus')
jest.mock('@staff-portal/billing/src/components/WebResourceLinkWrapper')
jest.mock('../PaymentGroupRowAction')

const render = (props: ComponentProps<typeof PaymentGroupListTableRow>) =>
  renderComponent(
    <Table>
      <Table.Body>
        <PaymentGroupListTableRow {...props} />
      </Table.Body>
    </Table>
  )

const MockPaymentGroup =
  fixtures.MockPaymentGroupList.paymentGroupsNullable.nodes[0]

describe('PaymentGroupListTableRow', () => {
  it(`will render all data`, () => {
    const { getByTestId } = render({
      group: MockPaymentGroup
    })

    expect(getByTestId('PaymentGroupListTableRow-number')).toHaveTextContent(
      '#186344'
    )
    expect(getByTestId('PaymentGroupStatus')).toHaveTextContent('PAID')
    expect(getByTestId('PaymentGroupListTableRow-payee')).toHaveTextContent(
      'Annamaria Strosin'
    )
    expect(getByTestId('PaymentGroupListTableRow-amount')).toHaveTextContent(
      '$1,800.0'
    )
    expect(getByTestId('PaymentGroupListTableRow-date')).toHaveTextContent(
      'Jan 29, 2021'
    )
    expect(getByTestId('PaymentGroupRowAction')).toBeInTheDocument()
  })
})
