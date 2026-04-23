import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import CancelPaymentGroupForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (
  props: Omit<ComponentProps<typeof CancelPaymentGroupForm>, 'handleOnSubmit'>
) =>
  renderComponent(
    <CancelPaymentGroupForm handleOnSubmit={jest.fn()} {...props} />
  )

describe('CancelPaymentGroupForm', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      paymentGroupNumber: fixtures.MockPaymentGroup.number.toString(),
      initialValues: {
        paymentGroupId: fixtures.MockPaymentGroup.id,
        comment: ''
      }
    })

    expect(queryByTestId('CancelPaymentGroupForm-title')).toHaveTextContent(
      'Cancel Payment Group #186344'
    )
    expect(queryByTestId('CancelPaymentGroupForm-intro')).toHaveTextContent(
      "By canceling payment group you acknowledge that it was moved to the paid status by mistake, no real funds were transferred, and understand that this isn't going to affect anyones local account."
    )
    expect(queryByTestId('CancelPaymentGroupForm-comment')).toBeInTheDocument()
    expect(queryByTestId('submit')).toBeInTheDocument()
  })
})
