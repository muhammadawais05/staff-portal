import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { BASE_ERROR_KEY } from '@staff-portal/mutation-result-handlers'

import {
  createReassignActivationStepMock,
  createReassignStepActivationFailedMock
} from '../data/reassign-activation-step/mocks'
import ReassignActivationStepModal from '../ReassignActivationStepModal'

const activationId = '123'
const stepId = '1234'
const staffId = '12345'
const assignedStaff = {
  id: staffId,
  fullName: 'New Staff'
}
const stepName = 'Profile Editing'
const comment = 'comment'

const reassignActivationStepMock = createReassignActivationStepMock({
  variables: {
    input: {
      comment,
      staffId,
      activationStepId: stepId
    }
  },
  partialReassignActivationStepMutation: {
    reassignActivationStep: {
      activation: {
        id: activationId,
        steps: {
          nodes: []
        }
      },
      success: true,
      errors: []
    }
  }
})

const arrangeTest = (mock: MockedResponse) => {
  window.Element.prototype.scrollIntoView = jest.fn()

  render(
    <TestWrapperWithMocks mocks={[mock]}>
      <ReassignActivationStepModal
        talentId='talent-id'
        activationId={activationId}
        stepId={stepId}
        stepName={stepName}
        hideModal={jest.fn()}
        staff={assignedStaff}
      />
    </TestWrapperWithMocks>
  )
}

describe('ReassignActivationStepModal', () => {
  it('renders the reassign step modal', async () => {
    arrangeTest(reassignActivationStepMock)

    expect(screen.getByText(`Reassign ${stepName}`)).toBeInTheDocument()
    expect(
      screen.getByText(`Do you really want to reassign the ${stepName} step?`)
    ).toBeInTheDocument()
    expect(screen.getByText(`Reassign Step`)).toBeInTheDocument()

    await waitFor(() => null)
  })

  it('reassigns a step', async () => {
    arrangeTest(reassignActivationStepMock)
    await waitFor(() => null)

    const commentField = screen.getByLabelText(/Comment/)

    fireEvent.change(commentField, { target: { value: comment } })
    fireEvent.click(screen.getByText(`Reassign Step`))

    await waitFor(() => null)

    expect(
      await screen.findByText(
        `The ${stepName} Step has been successfully reassigned.`
      )
    ).toBeInTheDocument()
  })

  it('shows graphql error when unable to reassign an activation step', async () => {
    const reassignAlreadyReassignedActivationStepMock =
      createReassignActivationStepMock({
        variables: {
          input: {
            comment,
            staffId,
            activationStepId: stepId
          }
        },
        partialReassignActivationStepMutation: {
          reassignActivationStep: {
            activation: null,
            success: false,
            errors: [
              {
                code: '',
                key: BASE_ERROR_KEY,
                message: 'Server side error message'
              }
            ]
          }
        }
      })

    arrangeTest(reassignAlreadyReassignedActivationStepMock)
    await waitFor(() => null)

    const commentField = screen.getByLabelText(/Comment/)

    fireEvent.change(commentField, { target: { value: comment } })
    fireEvent.click(screen.getByText(`Reassign Step`))

    expect(
      await screen.findByText('Server side error message')
    ).toBeInTheDocument()
  })

  it('shows network error', async () => {
    const reassignActivationStepFailedMock =
      createReassignStepActivationFailedMock({
        variables: {
          input: {
            comment,
            staffId,
            activationStepId: stepId
          }
        }
      })

    arrangeTest(reassignActivationStepFailedMock)
    await waitFor(() => null)

    const commentField = screen.getByLabelText(/Comment/)

    fireEvent.change(commentField, { target: { value: comment } })
    fireEvent.click(screen.getByText(`Reassign Step`))
    await waitFor(() => null)

    expect(
      await screen.findByText('Unable to reassign step.')
    ).toBeInTheDocument()
  })
})
