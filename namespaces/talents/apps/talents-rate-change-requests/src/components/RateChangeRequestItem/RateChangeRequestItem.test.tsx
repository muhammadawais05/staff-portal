import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { DescriptionFormatter, ColoredStatus } from '@staff-portal/ui'
import {
  RateChangeRequestStatus,
  RateChangeRequestTypeEnum
} from '@staff-portal/graphql/staff'
import {
  parseAndFormatDate,
  getTimeZoneFullText
} from '@staff-portal/date-time-utils'
import { getRoleTypeText } from '@staff-portal/facilities'
import {
  AvailabilityStatus,
  SpecializationsField,
  SupplyHealthPriorityField,
  StatusField,
  CollapsibleSkillSetField
} from '@staff-portal/talents'

import { getTalentLocation } from '../../utils'
import {
  ResourceLink,
  RateChangeRequestItemActions,
  RateChangeRequestValue
} from '../../components'
import {
  createActiveEngagementMock,
  createRateChangeRequestMock
} from '../../data/rate-change-request-fragment/mocks'
import RateChangeRequestItem from './RateChangeRequestItem'

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  getRoleTypeText: jest.fn()
}))
jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  parseAndFormatDate: jest.fn(),
  getTimeZoneFullText: jest.fn()
}))
jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  ColoredStatus: jest.fn(),
  DescriptionFormatter: jest.fn()
}))

jest.mock('@staff-portal/talents', () => ({
  AvailabilityStatus: jest.fn(),
  SpecializationsField: jest.fn(),
  StatusField: jest.fn(),
  SupplyHealthPriorityField: jest.fn(),
  CollapsibleSkillSetField: jest.fn()
}))
jest.mock('../ResourceLink')
jest.mock('../RateChangeRequestItemActions')
jest.mock('../RateChangeRequestValue')

jest.mock('../../utils', () => ({
  getTalentLocation: jest.fn()
}))

const ResourceLinkMock = ResourceLink as jest.Mock
const RateChangeRequestItemActionsMock =
  RateChangeRequestItemActions as jest.Mock
const RateChangeRequestValueMock = RateChangeRequestValue as jest.Mock
const ColoredStatusMock = ColoredStatus as jest.Mock
const SpecializationsFieldMock = SpecializationsField as jest.Mock
const SupplyHealthPriorityFieldMock = SupplyHealthPriorityField as jest.Mock
const AvailabilityStatusMock = AvailabilityStatus as jest.Mock
const StatusFieldMock = StatusField as jest.Mock
const CollapsibleSkillSetFieldMock =
  CollapsibleSkillSetField as unknown as jest.Mock
const DescriptionFormatterMock = DescriptionFormatter as unknown as jest.Mock
const parseAndFormatDateMock = parseAndFormatDate as jest.Mock
const getTimeZoneFullTextMock = getTimeZoneFullText as jest.Mock
const getTalentLocationMock = getTalentLocation as jest.Mock
const getRoleTypeTextMock = getRoleTypeText as jest.Mock

const arrangeTest = (props: ComponentProps<typeof RateChangeRequestItem>) =>
  render(
    <TestWrapperWithMocks>
      <RateChangeRequestItem {...props} />
    </TestWrapperWithMocks>
  )

