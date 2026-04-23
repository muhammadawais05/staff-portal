import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Tooltip } from '@toptal/picasso'
import { TalentAllocatedHoursAvailability } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { ColoredStatus } from '@staff-portal/ui'

import { getTalentAvailabilityStatusSettings } from '../../../../services'
import {
  createTalentAvailabilityFragmentMock,
  createEndingEngagementMock
} from '../../../../data/talent-availability-fragment/mocks'
import UnavailableTalentTooltipContent from '../UnavailableTalentTooltipContent'
import {
  CompactEndingEngagementsIndicator,
  CompactEndingEngagementsTooltipContent,
  CompactTooltipContent,
  CompactTalentUnavailableIndicator
} from './components'
import CompactAvailabilityStatus from './CompactAvailabilityStatus'
import { TalentAvailabilityFragment } from '../../../../data'

jest.mock('@toptal/picasso/Tooltip')
jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  ColoredStatus: jest.fn()
}))
jest.mock('./components', () => ({
  CompactEndingEngagementsIndicator: jest.fn(),
  CompactEndingEngagementsTooltipContent: jest.fn(),
  CompactTooltipContent: jest.fn(),
  CompactTalentUnavailableIndicator: jest.fn()
}))
jest.mock('../UnavailableTalentTooltipContent')
jest.mock('../../../../services', () => ({
  getTalentAvailabilityStatusSettings: jest.fn()
}))

const getTalentAvailabilityStatusSettingsMock =
  getTalentAvailabilityStatusSettings as jest.Mock
const TooltipMock = Tooltip as unknown as jest.Mock
const ColoredStatusMock = ColoredStatus as jest.Mock
const CompactEndingEngagementsIndicatorMock =
  CompactEndingEngagementsIndicator as jest.Mock
const CompactEndingEngagementsTooltipContentMock =
  CompactEndingEngagementsTooltipContent as jest.Mock
const CompactTooltipContentMock = CompactTooltipContent as jest.Mock
const CompactTalentUnavailableIndicatorMock =
  CompactTalentUnavailableIndicator as jest.Mock
const UnavailableTalentTooltipContentMock =
  UnavailableTalentTooltipContent as jest.Mock

const associatedRoles = [
  createTalentAvailabilityFragmentMock({ type: 'Designer' }),
  createTalentAvailabilityFragmentMock({ type: 'Project Manager' })
]

const arrangeTest = (props: ComponentProps<typeof CompactAvailabilityStatus>) =>
  render(
    <TestWrapper>
      <CompactAvailabilityStatus {...props} />
    </TestWrapper>
  )

describe('CompactAvailabilityStatus', () => {
  beforeEach(() => {
    getTalentAvailabilityStatusSettingsMock.mockReturnValueOnce({
      text: 'current availability',
      color: 'green'
    })
    TooltipMock.mockImplementation(({ children }) => (
      <div data-testid='tooltip'>{children}</div>
    ))
    ColoredStatusMock.mockImplementation(() => (
      <div data-testid='coloredStatus'></div>
    ))
    CompactEndingEngagementsIndicatorMock.mockImplementation(() => (
      <div data-testid='compactEndingEngagementsIndicator'></div>
    ))
    CompactTalentUnavailableIndicatorMock.mockImplementation(() => (
      <div data-testid='compactTalentUnavailableIndicator'></div>
    ))
    UnavailableTalentTooltipContentMock.mockImplementation(() => null)
    CompactEndingEngagementsTooltipContentMock.mockImplementation(() => null)
    CompactTooltipContentMock.mockImplementation(() => null)
  })

  it('renders colored status with current availability, no indicator and default tooltip', () => {
    const talentRole = createTalentAvailabilityFragmentMock({
      availableHoursIncludingEndingEngagements: 0,
      allocatedHoursAvailabilityIncludingEndingEngagements:
        TalentAllocatedHoursAvailability.UNAVAILABLE,
      unavailableAllocatedHoursChangeRequest: null,
      endingEngagements: {
        nodes: []
      }
    })

    arrangeTest({
      talentRole,
      associatedRoles
    })

    expect(getTalentAvailabilityStatusSettingsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        allocatedHoursAvailability:
          talentRole.allocatedHoursAvailabilityIncludingEndingEngagements,
        availableHours: talentRole.availableHoursIncludingEndingEngagements
      }),
      'compact'
    )
    expect(screen.getByTestId('coloredStatus')).toBeInTheDocument()
    expect(ColoredStatusMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'current availability',
        color: 'green'
      }),
      {}
    )

    expect(
      screen.queryByTestId('compactEndingEngagementsIndicator')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('compactTalentUnavailableIndicator')
    ).not.toBeInTheDocument()

    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
    expect(TooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.objectContaining({
          type: CompactTooltipContentMock,
          props: {
            talentRole,
            associatedRoles
          }
        })
      }),
      {}
    )
  })

  describe('when talent have ending engagements', () => {
    it('renders ending engagements indicator and tooltip content', () => {
      const endingEngagement = createEndingEngagementMock()
      const talentRole = createTalentAvailabilityFragmentMock({
        endingEngagements: {
          nodes: [endingEngagement]
        }
      })

      arrangeTest({
        talentRole,
        associatedRoles
      })

      expect(
        screen.getByTestId('compactEndingEngagementsIndicator')
      ).toBeInTheDocument()
      expect(CompactEndingEngagementsIndicatorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          talentRole
        }),
        {}
      )
      expect(screen.getByTestId('tooltip')).toBeInTheDocument()
      expect(TooltipMock).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            type: CompactEndingEngagementsTooltipContent,
            props: {
              talentRole,
              associatedRoles
            }
          })
        }),
        {}
      )
    })
  })

  describe('when talent set themselves as unavailable', () => {
    it('renders unavailable talent indicator and tooltip content', () => {
      const unavailableAllocatedHoursChangeRequest: TalentAvailabilityFragment['unavailableAllocatedHoursChangeRequest'] =
        {
          id: '1',
          futureCommitment: 40,
          rejectReason: 'not_working',
          returnInDate: '2022-02-10'
        }
      const allocatedHoursConfirmedAt = '2022-01-01T00:00:00+00:00'
      const talentRole = createTalentAvailabilityFragmentMock({
        unavailableAllocatedHoursChangeRequest,
        allocatedHoursConfirmedAt,
        endingEngagements: {
          nodes: []
        }
      })

      arrangeTest({
        talentRole,
        associatedRoles
      })

      expect(
        screen.getByTestId('compactTalentUnavailableIndicator')
      ).toBeInTheDocument()
      expect(CompactTalentUnavailableIndicatorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          unavailableAllocatedHoursChangeRequest
        }),
        {}
      )
      expect(screen.getByTestId('tooltip')).toBeInTheDocument()
      expect(TooltipMock).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            type: UnavailableTalentTooltipContentMock,
            props: {
              unavailableAllocatedHoursChangeRequest,
              allocatedHoursConfirmedAt
            }
          })
        }),
        {}
      )
    })
  })
})
