import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import { act } from '@toptal/picasso/test-utils'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createClaimerFragmentMock } from '@staff-portal/facilities/src/mocks'

import {
  createGetReassignRoleStepOperationFailedMock,
  createGetReassignRoleStepOperationMock
} from './data/mocks'
import ReassignScreeningStepCheckbox, {
  Props
} from './ReassignScreeningStepCheckbox'

const ROLE_STEP_ID = 'role-step-id'

const arrangeTest = ({
  mocks,
  claimer,
  mockSubmit = () => {}
}: {
  mocks: MockedResponse[]
  claimer: Props['claimer']
  mockSubmit?: () => void
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <Form onSubmit={mockSubmit}>
        <ReassignScreeningStepCheckbox
          roleStepId={ROLE_STEP_ID}
          claimer={claimer}
        />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form>
    </TestWrapperWithMocks>
  )

describe('ApproveOnlineTestStepModal', () => {
  describe('does not render checkbox', () => {
    it('if claimer is the same as current user', () => {
      arrangeTest({
        mocks: [
          createGetReassignRoleStepOperationMock({
            roleStepId: ROLE_STEP_ID,
            callable: OperationCallableTypes.ENABLED
          })
        ],
        claimer: createClaimerFragmentMock({ id: 'current-user-id' })
      })

      expect(
        screen.queryByTestId('approve-reassign-checkbox')
      ).not.toBeInTheDocument()
    })

    it('if operation is not enabled', () => {
      arrangeTest({
        mocks: [
          createGetReassignRoleStepOperationMock({
            roleStepId: ROLE_STEP_ID,
            callable: OperationCallableTypes.DISABLED
          })
        ],
        claimer: createClaimerFragmentMock()
      })

      expect(
        screen.queryByTestId('approve-reassign-checkbox')
      ).not.toBeInTheDocument()
    })
  })

  describe('renders checkbox', () => {
    it('if operation is enabled and claimer is different from the current user', async () => {
      arrangeTest({
        mocks: [
          createGetReassignRoleStepOperationMock({
            roleStepId: ROLE_STEP_ID,
            callable: OperationCallableTypes.ENABLED
          })
        ],
        claimer: createClaimerFragmentMock()
      })

      expect(
        await screen.findByTestId('approve-reassign-checkbox')
      ).toBeInTheDocument()
    })
  })

  it('checkbox should be connected to the parent form and change form values accordingly', async () => {
    const mockSubmit = jest.fn()

    arrangeTest({
      mocks: [
        createGetReassignRoleStepOperationMock({
          roleStepId: ROLE_STEP_ID,
          callable: OperationCallableTypes.ENABLED
        })
      ],
      claimer: createClaimerFragmentMock(),
      mockSubmit
    })

    fireEvent.click(await screen.findByLabelText(/Reassign this step from/i))
    screen.getByText('Submit').click()

    await act(() => Promise.resolve())

    expect(mockSubmit).toHaveBeenCalledTimes(1)
    expect(mockSubmit.mock.calls[0][0]).toEqual({ reassign: false })
  })

  it('renders checkbox with already selected value by default', async () => {
    arrangeTest({
      mocks: [
        createGetReassignRoleStepOperationMock({
          roleStepId: ROLE_STEP_ID,
          callable: OperationCallableTypes.ENABLED
        })
      ],
      claimer: createClaimerFragmentMock()
    })

    await screen.findByTestId('approve-reassign-checkbox')
    const checkbox = document.getElementById('reassign')

    expect(checkbox).toBeChecked()
  })

  it('shows error message when request fails', async () => {
    arrangeTest({
      mocks: [createGetReassignRoleStepOperationFailedMock(ROLE_STEP_ID)],
      claimer: createClaimerFragmentMock()
    })
    expect(
      await screen.findByText('Unable to load operation.')
    ).toBeInTheDocument()
  })
})
