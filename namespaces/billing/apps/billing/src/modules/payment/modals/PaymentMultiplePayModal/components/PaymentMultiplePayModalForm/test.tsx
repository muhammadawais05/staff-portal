import { Form } from '@toptal/picasso-forms'
import { times } from 'lodash-es'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentMultiplePayModalForm from '.'

const createPayment = (id: number) => ({
  ...fixtures.MockPayment,
  id: id.toString()
})
const payments = times(2, createPayment)

const render = (props: ComponentProps<typeof PaymentMultiplePayModalForm>) =>
  renderComponent(
    <Form onSubmit={jest.fn()}>
      <PaymentMultiplePayModalForm {...props} />
    </Form>
  )

describe('PaymentMultiplePayModalForm', () => {
  it('default render', () => {
    const { getAllByTestId } = render({
      payments,
      totalCount: 2
    })

    const paymentShortDescription = getAllByTestId('PaymentShortDescription')
    const talentLinks = getAllByTestId('talent-link')

    expect(paymentShortDescription[0]).toContainHTML(
      'Commission for screening Short role step title step of'
    )
    expect(talentLinks[0]).toContainHTML('George Aidonidis')
  })
})
