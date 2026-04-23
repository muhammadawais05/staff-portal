import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  TalentJobIssue,
  TalentJobIssueMetricStatus
} from '@staff-portal/graphql/staff'
import { assertOnTooltip, TestWrapper } from '@staff-portal/test-utils'

import JobIssues, { Props } from './JobIssues'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <JobIssues {...props} />
    </TestWrapper>
  )

describe('JobIssues', () => {
  it('shows flag icon and corresponding tooltip when there are job issues', () => {
    const JOB_ISSUE_MESSAGE = 'Something went wrong'
    const TOOLTIP_CONTENT = `— ${JOB_ISSUE_MESSAGE}`

    arrangeTest({
      jobIssues: {
        status: TalentJobIssue.CRITICAL,
        failedMetrics: [
          {
            message: JOB_ISSUE_MESSAGE,
            status: TalentJobIssueMetricStatus.FAILURE,
            name: 'Job issue'
          }
        ]
      }
    })

    const jobissuesIcon = screen.getByTestId('job-issues-icon')

    assertOnTooltip(jobissuesIcon, tooltip => {
      expect(tooltip).toHaveTextContent(TOOLTIP_CONTENT)
    })
  })
})
