import React from 'react'
import { render, screen } from '@testing-library/react'
import { RouteContext, RouteType } from '@staff-portal/navigation'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'
import { Assignee, Talent } from '@staff-portal/talents-screening-specialists'
import {
  createTalentMock,
  createStaffMock
} from '@staff-portal/talents-screening-specialists/src/mocks'

import AssigneeCellContent from './AssigneeCellContent'

const route: RouteType = path => ({ url: path })

const talentMock = createTalentMock({ fullName: 'Test Talent' })
const assigneeMock = createStaffMock({ fullName: 'Denys Medynskyi' })

jest.mock(
  '../AssignDropdown',
  () =>
    ({ talent }: { talent: Talent }) =>
      `Mocked Dropdown for ${talent.fullName}`
)

const arrangeTest = ({
  assignee,
  talent
}: {
  assignee?: Assignee
  talent: Talent
}) =>
  render(
    <RouteContext.Provider value={route}>
      <TestWrapper>
        <AssigneeCellContent assignee={assignee} talent={talent} />
      </TestWrapper>
    </RouteContext.Provider>
  )

describe('AssigneeCell', () => {
  it('passes talent to AssignDropdown component', () => {
    arrangeTest({ assignee: assigneeMock, talent: talentMock })

    const mockedAssignDropdown = screen.getByText(
      `Mocked Dropdown for ${talentMock.fullName}`
    )

    expect(mockedAssignDropdown).toBeInTheDocument()
  })

  describe('when assignee is present', () => {
    it('shows assignee initials as text and full name in the tooltip', async () => {
      arrangeTest({ assignee: assigneeMock, talent: talentMock })

      const assigneeInitials = screen.getByText('DM')

      expect(assigneeInitials).toBeInTheDocument()
      assertOnTooltipText(assigneeInitials, 'Denys Medynskyi')
    })
  })

  describe('when no assignee', () => {
    it('shows assignee placeholder', async () => {
      arrangeTest({ talent: talentMock })

      const namePlaceholder = screen.getByText('-')

      expect(namePlaceholder).toBeInTheDocument()
    })
  })
})
