import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import AssignPurchaseOrderModalForm from '.'

const render = ({
  invoice
}: Pick<ComponentProps<typeof AssignPurchaseOrderModalForm>, 'invoice'>) =>
  renderComponent(
    <AssignPurchaseOrderModalForm
      handleOnSubmit={jest.fn()}
      invoice={invoice}
    />
  )

describe('AssignPurchaseOrderModalForm', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      invoice: {}
    })

    expect(queryByTestId('modal-title')).toBeInTheDocument()
  })
})
