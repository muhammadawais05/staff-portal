import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { ReviewKind } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import MockDate from 'mockdate'

import ReviewAttemptsContent from './ReviewAttemptsContent'

jest.mock('@staff-portal/date-time-utils')

const arrangeTest = (props: ComponentProps<typeof ReviewAttemptsContent>) =>
  render(
    <TestWrapper>
      <ReviewAttemptsContent {...props} />
    </TestWrapper>
  )

describe('ReviewAttemptsContent', () => {
  beforeAll(() => {
    MockDate.set('2022-01-01T10:20:30')
  })

  describe('when review attempts are passed', () => {
    it('renders review attempts', () => {
      arrangeTest({
        clientId: 'test',
        reviewAttempts: [
          {
            id: 'TEST_ID',
            createdAt: '2021-01-01T00:00:00+00:00',
            kind: ReviewKind.AWAITING
          }
        ]
      })

      expect(screen.getByTestId('ReviewAttempts-title')).toHaveTextContent(
        'Review Attempts'
      )
      expect(
        screen.getByTestId('ReviewAttempts-collapsible')
      ).toHaveTextContent('true')
      expect(
        screen.getByTestId('ReviewAttempts-defaultCollapsed')
      ).toHaveTextContent('false')
      expect(
        screen.getByTestId('ReviewAttemptsContent-reviewAttemptsList')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ReviewAttemptsContent-noAttemptsAvailable')
      ).toBeNull()
    })
  })

  describe('when there are no review attempts', () => {
    it('component is not rendered', () => {
      arrangeTest({
        clientId: 'test',
        reviewAttempts: []
      })

      expect(
        screen.queryByTestId('ReviewAttemptsContent-reviewAttemptsList')
      ).toBeNull()
      expect(
        screen.queryByTestId('ReviewAttemptsContent-noAttemptsAvailable')
      ).toBeNull()
    })
  })
})
