import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup
} from '@testing-library/react'
import { SpecialistAssignmentStatuses } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { useGetScreeningSpecialists } from '../../../../data/get-screening-specialists'
import {
  createUnassignScreeningSpecialistFailedMock,
  createUnassignScreeningSpecialistMock
} from '../../../../data/unassign-screening-specialist/mocks'
import {
  createAssignScreeningSpecialistFailedMock,
  createAssignScreeningSpecialistMock
} from '../../../../data/assign-screening-specialist/mocks'
import {
  createSpecialistAssignmentMock,
  createTalentMock,
  createStaffMock
} from '../../../../data/mocks'
import AssignModal from './AssignModal'
import { SpecialistAssignmentFragment } from '../../../../data/specialist-assignment-fragment.staff.gql.types'

jest.mock('../../../../data/get-screening-specialists')
const mockUseGetScreeningSpecialists = useGetScreeningSpecialists as jest.Mock

const talentId = '123'
const unassignItemTitle = 'Unassign'
const specialist = createStaffMock()
const assignment = createSpecialistAssignmentMock({ assignee: specialist })
const selectedSpecialist = createStaffMock({
  id: '1',
  fullName: 'Specialist 1',
  webResource: {
    url: 'first-specialist-url'
  }
})

const arrangeTest = (
  mocks: MockedResponse[],
  hideModal = jest.fn(),
  initialAssignment?: SpecialistAssignmentFragment
) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <AssignModal
        talentId={talentId}
        initialAssignment={initialAssignment}
        hideModal={hideModal}
      />
    </TestWrapperWithMocks>
  )

