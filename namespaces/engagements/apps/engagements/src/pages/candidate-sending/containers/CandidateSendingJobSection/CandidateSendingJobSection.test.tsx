import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { JobWorkType } from '@staff-portal/graphql/staff'

import CandidateSendingJobSection from './CandidateSendingJobSection'
import { useCandidateSendingContext, useGetJobCandidateData } from '../../hooks'
import { GetJobCandidateDataQuery } from '../../data/get-job-candidate-data'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn(),
  useGetJobCandidateData: jest.fn()
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const useGetJobCandidateDataMock = useGetJobCandidateData as jest.Mock

const JOB_ID = '123'

const renderComponent = ({
  jobData,
  jobDataLoading
}: {
  jobData: GetJobCandidateDataQuery['node']
  jobDataLoading: boolean
}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    jobId: JOB_ID
  }))

  useGetJobCandidateDataMock.mockImplementation(() => ({
    jobData,
    jobDataLoading
  }))

  render(
    <TestWrapper>
      <CandidateSendingJobSection />
    </TestWrapper>
  )
}

const jobDataMock = {
  id: JOB_ID,
  title: 'Chief',
  jobType: JobWorkType.MIXED,
  client: {
    id: '234',
    enterprise: false,
    fullName: 'Best Company LLC',
    webResource: {
      text: 'Best Company LLC',
      url: 'http://staging.toptal.net/companies/234'
    }
  },
  webResource: {
    text: 'Chief',
    url: `http://staging.toptal.net/jobs/${JOB_ID}`
  }
}

describe('CandidateSendingJobSection', () => {
  describe('when data is loading', () => {
    it('renders the skeleton loader', () => {
      renderComponent({ jobData: null, jobDataLoading: true })

      expect(
        screen.getByTestId('candidate-sending-job-section-skeleton-loader')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('job-details')).not.toBeInTheDocument()
    })
  })

  describe('when there is no data', () => {
    it('does not render the section', () => {
      renderComponent({ jobData: null, jobDataLoading: false })

      expect(
        screen.queryByTestId('candidate-sending-job-section-skeleton-loader')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('job-details')).not.toBeInTheDocument()
    })
  })

  describe('when data is loaded', () => {
    it('renders the job details', () => {
      renderComponent({
        jobData: jobDataMock,
        jobDataLoading: false
      })

      expect(screen.getByTestId('job-details')).toBeInTheDocument()
    })
  })
})
