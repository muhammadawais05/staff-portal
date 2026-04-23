import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import { InvoiceNotificationUnsentReason } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EmailStatusPanelContent from '.'

jest.mock('../EmailStatusPanelTableRow')
jest.mock('../EmailStatusPanelHeader')
jest.mock('../EmailStatusPanelPrologue')

const render = (props: ComponentProps<typeof EmailStatusPanelContent>) =>
  renderComponent(<EmailStatusPanelContent {...props} />)

describe('EmailStatusPanelContent', () => {
  beforeEach(() => MockDate.set('2019/01/01 19:00'))

  afterEach(() => MockDate.reset())

  it('default render', () => {
    const { queryByTestId, getAllByTestId } = render({
      data: fixtures.MockNotifications,
      isInvoice: true
    })

    expect(queryByTestId('EmailStatusPanelPrologue')).toBeInTheDocument()
    expect(queryByTestId('EmailStatusPanelHeader')).toBeInTheDocument()
    expect(getAllByTestId('EmailStatusPanelTableRow')?.length).toBe(3)
  })

  describe('when unsent reason is provided', () => {
    describe('when has valid data set', () => {
      it('unsentReason displayed', () => {
        const { queryByTestId } = render({
          data: {
            ...fixtures.MockNotifications
          },
          isInvoice: true
        })

        const helpBox = queryByTestId('EmailStatusPanelContent-unsentReason')

        expect(helpBox).toBeNull()
      })
    })

    describe('when data set is empty', () => {
      describe('when `unsentReasonKey` is `COMPANY_NOTIFICATIONS_DISABLED`', () => {
        it('unsentReason displayed', () => {
          const { queryByTestId } = render({
            data: {
              ...fixtures.MockNotifications,
              notifications: {
                nodes: [],
                unsentReasonKey:
                  InvoiceNotificationUnsentReason.COMPANY_NOTIFICATIONS_DISABLED
              }
            }
          })

          const helpBox = queryByTestId('EmailStatusPanelContent-unsentReason')

          expect(helpBox).toBeInTheDocument()
          expect(helpBox).toContainHTML(
            'Not sent. Company has disabled invoice notifications.'
          )
        })
      })

      describe('when `unsentReasonKey` is `CONSOLIDATED_INVOICE`', () => {
        it('unsentReason displayed', () => {
          const { queryByTestId } = render({
            data: {
              ...fixtures.MockNotifications,
              notifications: {
                nodes: [],
                unsentReasonKey:
                  InvoiceNotificationUnsentReason.CONSOLIDATED_INVOICE
              }
            }
          })

          const helpBox = queryByTestId('EmailStatusPanelContent-unsentReason')

          expect(helpBox).toBeInTheDocument()
          expect(helpBox).toContainHTML(
            'Not sent. This invoice was consolidated or it is marked for auto-consolidation.'
          )
        })
      })

      describe('when `unsentReasonKey` is `INVOICE_NOTIFICATIONS_DISABLED`', () => {
        it('unsentReason displayed', () => {
          const { queryByTestId } = render({
            data: {
              ...fixtures.MockNotifications,
              notifications: {
                nodes: [],
                unsentReasonKey:
                  InvoiceNotificationUnsentReason.INVOICE_NOTIFICATIONS_DISABLED
              }
            }
          })

          const helpBox = queryByTestId('EmailStatusPanelContent-unsentReason')

          expect(helpBox).toBeInTheDocument()
          expect(helpBox).toContainHTML(
            'Not sent. Invoice notifications were not enabled for this invoice.'
          )
        })
      })
    })
  })
})
