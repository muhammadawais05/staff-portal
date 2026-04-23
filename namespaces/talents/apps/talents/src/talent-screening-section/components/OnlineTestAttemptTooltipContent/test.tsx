import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import OnlineTestAttemptTooltipContent from './OnlineTestAttemptTooltipContent'

const arrangeTest = ({
  createdAt = '2019-01-28T02:40:27+03:00',
  finishedAt
}: Partial<{
  createdAt: string
  finishedAt?: string
}> = {}) =>
  render(
    <TestWrapper>
      <OnlineTestAttemptTooltipContent
        createdAt={createdAt}
        finishedAt={finishedAt}
      />
    </TestWrapper>
  )

describe('OnlineTestAttemptTooltipContent', () => {
  it('renders the online test attempt tooltip', () => {
    arrangeTest()

    expect(
      screen.getByText('Sent on: 2019-01-28T02:40:27+03:00')
    ).toBeInTheDocument()

    expect(screen.getByText('Finished on: —')).toBeInTheDocument()
  })

  it('displays the finished on value', () => {
    arrangeTest({ finishedAt: '2019-01-28T12:40:27+03:00' })

    expect(
      screen.getByText('Sent on: 2019-01-28T02:40:27+03:00')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Finished on: 2019-01-28T12:40:27+03:00')
    ).toBeInTheDocument()
  })
})
