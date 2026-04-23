import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EmailStatusPanelPrologue from '.'

const render = (props: ComponentProps<typeof EmailStatusPanelPrologue>) =>
  renderComponent(<EmailStatusPanelPrologue {...props} />)
const defaultRenderProps: ComponentProps<typeof EmailStatusPanelPrologue> = {
  nodeType: 'invoice',
  hasEmails: true,
  monitoringStartDate: '2020-06-26',
  notificationSentAt: '2020-01-05'
}

describe('EmailStatusPanelPrologue', () => {
  describe('when emails have no sentAt data', () => {
    it('renders nothing', () => {
      const { queryByTestId } = render({
        ...defaultRenderProps,
        notificationSentAt: undefined
      })

      expect(queryByTestId('EmailStatusPanelPrologue')).not.toBeInTheDocument()
    })
  })

  describe('when emails have sentAt data', () => {
    it('renders a timestamp of the sent email', () => {
      const { queryByTestId } = render({
        ...defaultRenderProps,
        notificationSentAt: '2020-01-05'
      })

      expect(
        queryByTestId('EmailStatusPanelPrologue-timestamp')
      ).toHaveTextContent('Jan 5, 2020 at 12:00am')
    })

    describe('when activity is monitored', () => {
      it('does not render a message about no monitoring', () => {
        const { queryByTestId } = render({
          ...defaultRenderProps,
          monitoringStartDate: '2020-06-26',
          notificationSentAt: '2020-07-20'
        })

        expect(
          queryByTestId('EmailStatusPanelPrologue-unmonitored')
        ).not.toBeInTheDocument()
      })

      describe('when there are no email statuses', () => {
        it('renders an "Awaiting confirmation" message', () => {
          const { queryByTestId } = render({
            ...defaultRenderProps,
            hasEmails: false,
            monitoringStartDate: '2020-06-26',
            notificationSentAt: '2020-07-20'
          })

          expect(
            queryByTestId('EmailStatusPanelPrologue-awaiting-confirmation')
          ).toHaveTextContent(
            'Awaiting delivery confirmation (updated every 15 minutes)'
          )
        })
      })
    })

    describe('when activity is not monitored', () => {
      it('does not render "Awaiting confirmation" message', () => {
        const { queryByTestId } = render({
          ...defaultRenderProps,
          monitoringStartDate: '2020-06-26',
          notificationSentAt: '2020-01-05'
        })

        expect(
          queryByTestId('EmailStatusPanelPrologue-awaiting-confirmation')
        ).not.toBeInTheDocument()
      })

      describe('when entity is an invoice', () => {
        it('renders a message about no monitoring', () => {
          const { queryByTestId } = render({
            ...defaultRenderProps,
            monitoringStartDate: '2020-06-26',
            notificationSentAt: '2020-01-05',
            nodeType: 'invoice'
          })

          expect(
            queryByTestId('EmailStatusPanelPrologue-unmonitored')
          ).toHaveTextContent(
            'Email delivery tracking is not available for invoices created before Jun 26, 2020'
          )
        })
      })

      describe('when entity is a payment', () => {
        it('renders a message about no monitoring', () => {
          const { queryByTestId } = render({
            ...defaultRenderProps,
            monitoringStartDate: '2020-06-26',
            notificationSentAt: '2020-01-05',
            nodeType: 'payment'
          })

          expect(
            queryByTestId('EmailStatusPanelPrologue-unmonitored')
          ).toHaveTextContent(
            'Email delivery tracking is not available for payments created before Jun 26, 2020'
          )
        })
      })
    })
  })
})
