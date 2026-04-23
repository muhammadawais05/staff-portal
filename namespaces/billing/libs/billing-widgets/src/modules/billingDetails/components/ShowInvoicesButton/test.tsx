import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ShowInvoicesButton from '.'

const render = (props: ComponentProps<typeof ShowInvoicesButton>) =>
  renderComponent(<ShowInvoicesButton {...props} />)

describe('ShowInvoicesButton', () => {
  it('renders components properly', () => {
    const { getByTestId } = render({
      operation: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      href: '/invoices?badges[company_ids][]=2346040)'
    })

    expect(getByTestId('ShowInvoicesButton')).toHaveTextContent('Show Invoices')
    expect(getByTestId('ShowInvoicesButton')).toHaveAttribute(
      'href',
      '/invoices?badges[company_ids][]=2346040)'
    )
  })
})
