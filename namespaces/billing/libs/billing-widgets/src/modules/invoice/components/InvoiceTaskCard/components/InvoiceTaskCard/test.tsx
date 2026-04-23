import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { useGetInvoiceTaskCard } from '../../data'
import InvoiceTaskCard from '.'

jest.mock('../InvoiceTaskCardActions')
jest.mock('../InvoiceTaskCardSummary')
jest.mock('../InvoiceTaskCardContent')
jest.mock('../../data')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const render = (props: ComponentProps<typeof InvoiceTaskCard>) =>
  renderComponent(<InvoiceTaskCard {...props} />)

describe('InvoiceTaskCard', () => {
  beforeEach(() => {
    useGetInvoiceTaskCard.mockReturnValue({
      data: fixtures.MockInvoice,
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
