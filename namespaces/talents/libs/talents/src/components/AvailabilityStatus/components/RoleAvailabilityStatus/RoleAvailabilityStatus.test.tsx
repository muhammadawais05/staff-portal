import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TalentAllocatedHoursAvailability } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { ColoredStatus } from '@staff-portal/ui'

import {
  createTalentAvailabilityFragmentMock,
  createEndingEngagementMock
} from '../../../../data/talent-availability-fragment/mocks'
import { getTalentAvailabilityStatusSettings } from '../../../../services'
import {
  EndingEngagementsIndicator,
  UnavailableTalentIndicator,
  UpdatedAtIndicator
} from './components'
import RoleAvailabilityStatus from './RoleAvailabilityStatus'
import { TalentAvailabilityFragment } from '../../../../data'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  ColoredStatus: jest.fn()
}))
jest.mock('./components', () => ({
  EndingEngagementsIndicator: jest.fn(),
  UnavailableTalentIndicator: jest.fn(),
  UpdatedAtIndicator: jest.fn()
}))
jest.mock('../../../../services', () => ({
  getTalentAvailabilityStatusSettings: jest.fn()
}))

const getTalentAvailabilityStatusSettingsMock =
  getTalentAvailabilityStatusSettings as jest.Mock
const ColoredStatusMock = ColoredStatus as jest.Mock
const EndingEngagementsIndicatorMock = EndingEngagementsIndicator as jest.Mock
const UnavailableIndicatorMock = UnavailableTalentIndicator as jest.Mock
const UpdatedAtIndicatorMock = UpdatedAtIndicator as jest.Mock

const arrangeTest = (props: ComponentProps<typeof RoleAvailabilityStatus>) =>
  render(
    <TestWrapper>
      <RoleAvailabilityStatus {...props} />
    </TestWrapper>
  )

describe('RoleAvailabilityStatus', () => {
  beforeEach(() => {
    getTalentAvailabilityStatusSettingsMock.mockReturnValueOnce({
      text: 'current availability',
      color: 'green'
    })
    ColoredStatusMock.mockImplementation(() => (
      <div data-testid='coloredStatus'></div>
    ))
    EndingEngagementsIndicatorMock.mockImplementation(() => (
      <div data-testid='endingEngagementsIndicator'></div>
    ))
    UnavailableIndicatorMock.mockImplementation(() => (
      <div data-testid='UnavailableTalentIndicator'></div>
    ))
    UpdatedAtIndicatorMock.mockImplementation(() => (
      <div data-testid='updatedAtIndicator'></div>
    ))
  })

  it('renders colored status with current availability', () => {
    const developer = createTalentAvailabilityFragmentMock({
      availableHoursIncludingEndingEngagements: 0,
      allocatedHoursAvailabilityIncludingEndingEngagements:
        TalentAllocatedHoursAvailability.UNAVAILABLE
    })

    arrangeTest({
      role: developer,
      mode: 'default'
    })

    expect(getTalentAvailabilityStatusSettingsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        allocatedHoursAvailability:
          developer.allocatedHoursAvailabilityIncludingEndingEngagements,
        availableHours: developer.availableHoursIncludingEndingEngagements
      }),
      'default',
      {
        hideAllocatedHours: undefined,
        hideRoleName: undefined
      }
    )
    expect(screen.getByTestId('coloredStatus')).toBeInTheDocument()
    expect(ColoredStatusMock).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'current availability',
        color: 'green'
      }),
      {}
    )
  })

  describe('when talent have ending engagements', () => {
    it('renders ending engagements indicator', () => {
      const endingEngagement = createEndingEngagementMock()
      const role = createTalentAvailabilityFragmentMock({
        endingEngagements: {
          nodes: [endingEngagement]
        }
      })

      arrangeTest({
        role,
        mode: 'default'
      })

      expect(
        screen.getByTestId('endingEngagementsIndicator')
      ).toBeInTheDocument()
      expect(EndingEngagementsIndicatorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          role
        }),
        {}
      )
    })
  })

  describe('when talent set themselves as unavailable', () => {
    it('renders unavailable with expected return indicator', () => {
      const unavailableAllocatedHoursChangeRequest: TalentAvailabilityFragment['unavailableAllocatedHoursChangeRequest'] =
        {
          id: '1',
          futureCommitment: 40,
          rejectReason: 'not_working',
          returnInDate: '2022-02-10'
        }
      const allocatedHoursConfirmedAt = '2022-01-01T00:00:00+00:00'
      const role = createTalentAvailabilityFragmentMock({
        endingEngagements: {
          nodes: []
        },
        unavailableAllocatedHoursChangeRequest,
        allocatedHoursConfirmedAt
      })

      arrangeTest({
        role,
        mode: 'default'
      })

      expect(
        screen.getByTestId('UnavailableTalentIndicator')
      ).toBeInTheDocument()
      expect(UnavailableIndicatorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          unavailableAllocatedHoursChangeRequest,
          allocatedHoursConfirmedAt
        }),
        {}
      )
    })
  })

  describe('when allocated hours confirmed date is present and mode is detailed', () => {
    it('renders unavailable with expected return indicator', () => {
      const allocatedHoursConfirmedAt = '2022-01-01T00:00:00+00:00'
      const role = createTalentAvailabilityFragmentMock({
        endingEngagements: {
          nodes: []
        },
        unavailableAllocatedHoursChangeRequest: null,
        allocatedHoursConfirmedAt
      })

      arrangeTest({
        role,
        mode: 'detailed'
      })

      expect(screen.getByTestId('updatedAtIndicator')).toBeInTheDocument()
      expect(UpdatedAtIndicatorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          allocatedHoursConfirmedAt
        }),
        {}
      )
    })
  })
})
