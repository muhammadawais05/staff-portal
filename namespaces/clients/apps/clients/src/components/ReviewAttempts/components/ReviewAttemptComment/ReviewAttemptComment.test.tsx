import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ReviewAttemptComment from './ReviewAttemptComment'

const arrangeTest = (props: ComponentProps<typeof ReviewAttemptComment>) =>
  render(
    <TestWrapper>
      <ReviewAttemptComment {...props} />
    </TestWrapper>
  )

describe('ReviewAttemptComment', () => {
  describe('when commentary is passed', () => {
    it('renders commentary', () => {
      const commentary = 'COMMENT'

      arrangeTest({ commentary: commentary, reviewLink: 'LINK' })

      expect(
        screen.getByTestId('ReviewAttemptComment-commentary')
      ).toHaveTextContent(commentary)
      expect(screen.queryByTestId('ReviewAttemptComment-reviewLink')).toBeNull()
      expect(screen.queryByTestId('ReviewAttemptComment-empty')).toBeNull()
    })
  })

  describe('when commentary is not passed and passed reviewLink', () => {
    it('renders reviewLink', () => {
      const reviewLink = 'LINK'

      arrangeTest({ reviewLink: reviewLink })

      expect(screen.queryByTestId('ReviewAttemptComment-commentary')).toBeNull()
      expect(
        screen.getByTestId('ReviewAttemptComment-reviewLink')
      ).toHaveTextContent(reviewLink)
      expect(screen.queryByTestId('ReviewAttemptComment-empty')).toBeNull()
    })
  })

  describe('when both commentary and reviewLink is not passed', () => {
    it('renders empty sign', () => {
      arrangeTest({})

      expect(screen.queryByTestId('ReviewAttemptComment-commentary')).toBeNull()
      expect(screen.queryByTestId('ReviewAttemptComment-reviewLink')).toBeNull()
      expect(
        screen.getByTestId('ReviewAttemptComment-empty')
      ).toHaveTextContent('--')
    })
  })
})