describe('AssignModal', () => {
  const handleClose = jest.fn()

  describe('when specialist is already assigned', () => {
    beforeEach(() => {
      mockUseGetScreeningSpecialists.mockReturnValue({
        screeningSpecialists: [
          selectedSpecialist,
          createStaffMock({ id: '2', fullName: 'Specialist 2' })
        ]
      })

      const unassignScreeningSpecialistMock =
        createUnassignScreeningSpecialistMock({
          specialistAssignment: createSpecialistAssignmentMock({
            id: assignment.id,
            status: SpecialistAssignmentStatuses.ACTIVE
          }),
          success: true,
          errors: []
        })

      const assignScreeningSpecialistMock = createAssignScreeningSpecialistMock(
        {
          talent: createTalentMock({
            id: talentId
          }),
          specialist: selectedSpecialist,
          success: true,
          errors: []
        }
      )

      arrangeTest(
        [unassignScreeningSpecialistMock, assignScreeningSpecialistMock],
        handleClose,
        assignment
      )
    })

    describe('when initial rendering', () => {
      it('displays link to current specialist', () => {
        expect(screen.getByText(specialist.fullName)).toHaveAttribute(
          'href',
          specialist.webResource.url
        )
      })

      it('disables submit button', () => {
        const button = screen.getByTestId('assign-modal-submit-button')

        expect(button).toBeDisabled()
        expect(button).toHaveTextContent('Reassign')
      })
    })

    describe('when screening specialist is selected', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByTestId('assign-dropdown-button'))
        fireEvent.click(screen.getByText('Specialist 1'))
      })

      it('changes current specialist', () => {
        expect(screen.getByText('Specialist 1')).toHaveAttribute(
          'href',
          'first-specialist-url'
        )
      })

      it('enables submit button', () => {
        expect(screen.getByTestId('assign-modal-submit-button')).toBeEnabled()
      })
    })

    describe('when specialist is reassigned', () => {
      it('calls hideModal callback', async () => {
        fireEvent.click(screen.getByTestId('assign-dropdown-button'))
        fireEvent.click(screen.getByText('Specialist 1'))
        fireEvent.click(screen.getByTestId('assign-modal-submit-button'))

        await waitFor(() => expect(handleClose).toHaveBeenCalled())
      })
    })

    describe('when unable to reassign specialist', () => {
      it('calls hideModal callback', async () => {
        cleanup()
        const assignScreeningSpecialistMock =
          createAssignScreeningSpecialistFailedMock({
            variables: {
              input: {
                talentId: talentId,
                assigneeId: selectedSpecialist.id
              }
            }
          })

        arrangeTest([assignScreeningSpecialistMock], handleClose, assignment)

        fireEvent.click(screen.getByTestId('assign-dropdown-button'))
        fireEvent.click(screen.getByText('Specialist 1'))
        fireEvent.click(screen.getByTestId('assign-modal-submit-button'))

        await waitFor(() =>
          expect(
            screen.getByText('Unable to assign screening specialist.')
          ).toBeInTheDocument()
        )
      })
    })

    describe('when unassign is selected', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByTestId('assign-dropdown-button'))
        fireEvent.click(screen.getByText(unassignItemTitle))
      })

      it('changes current specialist to a dash', () => {
        expect(screen.getByText('TSS Specialist -')).toBeInTheDocument()
      })

      it('enables submit button', () => {
        const button = screen.getByTestId('assign-modal-submit-button')

        expect(button).toBeEnabled()
        expect(button).toHaveTextContent('Unassign')
      })
    })

    describe('when specialist is unassigned', () => {
      it('calls hideModal callback', async () => {
        fireEvent.click(screen.getByTestId('assign-dropdown-button'))
        fireEvent.click(screen.getByText(unassignItemTitle))
        fireEvent.click(screen.getByTestId('assign-modal-submit-button'))

        await waitFor(() => expect(handleClose).toHaveBeenCalled())
      })
    })

    describe('when unable to unassign specialist', () => {
      it('calls hideModal callback', async () => {
        cleanup()
        const unassignScreeningSpecialistMock =
          createUnassignScreeningSpecialistFailedMock({
            variables: {
              input: {
                specialistAssignmentId: assignment.id
              }
            }
          })

        arrangeTest([unassignScreeningSpecialistMock], handleClose, assignment)

        fireEvent.click(screen.getByTestId('assign-dropdown-button'))
        fireEvent.click(screen.getByText('Unassign'))
        fireEvent.click(screen.getByTestId('assign-modal-submit-button'))

        await waitFor(() =>
          expect(
            screen.getByText('Unable to unassign screening specialist.')
          ).toBeInTheDocument()
        )
      })
    })
  })

  describe('when specialist is not assigned yet', () => {
    beforeEach(() => {
      mockUseGetScreeningSpecialists.mockReturnValue({
        screeningSpecialists: [
          selectedSpecialist,
          createStaffMock({ id: '2', fullName: 'Specialist 2' })
        ]
      })

      const assignScreeningSpecialistMock = createAssignScreeningSpecialistMock(
        {
          talent: createTalentMock({
            id: talentId
          }),
          specialist: selectedSpecialist,
          success: true,
          errors: []
        }
      )

      arrangeTest([assignScreeningSpecialistMock], handleClose)
    })

    describe('when initial rendering', () => {
      it('displays current specialist as a dash', () => {
        expect(screen.getByText('TSS Specialist -')).toBeInTheDocument()
      })

      it('disables submit button', () => {
        const button = screen.getByTestId('assign-modal-submit-button')

        expect(button).toBeDisabled()
        expect(button).toHaveTextContent('Assign')
      })
    })

    describe('when screening specialist is selected', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByTestId('assign-dropdown-button'))
        fireEvent.click(screen.getByText('Specialist 1'))
      })

      it('changes current specialist', async () => {
        expect(await screen.getByText('Specialist 1')).toHaveAttribute(
          'href',
          'first-specialist-url'
        )
      })

      it('enables submit button', () => {
        const button = screen.getByTestId('assign-modal-submit-button')

        expect(button).toBeEnabled()
        expect(button).toHaveTextContent('Assign')
      })
    })

    describe('when specialist is assigned', () => {
      it('calls hideModal callback', async () => {
        fireEvent.click(screen.getByTestId('assign-dropdown-button'))
        fireEvent.click(screen.getByText('Specialist 1'))
        fireEvent.click(screen.getByTestId('assign-modal-submit-button'))

        await waitFor(() => expect(handleClose).toHaveBeenCalled())
      })
    })
  })
})
