import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentDetails from './TalentDetails'
import { GetTalentCandidateDataQuery } from '../../data/get-talent-candidate-data/get-talent-candidate-data.staff.gql.types'

jest.mock('@staff-portal/talents', () => ({
  TalentAvatar: () => <span />,
  WorkingStatusField: () => <>Working Status Field</>,
  TalentCurrentInterviews: () => <>Talent Current Interviews Number</>
}))

jest.mock('@staff-portal/date-time-utils', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/date-time-utils'),
  getTimeZoneFullText: () => <>TimeZone Value</>
}))

const talentMock = {
  id: 'VjEtVGFsZW50LTI1ODc5OTg',
  fullName: 'Theron Ullrich',
  type: 'Developer',
  photo: null,
  profileLink: {
    url: 'https://staging.toptal.net/platform/staff/talents/2587998',
    newTab: false
  },
  email: 'mdra-df64346b7a3a7b3a@toptal.io',
  toptalEmail: 'md.r-e1ef91990f1fad90@toptal.io',
  skype: 'theron_ullrich2497778',
  cityDescription: 'Cyberjaya Selangor',
  currentInterviews: {
    totalCount: 0,
    inLast2DaysCounts: [],
    inLast2To7DaysCounts: []
  },
  timeZone: {
    name: '(UTC+08:00) Asia - Singapore',
    value: 'Asia/Singapore'
  },
  locationV2: {
    country: {
      id: 'VjEtQ291bnRyeS0xMzQ',
      name: 'Malaysia'
    },
    cityName: 'Cyberjaya'
  },
  engagements: {
    counters: {
      trialsNumber: 0,
      workingNumber: 1,
      clientsNumber: 0,
      repeatedClientsNumber: 0
    }
  },
  phoneContacts: {
    nodes: [
      {
        id: 'VjEtQ29udGFjdC0zNTE5NjUz',
        value: '+60167961402',
        primary: true
      }
    ]
  }
} as NonNullable<GetTalentCandidateDataQuery['staffNode']>

const arrangeTest = () => {
  const {
    container: { innerHTML }
  } = render(
    <TestWrapperWithMocks>
      <TalentDetails talent={talentMock} />
    </TestWrapperWithMocks>
  )

  return innerHTML
}

describe('Talent Details', () => {
  it('renders the section with expected data', async () => {
    const content = arrangeTest()

    expect(content).toContain('Email')
    expect(content).toContain('mailto:mdra-df64346b7a3a7b3a@toptal.io')

    expect(content).toContain('Toptal Email')
    expect(content).toContain('mailto:md.r-e1ef91990f1fad90@toptal.io')

    expect(content).toContain('Phone')
    expect(content).toContain('+60167961402')

    expect(content).toContain('Skype')
    expect(content).toContain('skype:theron_ullrich2497778')

    expect(content).toContain('Current country')
    expect(content).toContain('Malaysia')

    expect(content).toContain('Current city')
    expect(content).toContain('Cyberjaya Selangor')

    expect(content).toContain('Time Zone')
    expect(content).toContain('TimeZone Value')

    expect(content).toContain('Working Status')
    expect(content).toContain('Working Status Field')

    expect(content).toContain('Current Interviews')
    expect(content).toContain('Talent Current Interviews Number')
  })
})
