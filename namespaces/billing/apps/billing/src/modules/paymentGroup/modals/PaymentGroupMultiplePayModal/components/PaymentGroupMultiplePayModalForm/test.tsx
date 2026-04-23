import { Form } from '@toptal/picasso-forms'
import { times } from 'lodash-es'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupMultiplePayModalForm from '.'

jest.mock(
  '../../../../components/PaymentGroupSelectableList/components/PaymentGroupSelectableList'
)

const createPaymentGroups = (id: number) => ({
  ...fixtures.MockPaymentGroup,
  id: id.toString()
})
const paymentGroups = times(2, createPaymentGroups)

const render = (
  props: ComponentProps<typeof PaymentGroupMultiplePayModalForm>
) =>
  renderComponent(
    <Form onSubmit={jest.fn()}>
      <PaymentGroupMultiplePayModalForm {...props} />
    </Form>
  )

describe('PaymentGroupMultiplePayModalForm', () => {
  it('default render', () => {
    const { getByTestId } = render({
      paymentGroups,
      totalCount: 2
    })

    const ComponentWarning = getByTestId(
      'PaymentGroupMultiplePayModalForm-warning'
    )
    const ComponentModalTitle = getByTestId('modal-title')
    const ComponentInfo = getByTestId('PaymentGroupMultiplePayModalForm-info')
    const ComponentComment = getByTestId('pay-multiple-comment')

    expect(ComponentWarning).toHaveTextContent(
      'Only payment groups that have an outstanding status and a preferred payment method are displayed.'
    )
    expect(ComponentModalTitle).toHaveTextContent('Pay Multiple Payment Groups')
    expect(ComponentInfo).toHaveTextContent(
      'Payment groups selected: 0 of 2. Total amount: $0.00.'
    )
    expect(ComponentComment).toHaveTextContent('Comment')
  })
})
