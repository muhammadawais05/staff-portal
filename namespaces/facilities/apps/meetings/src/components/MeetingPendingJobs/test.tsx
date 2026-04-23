import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { MeetingPendingJobsFragment } from '@staff-portal/meetings'

import MeetingPendingJobs from './MeetingPendingJobs'

jest.mock('@staff-portal/jobs', () => ({
  __esModule: true,
  JobStatus: () => <span data-testid='job-status' />
}))

const arrangeTest = (pendingJobs: MeetingPendingJobsFragment['pendingJobs']) =>
  render(
    <TestWrapper>
      <MeetingPendingJobs pendingJobs={pendingJobs} />
    </TestWrapper>
  )

describe('MeetingPendingJobs', () => {
  it("doesn't renders when pending jobs is null", () => {
    const { container } = arrangeTest(null)

    expect(container.firstChild).toBeEmptyDOMElement()
  })

  it('renders job name, url and status', () => {
    const JOB_NAME = 'test job'
    const JOB_URL = 'test job url'

    const pendingJobs = {
      nodes: [{ id: 'test', webResource: { url: JOB_URL, text: JOB_NAME } }]
    } as MeetingPendingJobsFragment['pendingJobs']

    arrangeTest(pendingJobs)

    const jobLink = screen.getByText(JOB_NAME)

    expect(jobLink).toBeInTheDocument()
    expect(jobLink).toHaveAttribute('href', JOB_URL)

    expect(screen.getByTestId('job-status')).toBeInTheDocument()
  })
})
