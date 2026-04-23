import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { waitFor, within } from '@toptal/picasso/test-utils'
import { Dropdown, Menu } from '@toptal/picasso'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  SpecialistAssignmentFragment,
  TssSegmentEvents
} from '@staff-portal/talents-screening-specialists'
import {
  createUnassignScreeningSpecialistFailedMock,
  createUnassignScreeningSpecialistMock,
  createSpecialistAssignmentMock
} from '@staff-portal/talents-screening-specialists/src/mocks'

import AssignDropdownUnassignAction from './AssignDropdownUnassignAction'

const mockTrackFn = jest.fn()

jest.mock('@staff-portal/monitoring-service', () => ({
  useAnalytics: () => ({
    track: mockTrackFn
  })
}))

const specialistAssignment: SpecialistAssignmentFragment =
  createSpecialistAssignmentMock()

const arrangeTest = (
  mock: MockedResponse,
  sa: SpecialistAssignmentFragment | null
) =>
  render(
    <TestWrapperWithMocks mocks={[mock]}>
      <Dropdown
        disableAutoClose
        content={
          <Menu>
            <AssignDropdownUnassignAction specialistAssignment={sa} />
          </Menu>
        }
      >
        <Dropdown.Arrow data-testid='open-assign-dropdown' />
      </Dropdown>
    </TestWrapperWithMocks>
  )

describe('AssignDropdownUnassignAction', () => {
  it('unassigns screening specialist', async () => {
    const unassignScreeningSpecialistMock =
      createUnassignScreeningSpecialistMock({
        specialistAssignment,
        success: Boolean('true'),
        errors: []
      })

    arrangeTest(unassignScreeningSpecialistMock, specialistAssignment)

    fireEvent.click(screen.getByTestId('open-assign-dropdown'))
    fireEvent.click(screen.getByText('Unassign'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(mockTrackFn).toHaveBeenCalledWith(TssSegmentEvents.UNASSIGN_CLICKED)

    await waitFor(() => {
      expect(screen.queryByText('Unassign')).not.toBeInTheDocument()
    })
  })

  describe('when specialist assignment is null', () => {
    it("does not render the 'Unassign' option", () => {
      const scopedSpecialistAssignment = createSpecialistAssignmentMock({
        assignee: null
      })
      const unassignScreeningSpecialistMock =
        createUnassignScreeningSpecialistMock({
          specialistAssignment: scopedSpecialistAssignment,
          success: Boolean('true'),
          errors: []
        })

      arrangeTest(unassignScreeningSpecialistMock, scopedSpecialistAssignment)

      fireEvent.click(screen.getByTestId('open-assign-dropdown'))

      expect(screen.queryByText('Unassign')).not.toBeInTheDocument()
    })
  })

  describe('when unable to unassign a screening specialist', () => {
    it('shows graphql error', async () => {
      const error = 'TEST_ERROR'
      const unassignScreeningSpecialistMock =
        createUnassignScreeningSpecialistMock({
          specialistAssignment,
          success: Boolean('false'),
          errors: [
            {
              key: 'some_key',
              code: 'some_code',
              message: error
            }
          ]
        })

      arrangeTest(unassignScreeningSpecialistMock, specialistAssignment)

      fireEvent.click(screen.getByTestId('open-assign-dropdown'))
      fireEvent.click(screen.getByText('Unassign'))

      const notification = await screen.findByRole('alert')

      expect(
        within(notification).getByText(
          `Unable to unassign screening specialist, the following errors occurred: ${error}.`
        )
      ).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.queryByText('Unassign')).not.toBeInTheDocument()
      })
    })
  })

  describe('when unable to send the request', () => {
    it('shows graphql error', async () => {
      const unassignScreeningSpecialistMock =
        createUnassignScreeningSpecialistFailedMock({
          variables: {
            input: {
              specialistAssignmentId: specialistAssignment.id
            }
          }
        })

      arrangeTest(unassignScreeningSpecialistMock, specialistAssignment)

      fireEvent.click(screen.getByTestId('open-assign-dropdown'))
      fireEvent.click(screen.getByText('Unassign'))

      const notification = await screen.findByRole('alert')

      expect(
        within(notification).getByText(
          `Unable to unassign screening specialist.`
        )
      ).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.queryByText('Unassign')).not.toBeInTheDocument()
      })
    })
  })
})
