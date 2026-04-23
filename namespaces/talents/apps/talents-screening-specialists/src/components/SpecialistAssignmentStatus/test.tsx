import React from 'react'
import { render, screen } from '@testing-library/react'
import { Typography } from '@toptal/picasso'
import {
  OperationCallableTypes,
  SpecialistAssignmentStatuses
} from '@staff-portal/graphql/staff'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'
import {
  SpecialistAssignmentArchivingFragment,
  SpecialistAssignmentFragment
} from '@staff-portal/talents-screening-specialists'
import { createSpecialistAssignmentArchivingMock } from '@staff-portal/talents-screening-specialists/src/mocks'

import {} from '../../data/get-talents-with-screening-specialist-list'
import SpecialistAssignmentStatus from './SpecialistAssignmentStatus'

jest.mock('@toptal/picasso/Typography', () => jest.fn())

const TypographyMock = Typography as unknown as jest.Mock

const mockSpecialistAssignment = ({
  status,
  archiving = null
}: {
  status: SpecialistAssignmentStatuses
  archiving?: SpecialistAssignmentArchivingFragment | null
}) => ({
  status,
  archiving: archiving,
  id: 'asd',
  operations: {
    archiveSpecialistAssignment: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    reactivateSpecialistAssignment: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  }
})

const arrangeTest = ({
  currentSpecialistAssignment
}: {
  currentSpecialistAssignment?: SpecialistAssignmentFragment
}) =>
  render(
    <TestWrapper>
      <SpecialistAssignmentStatus
        specialistAssignment={currentSpecialistAssignment}
      />
    </TestWrapper>
  )

describe('SpecialistAssignmentStatus', () => {
  beforeEach(() => {
    TypographyMock.mockImplementation(({ children }) => children)
  })

  describe('when status is ACTIVE', () => {
    it('displays green text Active', () => {
      const currentSpecialistAssignment = mockSpecialistAssignment({
        status: SpecialistAssignmentStatuses.ACTIVE
      })

      arrangeTest({ currentSpecialistAssignment })

      expect(TypographyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: 'green'
        }),
        expect.anything()
      )
    })
  })

  describe('when status is ARCHIVED', () => {
    const currentSpecialistAssignment = mockSpecialistAssignment({
      status: SpecialistAssignmentStatuses.ARCHIVED,
      archiving: createSpecialistAssignmentArchivingMock({ reason: 'covid19' })
    })

    it('displays yellow text Archived', () => {
      arrangeTest({ currentSpecialistAssignment })

      expect(TypographyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: 'yellow'
        }),
        expect.anything()
      )
    })

    it('shows a tooltip with archiving information', () => {
      arrangeTest({ currentSpecialistAssignment })

      const status = screen.getByText('Archived')

      assertOnTooltipText(status, 'Archiving reason: Covid-19')
    })
  })

  describe('when status is NONE', () => {
    it('displays grey dash', () => {
      const currentSpecialistAssignment = mockSpecialistAssignment({
        status: SpecialistAssignmentStatuses.NONE
      })

      arrangeTest({ currentSpecialistAssignment })

      expect(TypographyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: 'grey'
        }),
        expect.anything()
      )
    })
  })

  describe('when there is no Assignment', () => {
    it('displays grey dash', () => {
      arrangeTest({})

      expect(TypographyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: 'grey'
        }),
        expect.anything()
      )
    })
  })
})
