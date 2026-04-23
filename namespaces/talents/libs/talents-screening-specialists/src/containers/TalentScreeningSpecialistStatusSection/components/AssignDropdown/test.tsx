import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import AssignDropdown from './AssignDropdown'
import { createStaffMock } from '../../data/mocks'
import {
  useGetScreeningSpecialists,
  ScreeningSpecialistFragment
} from '../../../../data/get-screening-specialists'

jest.mock('../../../../data/get-screening-specialists')

const specialistNameMock = 'TEST_NAME'
const unassignItemTitle = 'Unassign'
const mockUseGetScreeningSpecialists = useGetScreeningSpecialists as jest.Mock

const arrangeTest = ({
  currentSpecialist,
  onSelect
}: {
  currentSpecialist?: ScreeningSpecialistFragment
  onSelect: (specialist?: ScreeningSpecialistFragment) => void
}) =>
  render(
    <TestWrapperWithMocks>
      <AssignDropdown
        currentSpecialist={currentSpecialist}
        onSelect={onSelect}
      />
    </TestWrapperWithMocks>
  )

describe('AssignDropdown', () => {
  it('renders assign menu item with screening specialist records', async () => {
    const currentSpecialistMock = createStaffMock({
      id: '1',
      fullName: specialistNameMock
    })

    mockUseGetScreeningSpecialists.mockReturnValue({
      screeningSpecialists: [
        currentSpecialistMock,
        createStaffMock({ id: '2', fullName: 'Specialist 1' }),
        createStaffMock({ id: '3', fullName: 'Specialist 2' })
      ]
    })

    arrangeTest({
      currentSpecialist: currentSpecialistMock,
      onSelect: jest.fn()
    })

    expect(useGetScreeningSpecialists).toHaveBeenCalled()
    expect(screen.queryByText(specialistNameMock)).not.toBeInTheDocument()
    expect(screen.queryByText(unassignItemTitle)).not.toBeInTheDocument()
    expect(screen.queryByText('Specialist 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Specialist 2')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('assign-dropdown-button'))

    expect(screen.queryByText(specialistNameMock)).not.toBeInTheDocument()
    expect(await screen.findByText(unassignItemTitle)).toBeInTheDocument()
    expect(await screen.findByText('Specialist 1')).toBeInTheDocument()
    expect(await screen.findByText('Specialist 2')).toBeInTheDocument()
  })

  describe('when specialist item clicked', () => {
    it('handles onSelect callback', async () => {
      const handleSelect = jest.fn()

      const currentSpecialistMock = createStaffMock({
        id: '1',
        fullName: specialistNameMock
      })

      const clickedSpecialist = createStaffMock({
        id: '2',
        fullName: 'Specialist 1'
      })

      mockUseGetScreeningSpecialists.mockReturnValue({
        screeningSpecialists: [
          currentSpecialistMock,
          clickedSpecialist,
          createStaffMock({ id: '3', fullName: 'Specialist 2' })
        ]
      })

      arrangeTest({
        currentSpecialist: currentSpecialistMock,
        onSelect: handleSelect
      })

      fireEvent.click(screen.getByTestId('assign-dropdown-button'))
      fireEvent.click(await screen.findByText('Specialist 1'))

      expect(handleSelect).toHaveBeenCalledTimes(1)
      expect(handleSelect).toHaveBeenCalledWith(clickedSpecialist)
    })
  })

  describe('when unassign item is clicked', () => {
    it('handles onSelect callback', async () => {
      const handleSelect = jest.fn()

      const currentSpecialistMock = createStaffMock({
        id: '1',
        fullName: specialistNameMock
      })

      mockUseGetScreeningSpecialists.mockReturnValue({
        screeningSpecialists: [
          currentSpecialistMock,
          createStaffMock({ id: '2', fullName: 'Specialist 1' }),
          createStaffMock({ id: '3', fullName: 'Specialist 2' })
        ]
      })

      arrangeTest({
        currentSpecialist: currentSpecialistMock,
        onSelect: handleSelect
      })

      fireEvent.click(screen.getByTestId('assign-dropdown-button'))
      fireEvent.click(await screen.findByText(unassignItemTitle))

      expect(handleSelect).toHaveBeenCalledTimes(1)
      expect(handleSelect).toHaveBeenCalledWith()
    })
  })

  describe('when there is no current specialist', () => {
    it('does not show unassign item', () => {
      mockUseGetScreeningSpecialists.mockReturnValue({
        screeningSpecialists: [
          createStaffMock({ id: '1', fullName: 'Specialist 1' }),
          createStaffMock({ id: '2', fullName: 'Specialist 2' })
        ]
      })

      arrangeTest({
        onSelect: jest.fn()
      })

      fireEvent.click(screen.getByTestId('assign-dropdown-button'))

      expect(screen.queryByText(unassignItemTitle)).not.toBeInTheDocument()
    })
  })

  describe('when there are no screening specialists', () => {
    it('renders nothing', () => {
      mockUseGetScreeningSpecialists.mockReturnValue({
        screeningSpecialists: []
      })

      arrangeTest({
        onSelect: jest.fn()
      })

      expect(useGetScreeningSpecialists).toHaveBeenCalled()
      expect(
        screen.queryByTestId('assign-dropdown-button')
      ).not.toBeInTheDocument()
    })
  })
})
