import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { useGetPaymentTaskCard } from '../../data'
import PaymentTaskCard from '.'

jest.mock('../PaymentTaskCardActions')
jest.mock('../PaymentTaskCardSummary')
jest.mock('../PaymentTaskCardContent')
jest.mock('../../data')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const render = (props: ComponentProps<typeof PaymentTaskCard>) =>
  renderComponent(<PaymentTaskCard {...props} />)

describe('PaymentTaskCard', () => {
  beforeEach(() => {
    useGetPaymentTaskCard.mockReturnValue({
      data: fixtures.MockPayment,
      loading: false
    })
  })

  it('card is rendered properly', () => {
    const { container } = render({
      task: {
        description: 'Awesome task',
        id: 'VjEtVGFzay00MTA0MTUz'
      },
      taskCardConfig: {}
    })

    expect(container).toMatchSnapshot()
  })
})
