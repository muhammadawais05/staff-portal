import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  EngagementStatus,
  EngagementCommitmentEnum,
  JobStatus,
  CumulativeJobStatus,
  Maybe
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import ParallelInterview from './ParallelInterview'

const clientMock = {
  id: encodeEntityId('123', 'Client'),
  enterprise: true,
  webResource: {
    text: 'Murazik, Rutherford and Smitham',
    url: 'https://staging.toptal.net/platform/staff/companies/3237721'
  }
}

const engagementStatusMock = {
  status: EngagementStatus.REVIEWED,
  cumulativeStatus: 'interview_time_accepted'
}

const jobMock = {
  id: encodeEntityId('123', 'Job'),
  status: JobStatus.PENDING_ENGINEER,
  cumulativeStatus: CumulativeJobStatus.PENDING_ENGINEER,
  hiredCount: 0,
  talentCount: 1,
  expectedWeeklyHours: null,
  commitment: 'part_time',
  webResource: {
    text: 'Junior  Developer (283423)',
    url: 'https://staging.toptal.net/platform/staff/jobs/283423'
  }
}

const renderComponent = (lockType?: Maybe<{ id: string; type: string }>) => {
  const {
    container: { innerHTML }
  } = render(
    <TestWrapper>
      <ParallelInterview
        engagementStatus={engagementStatusMock}
        commitment={EngagementCommitmentEnum.PART_TIME}
        currentInterviewLock={lockType}
        job={jobMock}
        client={clientMock}
      />
    </TestWrapper>
  )

  return innerHTML
}

let component = renderComponent()

describe('Parallel Interview', () => {
  it('renders the job name and client badge', () => {
    expect(component).toContain('Junior  Developer (283423)')
    expect(component).toContain('Enterprise')
  })

  it('renders the proper data fields', () => {
    expect(component).toContain('Company')
    expect(component).toContain('Murazik, Rutherford and Smitham')

    expect(component).toContain('Status')
    expect(component).toContain('Interview time confirmed')

    expect(component).toContain('Commitment')
    expect(component).toContain('Part-time')
  })

  describe('when we have a current interview lock type', () => {
    it('renders the `Lock Type` item', () => {
      component = renderComponent({ id: '456', type: 'Abc' })

      expect(component).toContain('Lock Type')
      expect(component).toContain('Abc')
    })
  })

  describe('when we do not have a current interview lock type', () => {
    it('does not render the `Lock Type` item', () => {
      component = renderComponent()

      expect(component).not.toContain('Lock Type')
    })
  })
})
