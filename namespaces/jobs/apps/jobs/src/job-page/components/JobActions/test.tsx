import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobActions, { Props as JobActionsProps } from './JobActions'

jest.mock('../JobMoreActions', () => ({
  __esModule: true,
  default: () => <div />
}))
jest.mock('@staff-portal/jobs', () => ({
  ClaimAndApproveJobButton: () => <div />,
  SearchCandidatesButton: () => <div />
}))
jest.mock('@staff-portal/chronicles', () => ({
  ...jest.requireActual('@staff-portal/chronicles'),
  HistoryButton: () => <div />
}))
jest.mock('../CloneJobButton', () => ({
  __esModule: true,
  default: () => <div />
}))
jest.mock('@staff-portal/engagements', () => ({
  ReopenEngagementAndApproveTrialButton: () => (
    <div data-testid='ReopenEngagementAndApproveTrialButton' />
  )
}))

const arrangeTest = ({ job }: JobActionsProps) => {
  return render(
    <TestWrapper>
      <JobActions loading={false} job={job} />
    </TestWrapper>
  )
}

describe('JobActions', () => {
  it('should show Send Candidate button if there is sendCandidateUrl', async () => {
    const { getByTestId } = arrangeTest({
      job: {
        id: '1',
        title: 'Job Title',
        sendCandidateUrl: 'sendCandidateUrl',
        operations: {}
      }
    } as JobActionsProps)

    expect(getByTestId('send-candidate-link')).toBeInTheDocument()
  })
})
