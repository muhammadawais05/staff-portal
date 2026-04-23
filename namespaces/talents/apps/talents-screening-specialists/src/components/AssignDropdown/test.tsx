import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  useGetScreeningSpecialists,
  Talent
} from '@staff-portal/talents-screening-specialists'
import {
  createSpecialistAssignmentMock,
  createTalentMock,
  createScreeningSpecialistsMock
} from '@staff-portal/talents-screening-specialists/src/mocks'

import AssignDropdown from './AssignDropdown'

jest.mock('../../hooks')
jest.mock('@staff-portal/talents-screening-specialists', () => ({
  ...jest.requireActual('@staff-portal/talents-screening-specialists'),
  useGetScreeningSpecialists: jest.fn(),
  useAssignScreeningSpecialist: () => ({
    assignScreeningSpecialist: jest.fn(),
    loading: false
  })
}))

const mockUseGetScreeningSpecialists = useGetScreeningSpecialists as jest.Mock

const HIDDEN_OPERATION = {
  callable: OperationCallableTypes.HIDDEN,
  messages: []
}

const arrangeTest = (talent: Talent) =>
  render(
    <TestWrapperWithMocks>
      <AssignDropdown talent={talent} />
    </TestWrapperWithMocks>
  )

describe('AssignDropdown', () => {
  it('renders assign menu item with screening specialist records', async () => {
    const talent = createTalentMock({
      fullName: 'Test Talent',
      currentSpecialistAssignment: createSpecialistAssignmentMock()
    })

    mockUseGetScreeningSpecialists.mockReturnValue({
      screeningSpecialists: createScreeningSpecialistsMock([
        'Specialist 1',
        'Specialist 2'
      ])
    })

    arrangeTest(talent)

    expect(useGetScreeningSpecialists).toHaveBeenCalled()
    expect(screen.queryByText('Specialist 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Specialist 2')).not.toBeInTheDocument()

    const openDropdownAction = screen.getByTestId('open-assign-dropdown')

    fireEvent.click(openDropdownAction)

    expect(screen.getByText('Unassign')).toBeInTheDocument()
    expect(screen.getByText('Specialist 1')).toBeInTheDocument()
    expect(screen.getByText('Specialist 2')).toBeInTheDocument()
  })

  describe('when operation is not allowed', () => {
    it("doesn't render assign menu item", async () => {
      const talent = createTalentMock({
        operations: {
          assignScreeningSpecialistToTalent: HIDDEN_OPERATION
        }
      })

      mockUseGetScreeningSpecialists.mockReturnValue({
        screeningSpecialists: createScreeningSpecialistsMock([
          'Specialist 1',
          'Specialist 2'
        ])
      })

      arrangeTest(talent)

      expect(useGetScreeningSpecialists).toHaveBeenCalled()
      expect(
        screen.queryByTestId('open-assign-dropdown')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is no screening specialist', () => {
    it('renders nothing', async () => {
      const talent = createTalentMock({ fullName: 'Test Talent' })

      mockUseGetScreeningSpecialists.mockReturnValue({
        screeningSpecialists: []
      })

      arrangeTest(talent)

      expect(useGetScreeningSpecialists).toHaveBeenCalled()
      expect(
        screen.queryByTestId('open-assign-dropdown')
      ).not.toBeInTheDocument()
    })
  })
})
