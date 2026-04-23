import React from 'react'
import {
  act,
  fireEvent,
  getAllByRole,
  render,
  screen
} from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentResumeJob } from '@staff-portal/graphql/staff'

import JobSpecificResumeButton from './JobSpecificResumeButton'

const arrangeTest = (resumeJobs: TalentResumeJob[]) =>
  render(
    <TestWrapper>
      <JobSpecificResumeButton resumeJobs={resumeJobs} />
    </TestWrapper>
  )

describe('JobSpecificResumeButton', () => {
  it('renders a dropdown with resume specific jobs', async () => {
    const resumeJob = {
      id: 'talentResumeJob-id',
      clientName: 'Test company',
      resumeRedirectUrl: 'https://test.com?job_id=124140&talent_id=165809',
      title: 'Supreme Chief Developer'
    }

    arrangeTest([resumeJob])
    await act(async () => {
      fireEvent.click(screen.getByText('Job-Specific Resume'))
    })

    const [dropdownTitle, dropdownItem] = getAllByRole(
      screen.getByTestId('ResumeSpecificJobsMenu'),
      'menuitem'
    )

    expect(dropdownTitle).toHaveTextContent('Jobs')
    expect(dropdownItem).toHaveTextContent(
      `${resumeJob.clientName} - ${resumeJob.title}`
    )
    expect(dropdownItem).toHaveAttribute('href', resumeJob.resumeRedirectUrl)
  })
})
