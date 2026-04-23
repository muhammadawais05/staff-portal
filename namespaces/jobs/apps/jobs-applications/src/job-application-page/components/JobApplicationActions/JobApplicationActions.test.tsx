import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { getRoleTypeText } from '@staff-portal/facilities'

import { createGetJobApplicationMock } from '../../data/get-job-application/mocks'
import JobApplicationActions from './JobApplicationActions'

jest.mock('@staff-portal/jobs', () => ({
  ApproveApplicationButton: () => (
    <div data-testid='job-application-actions-approve-link' />
  ),
  RejectJobApplicantModalButton: () => (
    <div data-testid='job-application-actions-reject-button' />
  )
}))

const TEST_ID = 'TEST_ID'
const jobApplicationMock = createGetJobApplicationMock({ id: TEST_ID })

const arrangeTest = (loading?: boolean) =>
  render(
    <TestWrapper>
      <JobApplicationActions
        loading={loading ?? false}
        jobApplication={!loading ? jobApplicationMock : undefined}
      />
    </TestWrapper>
  )

describe('JobApplicationActions', () => {
  it('renders action loaders when loading', () => {
    const { getByTestId } = arrangeTest(true)

    expect(getByTestId('job-application-actions-loaders')).toBeInTheDocument()
  })

  it('renders email action button with correct role type', () => {
    const { getByTestId } = arrangeTest()

    const emailAction = getByTestId('job-application-actions-email-button')

    expect(emailAction).toBeInTheDocument()
    expect(emailAction).toHaveTextContent(
      `Email ${getRoleTypeText(jobApplicationMock.talent.type)}`
    )
  })

  it('renders approve link', () => {
    const { getByTestId } = arrangeTest()

    expect(
      getByTestId('job-application-actions-approve-link')
    ).toBeInTheDocument()
  })

  it('renders reject application button', () => {
    const { getByTestId } = arrangeTest()

    expect(
      getByTestId('job-application-actions-reject-button')
    ).toBeInTheDocument()
  })
})
