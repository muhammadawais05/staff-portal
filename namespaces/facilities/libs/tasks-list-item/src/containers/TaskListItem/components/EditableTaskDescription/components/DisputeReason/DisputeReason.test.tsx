import { render } from '@testing-library/react'
import React, { ComponentProps } from 'react'
import { TaskStatus } from '@staff-portal/tasks'
import { TestWrapper } from '@staff-portal/test-utils'

import DisputeReason from './DisputeReason'

const arrangeTest = (props: ComponentProps<typeof DisputeReason>) =>
  render(
    <TestWrapper>
      <DisputeReason {...props} />
    </TestWrapper>
  )

describe('DisputeReason', () => {
  describe('renders CANCELED status properly', () => {
    it('when dispute reason is provided', () => {
      const { container } = arrangeTest({
        status: TaskStatus.CANCELLED,
        disputeReason: 'Deward please'
      })

      expect(container).toHaveTextContent(
        'The dispute for this task was accepted.Dispute reason:Deward please'
      )
    })

    it('when dispute reason is not provided', () => {
      const { container } = arrangeTest({
        status: TaskStatus.CANCELLED
      })

      expect(container).toHaveTextContent(
        'The dispute for this task was accepted, no dispute reason is available.'
      )
    })
  })

  describe('when status is not CANCELED', () => {
    it('and dispute reason is provided', () => {
      const { container } = arrangeTest({
        status: TaskStatus.FINISHED,
        disputeReason: 'Deward please'
      })

      expect(container).toHaveTextContent('Dispute reason:Deward please')
    })

    it('and dispute reason is not provided', () => {
      const { container } = arrangeTest({
        status: TaskStatus.FINISHED
      })

      expect(container).toHaveTextContent(
        'This is a disputed task, but no dispute reason is available.'
      )
    })
  })
})
