import React from 'react'
import { render, screen } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import { TalentHealthStatusValue } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { TalentPerformanceHealthStatusFragment } from '../../data/get-talent-health-status-with-history'
import HealthStatusHistory from '../HealthStatusHistory'

const mockHealthStatus = (
  data: Partial<TalentPerformanceHealthStatusFragment> = {}
): TalentPerformanceHealthStatusFragment => ({
  comment: 'Some reason',
  createdAt: '2021-03-21T12:00:00+03:00',
  healthStatus: TalentHealthStatusValue.NONE,
  performer: {
    id: 'staff-1',
    webResource: {
      text: 'Staff User',
      url: 'url'
    }
  },
  ...data
})

const arrangeTest = () => {
  const data = [
    mockHealthStatus({
      performer: null,
      createdAt: '2021-03-22T11:00:00+03:00',
      healthStatus: TalentHealthStatusValue.WATCH_LIST,
      comment: 'Issue resolved'
    }),
    mockHealthStatus()
  ]

  render(
    <TestWrapperWithMocks>
      <HealthStatusHistory healthStatusHistory={data} />
    </TestWrapperWithMocks>
  )
}

describe('HealthStatusHistory', () => {
  it('renders a table with the health status history', () => {
    arrangeTest()
    expect(screen.queryByText('Health Status')).toBeInTheDocument()
    expect(screen.queryByText('Performed By')).toBeInTheDocument()
    expect(screen.queryByText('Change Date and Time')).toBeInTheDocument()
    expect(screen.queryByText('Comment')).toBeInTheDocument()

    expect(screen.queryAllByRole('row')).toHaveLength(3)

    expect(screen.queryByText('Watch List')).toBeInTheDocument()
    expect(screen.queryByText(NO_VALUE)).toBeInTheDocument()
    expect(screen.queryByText('2021-03-22T11:00:00+03:00')).toBeInTheDocument()
    expect(screen.queryByText('Some reason')).toBeInTheDocument()

    expect(screen.queryByText('None')).toBeInTheDocument()
    expect(screen.queryByText('Staff User')).toBeInTheDocument()
    expect(screen.queryByText('2021-03-21T12:00:00+03:00')).toBeInTheDocument()
    expect(screen.queryByText('Issue resolved')).toBeInTheDocument()
  })
})
