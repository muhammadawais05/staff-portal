import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { RouteContext } from '@staff-portal/navigation'
import {
  TalentCoachingEngagementCampaignSlug,
  TalentCoachingEngagementStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import TalentCoachingContent from './TalentCoachingContent'
import { TalentCoachingEngagementWithActivitiesFragment } from '../../../../data'

jest.mock('../../../../data', () => ({
  useGetCoachingAssignees: () => ({ assignees: [] }),
  getTalentCoachingEngagementHook: () => () => ({ request: jest.fn() })
}))
jest.mock('../TalentCoachingAssignee/data', () => ({
  useAssignCoachMutation: () => [jest.fn()]
}))
jest.mock('../TalentCoachingStatus/data', () => ({
  useChangeCoachingStatusMutation: () => [jest.fn()]
}))

const getByFieldLabel = (fieldLabel: string) =>
  within(screen.getByTestId(`item-field: ${fieldLabel}`)).getByTestId(
    'item-field-value'
  )

const arrangeTest = (
  talentCoachingEngagement: TalentCoachingEngagementWithActivitiesFragment
) => {
  render(
    <RouteContext.Provider value={path => ({ url: path })}>
      <TestWrapper>
        <TalentCoachingContent
          talentCoachingEngagement={talentCoachingEngagement}
        />
      </TestWrapper>
    </RouteContext.Provider>
  )
}

describe('TalentCoachingContent', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2020-03-07T10:30:00+02:00'))
  })

  const ACTIVATED_AT = {
    ISO_FORMAT: '2020-03-02T10:30:00+02:00',
    USER_FORMAT: 'Mar 2, 2020'
  } as const

  const CREATED_AT = {
    ISO_FORMAT: '2020-03-03T10:30:00+02:00',
    USER_FORMAT: 'Mar 3, 2020'
  } as const

  const CLAIMED_AT = {
    ISO_FORMAT: '2020-03-04T10:30:00+02:00',
    USER_FORMAT: 'Mar 4, 2020'
  } as const

  const UPDATED_AT = {
    ISO_FORMAT: '2020-03-05T10:30:00+02:00',
    USER_FORMAT: 'Mar 5, 2020'
  } as const

  const talentCoachingEngagement = (
    data: Partial<TalentCoachingEngagementWithActivitiesFragment> = {}
  ): TalentCoachingEngagementWithActivitiesFragment => ({
    id: 'test',
    claimedAt: CLAIMED_AT.ISO_FORMAT,
    createdAt: CREATED_AT.ISO_FORMAT,
    updatedAt: UPDATED_AT.ISO_FORMAT,
    campaignSlug: TalentCoachingEngagementCampaignSlug.NEWCOMERS,
    states: { nodes: [] },
    status: TalentCoachingEngagementStatus.PENDING_COACH_REVIEW,
    coach: {
      id: 'test-coach-id',
      fullName: 'Alfreda Veum',
      webResource: { text: 'Alfreda Veum', url: 'coach-url' }
    },
    operations: {
      addCoachActionsNote: createOperationMock(),
      addGeneralNote: createOperationMock(),
      assignCoach: createOperationMock(),
      changeStatus: createOperationMock()
    },
    applicationStatus: {
      id: 'test-application-status-id',
      totalInterviewCount: 6,
      cancelledInterviewCount: 1,
      rejectedInterviewCount: 2,
      successfulInterviewCount: 3,
      totalAvailabilityRequestCount: 2,
      confirmedAvailabilityRequestCount: 1,
      statusRetentionDays: 30,
      totalEngagementCount: 4,
      totalJobApplicationCount: 5
    },
    talent: {
      id: 'test-talent-id',
      fullName: 'John Doe From Test',
      activatedAt: ACTIVATED_AT.ISO_FORMAT,
      hourlyRate: '12.35',
      webResource: { text: 'John Doe', url: 'talent-url' },
      engagements: { counters: { workingNumber: 1 } },
      talentType: 'Developer'
    },
    tasks: {
      totalCount: 0,
      nodes: []
    },
    notes: {
      totalCount: 0,
      nodes: []
    },
    ...data
  })

  it('renders talent coaching engagement fields', async () => {
    arrangeTest(talentCoachingEngagement())

    expect(getByFieldLabel('Coaching Status')).toHaveTextContent(
      'Pending coach review'
    )
    expect(getByFieldLabel('Activation Date')).toHaveTextContent(
      `${ACTIVATED_AT.USER_FORMAT} – Activated 5 days ago`
    )
    expect(getByFieldLabel('Assignee')).toHaveTextContent('Alfreda Veum')
    expect(screen.getByText('Alfreda Veum')).toHaveAttribute(
      'href',
      'coach-url'
    )
    expect(getByFieldLabel('Claimed at')).toHaveTextContent(
      CLAIMED_AT.USER_FORMAT
    )

    // Temporarily removed on [TEA-2997]
    // expect(getByFieldLabel('Talent State')).toHaveTextContent('Working')

    expect(getByFieldLabel('Campaign')).toHaveTextContent('Newcomer')

    expect(getByFieldLabel('Talent Rate')).toHaveTextContent('12.35')

    expect(getByFieldLabel('Application Status')).toHaveTextContent(
      '5 JAs + 2 ARs (1 confirmed) → 4 engagements → 6 interviews' +
      '1 canceled interview, 2 rejected interviews, 3 successful interviews' +
      'Succesful/Total Interviews: 3/6' +
      'Last 30 days'
    )
  })
})
