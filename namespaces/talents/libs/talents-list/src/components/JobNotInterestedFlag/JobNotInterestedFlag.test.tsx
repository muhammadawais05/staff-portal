import React from 'react'
import { screen, render } from '@testing-library/react'
import { TalentJobInterestStatus } from '@staff-portal/graphql/staff'
import { TestWrapper, assertOnTooltip } from '@staff-portal/test-utils'
import { Maybe } from '@toptal/picasso/utils'

import JobNotInterestedFlag from './JobNotInterestedFlag'

const arrangeTest = ({
  interestStatus,
  notInterestedReason
}: {
  interestStatus: Maybe<TalentJobInterestStatus>
  notInterestedReason: Maybe<string>
}) =>
  render(
    <TestWrapper>
      <JobNotInterestedFlag
        interestStatus={interestStatus}
        notInterestedReason={notInterestedReason}
      />
    </TestWrapper>
  )

describe('JobNotInterestedFlag', () => {
  it('hides the flag when interest status is not NOT_INTERESTED', () => {
    arrangeTest({
      interestStatus: TalentJobInterestStatus.UNSPECIFIED,
      notInterestedReason: undefined
    })

    expect(screen.queryByText(/Not interested/i)).not.toBeInTheDocument()
  })

  it('shows the flag when interest status is NOT_INTERESTED', () => {
    const notInterestedReason = 'TEST_REASON'
    const FLAG_TITLE = 'Talent hid this job.'
    const FLAG_REASON = `Reason: ${notInterestedReason}`

    arrangeTest({
      interestStatus: TalentJobInterestStatus.NOT_INTERESTED,
      notInterestedReason
    })

    const flag = screen.getByText(/Not interested/i)

    assertOnTooltip(flag, tooltip => {
      expect(tooltip).toHaveTextContent(FLAG_TITLE)
      expect(tooltip).toHaveTextContent(FLAG_REASON)
    })
  })
})
