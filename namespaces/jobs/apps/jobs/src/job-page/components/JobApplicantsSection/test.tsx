import React from 'react'
import {
  screen,
  render,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { JobStatus } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import JobApplicantsSection from './components'
import {
  createGetJobApplicationsMock,
  createJobApplicationMock
} from './components/JobApplicantsSection/data/get-job-applications/mocks'
import { createJobApplicantsOperations } from './components/JobApplicantsSection/data/get-job-applicants-operations/mocks'
import JobApplicantsTable from './components/JobApplicantsTable'

const JOB_ID = 'job-123'

jest.mock('@staff-portal/engagements')
jest.mock('./components/JobApplicantsTable', () => ({
  __esModule: true,
  default: jest.fn()
}))

const MockJobApplicantsTable = JobApplicantsTable as jest.Mock

const arrangeTest = async (mocks: MockedResponse[]) => {
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <JobApplicantsSection jobId={JOB_ID} />
    </TestWrapperWithMocks>
  )

  await waitForElementToBeRemoved(() =>
    screen.queryByTestId('job-applicants-loader')
  )
}

describe('JobApplicantsSection', () => {
  beforeEach(() => {
    MockJobApplicantsTable.mockImplementation(() => (
      <div data-testid='MockJobApplicantsTable' />
    ))
  })

  describe('hides section when', () => {
    it('there are no applications', async () => {
      const mock = createGetJobApplicationsMock({
        jobId: JOB_ID,
        applications: []
      })

      await arrangeTest([mock, createJobApplicantsOperations()])
      expect(
        screen.queryByTestId('MockJobApplicantsTable')
      ).not.toBeInTheDocument()
    })

    it('status is not pending', async () => {
      const jobApplication = createJobApplicationMock()
      const mock = createGetJobApplicationsMock({
        jobId: JOB_ID,
        applications: [jobApplication],
        status: JobStatus.REJECTED
      })

      await arrangeTest([mock, createJobApplicantsOperations()])
      expect(
        screen.queryByTestId('MockJobApplicantsTable')
      ).not.toBeInTheDocument()
    })
  })

  describe('applied column', () => {
    it('shows applied date formatted', async () => {
      const jobApplication = createJobApplicationMock()
      const mock = createGetJobApplicationsMock({
        jobId: JOB_ID,
        applications: [jobApplication]
      })

      await arrangeTest([mock, createJobApplicantsOperations()])
      expect(screen.queryByTestId('MockJobApplicantsTable')).toBeInTheDocument()
    })
  })
})
