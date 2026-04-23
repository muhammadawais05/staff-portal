import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentListHeader from '.'

const render = (props: ComponentProps<typeof PaymentListHeader> = {}) =>
  renderComponent(
    <Table>
      <PaymentListHeader {...props} />
    </Table>
  )

describe('Header', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('MemorandumListTableHeader-id')).toHaveTextContent('ID')
    expect(getByTestId('MemorandumListTableHeader-balance')).toHaveTextContent(
      'Balance'
    )
    expect(getByTestId('MemorandumListTableHeader-receiver')).toHaveTextContent(
      'Receiver'
    )
    expect(getByTestId('MemorandumListTableHeader-amount')).toHaveTextContent(
      'Amount'
    )
    expect(getByTestId('MemorandumListTableHeader-date')).toHaveTextContent(
      'Created On'
    )
    expect(getByTestId('MemorandumListTableHeader-details')).toHaveTextContent(
      'Details'
    )
    expect(getByTestId('MemorandumListTableHeader-actions')).toHaveTextContent(
      'Actions'
    )
  })
})
