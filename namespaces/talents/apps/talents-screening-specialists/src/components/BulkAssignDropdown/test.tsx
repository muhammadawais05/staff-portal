import React from 'react'
import { render, screen } from '@testing-library/react'
import { fireEvent, waitFor, within } from '@toptal/picasso/test-utils'
import { SpecialistAssignmentStatuses } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  assertOnTooltipText,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'
import {
  useGetScreeningSpecialists,
  Talent
} from '@staff-portal/talents-screening-specialists'
import {
  createTalentMock,
  createScreeningSpecialistsMock
} from '@staff-portal/talents-screening-specialists/src/mocks'

import BulkAssignDropdown from './BulkAssignDropdown'
import {
  createAssignScreeningSpecialistsFailedMock,
  createAssignScreeningSpecialistsMock
} from '../../data/assign-screening-specialists/mocks'
import {
  createUnassignScreeningSpecialistsFailedMock,
  createUnassignScreeningSpecialistsMock
} from '../../data/unassign-screening-specialists/mocks'

jest.mock('@staff-portal/talents-screening-specialists', () => ({
  ...jest.requireActual('@staff-portal/talents-screening-specialists'),
  useGetScreeningSpecialists: jest.fn()
}))

const mockUseGetScreeningSpecialists = useGetScreeningSpecialists as jest.Mock

const screeningSpecialists = createScreeningSpecialistsMock([
  'Specialist 1',
  'Specialist 2'
])
const specialist = screeningSpecialists[0]

const arrangeTest = (selectedTalents: Talent[], mocks?: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <BulkAssignDropdown selectedTalentList={selectedTalents} />
    </TestWrapperWithMocks>
  )

let talent: Talent

