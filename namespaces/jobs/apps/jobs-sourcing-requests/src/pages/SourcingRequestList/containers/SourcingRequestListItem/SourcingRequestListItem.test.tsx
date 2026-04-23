import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  BusinessTypes,
  JobWorkType,
  SkillRating,
  SourcingRequestStatus
} from '@staff-portal/graphql/staff'
import MockDate from 'mockdate'

import SourcingRequestListItem, { Props } from './SourcingRequestListItem'
import { SourcingRequestsListItemFragment } from '../../../../data/sourcing-requests-list-item-fragment/sourcing-requests-list-item-fragment.staff.gql.types'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: () => ({
    showModal: jest.fn()
  })
}))

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: () => ({})
}))

const arrangeTest = async (props: Props) => {
  render(
    <TestWrapper>
      <SourcingRequestListItem {...props} />
    </TestWrapper>
  )
}

describe('SourcingRequestListItem', () => {
  const sourcingRequest: SourcingRequestsListItemFragment = {
    id: '123',
    createdAt: '2022-01-01T00:00:00',
    claimedAt: '2022-02-01T00:00:00',
    clientPartner: {
      id: '123',
      webResource: {
        text: 'John Smith',
        url: ''
      }
    },
    job: {
      id: '123',
      jobType: 'developer',
      workType: JobWorkType.REMOTE,
      commitment: 'full_time',
      client: {
        id: '123',
        enterprise: false,
        businessType: BusinessTypes.MEDIUM_BUSINESS,
        webResource: {
          text: 'JavaScript Developer',
          url: ''
        }
      },
      claimer: {
        id: '123',
        webResource: {
          text: 'Paul Aaron',
          url: ''
        }
      },
      claimerHandoff: null,
      specialization: {
        id: '123',
        title: 'Senior'
      }
    },
    positions: 1,
    status: SourcingRequestStatus.ACTIVE_SOURCING,
    sourcingRequestTalents: {
      totalCount: 0
    },
    talentSpecialist: {
      id: '123',
      webResource: {
        text: 'Timofei Kachalov',
        url: ''
      }
    },
    webResource: {
      text: 'JavaScript Developer',
      url: ''
    },
    skillSets: {
      totalCount: 2,
      nodes: [
        {
          id: '1',
          niceToHave: false,
          rating: SkillRating.COMPETENT,
          main: false,
          skill: { id: '1', name: 'Skill 1' }
        },
        {
          id: '2',
          niceToHave: true,
          rating: SkillRating.COMPETENT,
          main: false,
          skill: { id: '2', name: 'Skill 2' }
        }
      ]
    }
  }

  beforeAll(() => MockDate.set('2022-05-01T00:00:00.000+00:00'))

  it.each([
    {
      label: 'Request Posted',
      value: '4 months ago'
    },
    {
      label: 'Status',
      value: 'Active Sourcing'
    },
    {
      label: 'Claimed at',
      value: '3 months ago'
    },
    {
      label: 'Talent Specialist',
      value: 'Timofei Kachalov'
    },
    {
      label: 'Client Partner',
      value: 'John Smith'
    },
    {
      label: 'Job Claimer',
      value: 'Paul Aaron'
    },
    {
      label: 'Company',
      value: 'JavaScript Developer'
    },
    {
      label: 'Business Type',
      value: 'Not Enterprise'
    },
    {
      label: 'Work Type',
      value: 'Remote'
    },
    {
      label: 'Job Type',
      value: 'Developer'
    },
    {
      label: 'Desired Commitment',
      value: 'Full-time'
    },
    {
      label: 'Job Specialization',
      value: 'Senior'
    },
    {
      label: 'Positions',
      value: '1'
    },
    {
      label: 'Linked Talent',
      value: '0'
    },
    {
      label: 'Must-Have Skills',
      value: 'Must-Have SkillsSkill 1'
    },
    {
      label: 'Nice-to-Have Skills',
      value: 'Nice-to-Have SkillsSkill 2'
    }
  ])('renders item field', ({ label, value }) => {
    arrangeTest({ sourcingRequest })

    expect(screen.getByTestId(`item-field: ${label}`)).toHaveTextContent(value)
  })
})
