import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobSummaryTab from './JobSummaryTab'

const COMPANY_LEVEL_TEST_ID = 'company-level-section'
const PROJECT_LEVEL_TEST_ID = 'project-level-section'
const JOB_LEVEL_TEST_ID = 'job-level-section'
const PROGRESS_TEST_ID = 'summary-progress-section'
const SKILLS_TEST_ID = 'skills-section'

jest.mock('./components', () => ({
  __esModule: true,
  JobSummaryCompanyLevelSection: () => (
    <div data-testid={COMPANY_LEVEL_TEST_ID} />
  ),
  JobSummaryJobLevelSection: () => <div data-testid={JOB_LEVEL_TEST_ID} />,
  JobSummaryProgress: () => <div data-testid={PROGRESS_TEST_ID} />,
  JobSummaryProjectLevelSection: () => (
    <div data-testid={PROJECT_LEVEL_TEST_ID} />
  ),
  JobSummarySkillsSection: () => <div data-testid={SKILLS_TEST_ID} />
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobSummaryTab jobId={'some-job-id'} />
    </TestWrapper>
  )

describe('Job Summary Tab', () => {
  it('default render', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(PROJECT_LEVEL_TEST_ID)).toBeInTheDocument()
    expect(getByTestId(PROGRESS_TEST_ID)).toBeInTheDocument()
    expect(getByTestId(JOB_LEVEL_TEST_ID)).toBeInTheDocument()
    expect(getByTestId(COMPANY_LEVEL_TEST_ID)).toBeInTheDocument()
    expect(getByTestId(SKILLS_TEST_ID)).toBeInTheDocument()
  })
})
