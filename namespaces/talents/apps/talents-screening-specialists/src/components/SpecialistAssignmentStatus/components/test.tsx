import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'
import { Scalars } from '@staff-portal/graphql/staff'
import { SpecialistAssignmentFragment } from '@staff-portal/talents-screening-specialists'
import {
  createSpecialistAssignmentArchivingMock,
  createSpecialistAssignmentMock
} from '@staff-portal/talents-screening-specialists/src/mocks'

import StatusContentWrapper from './StatusContentWrapper'

const arrangeTest = ({
  specialistAssignment
}: {
  specialistAssignment?: SpecialistAssignmentFragment | null
}) =>
  render(
    <TestWrapper>
      <StatusContentWrapper specialistAssignment={specialistAssignment}>
        SOME STATUS
      </StatusContentWrapper>
    </TestWrapper>
  )

const CREATED_AT: {
  ISO_FORMAT: Scalars['Date']
  USER_FORMAT: string
} = {
  ISO_FORMAT: '2018-09-07',
  USER_FORMAT: 'Sep 7, 2018'
}

describe('StatusContentWrapper', () => {
  describe('when there is no archiving', () => {
    it('simply shows the wrapped status', () => {
      const assignment = createSpecialistAssignmentMock()

      arrangeTest({ specialistAssignment: assignment })
      expect(screen.queryByText('SOME STATUS')).toBeInTheDocument()
    })
  })

  describe('when there is an archiving present', () => {
    it('shows the status and a tooltip with archiving information', () => {
      const fields = { createdAt: CREATED_AT.ISO_FORMAT, reason: 'covid19' }
      const archiving = createSpecialistAssignmentArchivingMock(fields)
      const assignment = createSpecialistAssignmentMock({
        archiving: archiving
      })

      arrangeTest({ specialistAssignment: assignment })

      const status = screen.getByText('SOME STATUS')

      expect(status).toBeInTheDocument()
      assertOnTooltipText(status, 'Archiving reason: Covid-19')
      assertOnTooltipText(
        status,
        `Archived by: ${assignment.assignee?.fullName}`
      )

      assertOnTooltipText(status, `Archived on: ${CREATED_AT.USER_FORMAT}`)
    })

    describe('when the assignment was archived by the system', () => {
      const fields = { reason: 'talent_rejected' }
      const archiving = createSpecialistAssignmentArchivingMock(fields)
      const assignment = createSpecialistAssignmentMock({
        archiving: archiving
      })

      it('shows the archiver as System', () => {
        arrangeTest({ specialistAssignment: assignment })

        const status = screen.getByText('SOME STATUS')

        assertOnTooltipText(status, 'Archived by: System')
      })

      it('shows the formatted reason', () => {
        arrangeTest({ specialistAssignment: assignment })

        const status = screen.getByText('SOME STATUS')

        assertOnTooltipText(status, 'Archiving reason: Talent rejected')
      })
    })
  })
})
