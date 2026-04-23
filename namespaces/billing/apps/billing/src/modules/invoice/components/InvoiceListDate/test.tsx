import React, { ComponentProps } from 'react'
import MockDate from 'mockdate'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useCommercialDocumentDueMessage } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import InvoiceListDate from '.'

const render = (props: ComponentProps<typeof InvoiceListDate>) =>
  renderComponent(<InvoiceListDate {...props} />)

jest.mock('@staff-portal/billing-widgets/src/modules/commercialDocument/utils')

describe('InvoiceListDate', () => {
  beforeEach(() => MockDate.set('2019/01/01 19:00'))

  afterEach(() => MockDate.reset())

  describe('when dueMessage is provided', () => {
    it('renders due date message', () => {
      ;(useCommercialDocumentDueMessage as jest.Mock).mockReturnValue(
        'Due on Jul 12, 2020'
      )

      const { getByTestId } = render({
        invoice: {
          status: 'outstanding',
          processingDate: '2020-05-06',
          dueDate: '2020-07-12'
        }
      })

      expect(getByTestId('InvoiceListDate-due-date').innerHTML).toBe(
        'Due on Jul 12, 2020'
      )
    })
  })

  describe('when dueMessage is missing', () => {
    it('does not render due date message', () => {
      ;(useCommercialDocumentDueMessage as jest.Mock).mockReturnValue(undefined)
      const { queryByTestId } = render({
        invoice: {
          status: 'paid',
          paidAt: '2020-12-25'
        }
      })

      expect(queryByTestId('InvoiceListDate-due-date')).toBeNull()
    })
  })

  describe('when Invoice has `issueDate`', () => {
    it('renders issueDate', () => {
      const { getByTestId } = render({
        invoice: {
          issueDate: '2020-05-06'
        }
      })

      expect(getByTestId('InvoiceListDate-issue-date').innerHTML).toBe(
        'May 6, 2020'
      )
    })
  })

  describe('when Invoice does not have `issueDate`', () => {
    it('does not render issueDate', () => {
      const { queryByTestId } = render({
        invoice: {}
      })

      expect(queryByTestId('InvoiceListDate-issue-date')).toBeNull()
    })
  })
})