describe('RateChangeRequestItem', () => {
  beforeEach(() => {
    ResourceLinkMock.mockReturnValueOnce(null)
    RateChangeRequestItemActionsMock.mockReturnValueOnce(null)
    RateChangeRequestValueMock.mockReturnValueOnce(null)
    AvailabilityStatusMock.mockReturnValueOnce(null)
    SpecializationsFieldMock.mockReturnValueOnce(null)
    SupplyHealthPriorityFieldMock.mockReturnValueOnce(null)
    ColoredStatusMock.mockReturnValueOnce(null)
    StatusFieldMock.mockReturnValueOnce(null)
    DescriptionFormatterMock.mockReturnValue(null)
    CollapsibleSkillSetFieldMock.mockReturnValue(null)
  })

  it('renders link to talent in the title', () => {
    const rateChangeRequest = createRateChangeRequestMock()
    const talent = rateChangeRequest.talent!

    arrangeTest({
      rateChangeRequest
    })

    expect(ResourceLinkMock).toHaveBeenCalledWith(
      expect.objectContaining({
        webResource: talent?.webResource,
        text: talent?.fullName
      }),
      {}
    )
  })

  it('renders actions component', () => {
    const rateChangeRequest = createRateChangeRequestMock()

    arrangeTest({
      rateChangeRequest
    })

    expect(RateChangeRequestItemActionsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: rateChangeRequest.id,
        requestTypeEnumValue: rateChangeRequest.requestTypeEnumValue,
        currentRate: rateChangeRequest.currentRate,
        desiredRate: rateChangeRequest.desiredRate,
        status: rateChangeRequest.status,
        talentComment: rateChangeRequest.talentComment,
        talentSlackContacts: rateChangeRequest.talent?.slackContacts,
        completeRateChangeRequestOperation:
          rateChangeRequest.operations.completeRateChangeRequest
      }),
      {}
    )
  })

  it('renders "Rate Change Request" field', () => {
    const rateChangeRequest = createRateChangeRequestMock()
    const { currentRate, desiredRate, outcomeRate, talent } = rateChangeRequest
    const rateRecommendationUnauthorized = true

    arrangeTest({
      rateChangeRequest,
      rateRecommendationUnauthorized: true
    })

    expect(screen.getByText('Rate Change Request')).toBeInTheDocument()
    expect(RateChangeRequestValueMock).toHaveBeenCalledWith(
      expect.objectContaining({
        currentRate: currentRate,
        desiredRate: desiredRate,
        outcomeRate: outcomeRate,
        talent: talent,
        rateRecommendationUnauthorized
      }),
      {}
    )
  })

  it('renders "Request Type" field', () => {
    const rateChangeRequest = createRateChangeRequestMock({
      requestTypeEnumValue: RateChangeRequestTypeEnum.CURRENT_ENGAGEMENT,
      engagement: createActiveEngagementMock({
        webResource: {
          text: 'engagement',
          url: 'https://test.com'
        }
      })
    })

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Request Type')).toBeInTheDocument()
    expect(screen.getByText('Active engagement')).toBeInTheDocument()
  })

  it('renders "Status" field', () => {
    const rateChangeRequest = createRateChangeRequestMock({
      status: RateChangeRequestStatus.COMPLETED
    })

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(ColoredStatusMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'Completed',
        color: 'green'
      }),
      {}
    )
  })

  it('renders "Created at" field', () => {
    const rateChangeRequest = createRateChangeRequestMock({
      createdAt: '2022-01-01T10:00:00-03:00'
    })

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Created at')).toBeInTheDocument()
    expect(parseAndFormatDateMock).toHaveBeenCalledWith(
      rateChangeRequest.createdAt
    )
  })

  it('renders "Specializations" field', () => {
    const rateChangeRequest = createRateChangeRequestMock()

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Specializations')).toBeInTheDocument()
    expect(SpecializationsFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        specializations:
          rateChangeRequest.talent?.specializationApplications?.nodes ?? []
      }),
      {}
    )
  })

  it('renders "Talent Contacted at" field', () => {
    const rateChangeRequest = createRateChangeRequestMock({
      claimedAt: '2022-02-02T10:00:00-03:00'
    })

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Talent Contacted at')).toBeInTheDocument()
    expect(parseAndFormatDateMock).toHaveBeenCalledWith(
      rateChangeRequest.claimedAt
    )
  })

  it('renders "Time zone" field', () => {
    const rateChangeRequest = createRateChangeRequestMock()

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Time zone')).toBeInTheDocument()
    expect(getTimeZoneFullTextMock).toHaveBeenCalledWith(
      rateChangeRequest.talent?.timeZone
    )
  })

  it('renders "Role" field', () => {
    const rateChangeRequest = createRateChangeRequestMock()

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Role')).toBeInTheDocument()
    expect(getRoleTypeTextMock).toHaveBeenCalledWith(
      rateChangeRequest.talent?.type
    )
  })

  it('renders "Location" field', () => {
    const rateChangeRequest = createRateChangeRequestMock()

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(getTalentLocationMock).toHaveBeenCalledWith(rateChangeRequest.talent)
  })

  it('renders "Availability" field', () => {
    const rateChangeRequest = createRateChangeRequestMock()
    const talent = rateChangeRequest.talent!

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Availability')).toBeInTheDocument()
    expect(AvailabilityStatusMock).toHaveBeenCalledWith(
      expect.objectContaining({
        talentAvailability: {
          id: talent.id,
          roleTitle: talent.roleTitle,
          type: talent.type,
          allocatedHoursAvailability: talent.allocatedHoursAvailability,
          availableHours: talent.availableHours,
          availableHoursIncludingEndingEngagements:
            talent.availableHoursIncludingEndingEngagements,
          allocatedHours: talent.allocatedHours,
          allocatedHoursAvailabilityIncludingEndingEngagements:
            talent.allocatedHoursAvailabilityIncludingEndingEngagements,
          endingEngagements: {
            nodes: []
          }
        }
      }),
      {}
    )
  })

  it('renders "Supply Priority" field', () => {
    const rateChangeRequest = createRateChangeRequestMock()

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Supply Priority')).toBeInTheDocument()
    expect(SupplyHealthPriorityFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        priority: rateChangeRequest.talent?.supplyHealthModelData?.priority
      }),
      {}
    )
  })

  it('renders "Membership status" field', () => {
    const rateChangeRequest = createRateChangeRequestMock()
    const talent = rateChangeRequest.talent!

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Membership status')).toBeInTheDocument()
    expect(StatusFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        cumulativeStatus: talent?.cumulativeStatus,
        investigations: talent?.investigations,
        newcomer: talent?.newcomer,
        topShield: talent?.topShield
      }),
      {}
    )
  })

  it('renders "Skills" field', () => {
    const rateChangeRequest = createRateChangeRequestMock()
    const talent = rateChangeRequest.talent!

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(CollapsibleSkillSetFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        talentType: talent.type,
        skills: talent.skillSets?.nodes
      }),
      {}
    )
  })

  it('renders "Talent Comment" field', () => {
    const rateChangeRequest = createRateChangeRequestMock({
      talentComment: 'test talent comment'
    })

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Talent Comment')).toBeInTheDocument()
    expect(DescriptionFormatterMock).toHaveBeenCalledWith(
      expect.objectContaining({
        text: rateChangeRequest.talentComment
      }),
      {}
    )
  })

  it('renders "Reviewer Comment" field', () => {
    const rateChangeRequest = createRateChangeRequestMock({
      claimerComment: 'test claimer comment'
    })

    arrangeTest({
      rateChangeRequest
    })

    expect(screen.getByText('Reviewer Comment (internal)')).toBeInTheDocument()
    expect(DescriptionFormatterMock).toHaveBeenCalledWith(
      expect.objectContaining({
        text: rateChangeRequest.claimerComment
      }),
      {}
    )
  })
})
