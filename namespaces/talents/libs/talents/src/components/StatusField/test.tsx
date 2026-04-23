import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  TalentCumulativeStatus,
  TalentJobIssue,
  TalentJobIssueMetricStatus
} from '@staff-portal/graphql/staff'
import { assertOnTooltip, TestWrapper } from '@staff-portal/test-utils'

import StatusField, { Props } from './StatusField'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <StatusField {...props} />
    </TestWrapper>
  )

describe('TalentStatusField', () => {
  it('shows current talent status', async () => {
    arrangeTest({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE,
      newcomer: false,
      investigations: { nodes: [] }
    })

    expect(screen.getByText(/Active/i)).toBeInTheDocument()
  })

  it('shows the newcomer flag', async () => {
    arrangeTest({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE,
      newcomer: true,
      investigations: { nodes: [] }
    })

    expect(screen.getByText(/Newcomer/i)).toBeInTheDocument()
  })

  it('shows the top shield flag', async () => {
    arrangeTest({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE,
      newcomer: true,
      topShield: true,
      investigations: { nodes: [] }
    })

    expect(screen.getByText(/TopShield/i)).toBeInTheDocument()
  })

  it('shows flag icon and corresponding tooltip when there are job issues', () => {
    const JOB_ISSUE_MESSAGE = 'Something went wrong'
    const TOOLTIP_CONTENT = `— ${JOB_ISSUE_MESSAGE}`

    arrangeTest({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE,
      newcomer: true,
      investigations: { nodes: [] },
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

  it('shows flag icon and corresponding tooltip when talent has investigations', () => {
    const INVESTIGATION_MESSAGE = 'Investigation since 2021-04-06'
    const TOOLTIP_CONTENT = `${INVESTIGATION_MESSAGE}`

    arrangeTest({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE,
      newcomer: true,
      investigations: {
        nodes: [
          {
            id: 'xyz',
            startedAt: '2021-04-06T00:00:00+00:00',
            resolvedAt: null
          }
        ]
      }
    })

    const investigationIcon = screen.getByTestId('investigations-icon')

    assertOnTooltip(investigationIcon, tooltip => {
      expect(tooltip).toHaveTextContent(TOOLTIP_CONTENT)
    })
  })

  it('hides flag icon when investigations are resolved', () => {
    arrangeTest({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE,
      newcomer: true,
      investigations: {
        nodes: [
          {
            id: 'xyz',
            startedAt: '2021-04-06T00:00:00+00:00',
            resolvedAt: '2021-05-06T00:00:00+00:00'
          }
        ]
      }
    })

    const investigationIcon = screen.queryByTestId('investigations-icon')

    expect(investigationIcon).not.toBeInTheDocument()
  })

  it('shows job issues icon instead investigation icon in the context of a job', () => {
    const JOB_ISSUE_MESSAGE = 'Something went wrong'
    const TOOLTIP_CONTENT = `— ${JOB_ISSUE_MESSAGE}`

    arrangeTest({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE,
      newcomer: true,
      investigations: {
        nodes: [
          {
            id: 'xyz',
            startedAt: '2021-04-06T00:00:00+00:00'
          }
        ]
      },
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

    expect(screen.queryByTestId('investigations-icon')).not.toBeInTheDocument()

    const jobissuesIcon = screen.getByTestId('job-issues-icon')

    assertOnTooltip(jobissuesIcon, tooltip => {
      expect(tooltip).toHaveTextContent(TOOLTIP_CONTENT)
    })
  })
})
