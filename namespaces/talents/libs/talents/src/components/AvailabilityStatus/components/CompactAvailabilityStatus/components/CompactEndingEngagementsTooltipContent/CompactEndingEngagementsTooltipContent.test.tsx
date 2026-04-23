import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  createTalentAvailabilityFragmentMock,
  createEndingEngagementMock
} from '../../../../../../data/talent-availability-fragment/mocks'
import AvailabilityUpdatedAt from '../../../AvailabilityUpdatedAt'
import PreliminarySearchLabel from '../../../PreliminarySearchLabel'
import EndingEngagementLabel from '../../../EndingEngagementLabel'
import FutureAvailabilityLabel from '../../../FutureAvailabilityLabel'
import CompactEndingEngagementsTooltipContent from './CompactEndingEngagementsTooltipContent'

jest.mock('../../../AvailabilityUpdatedAt', () => jest.fn())
jest.mock('../../../PreliminarySearchLabel', () => jest.fn())
jest.mock('../../../EndingEngagementLabel', () => jest.fn())
jest.mock('../../../FutureAvailabilityLabel', () => jest.fn())

const AvailabilityUpdatedAtMock = AvailabilityUpdatedAt as jest.Mock
const PreliminarySearchLabelMock = PreliminarySearchLabel as jest.Mock
const EndingEngagementLabelMock = EndingEngagementLabel as jest.Mock
const FutureAvailabilityLabelMock = FutureAvailabilityLabel as jest.Mock

const developerEndingEngagements = [
  createEndingEngagementMock({ id: '1' }),
  createEndingEngagementMock({ id: '2' })
]
const developer = createTalentAvailabilityFragmentMock({
  type: 'Developer',
  endingEngagements: { nodes: developerEndingEngagements },
  preliminarySearchSetting: {
    enabled: true
  }
})
const designerEndingEngagements = [
  createEndingEngagementMock({ id: '3' }),
  createEndingEngagementMock({ id: '4' })
]
const designer = createTalentAvailabilityFragmentMock({
  type: 'Designer',
  endingEngagements: { nodes: designerEndingEngagements }
})

const projectManagerEndingEngagements = [
  createEndingEngagementMock({ id: '5' }),
  createEndingEngagementMock({ id: '6' })
]
const projectManager = createTalentAvailabilityFragmentMock({
  type: 'Project Manager',
  endingEngagements: { nodes: projectManagerEndingEngagements }
})
const associatedRoles = [designer, projectManager]

const arrangeTest = (
  props: ComponentProps<typeof CompactEndingEngagementsTooltipContent>
) =>
  render(
    <TestWrapper>
      <CompactEndingEngagementsTooltipContent {...props} />
    </TestWrapper>
  )

describe('CompactEndingEngagementsTooltipContent', () => {
  beforeEach(() => {
    AvailabilityUpdatedAtMock.mockImplementation(() => (
      <div data-testid='availabilityUpdatedAt'></div>
    ))
    PreliminarySearchLabelMock.mockImplementation(() => (
      <div data-testid='preliminarySearchLabel'></div>
    ))
    EndingEngagementLabelMock.mockImplementation(() => (
      <div data-testid='endingEngagementLabel'></div>
    ))
    FutureAvailabilityLabelMock.mockImplementation(() => (
      <div data-testid='futureAvailabilityLabel'></div>
    ))
  })

  it('renders availability updated at and preliminary search label', () => {
    arrangeTest({
      talentRole: developer,
      associatedRoles
    })

    expect(screen.getByTestId('availabilityUpdatedAt')).toBeInTheDocument()
    expect(AvailabilityUpdatedAtMock).toHaveBeenCalledWith(
      expect.objectContaining({
        talentAvailability: developer
      }),
      {}
    )

    expect(screen.getByTestId('preliminarySearchLabel')).toBeInTheDocument()
    expect(PreliminarySearchLabelMock).toHaveBeenCalledWith(
      expect.objectContaining({
        preliminarySearchEnabled: developer.preliminarySearchSetting?.enabled
      }),
      {}
    )
  })

  describe('whent talent have multiple roles', () => {
    it('renders future availability label for every role', () => {
      const allRoles = [developer, ...associatedRoles]

      arrangeTest({
        talentRole: developer,
        associatedRoles
      })

      expect(screen.getAllByTestId('futureAvailabilityLabel')).toHaveLength(
        allRoles.length
      )

      allRoles.forEach(role => {
        expect(FutureAvailabilityLabelMock).toHaveBeenCalledWith(
          expect.objectContaining({
            talentAvailability: role,
            includeType: true
          }),
          {}
        )
      })
    })

    it('renders label for every ending engagement', () => {
      const allEndingEngagements = [
        ...developerEndingEngagements,
        ...designerEndingEngagements,
        ...projectManagerEndingEngagements
      ]

      arrangeTest({
        talentRole: developer,
        associatedRoles
      })

      expect(screen.getAllByTestId('endingEngagementLabel')).toHaveLength(
        allEndingEngagements.length
      )

      allEndingEngagements.forEach(endingEngagement => {
        expect(EndingEngagementLabelMock).toHaveBeenCalledWith(
          expect.objectContaining({
            endingEngagement
          }),
          {}
        )
      })
    })
  })

  describe('whent talent have a single role', () => {
    it('renders future availability label', () => {
      arrangeTest({
        talentRole: developer,
        associatedRoles: []
      })

      expect(screen.getAllByTestId('futureAvailabilityLabel')).toHaveLength(1)
      expect(FutureAvailabilityLabelMock).toHaveBeenCalledWith(
        expect.objectContaining({
          talentAvailability: developer,
          includeType: false
        }),
        {}
      )
    })

    it('renders label for ending engagements of the role', () => {
      arrangeTest({
        talentRole: developer,
        associatedRoles: []
      })

      expect(screen.getAllByTestId('endingEngagementLabel')).toHaveLength(
        developerEndingEngagements.length
      )

      developerEndingEngagements.forEach(endingEngagement => {
        expect(EndingEngagementLabelMock).toHaveBeenCalledWith(
          expect.objectContaining({
            endingEngagement
          }),
          {}
        )
      })
    })
  })
})
