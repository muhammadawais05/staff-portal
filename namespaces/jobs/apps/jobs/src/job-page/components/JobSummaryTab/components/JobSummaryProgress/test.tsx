import React from 'react'
import { screen, render } from '@testing-library/react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { JobCreatedThrough } from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import JobSummaryProgress from '.'

jest.mock('@staff-portal/engagements')
jest.mock('@staff-portal/data-layer-service')
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))

const useGetNodeMock = useGetNode as jest.Mock
const mockedUseMessageListener = useMessageListener as jest.Mock

const AUTHOR_NAME = 'Author name'
const TEST_URL = 'test-url'

const PROGRESS_DATA = {
  summaryProgress: {
    completeFields: [
      'Job type',
      'Title',
      'Number of Talent',
      'Maximum Hourly Rate',
      'Desired Commitment',
      'Estimated Length',
      'Desired Start Date',
      'Time Zone Preference',
      'Description',
      'Skills',
      'Client Time Zone'
    ],
    emptyFields: ['Type of Project', 'Hours Overlap'],
    percentage: 85,
    total: 13
  },
  createdThrough: JobCreatedThrough.PLATFORM,
  createdBy: {
    webResource: {
      text: AUTHOR_NAME,
      url: TEST_URL
    }
  }
}

const PROGRESS_DATA_WITHOUT_EMPTY_FIELDS = {
  summaryProgress: {
    completeFields: [
      'Job type',
      'Title',
      'Number of Talent',
      'Maximum Hourly Rate',
      'Desired Commitment',
      'Estimated Length',
      'Desired Start Date',
      'Time Zone Preference',
      'Description',
      'Skills',
      'Client Time Zone'
    ],
    emptyFields: [],
    percentage: 85,
    total: 13
  }
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobSummaryProgress jobId='test-job-id' />
    </TestWrapper>
  )

describe('JobSummaryProgress', () => {
  it('renders summary progress section', () => {
    useGetNodeMock.mockImplementation(() => () => ({
      data: PROGRESS_DATA,
      loading: false
    }))

    arrangeTest()

    expect(mockedUseMessageListener).toHaveBeenCalledTimes(2)
    expect(screen.getByTestId('JobSummaryProgress-section')).toBeInTheDocument()
    expect(
      screen.getByTestId('JobSummaryProgress-fields-filled')
    ).toHaveTextContent('Fields filled:11 out of 13 (85%)')
    expect(
      screen.getByTestId('JobSummaryProgress-empty-fields')
    ).toHaveTextContent(
      '2 fields are missing: Type of Project and Hours Overlap'
    )
    expect(
      screen.getByTestId('JobSummaryProgress-created-through')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('JobSummaryProgress-created-through')
    ).toHaveTextContent('Directly in Platform')
    expect(
      screen.getByTestId('JobSummaryProgress-created-by-link')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('JobSummaryProgress-created-by-link')
    ).toHaveTextContent(AUTHOR_NAME)
    expect(
      screen.getByTestId('JobSummaryProgress-created-by-link')
    ).toHaveAttribute('href', TEST_URL)
  })

  it('renders summary progress section without empty fields list', () => {
    useGetNodeMock.mockImplementation(() => () => ({
      data: PROGRESS_DATA_WITHOUT_EMPTY_FIELDS,
      loading: false
    }))

    arrangeTest()

    expect(mockedUseMessageListener).toHaveBeenCalledTimes(2)
    expect(screen.getByTestId('JobSummaryProgress-section')).toBeInTheDocument()
    expect(
      screen.getByTestId('JobSummaryProgress-fields-filled')
    ).toHaveTextContent('Fields filled:11 out of 13 (85%)')
    expect(
      screen.queryByTestId('JobSummaryProgress-empty-fields')
    ).not.toBeInTheDocument()
  })

  it('does not render  summary progress section when no data is returned', () => {
    useGetNodeMock.mockImplementation(() => () => ({
      data: null,
      loading: false
    }))

    arrangeTest()
    expect(
      screen.queryByTestId('JobSummaryProgress-section')
    ).not.toBeInTheDocument()
  })
})
