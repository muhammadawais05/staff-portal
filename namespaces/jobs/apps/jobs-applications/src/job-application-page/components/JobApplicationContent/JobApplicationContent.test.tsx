import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { JobApplicationFragment } from '../../data/get-job-application'
import { createGetJobApplicationMock } from '../../data/get-job-application/mocks'
import JobApplicationContent from './JobApplicationContent'

jest.mock(
  '@staff-portal/jobs/src/components/JobApplicantTalentCard/JobApplicantTalentCard',
  () => ({
    __esModule: true,
    default: () => <div data-testid='job-application-content-talent-profile' />
  })
)
jest.mock(
  '@staff-portal/jobs/src/components/JobPositionAnswers/JobPositionAnswers',
  () => ({
    __esModule: true,
    default: () => (
      <div data-testid='job-application-content-matchers-questions' />
    )
  })
)

const TEST_ID = 'TEST_ID'
const jobApplicationMock = createGetJobApplicationMock({ id: TEST_ID })

const arrangeTest = (jobApplication?: JobApplicationFragment) =>
  render(
    <TestWrapper>
      <JobApplicationContent
        jobApplication={jobApplication ?? jobApplicationMock}
      />
    </TestWrapper>
  )

describe('JobApplicationContent', () => {
  it('renders the correct title', () => {
    const { getByTestId } = arrangeTest()

    const EXPECTED_TITLE = `${jobApplicationMock.talent.fullName} / ${jobApplicationMock.job.client.fullName} → ${jobApplicationMock.job.title}`

    expect(getByTestId('job-application-content')).toBeInTheDocument()
    expect(getByTestId('job-application-content-title')).toHaveTextContent(
      EXPECTED_TITLE
    )
  })

  it('renders job link', () => {
    const { getByTestId } = arrangeTest()

    const jobLink = getByTestId('job-application-content-job-link')

    expect(jobLink).toBeInTheDocument()
    expect(jobLink).toHaveAttribute(
      'href',
      jobApplicationMock.job.webResource.url
    )
    expect(jobLink).toHaveTextContent(jobApplicationMock.job.webResource.text)
  })

  it('renders enterprise badge in the job link if enterprise client', () => {
    const enterpriseJobApplicationMock = createGetJobApplicationMock({
      id: TEST_ID,
      enterprise: true
    })
    const { getByTestId } = arrangeTest(enterpriseJobApplicationMock)

    expect(
      getByTestId('job-application-content-enterprise-badge')
    ).toBeInTheDocument()
  })

  it('renders client link', () => {
    const { getByTestId } = arrangeTest()

    const jobLink = getByTestId('job-application-content-client-link')

    expect(jobLink).toBeInTheDocument()
    expect(jobLink).toHaveAttribute(
      'href',
      jobApplicationMock.job.client.webResource.url
    )
    expect(jobLink).toHaveTextContent(
      jobApplicationMock.job.client.webResource.text
    )
  })

  it(`renders matcher's questions if available`, () => {
    const jobApplicationWithMatchersQuestionsMock = createGetJobApplicationMock(
      {
        id: TEST_ID,
        hasJobPositionAnswers: true
      }
    )
    const { getByTestId } = arrangeTest(jobApplicationWithMatchersQuestionsMock)

    expect(
      getByTestId('job-application-content-matchers-questions')
    ).toBeInTheDocument()
  })

  it('renders talent profile card if available', () => {
    const jobApplicationWithTalentPitchMock = createGetJobApplicationMock({
      id: TEST_ID,
      hasTalentPitch: true
    })
    const { getByTestId } = arrangeTest(jobApplicationWithTalentPitchMock)

    expect(
      getByTestId('job-application-content-talent-profile')
    ).toBeInTheDocument()
  })
})
