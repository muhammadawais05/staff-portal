import React from 'react'
import { render, screen } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { IndustryFragment } from '@staff-portal/jobs'

import JobSummarySkillsSection from './JobSummarySkillsSection'
import { jobLevelQueryResponse } from './mocks'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/jobs/src/components/ReadonlySkillList', () => ({
  __esModule: true,
  default: () => <div>skills</div>
}))

jest.mock('@staff-portal/jobs/src/components/IndustriesField', () => ({
  __esModule: true,
  default: ({ industries }: { industries: IndustryFragment[] }) => (
    <div>{industries.map(item => item.name).join(',')}</div>
  )
}))

const useGetNodeMock = useGetNode as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobSummarySkillsSection jobId='some-id' />
    </TestWrapper>
  )

describe('JobSummaryJobLevel', () => {
  beforeEach(() => {
    useGetNodeMock.mockReturnValue(() => jobLevelQueryResponse)
    arrangeTest()
  })

  it('renders industries', () => {
    expect(
      screen.getByText(
        jobLevelQueryResponse.data.industries.nodes
          .map(item => item.name)
          .join(',')
      )
    ).toBeInTheDocument()
  })
})
