import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import InvoiceTaskCardActions from '.'

const MockedTimelineButton = () => <div data-testid='TimelineButton' />

const render = (props: ComponentProps<typeof InvoiceTaskCardActions>) =>
  renderComponent(
    <InvoiceTaskCardActions {...props} TimelineButton={MockedTimelineButton} />
  )

describe('InvoiceTaskCardActions', () => {
  it('renders Add Payment button', () => {
    const { getByTestId } = render({
      handleOnClick: jest.fn(),
      invoice: fixtures.MockInvoice,
      task: {
        description: 'Awesome task',
        id: 'VjEtVGFzay00MTA0MTUz'
      },
      taskStatus: 'PENDING',
      taskPlaybookIdentifier: 'issue_memo_for_payment'
    })

    expect(getByTestId('InvoiceTaskCardActions-addPayment')).toBeInTheDocument()
    expect(getByTestId('InvoiceTaskCardActions-addPayment')).toContainHTML(
      'Add Payment'
    )
  })

  it('renders Send Email button', () => {
    const { getByTestId } = render({
      handleOnClick: jest.fn(),
      invoice: fixtures.MockInvoice,
      task: {
        description: 'Awesome task',
        id: 'VjEtVGFzay00MTA0MTUz'
      },
      taskStatus: 'PENDING',
      taskPlaybookIdentifier: 'issue_memo_for_payment'
    })

    expect(getByTestId('InvoiceTaskCardActions-sendEmail')).toBeInTheDocument()
    expect(getByTestId('InvoiceTaskCardActions-sendEmail')).toContainHTML(
      'Send Email'
    )
  })

  describe('when Add memorandum action is disabled', () => {
    it('renders Timeline button only', () => {
      const { getByTestId, queryByTestId } = render({
        handleOnClick: jest.fn(),
        invoice: fixtures.MockInvoice,
        task: {
          description: 'Awesome task',
          id: 'VjEtVGFzay00MTA0MTUz'
        },
        taskStatus: 'PENDING'
      })

      expect(getByTestId('TimelineButton')).toBeInTheDocument()
      expect(queryByTestId('InvoiceTaskCardActions-addMemo')).toBeNull()
    })
  })

  describe('when Add memorandum action is enabled', () => {
    it('renders Timeline & Add Memorandum buttons', () => {
      const { getByTestId } = render({
        handleOnClick: jest.fn(),
        invoice: fixtures.MockInvoice,
        task: {
          description: 'Awesome task',
          id: 'VjEtVGFzay00MTA0MTUz'
        },
        taskStatus: 'PENDING',
        taskPlaybookIdentifier: 'issue_memo_for_invoice'
      })

      expect(getByTestId('TimelineButton')).toBeInTheDocument()
      expect(getByTestId('InvoiceTaskCardActions-addMemo')).toBeInTheDocument()
      expect(getByTestId('InvoiceTaskCardActions-addMemo')).toContainHTML(
        'Add Memorandum'
      )
    })
  })
})
