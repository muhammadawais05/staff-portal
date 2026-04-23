import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceTaskCardContent from '.'

jest.mock('../../data')
jest.mock('../InvoiceTaskCardActions')
jest.mock('../InvoiceTaskCardSummary')

const MockedTimelineButton = () => <div data-testid='TimelineButton' />

const render = (props: ComponentProps<typeof InvoiceTaskCardContent>) =>
  renderComponent(
    <InvoiceTaskCardContent {...props} TimelineButton={MockedTimelineButton} />
  )

describe('InvoiceTaskCardContent', () => {
  it('card is rendered properly', () => {
    const { container } = render({
      handleOnClick: jest.fn(),
      invoice: fixtures.MockInvoice,
      isShowSendEmailModalLoading: true,
      task: {
        description: 'Awesome task',
        id: 'VjEtVGFzay00MTA0MTUz'
      },
      taskCardSubtitle: '11234564',
      taskCardTitle: 'Invoice'
    })

    expect(container).toMatchSnapshot()
  })
})