describe('BulkAssignDropdown', () => {
  beforeEach(() => {
    mockUseGetScreeningSpecialists.mockReturnValue({ screeningSpecialists })
    talent = createTalentMock({ fullName: 'Test Talent' })
  })

  describe('BulkAssignDropdown component', () => {
    it('renders dropdown with screening specialists', () => {
      const selectedTalents = [talent]

      arrangeTest(selectedTalents)

      const button = screen.getByText('Assign').closest('button') as HTMLElement

      expect(button).not.toHaveAttribute('disabled', '')
      fireEvent.click(screen.getByTestId('open-assign-dropdown'))

      expect(screen.queryByTestId('bulk-assign-dropdown')).toBeInTheDocument()

      expect(screen.getByText('Specialist 1')).toBeInTheDocument()
      expect(screen.getByText('Specialist 2')).toBeInTheDocument()
    })

    describe('when there is no screening specialist', () => {
      it('renders nothing', () => {
        mockUseGetScreeningSpecialists.mockReturnValue({
          screeningSpecialists: []
        })

        arrangeTest([talent])

        expect(screen.queryByText('Assign')).not.toBeInTheDocument()
      })
    })

    describe('when there are no selected talents', () => {
      it('renders a disabled button instead dropdown', () => {
        const selectedTalents: Talent[] = []

        arrangeTest(selectedTalents)

        const button = screen
          .getByText('Assign')
          .closest('button') as HTMLElement

        expect(button).toHaveAttribute('disabled', '')
        assertOnTooltipText(
          button,
          'Please select talent to assign, reassign, or unassign to a team member.'
        )

        expect(
          screen.queryByTestId('bulk-assign-dropdown')
        ).not.toBeInTheDocument()
      })
    })

    describe('when there are no selected assignments', () => {
      it('renders a disabled button instead dropdown', () => {
        const selectedTalents = [talent]

        talent.currentSpecialistAssignment!.status =
          SpecialistAssignmentStatuses.ARCHIVED

        arrangeTest(selectedTalents)

        const button = screen
          .getByText('Assign')
          .closest('button') as HTMLElement

        expect(button).toHaveAttribute('disabled', '')
        assertOnTooltipText(
          button,
          'Please select talent to assign, reassign, or unassign to a team member.'
        )

        expect(
          screen.queryByTestId('bulk-assign-dropdown')
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('BulkAssignDropdownAssignAction component', () => {
    it('assigns screening specialist', async () => {
      const selectedTalents = [talent]

      const assignScreeningSpecialistsMock =
        createAssignScreeningSpecialistsMock({
          talents: selectedTalents,
          specialist,
          success: true,
          errors: []
        })

      arrangeTest(selectedTalents, [assignScreeningSpecialistsMock])

      fireEvent.click(screen.getByTestId('open-assign-dropdown'))
      fireEvent.click(screen.getByText(specialist.fullName))
      fireEvent.click(screen.getByText(specialist.fullName))

      expect(assignScreeningSpecialistsMock.newData).toHaveBeenCalledTimes(1)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()

      await waitFor(() => {
        expect(screen.queryByText(specialist.fullName)).not.toBeInTheDocument()
      })
    })

    describe('when unable to assign a screening specialist', () => {
      it('shows graphql error', async () => {
        const selectedTalents = [talent]
        const error = 'TEST_ERROR'

        const assignScreeningSpecialistsMock =
          createAssignScreeningSpecialistsMock({
            talents: selectedTalents,
            specialist,
            success: false,
            errors: [
              {
                key: 'some_key',
                code: 'some_code',
                message: error
              }
            ]
          })

        arrangeTest(selectedTalents, [assignScreeningSpecialistsMock])

        fireEvent.click(screen.getByTestId('open-assign-dropdown'))
        fireEvent.click(screen.getByText(specialist.fullName))

        const notification = await screen.findByRole('alert')

        expect(
          within(notification).getByText(
            `Unable to assign screening specialist, the following errors occurred: ${error}.`
          )
        ).toBeInTheDocument()

        await waitFor(() => {
          expect(
            screen.queryByText(specialist.fullName)
          ).not.toBeInTheDocument()
        })
      })
    })

    describe('when unable to send the request', () => {
      it('shows graphql error', async () => {
        const selectedTalents = [talent]

        const assignScreeningSpecialistsMock =
          createAssignScreeningSpecialistsFailedMock({
            variables: {
              input: {
                talentIds: selectedTalents.map(talent => talent.id), // eslint-disable-line @typescript-eslint/no-shadow
                assigneeId: specialist.id
              }
            }
          })

        arrangeTest(selectedTalents, [assignScreeningSpecialistsMock])

        fireEvent.click(screen.getByTestId('open-assign-dropdown'))
        fireEvent.click(screen.getByText(specialist.fullName))

        const notification = await screen.findByRole('alert')

        expect(
          within(notification).getByText(
            `Unable to assign screening specialist.`
          )
        ).toBeInTheDocument()

        await waitFor(() => {
          expect(
            screen.queryByText(specialist.fullName)
          ).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('BulkAssignDropdownUnassignAction component', () => {
    it('unassigns screening specialist from selected talents', async () => {
      const selectedTalents = [talent]

      const unassignScreeningSpecialistsMock =
        createUnassignScreeningSpecialistsMock({
          talents: selectedTalents,
          success: true,
          errors: []
        })

      arrangeTest(selectedTalents, [unassignScreeningSpecialistsMock])

      fireEvent.click(screen.getByTestId('open-assign-dropdown'))
      fireEvent.click(screen.getByText('Unassign'))
      expect(unassignScreeningSpecialistsMock.newData).toHaveBeenCalledTimes(1)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    // TODO: https://toptal-core.atlassian.net/browse/SP-1447
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('when unable to unassign screening specialists from selected talents', () => {
      it('shows graphql error', async () => {
        const selectedTalents = [talent]
        const error = 'TEST_ERROR'

        const unassignScreeningSpecialistsMock =
          createUnassignScreeningSpecialistsMock({
            talents: selectedTalents,
            success: false,
            errors: [
              {
                key: 'some_key',
                code: 'some_code',
                message: error
              }
            ]
          })

        arrangeTest(selectedTalents, [unassignScreeningSpecialistsMock])

        fireEvent.click(screen.getByTestId('open-assign-dropdown'))
        fireEvent.click(screen.getByText('Unassign'))

        const notification = await screen.findByRole('alert')

        expect(
          within(notification).getByText(
            `Unable to unassign screening specialists, the following errors occurred: ${error}.`
          )
        ).toBeInTheDocument()
      })
    })

    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('when unable to send the request', () => {
      it('shows graphql error', async () => {
        const selectedTalents = [talent]

        const specialistAssignmentIds = selectedTalents.map(
          talent => talent.currentSpecialistAssignment!.id // eslint-disable-line @typescript-eslint/no-shadow
        )

        const unassignScreeningSpecialistsMock =
          createUnassignScreeningSpecialistsFailedMock({
            variables: {
              input: { specialistAssignmentIds }
            }
          })

        arrangeTest(selectedTalents, [unassignScreeningSpecialistsMock])

        fireEvent.click(screen.getByTestId('open-assign-dropdown'))
        fireEvent.click(screen.getByText('Unassign'))

        const notification = await screen.findByRole('alert')

        expect(
          within(notification).getByText(
            `Unable to unassign screening specialists.`
          )
        ).toBeInTheDocument()
      })
    })
  })
})
