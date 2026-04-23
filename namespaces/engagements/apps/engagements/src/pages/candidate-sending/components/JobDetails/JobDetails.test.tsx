import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobDetails from './JobDetails'
import { GetJobCandidateDataQuery } from '../../data/get-job-candidate-data/get-job-candidate-data.staff.gql.types'

jest.mock(
  '../../../engagement-page/components',
  () => ({
    __esModule: true,
    DesiredCommitment: () => <>Desired Commitment Component</>
  })
)

jest.mock(
  '../../../engagement-page/utils',
  () => ({
    __esModule: true,
    getCurrentEngagementCommitment: () => <>Engagement Commitment Value</>,
    getWorkTypeOption: () => <>Work Type Option</>
  })
)

jest.mock('@staff-portal/jobs/src/components', () => ({
  __esModule: true,
  JobTimeZoneField: () => <>Job Time Zone Field</>,
  ClientLinkField: () => <>Client Link Field</>,
  JobBadges: () => <>Job Badges</>,
  JobStatus: () => <>Job Status Value</>
}))

const jobMock = {
  id: 'VjEtSm9iLTI3NDk1Mg',
  title: 'Senior Digital Imaging Developer (274952)',
  postedAt: '2021-12-29T09:00:44+03:00',
  commitment: 'full_time',
  talentCount: 1,
  engagements: {
    nodes: [
      {
        id: 'VjEtRW5nYWdlbWVudC0yOTgwMjA',
        commitment: 'FULL_TIME',
        __typename: 'Engagement'
      }
    ]
  },
  client: {
    id: 'VjEtQ2xpZW50LTQ1MTIxMQ',
    enterprise: false,
    fullName: 'Osinski-Nader UT',
    webResource: {
      text: 'Osinski-Nader UT',
      url: 'https://staging.toptal.net/platform/staff/companies/2089815'
    }
  },
  hoursOverlapEnum: 'HOUR_4',
  timeZonePreference: {
    name: '(UTC-08:00) America - Los Angeles',
    value: 'America/Los_Angeles'
  },
  workType: 'REMOTE',
  jobType: 'developer',
  status: 'REMOVED',
  hiredCount: 0,
  matcherCallScheduled: false,
  cumulativeStatus: 'REMOVED',
  currentInvestigation: null,
  webResource: {
    url: 'https://staging.toptal.net/platform/staff/jobs/274952',
    text: 'Senior Digital Imaging Developer (274952)'
  }
} as NonNullable<GetJobCandidateDataQuery['node']>

const arrangeTest = () => {
  const {
    container: { innerHTML }
  } = render(
    <TestWrapper>
      <JobDetails job={jobMock} />
    </TestWrapper>
  )

  return innerHTML
}

describe('Job Details', () => {
  it('renders the section with expected data', async () => {
    const content = arrangeTest()

    // TODO: fix, this test depends on the current date
    // expect(content).toContain('Job Posted')
    // expect(content).toContain('About 2 months ago')

    expect(content).toContain('Desired Commitment')
    expect(content).toContain('Desired Commitment Component')

    expect(content).toContain('Company')
    expect(content).toContain('Client Link Field')

    expect(content).toContain('Job Timezone')
    expect(content).toContain('Job Time Zone Field')

    expect(content).toContain('Work type')
    expect(content).toContain('Work Type Option')

    expect(content).toContain('Status')
    expect(content).toContain('Job Status Value')
  })
})
