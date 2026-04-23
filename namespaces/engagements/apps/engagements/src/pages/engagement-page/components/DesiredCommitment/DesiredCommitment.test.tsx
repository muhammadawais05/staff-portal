import React from 'react'
import { render, screen } from '@testing-library/react'
import { assertOnTooltip, TestWrapper } from '@staff-portal/test-utils'

import { DesiredCommitment, Props } from './DesiredCommitment'

const arrangeTest = (props: Props) => {
  render(
    <TestWrapper>
      <DesiredCommitment {...props} />
    </TestWrapper>
  )
}

describe('DesiredCommitment', () => {
  it('returns undefined when nothing to render', () => {
    arrangeTest({
      jobCommitment: undefined,
      engagementCommitment: undefined,
      talentCount: 1
    })

    expect(document.body.innerHTML).not.toContain('Full-time')
  })

  it('returns Job Commitment string', () => {
    arrangeTest({
      jobCommitment: 'full_time',
      engagementCommitment: undefined,
      talentCount: 1
    })

    expect(document.body.innerHTML).toContain('Full-time')
  })

  it('returns Job Commitment string with tooltip', () => {
    arrangeTest({
      jobCommitment: 'full_time',
      engagementCommitment: 'HOURLY',
      talentCount: 1
    })

    assertOnTooltip(screen.getByTestId('commitment-tooltip'), tooltip => {
      expect(tooltip).toHaveTextContent(
        'Please note that current engagement commitment varies from the initial job posting'
      )
    })
  })
})
