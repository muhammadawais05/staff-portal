import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentTaskCardActions from '.'

const MockedTimelineButton = () => <div data-testid='TimelineButton' />

const render = (props: ComponentProps<typeof PaymentTaskCardActions>) =>
  renderComponent(
    <PaymentTaskCardActions {...props} TimelineButton={MockedTimelineButton} />
  )

describe('PaymentTaskCardActions', () => {
  describe('when Add memorandum action is disabled', () => {
    it('renders Timeline button only', () => {
      const { getByTestId, queryByTestId } = render({
        handleOnClick: jest.fn(),
        payment: fixtures.MockPayment,
        task: {
          description: 'Awesome task',
          id: 'VjEtVGFzay00MTA0MTUz'
        },
        taskStatus: 'PENDING'
      })

      expect(getByTestId('TimelineButton')).toBeInTheDocument()
      expect(queryByTestId('PaymentTaskCardActions-addMemo')).toBeNull()
    })
  })

  describe('when Add memorandum action is enabled', () => {
    it('renders Timeline & Add Memorandum buttons', () => {
      const { getByTestId } = render({
        handleOnClick: jest.fn(),
        payment: fixtures.MockPayment,
        task: {
          description: 'Awesome task',
          id: 'VjEtVGFzay00MTA0MTUz'
        },
        taskStatus: 'PENDING',
        taskPlaybookIdentifier: 'issue_memo_for_payment'
      })

      expect(getByTestId('TimelineButton')).toBeInTheDocument()
      expect(getByTestId('PaymentTaskCardActions-addMemo')).toBeInTheDocument()
      expect(getByTestId('PaymentTaskCardActions-addMemo')).toContainHTML(
        'Add Memorandum'
      )
    })
  })
})
