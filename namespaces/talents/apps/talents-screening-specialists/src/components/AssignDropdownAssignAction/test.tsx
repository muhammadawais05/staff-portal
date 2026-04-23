import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { waitFor, within } from '@toptal/picasso/test-utils'
import { Dropdown, Menu } from '@toptal/picasso'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { TssSegmentEvents } from '@staff-portal/talents-screening-specialists'
import {
  createAssignScreeningSpecialistFailedMock,
  createAssignScreeningSpecialistMock,
  createTalentMock,
  createScreeningSpecialistsMock
} from '@staff-portal/talents-screening-specialists/src/mocks'

import AssignDropdownAssignAction from './AssignDropdownAssignAction'

const mockTrackFn = jest.fn()

jest.mock('@staff-portal/monitoring-service', () => ({
  useAnalytics: () => ({
    track: mockTrackFn
  })
}))

const talent = createTalentMock({ fullName: 'Test Talent' })
const specialist = createScreeningSpecialistsMock(['Specialist 1'])[0]

const arrangeTest = (mock: MockedResponse) =>
  render(
    <TestWrapperWithMocks mocks={[mock]}>
      <Dropdown
        disableAutoClose
        content={
          <Menu>
            <AssignDropdownAssignAction
              talent={talent}
              specialist={specialist}
            />
          </Menu>
        }
      >
        <Dropdown.Arrow data-testid='open-assign-dropdown' />
      </Dropdown>
    </TestWrapperWithMocks>
  )

describe('AssignDropdownAssignAction', () => {
  it('assigns screening specialist', async () => {
    const assignScreeningSpecialistMock = createAssignScreeningSpecialistMock({
      talent,
      specialist,
      success: true,
      errors: []
    })

    arrangeTest(assignScreeningSpecialistMock)

    fireEvent.click(screen.getByTestId('open-assign-dropdown'))
    fireEvent.click(screen.getByText(specialist.fullName))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    expect(mockTrackFn).toHaveBeenCalledWith(TssSegmentEvents.ASSIGN_CLICKED)

    await waitFor(() => {
      expect(screen.queryByText(specialist.fullName)).not.toBeInTheDocument()
    })
  })

  describe('when unable to assign a screening specialist', () => {
    it('shows graphql error', async () => {
      const error = 'TEST_ERROR'
      const assignScreeningSpecialistMock = createAssignScreeningSpecialistMock(
        {
          talent,
          specialist,
          success: false,
          errors: [
            {
              key: 'some_key',
              code: 'some_code',
              message: error
            }
          ]
        }
      )

      arrangeTest(assignScreeningSpecialistMock)

      fireEvent.click(screen.getByTestId('open-assign-dropdown'))
      fireEvent.click(screen.getByText(specialist.fullName))

      const notification = await screen.findByRole('alert')

      expect(
        within(notification).getByText(
          `Unable to assign screening specialist, the following errors occurred: ${error}.`
        )
      ).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.queryByText(specialist.fullName)).not.toBeInTheDocument()
      })
    })
  })

  describe('when unable to send the request', () => {
    it('shows graphql error', async () => {
      const assignScreeningSpecialistMock =
        createAssignScreeningSpecialistFailedMock({
          variables: {
            input: {
              talentId: talent.id,
              assigneeId: specialist.id
            }
          }
        })

      arrangeTest(assignScreeningSpecialistMock)

      fireEvent.click(screen.getByTestId('open-assign-dropdown'))
      fireEvent.click(screen.getByText(specialist.fullName))

      const notification = await screen.findByRole('alert')

      expect(
        within(notification).getByText(`Unable to assign screening specialist.`)
      ).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.queryByText(specialist.fullName)).not.toBeInTheDocument()
      })
    })
  })
})
