import React from 'react'
import { render, screen } from '@testing-library/react'
import { JobEstimatedLengths, Maybe } from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  parseAndFormatDate,
  TimeZoneFragment
} from '@staff-portal/date-time-utils'
import { titleize } from '@staff-portal/string'
import {
  getCategoryFieldValue,
  ESTIMATED_LENGTH_MAPPING,
  COMMITMENT_TITLES
} from '@staff-portal/jobs'

import JobSummaryJobLevelSection from './JobSummaryJobLevelSection'
import { jobLevelQueryResponse } from './mocks'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/jobs/src/components/ReadonlySkillList', () => ({
  __esModule: true,
  default: () => <div>skills</div>
}))
jest.mock('@staff-portal/facilities/src/components/HourlyRateField', () => ({
  __esModule: true,
  default: ({ hourlyRate }: { hourlyRate: string }) => <span>{hourlyRate}</span>
}))

jest.mock('@staff-portal/jobs/src/components/JobTimeZoneField', () => ({
  __esModule: true,
  default: ({
    timeZonePreference
  }: {
    timeZonePreference: Maybe<TimeZoneFragment>
  }) => <div>{timeZonePreference?.name}</div>
}))

const useGetNodeMock = useGetNode as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobSummaryJobLevelSection jobId='some-id' />
    </TestWrapper>
  )

describe('JobSummaryJobLevel', () => {
  beforeEach(() => {
    useGetNodeMock.mockReturnValue(() => jobLevelQueryResponse)
    arrangeTest()
  })

  it('renders timezone', () => {
    expect(screen.getByText('Yes')).toBeInTheDocument()
  })

  it('renders start date', () => {
    expect(
      screen.getByText(parseAndFormatDate(jobLevelQueryResponse.data.startDate))
    ).toBeInTheDocument()
  })

  it('renders estimated length', () => {
    expect(
      screen.getByText(
        ESTIMATED_LENGTH_MAPPING[
          jobLevelQueryResponse.data.estimatedLength as JobEstimatedLengths
        ]
      )
    ).toBeInTheDocument()
  })

  it('renders commitment', () => {
    expect(
      screen.getByText(COMMITMENT_TITLES[jobLevelQueryResponse.data.commitment])
    ).toBeInTheDocument()
  })

  it('renders max hourly rate', () => {
    expect(
      screen.getByText(jobLevelQueryResponse.data.maxHourlyRate)
    ).toBeInTheDocument()
  })

  it('renders talent count', () => {
    expect(
      screen.getByText(jobLevelQueryResponse.data.talentCount)
    ).toBeInTheDocument()
  })

  it('renders categories', () => {
    expect(
      screen.getByText(
        getCategoryFieldValue(jobLevelQueryResponse.data.categories.nodes)
      )
    ).toBeInTheDocument()
  })

  it('renders title', () => {
    expect(
      screen.getByText(jobLevelQueryResponse.data.title)
    ).toBeInTheDocument()
  })

  it('renders job type', () => {
    expect(
      screen.getByText(titleize(jobLevelQueryResponse.data.jobType))
    ).toBeInTheDocument()
  })
})
